// for the proposal-temporal implementation, most of the business logic
// sits within the ecmascript.mjs file:
//
// https://github.com/tc39/proposal-temporal/blob/49629f785eee61e9f6641452e01e995f846da3a1/polyfill/lib/ecmascript.mjs
//
// here we use the same structure to make it easier to audit this implementation
// to ensure correctess

import { RegExp } from "assemblyscript-regex";

import { Duration } from "./duration";
import { Overflow, TimeComponent } from "./enums";
import { MILLIS_PER_SECOND, NANOS_PER_SECOND } from "./constants";
import { JsDate } from "./date";
import { TimeZone } from "./timezone";
import { Instant } from "./instant";
import { PlainDate } from "./plaindate";
import { PlainDateTime } from "./plaindatetime";

// @ts-ignore
@lazy
const YEAR_MIN = -271821;

// @ts-ignore
@lazy
const YEAR_MAX =  275760;

// @ts-ignore
@lazy
let __null = false;

// value objects - used in place of object literals
export class YMD {
  year: i32;
  month: i32;
  day: i32;
}

export class YM {
  year: i32;
  month: i32;
}

export class PT {
  hour: i32;
  minute: i32;
  second: i32;
  millisecond: i32;
  microsecond: i32;
  nanosecond: i32;
}

export class DT {
  year: i32;
  month: i32;
  day: i32;
  hour: i32;
  minute: i32;
  second: i32;
  millisecond: i32;
  microsecond: i32;
  nanosecond: i32;
}

export class DTZ extends DT {
  timezone: string;
}

export class NanoDays {
  days: i32;
  nanoseconds: i64;
  dayLengthNs: i64;
}

export class BalancedTime {
  deltaDays: i32;
  hour: i32;
  minute: i32;
  second: i32;
  millisecond: i32;
  microsecond: i32;
  nanosecond: i32;
}

// @ts-ignore: decorator
@inline
export function sign<T extends number>(x: T): T {
  // optimized variant of x < 0 ? -1 : 1
  // i32: x >> 31 | 1
  // i64: x >> 63 | 1
  // @ts-ignore
  return (x >> (sizeof<T>() * 8 - 1)) | 1;
}

// @ts-ignore: decorator
@inline
export function ord<T extends number>(x: T, y: T): i32 {
  return i32(x > y) - i32(x < y);
}

// @ts-ignore: decorator
@inline
export function floorDiv<T extends number>(a: T, b: T): T {
  return (a >= 0 ? a : a - b + 1) / b as T;
}

// @ts-ignore: decorator
@inline
export function nonNegativeModulo<T extends number>(x: T, y: T): T {
  x = x % y as T;
  return (x < 0 ? x + y : x) as T;
}

// modified of
// https://github.com/tc39/proposal-temporal/blob/49629f785eee61e9f6641452e01e995f846da3a1/polyfill/lib/ecmascript.mjs#L2157
// @ts-ignore: decorator
@inline
export function leapYear(year: i32): bool {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

// modified of
// https://github.com/tc39/proposal-temporal/blob/49629f785eee61e9f6641452e01e995f846da3a1/polyfill/lib/ecmascript.mjs#L2188
export function dayOfYear(year: i32, month: i32, day: i32): i32 {
  const cumsumMonthDays = memory.data<u16>([
    0,
    31, // Jan
    31 + 28, // Feb
    31 + 28 + 31, // Mar
    31 + 28 + 31 + 30, // Apr
    31 + 28 + 31 + 30 + 31, // May
    31 + 28 + 31 + 30 + 31 + 30, // Jun
    31 + 28 + 31 + 30 + 31 + 30 + 31, // Jul
    31 + 28 + 31 + 30 + 31 + 30 + 31 + 31, // Aug
    31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30, // Sep
    31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31, // Oct
    31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30, // Nov
  ]);
  return (
    day +
    i32(load<u16>(cumsumMonthDays + ((month - 1) << 1))) +
    i32(month >= 3 && leapYear(year))
  );
}

// modified of
// https://github.com/tc39/proposal-temporal/blob/49629f785eee61e9f6641452e01e995f846da3a1/polyfill/lib/ecmascript.mjs#L2164
export function daysInMonth(year: i32, month: i32): i32 {
  return month == 2
    ? 28 + i32(leapYear(year))
    : 30 + ((month + i32(month >= 8)) & 1);
}

// @ts-ignore: decorator
@inline
export function daysInYear(year: i32): i32 {
  return 365 + i32(leapYear(year));
}

// Original: Disparate variation
// Modified: TomohikoSakamoto algorithm from https://en.wikipedia.org/wiki/Determination_of_the_day_of_the_week
// https://github.com/tc39/proposal-temporal/blob/49629f785eee61e9f6641452e01e995f846da3a1/polyfill/lib/ecmascript.mjs#L2171
// returns day of week in range [1,7], where 7 = Sunday
export function dayOfWeek(year: i32, month: i32, day: i32): i32 {
  const tab = memory.data<u8>([0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4]);

  year -= i32(month < 3);
  year += year / 4 - year / 100 + year / 400;
  month = <i32>load<u8>(tab + month - 1);
  const w = (year + month + day) % 7;
  // Use ISO 8601 which has [1, 7] range to represent Monday-Sunday
  return w + (w <= 0 ? 7 : 0);
}

// https://github.com/tc39/proposal-temporal/blob/49629f785eee61e9f6641452e01e995f846da3a1/polyfill/lib/ecmascript.mjs#L2164
function balanceYearMonth(year: i32, month: i32): YM {
  month -= 1;
  year  += floorDiv(month, 12);
  month %= 12;
  month += month < 0 ? 13 : 1;
  return { year, month };
}

// https://github.com/tc39/proposal-temporal/blob/49629f785eee61e9f6641452e01e995f846da3a1/polyfill/lib/ecmascript.mjs#L2173
function balanceDate(year: i32, month: i32, day: i32): YMD {
  const yearMonth = balanceYearMonth(year, month);

  year  = yearMonth.year;
  month = yearMonth.month;

  let daysPerYear = 0;
  let testYear = month > 2 ? year : year - 1;

  while (((daysPerYear = daysInYear(testYear)), day < -daysPerYear)) {
    year -= 1;
    testYear -= 1;
    day += daysPerYear;
  }

  testYear += 1;

  while (((daysPerYear = daysInYear(testYear)), day > daysPerYear)) {
    year += 1;
    testYear += 1;
    day -= daysPerYear;
  }

  while (day < 1) {
    const yearMonth = balanceYearMonth(year, month - 1);
    year  = yearMonth.year;
    month = yearMonth.month;
    day  += daysInMonth(year, month);
  }

  let monthDays = 0;
  while (monthDays = daysInMonth(year, month), day > monthDays) {
    const yearMonth = balanceYearMonth(year, month + 1);
    year  = yearMonth.year;
    month = yearMonth.month;
    day  -= monthDays;
  }

  return { year, month, day };
}

export function balanceDateTime(year: i32, month: i32, day: i32, hour: i32,
  minute: i32,
  second: i32,
  millisecond: i32,
  microsecond: i32,
  nanosecond: i64): DT {

  const balancedTime = balanceTime(hour, minute, second, millisecond, microsecond, nanosecond);
  const balancedDate = balanceDate(year, month, day + balancedTime.deltaDays);

  return {
    year: balancedDate.year,
    month: balancedDate.month,
    day: balancedDate.day,
    hour: balancedTime.hour,
    minute: balancedTime.minute,
    second: balancedTime.second,
    millisecond: balancedTime.millisecond,
    microsecond: balancedTime.microsecond,
    nanosecond: balancedTime.nanosecond
  };
}

// https://github.com/tc39/proposal-temporal/blob/49629f785eee61e9f6641452e01e995f846da3a1/polyfill/lib/ecmascript.mjs#L2616
// @ts-ignore: decorator
@inline
export function clamp(value: i32, lo: i32, hi: i32): i32 {
  return min(max(value, lo), hi);
}

// https://github.com/tc39/proposal-temporal/blob/51c6c5138b5b73817f5e0ff2694fe0134f09b0a7/polyfill/lib/ecmascript.mjs#L2704
// @ts-ignore: decorator
@inline
export function checkRange(value: i32, lo: i32, hi: i32): bool {
  return u32(value - lo) <= u32(hi - lo);
}

// https://github.com/tc39/proposal-temporal/blob/49629f785eee61e9f6641452e01e995f846da3a1/polyfill/lib/ecmascript.mjs#L2667
export function checkDateTimeRange(
  year: i32,
  month: i32,
  day: i32,
  hour: i32 = 0,
  minute: i32 = 0,
  second: i32 = 0,
  millisecond: i32 = 0,
  microsecond: i32 = 0,
  nanosecond: i32 = 0
): bool {
  if (!checkRange(year, YEAR_MIN, YEAR_MAX)) {
    return false;
  }
  // reject any DateTime 24 hours or more outside the Instant range
  if ((year == YEAR_MIN && (epochFromParts(
    year, month, day + 1, hour, minute, second,
    millisecond, microsecond, nanosecond - 1
  ), __null))) return false;

  if ((year == YEAR_MAX && (epochFromParts(
    year, month, day - 1, hour, minute, second,
    millisecond, microsecond, nanosecond + 1
  ), __null))) return false;

  return true;
}

export function rejectTime(
  hour: i32,
  minute: i32,
  second: i32,
  millisecond: i32,
  microsecond: i32,
  nanosecond: i32
): void {
  if (!(
    checkRange(hour, 0, 23) &&
    checkRange(minute, 0, 59) &&
    checkRange(second, 0, 59) &&
    checkRange(millisecond, 0, 999) &&
    checkRange(microsecond, 0, 999) &&
    checkRange(nanosecond, 0, 999)
  )) throw new RangeError("time out of range");
}

export function rejectDate(year: i32, month: i32, day: i32): void {
  if (!checkRange(month, 1, 12)) {
    throw new RangeError("month out of range");
  }
  if (!checkRange(day, 1, daysInMonth(year, month))) {
    throw new RangeError("day out of range");
  }
}

// https://github.com/tc39/proposal-temporal/blob/49629f785eee61e9f6641452e01e995f846da3a1/polyfill/lib/ecmascript.mjs#L2617
export function constrainDate(year: i32, month: i32, day: i32): YMD {
  month = clamp(month, 1, 12);
  day   = clamp(day, 1, daysInMonth(year, month));
  return { year, month, day };
}

// https://github.com/tc39/proposal-temporal/blob/49629f785eee61e9f6641452e01e995f846da3a1/polyfill/lib/ecmascript.mjs#L2617
export function regulateDate(
  year: i32,
  month: i32,
  day: i32,
  overflow: Overflow
): YMD {
  switch (overflow) {
    case Overflow.Reject:
      rejectDate(year, month, day);
      break;

    case Overflow.Constrain:
      const date = constrainDate(year, month, day);
      year  = date.year;
      month = date.month;
      day   = date.day;
      break;
  }

  return { year, month, day };
}

// https://github.com/tc39/proposal-temporal/blob/49629f785eee61e9f6641452e01e995f846da3a1/polyfill/lib/ecmascript.mjs#L2984
export function addDate(
  year: i32,
  month: i32,
  day: i32,
  years: i32,
  months: i32,
  weeks: i32,
  days: i32,
  overflow: Overflow
): YMD {
  year  += years;
  month += months;

  const yearMonth = balanceYearMonth(year, month);
  year  = yearMonth.year;
  month = yearMonth.month;

  const regulatedDate = regulateDate(year, month, day, overflow);
  year  = regulatedDate.year;
  month = regulatedDate.month;
  day   = regulatedDate.day;
  day  += days + weeks * 7;

  const balancedDate = balanceDate(year, month, day);
  year  = balancedDate.year;
  month = balancedDate.month;
  day   = balancedDate.day;

  return { year, month, day };
}

// https://github.com/tc39/proposal-temporal/blob/49629f785eee61e9f6641452e01e995f846da3a1/polyfill/lib/ecmascript.mjs#L2135
export function weekOfYear(year: i32, month: i32, day: i32): i32 {
  let doy = dayOfYear(year, month, day);
  let dow = dayOfWeek(year, month, day) || 7;
  let doj = dayOfWeek(year, 1, 1);

  const week = floorDiv(doy - dow + 10, 7);

  if (week < 1) {
    return doj === 5 || (doj === 6 && leapYear(year - 1)) ? 53 : 52;
  }

  if (week === 53) {
    if (daysInYear(year) - doy < 4 - dow) {
      return 1;
    }
  }

  return week;
}

// https://github.com/tc39/proposal-temporal/blob/main/polyfill/lib/ecmascript.mjs#L2217
export function durationSign(
  years: i32,
  months: i32,
  weeks: i32,
  days: i32,
  hours: i32 = 0,
  minutes: i32 = 0,
  seconds: i32 = 0,
  milliseconds: i32 = 0,
  microseconds: i32 = 0,
  nanoseconds: i32 = 0
): i32 {
  if (years) return sign(years);
  if (months) return sign(months);
  if (weeks) return sign(weeks);
  if (days) return sign(days);
  if (hours) return sign(hours);
  if (minutes) return sign(minutes);
  if (seconds) return sign(seconds);
  if (milliseconds) return sign(milliseconds);
  if (microseconds) return sign(microseconds);
  if (nanoseconds) return sign(nanoseconds);
  return 0;
}

function totalDurationNanoseconds(
  days: i64,
  hours: i64,
  minutes: i64,
  seconds: i64,
  milliseconds: i64,
  microseconds: i64,
  nanoseconds: i64
): i64 {
  hours += days * 24;
  minutes += hours * 60;
  seconds += minutes * 60;
  milliseconds += seconds * MILLIS_PER_SECOND;
  microseconds += milliseconds * 1000;
  return nanoseconds + microseconds * 1000;
}

export function balanceDuration(
  days: i32,
  hours: i32,
  minutes: i32,
  seconds: i32,
  milliseconds: i32,
  microseconds: i32,
  nanoseconds: i32,
  largestUnit: TimeComponent
): Duration {
  const durationNs = totalDurationNanoseconds(
    days as i64,
    hours as i64,
    minutes as i64,
    seconds as i64,
    milliseconds as i64,
    microseconds as i64,
    nanoseconds as i64
  );

  let
    nanosecondsI64: i64 = 0,
    microsecondsI64: i64 = 0,
    millisecondsI64: i64 = 0,
    secondsI64: i64 = 0,
    minutesI64: i64 = 0,
    hoursI64: i64 = 0,
    daysI64: i64 = 0;

  if (
    largestUnit >= TimeComponent.Years &&
    largestUnit <= TimeComponent.Days
  ) {
    // inlined nanosecondsToDays
    const oneDayNs: i64 = 24 * 60 * 60 * NANOS_PER_SECOND;
    if (durationNs != 0) {
      daysI64        = durationNs / oneDayNs;
      nanosecondsI64 = durationNs % oneDayNs;
    }
  } else {
    nanosecondsI64 = durationNs;
  }

  const sig = i32(sign(nanosecondsI64));
  nanosecondsI64 = abs(nanosecondsI64);

  switch (largestUnit) {
    case TimeComponent.Years:
    case TimeComponent.Months:
    case TimeComponent.Weeks:
    case TimeComponent.Days:
    case TimeComponent.Hours:
      microsecondsI64 = nanosecondsI64 / 1000;
      nanosecondsI64  = nanosecondsI64 % 1000;

      millisecondsI64 = microsecondsI64 / 1000;
      microsecondsI64 = microsecondsI64 % 1000;

      secondsI64      = millisecondsI64 / 1000;
      millisecondsI64 = millisecondsI64 % 1000;

      minutesI64 = secondsI64 / 60;
      secondsI64 = secondsI64 % 60;

      hoursI64   = minutesI64 / 60;
      minutesI64 = minutesI64 % 60;
      break;

    case TimeComponent.Minutes:
      microsecondsI64 = nanosecondsI64 / 1000;
      nanosecondsI64  = nanosecondsI64 % 1000;

      millisecondsI64 = microsecondsI64 / 1000;
      microsecondsI64 = microsecondsI64 % 1000;

      secondsI64      = millisecondsI64 / 1000;
      millisecondsI64 = millisecondsI64 % 1000;

      minutesI64 = secondsI64 / 60;
      secondsI64 = secondsI64 % 60;
      break;

    case TimeComponent.Seconds:
      microsecondsI64 = nanosecondsI64 / 1000;
      nanosecondsI64  = nanosecondsI64 % 1000;

      millisecondsI64 = microsecondsI64 / 1000;
      microsecondsI64 = microsecondsI64 % 1000;

      secondsI64      = millisecondsI64 / 1000;
      millisecondsI64 = millisecondsI64 % 1000;
      break;

    case TimeComponent.Milliseconds:
      microsecondsI64 = nanosecondsI64 / 1000;
      nanosecondsI64  = nanosecondsI64 % 1000;

      millisecondsI64 = microsecondsI64 / 1000;
      microsecondsI64 = microsecondsI64 % 1000;
      break;

    case TimeComponent.Microseconds:
      microsecondsI64 = nanosecondsI64 / 1000;
      nanosecondsI64  = nanosecondsI64 % 1000;
      break;

    case TimeComponent.Nanoseconds:
      break;
  }

  return new Duration(
    0,
    0,
    0,
    i32(daysI64),
    i32(hoursI64) * sig,
    i32(minutesI64) * sig,
    i32(secondsI64) * sig,
    i32(millisecondsI64) * sig,
    i32(microsecondsI64) * sig,
    i32(nanosecondsI64) * sig
  );
}

export function compareTemporalDate(
  yr1: i32, mo1: i32, d1: i32,
  yr2: i32, mo2: i32, d2: i32
): i32 {
  let res = yr1 - yr2;
  if (res) return sign(res);

  res = mo1 - mo2;
  if (res) return sign(res);

  return ord(d1, d2);
}

export function compareTemporalDateTime(
  yr1: i32, mo1: i32, d1: i32, h1: i32, m1: i32, s1: i32, ms1: i32, µs1: i32, ns1: i32,
  yr2: i32, mo2: i32, d2: i32, h2: i32, m2: i32, s2: i32, ms2: i32, µs2: i32, ns2: i32
): i32 {

  let res = yr1 - yr2;
  if (res) return sign(res);

  res = mo1 - mo2;
  if (res) return sign(res);

  res = d1 - d2;
  if (res) return sign(res);

  res = h1 - h2;
  if (res) return sign(res);

  res = m1 - m2;
  if (res) return sign(res);

  res = s1 - s2;
  if (res) return sign(res);

  res = ms1 - ms2;
  if (res) return sign(res);

  res = µs1 - µs2;
  if (res) return sign(res);

  res = ns1 - ns2;
  if (res) return sign(res);

  return ord(d1, d2);
}

export function differenceDateTime (y1: i32, mon1: i32, d1: i32, h1: i32, min1: i32, s1: i32, ms1: i32, µs1: i32, ns1: i32,
  y2: i32, mon2: i32, d2: i32, h2: i32, min2: i32, s2: i32, ms2: i32, µs2: i32, ns2: i32, largestUnit: TimeComponent = TimeComponent.Days): Duration  {
  
  const diffTime = differenceTime(
    h1,
    min1,
    s1,
    ms1,
    µs1,
    ns1,
    h2,
    min2,
    s2,
    ms2,
    µs2,
    ns2
  );
  const balancedDate = balanceDate(y1, mon1, d1 + diffTime.days);
  const diffDate = differenceDate(balancedDate.year, balancedDate.month,
    balancedDate.day, y2, mon2, d2, largerTimeComponent(largestUnit, TimeComponent.Days));

  // Signs of date part and time part may not agree; balance them together
  const balancedBoth = balanceDuration(
    diffDate.days,
    diffTime.hours,
    diffTime.minutes,
    diffTime.seconds,
    diffTime.milliseconds,
    diffTime.microseconds,
    diffTime.nanoseconds,
    largestUnit
  );
  return new Duration(
    diffDate.years,
    diffDate.months,
    diffDate.weeks,
    balancedBoth.days,
    balancedBoth.hours,
    balancedBoth.minutes,
    balancedBoth.seconds,
    balancedBoth.milliseconds,
    balancedBoth.microseconds,
    balancedBoth.nanoseconds
  );
}

export function differenceDate(
  yr1: i32, mo1: i32, d1: i32,
  yr2: i32, mo2: i32, d2: i32,
  largestUnit: TimeComponent = TimeComponent.Days
): Duration {
  switch (largestUnit) {
    case TimeComponent.Years:
    case TimeComponent.Months: {
      let sign = -compareTemporalDate(yr1, mo1, d1, yr2, mo2, d2);
      if (sign == 0) return new Duration();

      let startYear  = yr1;
      let startMonth = mo1;

      let endYear  = yr2;
      let endMonth = mo2;
      let endDay   = d2;

      let years = endYear - startYear;
      let mid = addDate(yr1, mo1, d1, years, 0, 0, 0, Overflow.Constrain);
      let midSign = -compareTemporalDate(mid.year, mid.month, mid.day, yr2, mo2, d2);

      if (midSign === 0) {
        return largestUnit === TimeComponent.Years
          ? new Duration(years)
          : new Duration(0, years * 12);
      }

      let months = endMonth - startMonth;

      if (midSign !== sign) {
        years  -= sign;
        months += sign * 12;
      }

      mid = addDate(yr1, mo1, d1, years, months, 0, 0, Overflow.Constrain);
      midSign = -compareTemporalDate(mid.year, mid.month, mid.day, yr2, mo2, d2);

      if (midSign === 0) {
        return largestUnit === TimeComponent.Years
          ? new Duration(years, months)
          : new Duration(0, months + years * 12);
      }

      if (midSign !== sign) {
        // The end date is later in the month than mid date (or earlier for
        // negative durations). Back up one month.
        months -= sign;

        if (months === -sign) {
          years -= sign;
          months = sign * 11;
        }

        mid = addDate(yr1, mo1, d1, years, months, 0, 0, Overflow.Constrain);
      }

      let days = endDay - mid.day; // If we get here, months and years are correct (no overflow), and `mid`
      // is within the range from `start` to `end`. To count the days between
      // `mid` and `end`, there are 3 cases:
      // 1) same month: use simple subtraction
      // 2) end is previous month from intermediate (negative duration)
      // 3) end is next month from intermediate (positive duration)

      if (mid.month === endMonth && mid.year === endYear) {
        // 1) same month: use simple subtraction
      } else if (sign < 0) {
        // 2) end is previous month from intermediate (negative duration)
        // Example: intermediate: Feb 1, end: Jan 30, DaysInMonth = 31, days = -2
        days -= daysInMonth(endYear, endMonth);
      } else {
        // 3) end is next month from intermediate (positive duration)
        // Example: intermediate: Jan 29, end: Feb 1, DaysInMonth = 31, days = 3
        days += daysInMonth(mid.year, mid.month);
      }

      if (largestUnit === TimeComponent.Months) {
        months += years * 12;
        years = 0;
      }

      return new Duration(years, months, 0, days);
    }

    case TimeComponent.Weeks:
    case TimeComponent.Days: {
      let neg = compareTemporalDate(yr1, mo1, d1, yr2, mo2, d2) < 0;

      let smallerYear  = neg ? yr1 : yr2;
      let smallerMonth = neg ? mo1 : mo2;
      let smallerDay   = neg ? d1 : d2;

      let largerYear  = neg ? yr2 : yr1;
      let largerMonth = neg ? mo2 : mo1;
      let largerDay   = neg ? d2 : d1;

      let sign = neg ? 1 : -1;

      let years = largerYear - smallerYear;

      let days = (
        dayOfYear(largerYear,  largerMonth,  largerDay) -
        dayOfYear(smallerYear, smallerMonth, smallerDay)
      );

      while (years > 0) {
        days  += daysInYear(smallerYear + years - 1);
        years -= 1;
      }

      let weeks = 0;
      if (largestUnit === TimeComponent.Weeks) {
        weeks = floorDiv(days, 7);
        days -= weeks * 7;
      }

      return new Duration(0, 0, weeks * sign, days * sign);
    }

    default:
      throw new Error('differenceDate - cannot support TimeComponent < Days');
  }
}

// https://github.com/tc39/proposal-temporal/blob/515ee6e339bb4a1d3d6b5a42158f4de49f9ed953/polyfill/lib/ecmascript.mjs#L2874-L2910
export function differenceTime(
  h1: i32, m1: i32, s1: i32, ms1: i32, µs1: i32, ns1: i32,
  h2: i32, m2: i32, s2: i32, ms2: i32, µs2: i32, ns2: i32
): Duration {
  let hours = h2 - h1;
  let minutes = m2 - m1;
  let seconds = s2 - s1;
  let milliseconds = ms2 - ms1;
  let microseconds = µs2 - µs1;
  let nanoseconds = ns2 - ns1;

  const sign = durationSign(
    0,
    0,
    0,
    0,
    hours,
    minutes,
    seconds,
    milliseconds,
    microseconds,
    nanoseconds
  );

  const balancedTime = balanceTime(
    hours * sign,
    minutes * sign,
    seconds * sign,
    milliseconds * sign,
    microseconds * sign,
    nanoseconds * sign
  );

  return new Duration(
    0,
    0,
    0,
    balancedTime.deltaDays * sign,
    balancedTime.hour * sign,
    balancedTime.minute * sign,
    balancedTime.second * sign,
    balancedTime.millisecond * sign,
    balancedTime.microsecond * sign,
    balancedTime.nanosecond * sign
  );
}

export function epochFromParts(
  year: i32,
  month: i32,
  day: i32,
  hour: i32,
  minute: i32,
  second: i32,
  millisecond: i32,
  microsecond: i32,
  nanosecond: i32
): i64 {
  const millis = Date.UTC(year, month - 1, day, hour, minute, second, millisecond);
  return millis * 1_000_000 + microsecond * 1_000 + nanosecond;
}

export function addDateTime(
  year: i32,
  month: i32,
  day: i32,
  hour: i32,
  minute: i32,
  second: i32,
  millisecond: i32,
  microsecond: i32,
  nanosecond: i32,
  years: i32,
  months: i32,
  weeks: i32,
  days: i32,
  hours: i32,
  minutes: i32,
  seconds: i32,
  milliseconds: i32,
  microseconds: i32,
  nanoseconds: i32,
  overflow: Overflow
): DT {
  const addedTime = addTime(
    hour, minute, second, millisecond, microsecond, nanosecond,
    hours, minutes, seconds, milliseconds, microseconds, nanoseconds
  );

  hour = addedTime.hour;
  minute = addedTime.minute;
  second = addedTime.second;
  millisecond = addedTime.millisecond;
  microsecond = addedTime.microsecond;
  nanosecond = addedTime.nanosecond;
  days += addedTime.deltaDays; // Delegate the date part addition to the calendar

  const addedDate = addDate(year, month, day, years, months, weeks, days,overflow);

  return {
    year: addedDate.year,
    month: addedDate.month,
    day: addedDate.day,
    hour,
    minute,
    second,
    millisecond,
    microsecond,
    nanosecond
  };
}

// https://github.com/tc39/proposal-temporal/blob/515ee6e339bb4a1d3d6b5a42158f4de49f9ed953/polyfill/lib/ecmascript.mjs#L2676-L2684
export function constrainTime(
  hour: i32,
  minute: i32,
  second: i32,
  millisecond: i32,
  microsecond: i32,
  nanosecond: i32,
): PT {
  hour = clamp(hour, 0, 23);
  minute = clamp(minute, 0, 59);
  second = clamp(second, 0, 59);
  millisecond = clamp(millisecond, 0, 999);
  microsecond = clamp(microsecond, 0, 999);
  nanosecond = clamp(nanosecond, 0, 999);
  return { hour, minute, second, millisecond, microsecond, nanosecond };
}

// https://github.com/tc39/proposal-temporal/blob/515ee6e339bb4a1d3d6b5a42158f4de49f9ed953/polyfill/lib/ecmascript.mjs#L407-L422
export function regulateTime(
  hour: i32,
  minute: i32,
  second: i32,
  millisecond: i32,
  microsecond: i32,
  nanosecond: i32,
  overflow: Overflow
): PT {
  switch (overflow) {
    case Overflow.Reject:
      rejectTime(hour, minute, second, millisecond, microsecond, nanosecond);
      break;

    case Overflow.Constrain:
      const time = constrainTime(
        hour,
        minute,
        second,
        millisecond,
        microsecond,
        nanosecond
      );
      hour = time.hour;
      minute = time.minute;
      second = time.second;
      millisecond = time.millisecond;
      microsecond = time.microsecond;
      nanosecond = time.nanosecond;
      break;
  }

  return { hour, minute, second, millisecond, microsecond, nanosecond };
}

export function addTime(
  hour: i32,
  minute: i32,
  second: i32,
  millisecond: i32,
  microsecond: i32,
  nanosecond: i32,
  hours: i32,
  minutes: i32,
  seconds: i32,
  milliseconds: i32,
  microseconds: i32,
  nanoseconds: i32
): BalancedTime {

  hour += hours;
  minute += minutes;
  second += seconds;
  millisecond += milliseconds;
  microsecond += microseconds;
  nanosecond += nanoseconds;

  return balanceTime(hour, minute, second, millisecond, microsecond, nanosecond);
}

function balanceTime(
  hour: i64,
  minute: i64,
  second: i64,
  millisecond: i64,
  microsecond: i64,
  nanosecond: i64
): BalancedTime {

  let quotient = floorDiv(nanosecond, 1000);
  microsecond += quotient;
  nanosecond  -= quotient * 1000;

  quotient = floorDiv(microsecond, 1000);
  millisecond += quotient;
  microsecond -= quotient * 1000;

  quotient = floorDiv(millisecond, 1000);
  second      += quotient;
  millisecond -= quotient * 1000;

  quotient = floorDiv(second, 60);
  minute += quotient;
  second -= quotient * 60;

  quotient = floorDiv(minute, 60);
  hour   += quotient;
  minute -= quotient * 60;

  let deltaDays = floorDiv(hour, 24);
  hour -= deltaDays * 24;

  return {
    deltaDays: i32(deltaDays),
    hour: i32(hour),
    minute: i32(minute),
    second: i32(second),
    millisecond: i32(millisecond),
    microsecond: i32(microsecond),
    nanosecond: i32(nanosecond)
  };
}

export function getPartsFromEpoch(epochNanoseconds: i64): DT {
  const quotient = epochNanoseconds / 1_000_000;
  const remainder = epochNanoseconds % 1_000_000;
  let epochMilliseconds = +quotient;
  let nanos = +remainder;
  if (nanos < 0) {
    nanos += 1_000_000;
    epochMilliseconds -= 1;
  }
  const microsecond = i32((nanos / 1_000) % 1_000);
  const nanosecond = i32(nanos % 1_000);

  const item = new JsDate(epochMilliseconds);
  const year = item.getUTCFullYear();
  const month = item.getUTCMonth() + 1;
  const day = item.getUTCDate();
  const hour = item.getUTCHours();
  const minute = item.getUTCMinutes();
  const second = item.getUTCSeconds();
  const millisecond = item.getUTCMilliseconds();

  return { year, month, day, hour, minute, second, millisecond, microsecond, nanosecond };
}

// @ts-ignore: decorator
@inline
export function toPaddedString(number: i32, length: i32 = 2): string {
  return number.toString().padStart(length, "0");
}

// @ts-ignore: decorator
@inline
export function coalesce(a: i32, b: i32, nill: i32 = -1):i32 {
  return a == nill ? b : a;
}

export function isoYearString(year: i32): string {
  if (year < 1000 || year > 9999) {
    let sign = year < 0 ? '-' : '+';
    return sign + `000000${abs(year)}`.slice(-6);
  } else {
    return year.toString();
  }
}

export function formatTimeZoneOffsetString(offsetNanoseconds: i64): string {
  const sign = offsetNanoseconds < 0 ? '-' : '+';
  const balanced = balanceTime(0, 0, 0, 0, 0, abs(offsetNanoseconds));
  return sign + toPaddedString(balanced.hour) + ":" + toPaddedString(balanced.minute);
}

export function parseISOString(date: string): DTZ {
  const dateRegex = new RegExp(
    "^((?:[+\u2212-]\\d{6}|\\d{4}))(?:-(\\d{2})-(\\d{2})|(\\d{2})(\\d{2}))(?:(?:T|\\s+)(\\d{2})(?::(\\d{2})(?::(\\d{2})(?:[.,](\\d{1,9}))?)?|(\\d{2})(?:(\\d{2})(?:[.,](\\d{1,9}))?)?)?)?(?:(?:([zZ])|(?:([+\u2212-])([01][0-9]|2[0-3])(?::?([0-5][0-9])(?::?([0-5][0-9])(?:[.,](\\d{1,9}))?)?)?)?)(?:\\[((?:(?:\\.[-A-Za-z_]|\\.\\.[-A-Za-z._]{1,12}|\\.[-A-Za-z_][-A-Za-z._]{0,12}|[A-Za-z_][-A-Za-z._]{0,13})(?:\\/(?:\\.[-A-Za-z_]|\\.\\.[-A-Za-z._]{1,12}|\\.[-A-Za-z_][-A-Za-z._]{0,12}|[A-Za-z_][-A-Za-z._]{0,13}))*|Etc\\/GMT[-+]\\d{1,2}|(?:[+\u2212-][0-2][0-9](?::?[0-5][0-9](?::?[0-5][0-9](?:[.,]\\d{1,9})?)?)?)))\\])?)?(?:\\[u-ca=((?:[A-Za-z0-9]{3,8}(?:-[A-Za-z0-9]{3,8})*))\\])?$",
    "i"
  );
  const match = dateRegex.exec(date);
  if (match == null) {
    throw new RangeError("invalid ISO 8601 string: " + date);
  }
  // see https://github.com/ColinEberhardt/assemblyscript-regex/issues/38
  const fraction = (
    match.matches[7] != "" ? match.matches[7] : match.matches[18]
  ) + "000000000";

  return {
    year: I32.parseInt(match.matches[1]),
    month: I32.parseInt(
      match.matches[2] != "" ? match.matches[2] : match.matches[19]
    ),
    day: I32.parseInt(
      match.matches[3] != "" ? match.matches[3] : match.matches[20]
    ),
    hour: I32.parseInt(match.matches[4]),
    minute: I32.parseInt(match.matches[5] != "" ? match.matches[5] : match.matches[16]),
    second: I32.parseInt(match.matches[6] != "" ? match.matches[6] : match.matches[17]),
    millisecond: I32.parseInt(fraction.substring(0, 3)),
    microsecond: I32.parseInt(fraction.substring(3, 6)),
    nanosecond: I32.parseInt(fraction.substring(6, 9)),
    timezone: match.matches[9]
  }
}

function addInstant(epochNanoseconds: i64, h: i32, min: i32, s: i32, ms: i32, µs: i32, ns: i32): i64 {
  return epochNanoseconds + ns + µs * 1_000 + ms * 1_000_000 + s * 1_000_000_000 * min * 60_000_000_000 + h * 3_600_000_000_000;
}

function largestDurationUnit(y: i32, mon: i32, w: i32, d: i32, h: i32, min: i32, s: i32, ms: i32, µs: i32, ns: i32): TimeComponent {
  if (y != 0) return TimeComponent.Years;
  if (mon != 0) return TimeComponent.Months;
  if (w != 0) return TimeComponent.Weeks;
  if (d != 0) return TimeComponent.Days;
  if (h != 0) return TimeComponent.Hours;
  if (min != 0) return TimeComponent.Minutes;
  if (s != 0) return TimeComponent.Seconds;
  if (ms != 0) return TimeComponent.Milliseconds;
  if (µs != 0) return TimeComponent.Microseconds;
  return TimeComponent.Nanoseconds;
}

export function largerTimeComponent(t1: TimeComponent, t2: TimeComponent): TimeComponent {
  return min(t1, t2) as TimeComponent
}

export function addDuration(y1: i32, mon1: i32, w1: i32, d1: i32, h1: i32, min1: i32, s1: i32, ms1: i32, µs1: i32, ns1: i32,
  y2: i32, mon2: i32, w2: i32, d2: i32, h2: i32, min2: i32, s2: i32, ms2: i32, µs2: i32, ns2: i32,
  relativeTo: PlainDateTime | null
): Duration  {
  const largestUnit1 = largestDurationUnit(y1, mon1, w1, d1, h1, min1, s1, ms1, µs1, ns1);
  const largestUnit2 = largestDurationUnit(y2, mon2, w2, d2, h2, min2, s2, ms2, µs2, ns2);
  const largestUnit = largerTimeComponent(largestUnit1, largestUnit2);

  if (!relativeTo) {
    if (largestUnit == TimeComponent.Years || largestUnit == TimeComponent.Months || largestUnit == TimeComponent.Weeks) {
      throw new RangeError("relativeTo is required for years, months, or weeks arithmetic");
    }
    const balanced = balanceDuration(
      d1 + d2,
      h1 + h2,
      min1 + min2,
      s1 + s2,
      ms1 + ms2,
      µs1 + µs2,
      ns1 + ns2,
      largestUnit
    );
    return balanced;
  } else {
    const datePart = relativeTo.toPlainDate();

    const dateDuration1 = new Duration(y1, mon1, w1, d1, 0, 0, 0, 0, 0, 0);
    const dateDuration2 = new Duration(y2, mon2, w2, d2, 0, 0, 0, 0, 0, 0);

    const intermediate = datePart.add(dateDuration1);
    const end = intermediate.add(dateDuration2);

    const dateLargestUnit = min(largestUnit, TimeComponent.Days) as TimeComponent;
    const dateDiff = datePart.until(end, dateLargestUnit);

    const dur =  balanceDuration(
      dateDiff.days,
      h1 + h2,
      min1 + min2,
      s1 + s2,
      ms1 + ms2,
      µs1 + µs2,
      ns1 + ns2,
      largestUnit
    );

    return new Duration(dateDiff.years, dateDiff.months, dateDiff.weeks, dur.days, dur.hours, dur.minutes,
      dur.seconds, dur.milliseconds, dur.microseconds, dur.nanoseconds);
  }
}
