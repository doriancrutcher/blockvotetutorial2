import { Instant } from "./instant";
import { PlainDateTime } from "./plaindatetime";
import {
  getPartsFromEpoch,
  balanceDateTime,
  formatTimeZoneOffsetString,
} from "./utils";
import { offsetForTimezoneNanos, offsetForTimezone } from "./tz/index";
import { Disambiguation } from "./enums";
import { DurationLike } from "./duration";
import { MILLIS_PER_DAY, NANOS_PER_DAY } from "./constants";

export class TimeZone {
  static from(id: string): TimeZone {
    return new TimeZone(id);
  }

  constructor(public id: string) {}

  getOffsetNanosecondsFor(instant: Instant): i64 {
    return this.id == "UTC"
      ? 0
      : offsetForTimezoneNanos(this.id, instant.epochNanoseconds);
  }

  getPlainDateTimeFor(instant: Instant): PlainDateTime {
    const offsetNs = this.getOffsetNanosecondsFor(instant);
    const parts = getPartsFromEpoch(instant.epochNanoseconds);

    const balancedDateTime = balanceDateTime(
      parts.year,
      parts.month,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second,
      parts.millisecond,
      parts.microsecond,
      i64(parts.nanosecond) + offsetNs
    );

    return new PlainDateTime(
      balancedDateTime.year,
      balancedDateTime.month,
      balancedDateTime.day,
      balancedDateTime.hour,
      balancedDateTime.minute,
      balancedDateTime.second,
      balancedDateTime.millisecond,
      balancedDateTime.microsecond,
      balancedDateTime.nanosecond
    );
  }

  getOffsetStringFor(instant: Instant): string {
    const offsetNs = this.getOffsetNanosecondsFor(instant);
    return formatTimeZoneOffsetString(offsetNs);
  }

  getPossibleInstantsFor(dateTime: PlainDateTime): Instant[] {
    // see: ES.GetIANATimeZoneEpochValue
    const epochNanos = dateTime.epochNanoseconds;
    const earliest = offsetForTimezoneNanos(
      this.id,
      epochNanos - NANOS_PER_DAY
    );
    const latest = offsetForTimezoneNanos(this.id, epochNanos + NANOS_PER_DAY);

    const earliestDateTime = this.getPlainDateTimeFor(
      new Instant(epochNanos - earliest)
    );
    const latestDateTime = this.getPlainDateTimeFor(
      new Instant(epochNanos - latest)
    );

    if (earliest == latest) {
      if (earliestDateTime.equals(dateTime)) {
        return [new Instant(epochNanos - earliest)];
      } else {
        return [];
      }
    }

    let instants = new Array<Instant>();
    if (earliestDateTime.equals(dateTime)) {
      instants.push(new Instant(epochNanos - earliest));
    }
    if (latestDateTime.equals(dateTime)) {
      instants.push(new Instant(epochNanos - latest));
    }
    return instants;
  }

  getInstantFor(
    dateTime: PlainDateTime,
    disambiguation: Disambiguation = Disambiguation.Compatible
  ): Instant {
    const possibleInstants = this.getPossibleInstantsFor(dateTime);
    if (possibleInstants.length == 1) {
      return possibleInstants[0];
    }

    if (possibleInstants.length == 2) {
      switch (disambiguation) {
        case Disambiguation.Compatible:
        // fall through because 'compatible' means 'earlier' for "fall back" transitions
        case Disambiguation.Earlier:
          return possibleInstants[0];
        case Disambiguation.Later:
          return possibleInstants[possibleInstants.length - 1];
        case Disambiguation.Reject:
          throw new RangeError("multiple instants found");
      }
    }

    const instant = new Instant(dateTime.epochNanoseconds);
    const offsetBefore = offsetForTimezone(
      this.id,
      instant.epochMilliseconds - MILLIS_PER_DAY
    );
    const offsetAfter = offsetForTimezone(
      this.id,
      instant.epochMilliseconds + MILLIS_PER_DAY
    );
    const milliseconds = offsetAfter - offsetBefore;
    switch (disambiguation) {
      case Disambiguation.Earlier: {
        const earlier = dateTime.subtract({ milliseconds: milliseconds });
        return this.getPossibleInstantsFor(earlier)[0];
      }
      case Disambiguation.Compatible:
      // fall through because 'compatible' means 'later' for "spring forward" transitions
      case Disambiguation.Later: {
        const later = dateTime.add({ milliseconds: milliseconds });
        const possible = this.getPossibleInstantsFor(later);
        return possible[possible.length - 1];
      }
      case Disambiguation.Reject: {
        throw new RangeError("no such instant found");
      }
    }

    throw new RangeError("no such instant found");
  }
}
