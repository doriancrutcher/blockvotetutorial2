const emitZoneOffset = (offset) => {
  return `
    // ${offset.line.replace("\t", "    ")}
    new ZoneOffset(${offset.standardOffset * 1_000}, "${offset.rules}",
        "${offset.format}", ${offset.until ? offset.until.millis : -1})
  `;
};

const emitZone = (zone) => {
  return `
    zones.set("${zone.name}",
      new Zone("${zone.name}", [${zone.ruleRefs.map(emitZoneOffset)}]));`;
};

const emitZones = (zones) => {
  return zones.map(emitZone).join("")
};

const emitDay = (day) => {
  if (day.type == "day") {
    return `new DayOfMonth(${day.value})`;
  }
  if (day.type == "next-day-after") {
    return `new NextDayAfter(${day.dayOfWeek}, ${day.day})`;
  }
  if (day.type == "last-day") {
    return `new LastDay(${day.value})`;
  }
};

const emitRule = (rule) => {
  return `
  // ${rule.line.replace("\t", "    ")}
  new Rule("${rule.name}", ${rule.startYear}, ${rule.endYear},
    ${rule.inMonth}, ${emitDay(rule.day)}, ${rule.time.totalMinutes},
    ${rule.time.zone === "local" ? "AtTimeZone.Local" : "AtTimeZone.UTC"},
    ${rule.offset * 1_000})
`;
};

const emitRules = (rules) => {
  return `
    const rules = [${rules.map(emitRule).join(",")}];
  `;
};

const emit = (tzdb) => {
  return `
  import { Rule, DayOfMonth, NextDayAfter, LastDay, AtTimeZone } from "./rule";
  import { Zone, ZoneOffset } from "./zone";

  const zones = new Map<string, Zone>();
  ${emitZones(tzdb.zones)};

  ${emitRules(tzdb.rules)};

  export {
    zones, rules
  };
`;
};

export { emit };
