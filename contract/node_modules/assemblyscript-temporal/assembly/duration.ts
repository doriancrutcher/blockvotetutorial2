import { RegExp } from "assemblyscript-regex";

import { addDuration, coalesce, durationSign, sign, largerTimeComponent } from "./utils";
import { MICROS_PER_SECOND, MILLIS_PER_SECOND, NANOS_PER_SECOND } from "./constants";
import { PlainDateTime } from "./plaindatetime";
import { TimeComponent } from "./enums";

// @ts-ignore
@lazy 
const NULL = i32.MAX_VALUE;

export class DurationLike {
  years: i32 = NULL;
  months: i32 = NULL;
  weeks: i32 = NULL;
  days: i32 = NULL;
  hours: i32 = NULL;
  minutes: i32 = NULL;
  seconds: i32 = NULL;
  milliseconds: i32 = NULL;
  microseconds: i32 = NULL;
  nanoseconds: i32 = NULL;

  toDuration(): Duration {
    return new Duration(
      this.years != NULL ? this.years : 0,
      this.months != NULL ? this.months : 0,
      this.weeks != NULL ? this.weeks : 0,
      this.days != NULL ? this.days : 0,
      this.hours != NULL ? this.hours : 0,
      this.minutes != NULL ? this.minutes : 0,
      this.seconds != NULL ? this.seconds : 0,
      this.milliseconds != NULL ? this.milliseconds : 0,
      this.microseconds != NULL ? this.microseconds : 0,
      this.nanoseconds != NULL ? this.nanoseconds : 0,
    );
  }
}

export class Duration {
  static from<T = DurationLike>(duration: T): Duration {
    if (isString<T>()) {
      // @ts-ignore: cast
      return Duration.fromString(<string>duration);
    } else if (duration instanceof DurationLike) {
      return Duration.fromDurationLike(duration);
    } else if (duration instanceof Duration) {
      return Duration.fromDuration(duration);
    }
    throw new TypeError("invalid duration type");
  }

  private static fromDuration(duration: Duration): Duration {
    return new Duration(
      duration.years,
      duration.months,
      duration.weeks,
      duration.days,
      duration.hours,
      duration.minutes,
      duration.seconds,
      duration.milliseconds,
      duration.microseconds,
      duration.nanoseconds
    );
  }

  private static fromString(duration: string): Duration {
    const regex = new RegExp(
      "([+−-])?P(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)W)?(?:(\\d+)D)?(?:T?(?:(\\d+)?H)?(?:(\\d+)?M)?(?:(\\d+)(?:[.,](\\d{1,9}))?S)?)?$",
      "i"
    );
    const match = regex.exec(duration);
    if (match == null) {
      throw new RangeError("invalid duration: " + duration);
    }
    if (match.matches.slice(2).join("") == "") {
      throw new RangeError("invalid duration");
    }
    const sign = match.matches[1] == '-' || match.matches[1] == '\u2212' ? -1 : 1;
    const years = match.matches[2] != "" ? I32.parseInt(match.matches[2]) * sign : 0;
    const months = match.matches[3] != "" ? I32.parseInt(match.matches[3]) * sign : 0;
    const weeks = match.matches[4] != "" ? I32.parseInt(match.matches[4]) * sign : 0;
    const days = match.matches[5] != "" ? I32.parseInt(match.matches[5]) * sign : 0;
    const hours = match.matches[6] != "" ? I32.parseInt(match.matches[6]) * sign : 0;
    const minutes = match.matches[7] != "" ? I32.parseInt(match.matches[7]) * sign : 0;
    const seconds = match.matches[8] != "" ? I32.parseInt(match.matches[8]) * sign : 0;
    const fraction = match.matches[9] + "000000000";
    const millisecond = I32.parseInt(fraction.substring(0, 3)) * sign;
    const microsecond = I32.parseInt(fraction.substring(3, 6)) * sign;
    const nanosecond = I32.parseInt(fraction.substring(6, 9)) * sign;
    
    return new Duration(years, months, weeks, days, hours, minutes, seconds, millisecond, microsecond, nanosecond);
  }

  private static fromDurationLike(d: DurationLike): Duration {
    return d.toDuration();
  }

  constructor(
    public years: i32 = 0,
    public months: i32 = 0,
    public weeks: i32 = 0,
    public days: i32 = 0,
    public hours: i32 = 0,
    public minutes: i32 = 0,
    public seconds: i32 = 0,
    public milliseconds: i32 = 0,
    public microseconds: i32 = 0,
    public nanoseconds: i32 = 0
  ) {
    // durationSign returns the sign of the first non-zero component
    const s = this.sign;
    if ((years && sign(years) != s) ||
      (months && sign(months) != s) ||
      (weeks && sign(weeks) != s) ||
      (days && sign(days) != s) ||
      (hours && sign(hours) != s) ||
      (minutes && sign(minutes) != s) ||
      (seconds && sign(seconds) != s) ||
      (milliseconds && sign(milliseconds) != s) ||
      (microseconds && sign(microseconds) != s) ||
      (nanoseconds && sign(nanoseconds) != s)  
    ) {
      throw new RangeError("mixed-sign values not allowed as duration fields");
    }
  }

  with(durationLike: DurationLike): Duration {
    return new Duration(
      coalesce(durationLike.years, this.years, NULL),
      coalesce(durationLike.months, this.months, NULL),
      coalesce(durationLike.weeks, this.weeks, NULL),
      coalesce(durationLike.days, this.days, NULL),
      coalesce(durationLike.hours, this.hours, NULL),
      coalesce(durationLike.minutes, this.minutes, NULL),
      coalesce(durationLike.seconds, this.seconds, NULL),
      coalesce(durationLike.milliseconds, this.milliseconds, NULL),
      coalesce(durationLike.microseconds, this.microseconds, NULL),
      coalesce(durationLike.nanoseconds, this.nanoseconds, NULL)
    );
  }

  get sign(): i32 {
    return durationSign(
      this.years,
      this.months,
      this.weeks,
      this.days,
      this.hours,
      this.minutes,
      this.seconds,
      this.milliseconds,
      this.microseconds,
      this.nanoseconds
    );
  }

  get blank(): bool {
    return this.sign == 0;
  }

  // P1Y1M1DT1H1M1.1S
  toString(): string {
    const date =
      toString(abs(this.years), "Y") +
      toString(abs(this.months), "M") +
      toString(abs(this.weeks), "W") +
      toString(abs(this.days), "D");

    const time =
      toString(abs(this.hours), "H") +
      toString(abs(this.minutes), "M") +
      toString(abs(
          // sort in ascending order for better sum precision
          f64(this.nanoseconds)  / NANOS_PER_SECOND +
          f64(this.microseconds) / MICROS_PER_SECOND +
          f64(this.milliseconds) / MILLIS_PER_SECOND +
          f64(this.seconds)
        ),
        "S"
      );

    if (!date.length && !time.length) return "PT0S";
    return (
      (this.sign < 0 ? "-" : "") + "P" + date + (time.length ? "T" + time : "")
    );
  }

  add<T = DurationLike>(durationToAdd: T, relativeTo: PlainDateTime | null = null): Duration {
    const duration = Duration.from(durationToAdd);

    return addDuration(this.years,
      this.months,
      this.weeks,
      this.days,
      this.hours,
      this.minutes,
      this.seconds,
      this.milliseconds,
      this.microseconds,
      this.nanoseconds,
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
      relativeTo
    );
  }

  subtract<T = DurationLike>(durationToAdd: T, relativeTo: PlainDateTime | null = null): Duration {
    const duration = Duration.from(durationToAdd);

    return addDuration(this.years,
      this.months,
      this.weeks,
      this.days,
      this.hours,
      this.minutes,
      this.seconds,
      this.milliseconds,
      this.microseconds,
      this.nanoseconds,
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
      relativeTo
    );
  }

  negated(): Duration {
    return new Duration(
      -this.years,
      -this.months,
      -this.weeks,
      -this.days,
      -this.hours,
      -this.minutes,
      -this.seconds,
      -this.milliseconds,
      -this.microseconds,
      -this.nanoseconds
    );
  }

  abs(): Duration {
    return new Duration(
      abs(this.years),
      abs(this.months),
      abs(this.weeks),
      abs(this.days),
      abs(this.hours),
      abs(this.minutes),
      abs(this.seconds),
      abs(this.milliseconds),
      abs(this.microseconds),
      abs(this.nanoseconds)
    );
  }
}

function toString<T extends number>(value: T, suffix: string): string {
  return value
    ? (isFloat<T>() ? stringify(value) : value.toString()) + suffix
    : "";
}

// @ts-ignore: decorator
@inline
function stringify(value: f64): string {
  return F64.isSafeInteger(value) ? i64(value).toString() : value.toString();
}