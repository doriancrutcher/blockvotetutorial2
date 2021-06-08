import { daysInMonth, dayOfWeek } from "../utils";
import { JsDate } from "../date";

@inline
export enum AtTimeZone {
  // the 'at' time is measured in local time, i.e. incorporates daylight saving
  Local,
  // the 'at' time is measured in UTC
  UTC
}

export class Rule {
  constructor(
    public name: string,
    // the year that this rule starts from
    public fromYear: i32,
    // the year this rule ends (-1 means it never ends)
    public toYear: i32,
    // the month that this TZ offset starts 
    public inMonth: i32,
    // the day this TZ offset starts
    public onDay: DayOfMonthCalculator,
    // the time (in minutes since midnight) that this TZ offset starts
    public atTimeMinutes: i32,
    // the clock which this time is measured against
    public atTimeZone: AtTimeZone,
    // the offset in milliseconds
    public offsetMillis: i32
  ) {}

  matches(epochMillis: i64): bool {
    const date = new JsDate(epochMillis);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    
    if (this.fromYear > year || (this.toYear !== -1 && this.toYear < year)) {
      return false;
    }

    if (month < this.inMonth) {
      return false;
    }

    if (month > this.inMonth) {
      return true;
    }

    const dayOfMonth = this.onDay.dayOfMonth(year, month);

    if (day < dayOfMonth) {
      return false;
    }

    if (day > dayOfMonth) {
      return true;
    }

    const totalMinutes = date.getUTCHours() * 60 + date.getUTCMinutes();

    if (this.atTimeMinutes > totalMinutes) {
      return false;
    }

    return true;
  }
}

export abstract class DayOfMonthCalculator {
  abstract dayOfMonth(year: i32, month: i32): i32;
}

// matches the a specific day of the month
// e.g. 12
export class DayOfMonth extends DayOfMonthCalculator {
  constructor(public day: i32) {
    super();
  }

  dayOfMonth(year: i32, month: i32): i32 {
    return this.day;
  }
}

// matches the last day (of a given day of the week) of the month
// e.g. lastSun
export class LastDay extends DayOfMonthCalculator {
  constructor(public dayOfWeek: i32) {
    super();
  }
  dayOfMonth(year: i32, month: i32): i32 {
    const lastDay = daysInMonth(year, month);
    const lastDayOfWeek = dayOfWeek(year, month, lastDay);
    let diff = lastDayOfWeek - this.dayOfWeek;
    if (diff < 0) diff+=7;
    return lastDay - diff;
  }
}

// matches the next day (of a given day of the week) after a specific day
// e.g. Sun>=6
export class NextDayAfter extends DayOfMonthCalculator {
  constructor(public dayOfWeek: i32, public fromDay: i32) {
    super();
  }

  dayOfMonth(year: i32, month: i32): i32 {
    const fromDayOfWeek = dayOfWeek(year, month, this.fromDay);
    let diff = this.dayOfWeek - fromDayOfWeek;
    if (diff < 0) diff+=7;
    return this.fromDay + diff;
  }
}
