import { RegExp } from "assemblyscript-regex";

import { Duration, DurationLike } from "./duration";
import { Overflow, TimeComponent } from "./enums";
import { Instant } from "./instant";
import { PlainDateTime } from "./plaindatetime";
import { PlainMonthDay } from "./plainmonthday";
import { PlainTime } from "./plaintime";
import { PlainYearMonth } from "./plainyearmonth";
import { TimeZone } from "./timezone";
import {
  addDate,
  dayOfWeek,
  leapYear,
  dayOfYear,
  weekOfYear,
  daysInMonth,
  daysInYear,
  balanceDuration,
  toPaddedString,
  rejectDate,
  checkDateTimeRange,
  compareTemporalDate,
  differenceDate,
  coalesce,
  parseISOString,
} from "./utils";
import { ZonedDateTime } from "./zoneddatetime";

export class DateLike {
  year: i32 = -1;
  month: i32 = -1;
  day: i32 = -1;
}

export class PlainDate {
  @inline
  static from<T = DateLike>(date: T): PlainDate {
    if (isString<T>()) {
      // @ts-ignore: cast
      return PlainDate.fromString(<string>date);
    } else {
      if (isReference<T>()) {
        if (date instanceof PlainDate) {
          return PlainDate.fromPlainDate(date);
        } else if (date instanceof DateLike) {
          return PlainDate.fromDateLike(date);
        }
      }
      throw new TypeError("invalid date type");
    }
  }

  @inline
  private static fromPlainDate(date: PlainDate): PlainDate {
    return new PlainDate(date.year, date.month, date.day);
  }

  @inline
  private static fromDateLike(date: DateLike): PlainDate {
    if (date.year == -1 || date.month == -1 || date.day == -1) {
      throw new TypeError("missing required property");
    }
    return new PlainDate(date.year, date.month, date.day);
  }

  private static fromString(date: string): PlainDate {
    const parsed = parseISOString(date);
    return new PlainDate(parsed.year, parsed.month, parsed.day);
  }

  constructor(readonly year: i32, readonly month: i32, readonly day: i32) {
    rejectDate(year, month, day);

    if (!checkDateTimeRange(year, month, day, 12)) {
      throw new RangeError("DateTime outside of supported range");
    }
  }

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
  get monthCode(): string {
    return (this.month >= 10 ? "M" : "M0") + this.month.toString();
  }

  toString(): string {
    return (
      this.year.toString() +
      "-" +
      toPaddedString(this.month) +
      "-" +
      toPaddedString(this.day)
    );
  }

  @inline
  equals(other: PlainDate): bool {
    if (this === other) return true;
    return (
      this.day == other.day &&
      this.month == other.month &&
      this.year == other.year
    );
  }

  until<T = DateLike>(
    dateLike: T,
    largestUnit: TimeComponent = TimeComponent.Days
  ): Duration {
    const date = PlainDate.from(dateLike);
    return differenceDate(
      this.year,
      this.month,
      this.day,
      date.year,
      date.month,
      date.day,
      largestUnit
    );
  }

  since<T = DateLike>(
    dateLike: T,
    largestUnit: TimeComponent = TimeComponent.Days
  ): Duration {
    const date = PlainDate.from(dateLike);
    return differenceDate(
      date.year,
      date.month,
      date.day,
      this.year,
      this.month,
      this.day,
      largestUnit
    );
  }

  with(dateLike: DateLike): PlainDate {
    return new PlainDate(
      coalesce(dateLike.year, this.year),
      coalesce(dateLike.month, this.month),
      coalesce(dateLike.day, this.day)
    );
  }

  add<T = DurationLike>(
    durationToAdd: T,
    overflow: Overflow = Overflow.Constrain
  ): PlainDate {
    const duration = Duration.from(durationToAdd);

    const balancedDuration = balanceDuration(
      duration.days,
      duration.hours,
      duration.minutes,
      duration.seconds,
      duration.milliseconds,
      duration.microseconds,
      duration.nanoseconds,
      TimeComponent.Days
    );
    const newDate = addDate(
      this.year,
      this.month,
      this.day,
      duration.years,
      duration.months,
      duration.weeks,
      balancedDuration.days,
      overflow
    );
    return new PlainDate(newDate.year, newDate.month, newDate.day);
  }

  subtract<T = DurationLike>(
    durationToSubtract: T,
    overflow: Overflow = Overflow.Constrain
  ): PlainDate {
    const duration = Duration.from(durationToSubtract);

    const balancedDuration = balanceDuration(
      duration.days,
      duration.hours,
      duration.minutes,
      duration.seconds,
      duration.milliseconds,
      duration.microseconds,
      duration.nanoseconds,
      TimeComponent.Days
    );

    const newDate = addDate(
      this.year,
      this.month,
      this.day,
      -duration.years,
      -duration.months,
      -duration.weeks,
      -balancedDuration.days,
      overflow
    );

    return new PlainDate(newDate.year, newDate.month, newDate.day);
  }

  toPlainDateTime(time: PlainTime | null = null): PlainDateTime {
    if (time) {
      return new PlainDateTime(
        this.year,
        this.month,
        this.day,
        time.hour,
        time.minute,
        time.second,
        time.millisecond,
        time.microsecond,
        time.nanosecond
      );
    } else {
      return new PlainDateTime(this.year, this.month, this.day);
    }
  }

  toPlainYearMonth(): PlainYearMonth {
    return new PlainYearMonth(this.year, this.month);
  }

  toPlainMonthDay(): PlainMonthDay {
    return new PlainMonthDay(this.month, this.day);
  }

  toZonedDateTime(tz: TimeZone, time: PlainTime | null = null): ZonedDateTime {
    const dt = this.toPlainDateTime(time);
    const offset = tz.getOffsetNanosecondsFor(new Instant(dt.epochNanoseconds));
    return new ZonedDateTime(dt.epochNanoseconds - offset, tz);
  }

  static compare(a: PlainDate, b: PlainDate): i32 {
    if (a === b) return 0;
    return compareTemporalDate(a.year, a.month, a.day, b.year, b.month, b.day);
  }
}
