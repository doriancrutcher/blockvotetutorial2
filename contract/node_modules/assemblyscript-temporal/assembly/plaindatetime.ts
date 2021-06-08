import { RegExp } from "assemblyscript-regex";

import { Duration, DurationLike } from "./duration";
import { Overflow, TimeComponent } from "./enums";
import { PlainTime } from "./plaintime";
import {
  MICROS_PER_SECOND,
  MILLIS_PER_SECOND,
  NANOS_PER_SECOND,
} from "./constants";
import {
  dayOfWeek,
  dayOfYear,
  weekOfYear,
  daysInMonth,
  daysInYear,
  toPaddedString,
  coalesce,
  compareTemporalDateTime,
  addDateTime,
  parseISOString,
  leapYear,
  epochFromParts,
  differenceDateTime,
} from "./utils";
import { PlainDate } from "./plaindate";
import { PlainYearMonth } from "./plainyearmonth";
import { PlainMonthDay } from "./plainmonthday";
import { TimeZone } from "./timezone";
import { Instant } from "./instant";
import { ZonedDateTime } from "./zoneddatetime";

// @ts-ignore
@lazy
const NULL = -1;

export class DateTimeLike {
  year: i32 = -1;
  month: i32 = -1;
  day: i32 = -1;
  hour: i32 = -1;
  minute: i32 = -1;
  second: i32 = -1;
  millisecond: i32 = -1;
  microsecond: i32 = -1;
  nanosecond: i32 = -1;

  toPlainDateTime(): PlainDateTime {
    if (this.year == NULL || this.month == NULL || this.day == NULL) {
      throw new TypeError("missing required property");
    }
    return new PlainDateTime(
      this.year != NULL ? this.year : 0,
      this.month != NULL ? this.month : 0,
      this.day != NULL ? this.day : 0,
      this.hour != NULL ? this.hour : 0,
      this.minute != NULL ? this.minute : 0,
      this.second != NULL ? this.second : 0,
      this.millisecond != NULL ? this.millisecond : 0,
      this.microsecond != NULL ? this.microsecond : 0,
      this.nanosecond != NULL ? this.nanosecond : 0
    );
  }
}

export class PlainDateTime {
  @inline
  static from<T = DateTimeLike>(date: T): PlainDateTime {
    if (isString<T>()) {
      // @ts-ignore: cast
      return PlainDateTime.fromString(<string>date);
    } else {
      if (isReference<T>()) {
        if (date instanceof PlainDateTime) {
          return PlainDateTime.fromPlainDateTime(date);
        } else if (date instanceof DateTimeLike) {
          return PlainDateTime.fromDateTimeLike(date);
        }
      }
      throw new TypeError("invalid date type");
    }
  }

  @inline
  private static fromPlainDateTime(date: PlainDateTime): PlainDateTime {
    return new PlainDateTime(
      date.year,
      date.month,
      date.day,
      date.hour,
      date.minute,
      date.second,
      date.millisecond,
      date.microsecond,
      date.nanosecond
    );
  }

  @inline
  private static fromDateTimeLike(date: DateTimeLike): PlainDateTime {
    return date.toPlainDateTime();
  }

  private static fromString(date: string): PlainDateTime {
    const parsed = parseISOString(date);
    return new PlainDateTime(
      parsed.year,
      parsed.month,
      parsed.day,
      parsed.hour,
      parsed.minute,
      parsed.second,
      parsed.millisecond,
      parsed.microsecond,
      parsed.nanosecond
    );
  }

  constructor(
    readonly year: i32,
    readonly month: i32,
    readonly day: i32,
    readonly hour: i32 = 0,
    readonly minute: i32 = 0,
    readonly second: i32 = 0,
    readonly millisecond: i32 = 0,
    readonly microsecond: i32 = 0,
    readonly nanosecond: i32 = 0
  ) {}

  @inline
  get dayOfWeek(): i32 {
    return dayOfWeek(this.year, this.month, this.day);
  }

  @inline
  get dayOfYear(): i32 {
    return dayOfYear(this.year, this.month, this.day);
  }

  @inline
  get weekOfYear(): i32 {
    return weekOfYear(this.year, this.month, this.day);
  }

  @inline
  get daysInWeek(): i32 {
    return 7;
  }

  @inline
  get daysInMonth(): i32 {
    return daysInMonth(this.year, this.month);
  }

  @inline
  get daysInYear(): i32 {
    return daysInYear(this.year);
  }

  @inline
  get monthsInYear(): i32 {
    return 12;
  }

  @inline
  get inLeapYear(): bool {
    return leapYear(this.year);
  }

  @inline
  get epochNanoseconds(): i64 {
    return epochFromParts(
      this.year,
      this.month,
      this.day,
      this.hour,
      this.minute,
      this.second,
      this.millisecond,
      this.microsecond,
      this.nanosecond
    );
  }

  with(dateTimeLike: DateTimeLike): PlainDateTime {
    return new PlainDateTime(
      coalesce(dateTimeLike.year, this.year),
      coalesce(dateTimeLike.month, this.month),
      coalesce(dateTimeLike.day, this.day),
      coalesce(dateTimeLike.hour, this.hour),
      coalesce(dateTimeLike.minute, this.minute),
      coalesce(dateTimeLike.second, this.second),
      coalesce(dateTimeLike.millisecond, this.millisecond),
      coalesce(dateTimeLike.microsecond, this.microsecond),
      coalesce(dateTimeLike.nanosecond, this.nanosecond)
    );
  }

  until<T = DateTimeLike>(
    otherLike: T,
    largestUnit: TimeComponent = TimeComponent.Days
  ): Duration {
    const other = PlainDateTime.from(otherLike);

    return differenceDateTime(
      this.year,
      this.month,
      this.day,
      this.hour,
      this.minute,
      this.second,
      this.millisecond,
      this.microsecond,
      this.nanosecond,
      other.year,
      other.month,
      other.day,
      other.hour,
      other.minute,
      other.second,
      other.millisecond,
      other.microsecond,
      other.nanosecond,
      largestUnit
    );
  }

  since<T = DateTimeLike>(
    otherLike: T,
    largestUnit: TimeComponent = TimeComponent.Days
  ): Duration {
    const other = PlainDateTime.from(otherLike);

    return differenceDateTime(
      other.year,
      other.month,
      other.day,
      other.hour,
      other.minute,
      other.second,
      other.millisecond,
      other.microsecond,
      other.nanosecond,
      this.year,
      this.month,
      this.day,
      this.hour,
      this.minute,
      this.second,
      this.millisecond,
      this.microsecond,
      this.nanosecond,
      largestUnit
    );
  }

  toString(): string {
    // 1976-11-18T00:00:00
    return (
      this.year.toString() +
      "-" +
      toPaddedString(this.month) +
      "-" +
      toPaddedString(this.day) +
      "T" +
      toPaddedString(this.hour) +
      ":" +
      toPaddedString(this.minute) +
      ":" +
      toPaddedString(this.second) +
      (this.nanosecond != 0 || this.microsecond != 0 || this.millisecond != 0
        ? (
            f64(this.nanosecond) / NANOS_PER_SECOND +
            f64(this.microsecond) / MICROS_PER_SECOND +
            f64(this.millisecond) / MILLIS_PER_SECOND
          )
            .toString()
            .substring(1)
        : "")
    );
  }

  toPlainTime(): PlainTime {
    return new PlainTime(
      this.hour,
      this.minute,
      this.second,
      this.millisecond,
      this.microsecond,
      this.nanosecond
    );
  }

  toPlainDate(): PlainDate {
    return new PlainDate(this.year, this.month, this.day);
  }

  toZonedDateTime(tz: TimeZone): ZonedDateTime {
    const offset = tz.getOffsetNanosecondsFor(
      new Instant(this.epochNanoseconds)
    );
    return new ZonedDateTime(this.epochNanoseconds - offset, tz);
  }

  toPlainYearMonth(): PlainYearMonth {
    return new PlainYearMonth(this.year, this.month);
  }

  toPlainMonthDay(): PlainMonthDay {
    return new PlainMonthDay(this.month, this.day);
  }

  static compare(a: PlainDateTime, b: PlainDateTime): i32 {
    if (a === b) return 0;
    return compareTemporalDateTime(
      a.year,
      a.month,
      a.day,
      a.hour,
      a.minute,
      a.second,
      a.millisecond,
      a.microsecond,
      a.nanosecond,
      b.year,
      b.month,
      b.day,
      b.hour,
      b.minute,
      b.second,
      b.millisecond,
      b.microsecond,
      b.nanosecond
    );
  }

  @inline
  equals(other: PlainDateTime): bool {
    if (this === other) return true;
    return (
      this.nanosecond == other.nanosecond &&
      this.microsecond == other.microsecond &&
      this.millisecond == other.millisecond &&
      this.second == other.second &&
      this.minute == other.minute &&
      this.hour == other.hour &&
      this.day == other.day &&
      this.month == other.month &&
      this.year == other.year
    );
  }

  add<T = DurationLike>(
    durationToAdd: T,
    overflow: Overflow = Overflow.Constrain
  ): PlainDateTime {
    const duration = Duration.from(durationToAdd);

    const newDate = addDateTime(
      this.year,
      this.month,
      this.day,
      this.hour,
      this.minute,
      this.second,
      this.millisecond,
      this.microsecond,
      this.nanosecond,
      duration.years,
      duration.months,
      duration.weeks,
      duration.days,
      duration.hours,
      duration.minutes,
      duration.seconds,
      duration.milliseconds,
      duration.microseconds,
      duration.nanoseconds,
      overflow
    );
    return new PlainDateTime(
      newDate.year,
      newDate.month,
      newDate.day,
      newDate.hour,
      newDate.minute,
      newDate.second,
      newDate.millisecond,
      newDate.microsecond,
      newDate.nanosecond
    );
  }

  subtract<T = DurationLike>(
    durationToSubtract: T,
    overflow: Overflow = Overflow.Constrain
  ): PlainDateTime {
    const duration = Duration.from(durationToSubtract);

    const newDate = addDateTime(
      this.year,
      this.month,
      this.day,
      this.hour,
      this.minute,
      this.second,
      this.millisecond,
      this.microsecond,
      this.nanosecond,
      -duration.years,
      -duration.months,
      -duration.weeks,
      -duration.days,
      -duration.hours,
      -duration.minutes,
      -duration.seconds,
      -duration.milliseconds,
      -duration.microseconds,
      -duration.nanoseconds,
      overflow
    );
    return new PlainDateTime(
      newDate.year,
      newDate.month,
      newDate.day,
      newDate.hour,
      newDate.minute,
      newDate.second,
      newDate.millisecond,
      newDate.microsecond,
      newDate.nanosecond
    );
  }
}
