// TODO: This functionality will likely be moved into the AssemblyScript Standard Library
// https://github.com/AssemblyScript/assemblyscript/pull/1768

import { checkRange, YMD } from "./utils";
import {
  MILLIS_PER_DAY,
  MILLIS_PER_HOUR,
  MILLIS_PER_MINUTE,
  MILLIS_PER_SECOND
} from "./constants";

export class JsDate {
  epochMilliseconds: i64;

  constructor(epochMilliseconds: i64) {
    this.epochMilliseconds = epochMilliseconds;
  }

  static fromString(dateTimeString: string): JsDate {
    let hour: i32 = 0,
      minute: i32 = 0,
      second: i32 = 0,
      millisecond: i32 = 0;
    let dateString: string;

    if (dateTimeString.includes("T")) {
      const parts = dateTimeString.split("T");
      const timeString = parts[1];
      const timeParts = timeString.split(":");
      hour = I32.parseInt(timeParts[0]);
      minute = I32.parseInt(timeParts[1]);
      if (timeParts[2].includes(".")) {
        const secondParts = timeParts[2].split(".");
        second = I32.parseInt(secondParts[0]);
        millisecond = I32.parseInt(secondParts[1]);
      } else {
        second = I32.parseInt(timeParts[2]);
      }
      dateString = parts[0];
    } else {
      dateString = dateTimeString;
    }
    const parts = dateString.split("-");
    const year = I32.parseInt(
      parts[0].length == 2 ? "19" + parts[0] : parts[0]
    );
    const month = I32.parseInt(parts[1]);
    const day = I32.parseInt(parts[2]);

    return new JsDate(
      i64(days_from_civil(year, month, day)) * MILLIS_PER_DAY +
        hour * MILLIS_PER_HOUR +
        minute * MILLIS_PER_MINUTE +
        second * MILLIS_PER_SECOND +
        millisecond
    );
  }

  // https://tc39.es/ecma262/#sec-date.utc
  static UTC(
    year: i32,
    month: i32 = 0,
    date: i32 = 1,
    hours: i32 = 0,
    minutes: i32 = 0,
    seconds: i32 = 0,
    ms: i32 = 0
  ): i64 {
    if (checkRange(year, 0, 99)) {
      year += 1900;
    }
    return (
      <i64>days_from_civil(year, month + 1, date) * MILLIS_PER_DAY +
      hours * MILLIS_PER_HOUR +
      minutes * MILLIS_PER_MINUTE +
      seconds * MILLIS_PER_SECOND +
      ms
    );
  }

  getTime(): i64 {
    return this.epochMilliseconds;
  }

  getUTCFullYear(): i32 {
    return civil_from_days(i32(this.epochMilliseconds / MILLIS_PER_DAY)).year;
  }

  getUTCMonth(): i32 {
    return (
      civil_from_days(i32(this.epochMilliseconds / MILLIS_PER_DAY)).month - 1
    );
  }

  getUTCDate(): i32 {
    return civil_from_days(i32(this.epochMilliseconds / MILLIS_PER_DAY)).day;
  }

  getUTCHours(): i32 {
    return i32(this.epochMilliseconds % MILLIS_PER_DAY) / MILLIS_PER_HOUR;
  }

  getUTCMinutes(): i32 {
    return i32(this.epochMilliseconds % MILLIS_PER_HOUR) / MILLIS_PER_MINUTE;
  }

  getUTCSeconds(): i32 {
    return i32(this.epochMilliseconds % MILLIS_PER_MINUTE) / MILLIS_PER_SECOND;
  }

  getUTCMilliseconds(): i32 {
    return i32(this.epochMilliseconds % MILLIS_PER_SECOND);
  }

  setUTCMilliseconds(millis: i32): void {
    this.epochMilliseconds += millis - this.getUTCMilliseconds();
  }

  setUTCSeconds(seconds: i32): void {
    this.epochMilliseconds +=
      (seconds - this.getUTCSeconds()) * MILLIS_PER_SECOND;
  }

  setUTCMinutes(minutes: i32): void {
    this.epochMilliseconds +=
      (minutes - this.getUTCMinutes()) * MILLIS_PER_MINUTE;
  }

  setUTCHours(hours: i32): void {
    this.epochMilliseconds += (hours - this.getUTCHours()) * MILLIS_PER_HOUR;
  }

  setUTCDate(date: i32): void {
    const ymd = civil_from_days(i32(this.epochMilliseconds / MILLIS_PER_DAY));
    const mills = this.epochMilliseconds % MILLIS_PER_DAY;
    this.epochMilliseconds =
      i64(days_from_civil(ymd.year, ymd.month, date)) * MILLIS_PER_DAY + mills;
  }

  setUTCMonth(month: i32): void {
    const ymd = civil_from_days(i32(this.epochMilliseconds / MILLIS_PER_DAY));
    const mills = this.epochMilliseconds % MILLIS_PER_DAY;
    this.epochMilliseconds =
      i64(days_from_civil(ymd.year, month + 1, ymd.day)) * MILLIS_PER_DAY +
      mills;
  }

  setUTCFullYear(year: i32): void {
    const ymd = civil_from_days(i32(this.epochMilliseconds / MILLIS_PER_DAY));
    const mills = this.epochMilliseconds % MILLIS_PER_DAY;
    this.epochMilliseconds =
      i64(days_from_civil(year, ymd.month, ymd.day)) * MILLIS_PER_DAY + mills;
  }

  toISOString(): string {
    // 2011-10-05T14:48:00.000Z
    const ymd = civil_from_days(i32(this.epochMilliseconds / MILLIS_PER_DAY));
    return (
      ymd.year.toString() +
      "-" +
      ymd.month.toString().padStart(2, "0") +
      "-" +
      ymd.day.toString().padStart(2, "0") +
      "T" +
      this.getUTCHours().toString().padStart(2, "0") +
      ":" +
      this.getUTCMinutes().toString().padStart(2, "0") +
      ":" +
      this.getUTCSeconds().toString().padStart(2, "0") +
      "." +
      this.getUTCMilliseconds().toString().padStart(3, "0") +
      "Z"
    );
  }
}

// http://howardhinnant.github.io/date_algorithms.html#days_from_civil
function days_from_civil(y: i32, m: i32, d: i32): i32 {
  y -= m <= 2 ? 1 : 0;
  const era = (y >= 0 ? y : y - 399) / 400;
  const yoe = y - era * 400; // [0, 399]
  const doy = (153 * (m + (m > 2 ? -3 : 9)) + 2) / 5 + d - 1; // [0, 365]
  const doe = yoe * 365 + yoe / 4 - yoe / 100 + doy; // [0, 146096]
  return era * 146097 + doe - 719468;
}

// Returns year/month/day triple in civil calendar
// see: http://howardhinnant.github.io/date_algorithms.html#civil_from_days
function civil_from_days(z: i32): YMD {
  z += 719468;
  const era = (z >= 0 ? z : z - 146096) / 146097;
  const doe = z - era * 146097; // [0, 146096]
  const yoe = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365; // [0, 399]
  const y = yoe + era * 400;
  const doy = doe - (365 * yoe + yoe / 4 - yoe / 100); // [0, 365]
  const mp = (5 * doy + 2) / 153; // [0, 11]
  const d = doy - (153 * mp + 2) / 5 + 1; // [1, 31]
  const m = mp + (mp < 10 ? 3 : -9); // [1, 12]
  return {
    year: y + (m <= 2 ? 1 : 0),
    month: m,
    day: d,
  };
}
