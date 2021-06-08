const dayNameToNumber = (name) =>
  ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].indexOf(
    name.toLowerCase()
  ) + 1;

const parseDay = (day) => {
  if (day.match(/^[0-9]+$/)) {
    return {
      type: "day",
      value: parseInt(day),
    };
  }
  if (day.match(/^last[A-Za-z]{3}$/)) {
    return {
      type: "last-day",
      value: dayNameToNumber(day.substr(4)),
    };
  }
  let parts = day.match(/^([A-Za-z]{3})>=([0-9]+)$/);
  if (parts) {
    return {
      type: "next-day-after",
      day: parseInt(parts[2]),
      dayOfWeek: dayNameToNumber(parts[1]),
    };
  }

  return {
    type: "parse-error",
  };
};

const parseTimeZone = (zone) => {
  if (zone == "" || zone == "w"|| zone == "s") {
    return "local";
  }
  if (zone == "g" || zone == "u" || zone == "z") {
    return "utc";
  }
  return "undefined";
};

const parseTime = (time) => {
  try {
    const parts = time.match(/([0-9]{1,2}):([0-9]{1,2})([a-z])?/);
    const hour = parseInt(parts[1]);
    const minute = parseInt(parts[2]);
    return {
      hour,
      minute,
      totalMinutes: hour * 60 + minute,
      zone: parts[3] ? parseTimeZone(parts[3]) : "local",
    };
  } catch {
    throw new Error(`Unable to parse time [${time}]`);
  }
};

const parseOffset = (offset) => {
  let sign = 1;
  if (offset.startsWith("-")) {
    sign = -1;
    offset = offset.substr(1);
  }

  const parts = offset.split(":");
  if (parts.length == 3) {
    return (
      sign *
      (parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]))
    );
  }
  if (parts.length == 2) {
    return sign * (parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60);
  }
  if (parts.length == 1) {
    return sign * parseInt(offset);
  }
};

const parseEndYear = (endYear, startYear) => {
  if (endYear == "only") return startYear;
  if (endYear == "max") return -1;
  return endYear;
};

const monthIndex = (month) =>
  [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ].indexOf(month.toLowerCase()) + 1;

const parseUntil = (until) => {
  const match = until.match(
    /([0-9]{1,4})\s*(\w{3})?\s*([0-9]{1,2})?\s*([0-9]{1,2})?:?([0-9]{1,2})?(u|s)?/
  );
  if (!match) {
    return;
  }
  const untilObj = {
    year: parseInt(match[1]),
    month: monthIndex(match[2] ?? "Jan"),
    day: parseInt(match[3] ?? "1"),
    hour: parseInt(match[4] ?? "00"),
    minute: parseInt(match[5] ?? "00"),
    zone: match[6] ?? "u",
  };
  // TODO - consider utc / standard time offsets
  untilObj.millis = Date.UTC(
    untilObj.year,
    untilObj.month,
    untilObj.day,
    untilObj.hour,
    untilObj.minute
  );
  return untilObj;
};

const parseRule = (line) => {
  const cols = line.split(/[\t ]+/);
  return {
    name: cols[1],
    startYear: parseInt(cols[2]),
    endYear: parseInt(parseEndYear(cols[3], cols[2])),
    inMonth: monthIndex(cols[5]),
    day: parseDay(cols[6]),
    time: parseTime(cols[7]),
    offset: parseOffset(cols[8]),
    letter: cols[9],
    line,
  };
};

const parseZone = (line) => {
  try {
    const match = line.match(
      /^(Zone)?\s+(?<name>[0-9a-z_A-Z-\/]*)?\s+(?<offset>-?[0-9]{1,2}:[0-9]{1,2}(:[0-9]{1,2})?)\s+(?<rules>[_A-Za-z-]*|-?[0-9]{1,2}:[0-9]{1,2})\s+(?<format>[A-Z%a-z+-0-9\/]+)\s*(?<until>.*)$/
    );

    return {
      standardOffset: parseOffset(match.groups.offset),
      rules: match.groups.rules,
      format: match.groups.format,
      until: parseUntil(match.groups.until),
      line,
    };
  } catch {
    throw new Error(`Unable to parse zone [${line}]`);
  }
};

// parse the IANA database
const parserDatabase = (tzDatabase) => {
  const lines = tzDatabase.split("\n");

  const rules = [];
  const zones = [];

  let zone;
  lines.forEach((line, index) => {
    try {
      if (line.startsWith("#")) return;

      if (zone) {
        if (line.trim() == "") {
          zones.push(zone);
          zone = undefined;
          return;
        }
        const nextZone = parseZone(line);
        zone.ruleRefs.push(nextZone);
        if (!nextZone.until) {
          zones.push(zone);
          zone = undefined;
          return;
        }
      } else if (line.startsWith("Rule")) {
        rules.push(parseRule(line));
      } else if (line.startsWith("Zone")) {
        const cols = line.split(/[\t ]+/);
        zone = {
          name: cols[1],
          ruleRefs: [parseZone(line)],
        };
      }
    } catch (e) {
      console.log(`line ${index}: ${e.message}`);
    }
  });
  return { zones, rules };
};

export { parserDatabase };
