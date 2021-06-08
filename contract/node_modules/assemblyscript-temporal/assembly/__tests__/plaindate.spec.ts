import { PlainDate } from "..";
import { Duration, DurationLike } from "../duration";
import { TimeComponent, Overflow } from "../enums";
import { DateLike } from "../plaindate";
import { PlainDateTime } from "../plaindatetime";
import { PlainTime } from "../plaintime";
import { TimeZone } from "../timezone";

let date: PlainDate;

describe("Construction", () => {
  date = new PlainDate(1976, 11, 18);
  it("date.year is 1976", () => {
    expect(date.year).toBe(1976);
  });
  it("date.month is 11", () => {
    expect(date.month).toBe(11);
  });
  it('date.monthCode is "M11"', () => {
    expect(date.monthCode).toBe("M11");
  });
  it("date.day is 18", () => {
    expect(date.day).toBe(18);
  });
  it("date.dayOfWeek is 4", () => {
    expect(date.dayOfWeek).toBe(4);
  });
  it("date.dayOfYear is 323", () => {
    expect(date.dayOfYear).toBe(323);
  });
  it("date.weekOfYear is 47", () => {
    expect(date.weekOfYear).toBe(47);
  });
  it("date.daysInWeek is 7", () => {
    expect(date.daysInWeek).toBe(7);
  });
  it("date.monthsInYear is 12", () => {
    expect(date.monthsInYear).toBe(12);
  });
  it("date.toString() is 1976-11-18", () => {
    expect(date.toString()).toBe("1976-11-18");
  });
  it("date.dayOfWeek further tests", () => {
    expect(new PlainDate(2021, 4, 19).dayOfWeek).toBe(1);
    expect(new PlainDate(2021, 4, 20).dayOfWeek).toBe(2);
    expect(new PlainDate(2021, 4, 21).dayOfWeek).toBe(3);
    expect(new PlainDate(2021, 4, 22).dayOfWeek).toBe(4);
    expect(new PlainDate(2021, 4, 23).dayOfWeek).toBe(5);
    expect(new PlainDate(2021, 4, 24).dayOfWeek).toBe(6);
    expect(new PlainDate(2021, 4, 25).dayOfWeek).toBe(7);
  });
});

describe(".with manipulation", () => {
  it("date.with({ year: 2019 } works", () => {
    const original = new PlainDate(1976, 11, 18);
    // @ts-ignore
    date = original.with({ year: 2019 });
    expect(date.toString()).toBe("2019-11-18");
  });
  it("date.with({ month: 5 } works", () => {
    const original = new PlainDate(1976, 11, 18);
    // @ts-ignore
    expect(original.with({ month: 5 }).toString()).toBe("1976-05-18");
  });
  xit('date.with({ monthCode: "M05" }) works', () => {
    // @ts-ignore
    //expect(original.with({ monthCode: "M05" }).toString()).toBe("1976-05-18");
  });
  xit("month and monthCode must agree", () => {
    // throws(() => original.with({ month: 5, monthCode: 'M06' }), RangeError);
  });
  it("date.with({ day: 17 } works", () => {
    const original = new PlainDate(1976, 11, 18);
    // @ts-ignore
    expect(original.with({ day: 17 }).toString()).toBe("1976-11-17");
  });
  xit("invalid overflow", () => {
    // ['', 'CONSTRAIN', 'balance', 3, null].forEach((overflow) =>
    //   throws(() => original.with({ day: 17 }, { overflow }), RangeError)
    // );
  });
});

describe("Date.toPlainDateTime() works", () => {
  it("combines the date and time", () => {
    expect(
      PlainDate.from("1976-11-18")
        .toPlainDateTime(PlainTime.from("11:30:23"))
        .toString()
    ).toBe("1976-11-18T11:30:23");
  });
  it("defaults to zero hours / mins / seconds", () => {
    expect(PlainDate.from("1976-11-18").toPlainDateTime().toString()).toBe(
      "1976-11-18T00:00:00"
    );
  });
});

describe("Date.toPlainYearMonth() works", () => {
  it("combines the date and time", () => {
    expect(PlainDate.from("1976-11-18").toPlainYearMonth().toString()).toBe(
      "1976-11"
    );
  });
});

describe("Date.toPlainMonthDay() works", () => {
  it("combines the date and time", () => {
    expect(PlainDate.from("1976-11-18").toPlainMonthDay().toString()).toBe(
      "11-18"
    );
  });
});

describe("Date.toZonedDateTime()", function () {
  it("works", () => {
    const date = PlainDate.from("2020-01-01");
    const time = PlainTime.from("12:00");
    const tz = TimeZone.from("America/Los_Angeles");
    const zdt = date.toZonedDateTime(tz, time);
    expect(zdt.toString()).toBe(
      "2020-01-01T12:00:00-08:00[America/Los_Angeles]"
    );
  });
  it("works with time omitted (timeZone argument)", () => {
    const date = PlainDate.from("2020-01-01");
    const tz = TimeZone.from("America/Los_Angeles");
    const zdt = date.toZonedDateTime(tz);
    expect(zdt.toString()).toBe(
      "2020-01-01T00:00:00-08:00[America/Los_Angeles]"
    );
  });
});

let feb20: PlainDate,
  feb21: PlainDate,
  lastFeb20: PlainDate,
  lastFeb21: PlainDate,
  laterDate: PlainDate,
  weeksDifference: Duration,
  monthsDifference: Duration;

describe("date.until() works", () => {
  date = new PlainDate(1969, 7, 24);
  it("date.until({ year: 1969, month: 7, day: 24 })", () => {
    const duration = date.until(
      PlainDate.from({ year: 1969, month: 10, day: 5 })
    );

    expect(duration.years).toBe(0);
    expect(duration.months).toBe(0);
    expect(duration.weeks).toBe(0);
    expect(duration.days).toBe(73);
    expect(duration.hours).toBe(0);
    expect(duration.minutes).toBe(0);
    expect(duration.seconds).toBe(0);
    expect(duration.milliseconds).toBe(0);
    expect(duration.microseconds).toBe(0);
    expect(duration.nanoseconds).toBe(0);
  });
  it("date.until(later) === later.since(date)", () => {
    const later = PlainDate.from({ year: 1996, month: 3, day: 3 });
    expect(date.until(later).toString()).toBe(later.since(date).toString());
  });

  it('date.until({ year: 2019, month: 7, day: 24 }, { largestUnit: "years" })', () => {
    const later = PlainDate.from({ year: 2019, month: 7, day: 24 });
    const duration = date.until(later, TimeComponent.Years);
    expect(duration.years).toBe(50);
    expect(duration.months).toBe(0);
    expect(duration.weeks).toBe(0);
    expect(duration.days).toBe(0);
    expect(duration.hours).toBe(0);
    expect(duration.minutes).toBe(0);
    expect(duration.seconds).toBe(0);
    expect(duration.milliseconds).toBe(0);
    expect(duration.microseconds).toBe(0);
    expect(duration.nanoseconds).toBe(0);
  });
  it("casts argument", () => {
    expect(date.until({ year: 2019, month: 7, day: 24 }).toString()).toBe(
      "P18262D"
    );
    expect(date.until("2019-07-24").toString()).toBe("P18262D");
  });
  it("takes days per month into account", () => {
    const date1 = PlainDate.from("2019-01-01");
    const date2 = PlainDate.from("2019-02-01");
    const date3 = PlainDate.from("2019-03-01");
    expect(date1.until(date2).toString()).toBe("P31D");
    expect(date2.until(date3).toString()).toBe("P28D");

    const date4 = PlainDate.from("2020-02-01");
    const date5 = PlainDate.from("2020-03-01");
    expect(date4.until(date5).toString()).toBe("P29D");
  });
  it("takes days per year into account", () => {
    const date1 = PlainDate.from("2019-01-01");
    const date2 = PlainDate.from("2019-06-01");
    const date3 = PlainDate.from("2020-01-01");
    const date4 = PlainDate.from("2020-06-01");
    const date5 = PlainDate.from("2021-01-01");
    const date6 = PlainDate.from("2021-06-01");
    expect(date1.until(date3).toString()).toBe("P365D");
    expect(date3.until(date5).toString()).toBe("P366D");
    expect(date2.until(date4).toString()).toBe("P366D");
    expect(date4.until(date6).toString()).toBe("P365D");
  });
  feb20 = PlainDate.from("2020-02-01");
  feb21 = PlainDate.from("2021-02-01");
  it("defaults to returning days", () => {
    expect(feb20.until(feb21).toString()).toBe("P366D");
    // expect(feb20.until(feb21, TimeComponent.auto).toString()).toBe('P366D');
    expect(feb20.until(feb21, TimeComponent.Days).toString()).toBe("P366D");
  });
  it("can return higher units", () => {
    expect(feb20.until(feb21, TimeComponent.Years).toString()).toBe("P1Y");
    expect(feb20.until(feb21, TimeComponent.Months).toString()).toBe("P12M");
    expect(feb20.until(feb21, TimeComponent.Weeks).toString()).toBe("P52W2D");
  });
  xit("cannot return lower units", () => {
    // ['hours', 'minutes', 'seconds', 'milliseconds', 'microseconds', 'nanoseconds'].forEach((largestUnit) =>
    //   throws(() => feb20.until(feb21, { largestUnit }), RangeError)
    // );
  });
  it("does not include higher units than necessary", () => {
    lastFeb20 = PlainDate.from("2020-02-29");
    lastFeb21 = PlainDate.from("2021-02-28");
    expect(lastFeb20.until(lastFeb21).toString()).toBe("P365D");
    expect(lastFeb20.until(lastFeb21, TimeComponent.Months).toString()).toBe(
      "P12M"
    );
    expect(lastFeb20.until(lastFeb21, TimeComponent.Years).toString()).toBe(
      "P1Y"
    );
  });
  it("weeks and months are mutually exclusive", () => {
    // @ts-ignore
    laterDate = date.add({ days: 42 });
    weeksDifference = date.until(laterDate, TimeComponent.Weeks);
    expect(weeksDifference.weeks).not.toBe(0);
    expect(weeksDifference.months).toBe(0);
    monthsDifference = date.until(laterDate, TimeComponent.Months);
    expect(monthsDifference.weeks).toBe(0);
    expect(monthsDifference.months).not.toBe(0);
  });
  xit("no two different calendars", () => {
    // const date1 = new PlainDate(2000, 1, 1);
    // const date2 = new PlainDate(2000, 1, 1, Temporal.Calendar.from('japanese'));
    // throws(() => date1.until(date2), RangeError);
  });
  // const earlier = PlainDate.from('2019-01-08');
  // const later = PlainDate.from('2021-09-07');
  // it('throws on disallowed or invalid smallestUnit', () => {
  //   ['era', 'hours', 'minutes', 'seconds', 'milliseconds', 'microseconds', 'nanoseconds', 'nonsense'].forEach(
  //     (smallestUnit) => {
  //       throws(() => earlier.until(later, { smallestUnit }), RangeError);
  //     }
  //   );
  // });
  // it('throws if smallestUnit is larger than largestUnit', () => {
  //   const units = ['years', 'months', 'weeks', 'days'];
  //   for (let largestIdx = 1; largestIdx < units.length; largestIdx++) {
  //     for (let smallestIdx = 0; smallestIdx < largestIdx; smallestIdx++) {
  //       const largestUnit = units[largestIdx];
  //       const smallestUnit = units[smallestIdx];
  //       throws(() => earlier.until(later, { largestUnit, smallestUnit }), RangeError);
  //     }
  //   }
  // });
  // it('assumes a different default for largestUnit if smallestUnit is larger than days', () => {
  //   expect(earlier.until(later, { smallestUnit: 'years', roundingMode: 'nearest' }).toString()).toBe('P3Y');
  //   expect(earlier.until(later, { smallestUnit: 'months', roundingMode: 'nearest' }).toString()).toBe('P32M');
  //   expect(earlier.until(later, { smallestUnit: 'weeks', roundingMode: 'nearest' }).toString()).toBe('P139W');
  // });
  // it('throws on invalid roundingMode', () => {
  //   throws(() => earlier.until(later, { roundingMode: 'cile' }), RangeError);
  // });
  // const incrementOneNearest = [
  //   ['years', 'P3Y'],
  //   ['months', 'P32M'],
  //   ['weeks', 'P139W'],
  //   ['days', 'P973D']
  // ];
  // incrementOneNearest.forEach(([smallestUnit, expected]) => {
  //   const roundingMode = 'nearest';
  //   it(`rounds to nearest ${smallestUnit}`, () => {
  //     expect(earlier.until(later, { smallestUnit, roundingMode }).toString()).toBe(expected);
  //     expect(later.until(earlier, { smallestUnit, roundingMode })}`).toBe(`-${expected.toString());
  //   });
  // });
  // const incrementOneCeil = [
  //   ['years', 'P3Y', '-P2Y'],
  //   ['months', 'P32M', '-P31M'],
  //   ['weeks', 'P139W', '-P139W'],
  //   ['days', 'P973D', '-P973D']
  // ];
  // incrementOneCeil.forEach(([smallestUnit, expectedPositive, expectedNegative]) => {
  //   const roundingMode = 'ceil';
  //   it(`rounds up to ${smallestUnit}`, () => {
  //     expect(earlier.until(later, { smallestUnit, roundingMode }).toString()).toBe(expectedPositive);
  //     expect(later.until(earlier, { smallestUnit, roundingMode }).toString()).toBe(expectedNegative);
  //   });
  // });
  // const incrementOneFloor = [
  //   ['years', 'P2Y', '-P3Y'],
  //   ['months', 'P31M', '-P32M'],
  //   ['weeks', 'P139W', '-P139W'],
  //   ['days', 'P973D', '-P973D']
  // ];
  // incrementOneFloor.forEach(([smallestUnit, expectedPositive, expectedNegative]) => {
  //   const roundingMode = 'floor';
  //   it(`rounds down to ${smallestUnit}`, () => {
  //     expect(earlier.until(later, { smallestUnit, roundingMode }).toString()).toBe(expectedPositive);
  //     expect(later.until(earlier, { smallestUnit, roundingMode }).toString()).toBe(expectedNegative);
  //   });
  // });
  // const incrementOneTrunc = [
  //   ['years', 'P2Y'],
  //   ['months', 'P31M'],
  //   ['weeks', 'P139W'],
  //   ['days', 'P973D']
  // ];
  // incrementOneTrunc.forEach(([smallestUnit, expected]) => {
  //   const roundingMode = 'trunc';
  //   it(`truncates to ${smallestUnit}`, () => {
  //     expect(earlier.until(later, { smallestUnit, roundingMode }).toString()).toBe(expected);
  //     expect(later.until(earlier, { smallestUnit, roundingMode })}`).toBe(`-${expected.toString());
  //   });
  // });
  // it('trunc is the default', () => {
  //   expect(earlier.until(later, { smallestUnit: 'years' }).toString()).toBe('P2Y');
  //   expect(later.until(earlier, { smallestUnit: 'years' }).toString()).toBe('-P2Y');
  // });
  // it('rounds to an increment of years', () => {
  //   expect(earlier.until(later, { smallestUnit: 'years', roundingIncrement: 4, roundingMode: 'nearest' }).toString()).toBe('P4Y');
  // });
  // it('rounds to an increment of months', () => {
  //   equal(
  //     earlier.until(later, { smallestUnit: 'months', roundingIncrement: 10, roundingMode: 'nearest' }).toString(),
  //     'P30M'
  //   );
  // });
  // it('rounds to an increment of weeks', () => {
  //   equal(
  //     earlier.until(later, { smallestUnit: 'weeks', roundingIncrement: 12, roundingMode: 'nearest' }).toString(),
  //     'P144W'
  //   );
  // });
  // it('rounds to an increment of days', () => {
  //   equal(
  //     earlier.until(later, { smallestUnit: 'days', roundingIncrement: 100, roundingMode: 'nearest' }).toString(),
  //     'P1000D'
  //   );
  // });
  // it('accepts singular units', () => {
  //   expect(earlier.until(later, TimeComponent.year)}`, `${earlier.until(later).toBe(TimeComponent.years).toString());
  //   expect(earlier.until(later, { smallestUnit: 'year' })}`, `${earlier.until(later).toBe({ smallestUnit: 'years' }).toString());
  //   expect(earlier.until(later, TimeComponent.month)}`, `${earlier.until(later).toBe(TimeComponent.months).toString());
  //   equal(
  //     earlier.until(later, { smallestUnit: 'month' }).toString(),
  //     earlier.until(later, { smallestUnit: 'months' }).toString()
  //   );
  //   expect(earlier.until(later, TimeComponent.day)}`, `${earlier.until(later).toBe(TimeComponent.days).toString());
  //   expect(earlier.until(later, { smallestUnit: 'day' })}`, `${earlier.until(later).toBe({ smallestUnit: 'days' }).toString());
  // });
  // it('rounds relative to the receiver', () => {
  //   const date1 = Temporal.PlainDate.from('2019-01-01');
  //   const date2 = Temporal.PlainDate.from('2019-02-15');
  //   expect(date1.until(date2, { smallestUnit: 'months', roundingMode: 'nearest' }).toString()).toBe('P2M');
  //   expect(date2.until(date1, { smallestUnit: 'months', roundingMode: 'nearest' }).toString()).toBe('-P1M');
  // });
});

let earlier: PlainDate;

describe("date.since() works", () => {
  date = new PlainDate(1976, 11, 18);
  it("date.since({ year: 1976, month: 10, day: 5 })", () => {
    const duration = date.since(
      PlainDate.from({ year: 1976, month: 10, day: 5 })
    );
    expect(duration.years).toBe(0);
    expect(duration.months).toBe(0);
    expect(duration.weeks).toBe(0);
    expect(duration.days).toBe(44);
    expect(duration.hours).toBe(0);
    expect(duration.minutes).toBe(0);
    expect(duration.seconds).toBe(0);
    expect(duration.milliseconds).toBe(0);
    expect(duration.microseconds).toBe(0);
    expect(duration.nanoseconds).toBe(0);
  });
  it("date.since(earlier) === earlier.until(date)", () => {
    earlier = PlainDate.from({ year: 1966, month: 3, day: 3 });
    expect(date.since(earlier).toString()).toBe(earlier.until(date).toString());
  });
  it('date.since({ year: 2019, month: 11, day: 18 }, { largestUnit: "years" })', () => {
    const later = PlainDate.from({ year: 2019, month: 11, day: 18 });
    const duration = later.since(date, TimeComponent.Years);
    expect(duration.years).toBe(43);
    expect(duration.months).toBe(0);
    expect(duration.weeks).toBe(0);
    expect(duration.days).toBe(0);
    expect(duration.hours).toBe(0);
    expect(duration.minutes).toBe(0);
    expect(duration.seconds).toBe(0);
    expect(duration.milliseconds).toBe(0);
    expect(duration.microseconds).toBe(0);
    expect(duration.nanoseconds).toBe(0);
  });
  it("casts argument", () => {
    expect(date.since({ year: 2019, month: 11, day: 5 }).toString()).toBe(
      "-P15692D"
    );
    expect(date.since("2019-11-05").toString()).toBe("-P15692D");
  });
  xit("takes days per month into account", () => {
    const date1 = PlainDate.from("2019-01-01");
    const date2 = PlainDate.from("2019-02-01");
    const date3 = PlainDate.from("2019-03-01");
    expect(date2.since(date1).toString()).toBe("P31D");
    expect(date3.since(date2).toString()).toBe("P28D");

    const date4 = PlainDate.from("2020-02-01");
    const date5 = PlainDate.from("2020-03-01");
    expect(date5.since(date4).toString()).toBe("P29D");
  });
  it("takes days per year into account", () => {
    const date1 = PlainDate.from("2019-01-01");
    const date2 = PlainDate.from("2019-06-01");
    const date3 = PlainDate.from("2020-01-01");
    const date4 = PlainDate.from("2020-06-01");
    const date5 = PlainDate.from("2021-01-01");
    const date6 = PlainDate.from("2021-06-01");
    expect(date3.since(date1).toString()).toBe("P365D");
    expect(date5.since(date3).toString()).toBe("P366D");
    expect(date4.since(date2).toString()).toBe("P366D");
    expect(date6.since(date4).toString()).toBe("P365D");
  });
  feb20 = PlainDate.from("2020-02-01");
  feb21 = PlainDate.from("2021-02-01");
  it("defaults to returning days", () => {
    expect(feb21.since(feb20).toString()).toBe("P366D");
    // expect(feb21.since(feb20, TimeComponent.auto).toString()).toBe('P366D')
    expect(feb21.since(feb20, TimeComponent.Days).toString()).toBe("P366D");
  });
  it("can return higher units", () => {
    expect(feb21.since(feb20, TimeComponent.Years).toString()).toBe("P1Y");
    expect(feb21.since(feb20, TimeComponent.Months).toString()).toBe("P12M");
    expect(feb21.since(feb20, TimeComponent.Weeks).toString()).toBe("P52W2D");
  });
  xit("cannot return lower units", () => {
    // throws(() => feb21.since(feb20, TimeComponent.Hours), RangeError);
    // throws(() => feb21.since(feb20, TimeComponent.Minutes), RangeError);
    // throws(() => feb21.since(feb20, TimeComponent.Seconds), RangeError);
    // throws(() => feb21.since(feb20, TimeComponent.Milliseconds), RangeError);
    // throws(() => feb21.since(feb20, TimeComponent.Microseconds), RangeError);
    // throws(() => feb21.since(feb20, TimeComponent.Nanoseconds), RangeError);
  });
  xit("does not include higher units than necessary", () => {
    // const lastFeb20 = PlainDate.from('2020-02-29');
    // const lastFeb21 = PlainDate.from('2021-02-28');
    // expect(lastFeb21.since(lastFeb20).toString()).toBe('P365D')
    // expect(lastFeb21.since(lastFeb20, TimeComponent.Months).toString()).toBe('P11M28D')
    // expect(lastFeb21.since(lastFeb20, TimeComponent.Years).toString()).toBe('P11M28D')
  });
  xit("weeks and months are mutually exclusive", () => {
    //@ts-ignore
    const laterDate = date.add({ days: 42 });
    const weeksDifference = laterDate.since(date, TimeComponent.Weeks);
    expect(weeksDifference.weeks).not.toBe(0);
    expect(weeksDifference.months).toBe(0);
    const monthsDifference = laterDate.since(date, TimeComponent.Months);
    expect(monthsDifference.weeks).toBe(0);
    expect(monthsDifference.months).not.toBe(0);
  });
  xit("no two different calendars", () => {
    // const date1 = new PlainDate(2000, 1, 1);
    // const date2 = new PlainDate(2000, 1, 1, Temporal.Calendar.from('japanese'));
    // throws(() => date1.since(date2), RangeError);
  });
  // const earlier = PlainDate.from('2019-01-08');
  // const later = PlainDate.from('2021-09-07');
  // it('throws on disallowed or invalid smallestUnit', () => {
  //   ['era', 'hours', 'minutes', 'seconds', 'milliseconds', 'microseconds', 'nanoseconds', 'nonsense'].forEach(
  //     (smallestUnit) => {
  //       throws(() => later.since(earlier, { smallestUnit }), RangeError);
  //     }
  //   );
  // });
  // it('throws if smallestUnit is larger than largestUnit', () => {
  //   const units = ['years', 'months', 'weeks', 'days'];
  //   for (let largestIdx = 1; largestIdx < units.length; largestIdx++) {
  //     for (let smallestIdx = 0; smallestIdx < largestIdx; smallestIdx++) {
  //       const largestUnit = units[largestIdx];
  //       const smallestUnit = units[smallestIdx];
  //       throws(() => later.since(earlier, { largestUnit, smallestUnit }), RangeError);
  //     }
  //   }
  // });
  // it('assumes a different default for largestUnit if smallestUnit is larger than days', () => {
  //   expect(later.since(earlier, { smallestUnit: 'years', roundingMode: 'nearest' }).toString()).toBe('P3Y')
  //   expect(later.since(earlier, { smallestUnit: 'months', roundingMode: 'nearest' }).toString()).toBe('P32M')
  //   expect(later.since(earlier, { smallestUnit: 'weeks', roundingMode: 'nearest' }).toString()).toBe('P139W')
  // });
  // it('throws on invalid roundingMode', () => {
  //   throws(() => later.since(earlier, { roundingMode: 'cile' }), RangeError);
  // });
  // const incrementOneNearest = [
  //   ['years', 'P3Y'],
  //   ['months', 'P32M'],
  //   ['weeks', 'P139W'],
  //   ['days', 'P973D']
  // ];
  // incrementOneNearest.forEach(([smallestUnit, expected]) => {
  //   const roundingMode = 'nearest';
  //   it(`rounds to nearest ${smallestUnit}`, () => {
  //     expect(later.since(earlier, { smallestUnit, roundingMode }).toString()).toBe(expected)
  //     expect(earlier.since(later, { smallestUnit, roundingMode })}`).toBe(`-${expected.toString())
  //   });
  // });
  // const incrementOneCeil = [
  //   ['years', 'P3Y', '-P2Y'],
  //   ['months', 'P32M', '-P31M'],
  //   ['weeks', 'P139W', '-P139W'],
  //   ['days', 'P973D', '-P973D']
  // ];
  // incrementOneCeil.forEach(([smallestUnit, expectedPositive, expectedNegative]) => {
  //   const roundingMode = 'ceil';
  //   it(`rounds up to ${smallestUnit}`, () => {
  //     expect(later.since(earlier, { smallestUnit, roundingMode }).toString()).toBe(expectedPositive)
  //     expect(earlier.since(later, { smallestUnit, roundingMode }).toString()).toBe(expectedNegative)
  //   });
  // });
  // const incrementOneFloor = [
  //   ['years', 'P2Y', '-P3Y'],
  //   ['months', 'P31M', '-P32M'],
  //   ['weeks', 'P139W', '-P139W'],
  //   ['days', 'P973D', '-P973D']
  // ];
  // incrementOneFloor.forEach(([smallestUnit, expectedPositive, expectedNegative]) => {
  //   const roundingMode = 'floor';
  //   it(`rounds down to ${smallestUnit}`, () => {
  //     expect(later.since(earlier, { smallestUnit, roundingMode }).toString()).toBe(expectedPositive)
  //     expect(earlier.since(later, { smallestUnit, roundingMode }).toString()).toBe(expectedNegative)
  //   });
  // });
  // const incrementOneTrunc = [
  //   ['years', 'P2Y'],
  //   ['months', 'P31M'],
  //   ['weeks', 'P139W'],
  //   ['days', 'P973D']
  // ];
  // incrementOneTrunc.forEach(([smallestUnit, expected]) => {
  //   const roundingMode = 'trunc';
  //   it(`truncates to ${smallestUnit}`, () => {
  //     expect(later.since(earlier, { smallestUnit, roundingMode }).toString()).toBe(expected)
  //     expect(earlier.since(later, { smallestUnit, roundingMode })}`).toBe(`-${expected.toString())
  //   });
  // });
  // it('trunc is the default', () => {
  //   expect(later.since(earlier, { smallestUnit: 'years' }).toString()).toBe('P2Y')
  //   expect(earlier.since(later, { smallestUnit: 'years' }).toString()).toBe('-P2Y')
  // });
  // it('rounds to an increment of years', () => {
  //   expect(later.since(earlier, { smallestUnit: 'years', roundingIncrement: 4, roundingMode: 'nearest' }).toString()).toBe('P4Y')
  // });
  // it('rounds to an increment of months', () => {
  //   equal(
  //     later.since(earlier, { smallestUnit: 'months', roundingIncrement: 10, roundingMode: 'nearest' }).toString(),
  //     'P30M'
  //   );
  // });
  // it('rounds to an increment of weeks', () => {
  //   equal(
  //     later.since(earlier, { smallestUnit: 'weeks', roundingIncrement: 12, roundingMode: 'nearest' }).toString(),
  //     'P144W'
  //   );
  // });
  // it('rounds to an increment of days', () => {
  //   equal(
  //     later.since(earlier, { smallestUnit: 'days', roundingIncrement: 100, roundingMode: 'nearest' }).toString(),
  //     'P1000D'
  //   );
  // });
  // it('accepts singular units', () => {
  //   expect(later.since(earlier, TimeComponent.Year)}`, `${later.since(earlier).toBe(TimeComponent.Years).toString())
  //   expect(later.since(earlier, { smallestUnit: 'year' })}`, `${later.since(earlier).toBe({ smallestUnit: 'years' }).toString())
  //   expect(later.since(earlier, TimeComponent.Month)}`, `${later.since(earlier).toBe(TimeComponent.Months).toString())
  //   equal(
  //     later.since(earlier, { smallestUnit: 'month' }).toString(),
  //     later.since(earlier, { smallestUnit: 'months' }).toString()
  //   );
  //   expect(later.since(earlier, TimeComponent.Day)}`, `${later.since(earlier).toBe(TimeComponent.Days).toString())
  //   expect(later.since(earlier, { smallestUnit: 'day' })}`, `${later.since(earlier).toBe({ smallestUnit: 'days' }).toString())
  // });
  // it('rounds relative to the receiver', () => {
  //   const date1 = PlainDate.from('2019-01-01');
  //   const date2 = PlainDate.from('2019-02-15');
  //   expect(date2.since(date1, { smallestUnit: 'months', roundingMode: 'nearest' }).toString()).toBe('P1M')
  //   expect(date1.since(date2, { smallestUnit: 'months', roundingMode: 'nearest' }).toString()).toBe('-P2M')
  // });
});

describe("date.add() works", () => {
  let date = new PlainDate(1976, 11, 18);
  it("date.add({ years: 43 })", () => {
    // @ts-ignore
    expect(date.add({ years: 43 }).toString()).toBe("2019-11-18");
  });
  it("date.add({ months: 3 })", () => {
    // @ts-ignore
    expect(date.add({ months: 3 }).toString()).toBe("1977-02-18");
  });
  it("date.add({ days: 20 })", () => {
    // @ts-ignore
    expect(date.add({ days: 20 }).toString()).toBe("1976-12-08");
  });
  it("new Date(2019, 1, 31).add({ months: 1 })", () => {
    // @ts-ignore
    expect(new PlainDate(2019, 1, 31).add({ months: 1 }).toString()).toBe(
      "2019-02-28"
    );
  });
  it("date.add(durationObj)", () => {
    expect(date.add(new Duration(43)).toString()).toBe("2019-11-18");
  });
  it("casts argument", () => {
    expect(date.add("P43Y").toString()).toBe("2019-11-18");
  });
  xit("constrain when overflowing result", () => {
    //   const jan31 = PlainDate.from('2020-01-31');
    //   expect(jan31.add({ months: 1 }).toString()).toBe('2020-02-29');
    //   expect(jan31.add({ months: 1 }, { overflow: 'constrain' }).toString()).toBe('2020-02-29');
  });
  it("throw when overflowing result with reject", () => {
    throws("TypeError", () => {
      new PlainDate(2020, 1, 31).add({ months: 1 }, Overflow.Reject);
    });
  });
  it("symmetrical with regard to negative durations", () => {
    // @ts-ignore
    expect(PlainDate.from("2019-11-18").add({ years: -43 }).toString()).toBe(
      "1976-11-18"
    );
    // @ts-ignore
    expect(PlainDate.from("1977-02-18").add({ months: -3 }).toString()).toBe(
      "1976-11-18"
    );
    // @ts-ignore
    expect(PlainDate.from("1976-12-08").add({ days: -20 }).toString()).toBe(
      "1976-11-18"
    );
    // @ts-ignore
    expect(PlainDate.from("2019-02-28").add({ months: -1 }).toString()).toBe(
      "2019-01-28"
    );
  });
  it("ignores lower units that don't balance up to a day", () => {
    // @ts-ignore
    expect(date.add({ hours: 1 }).toString()).toBe("1976-11-18");
    // @ts-ignore
    expect(date.add({ minutes: 1 }).toString()).toBe("1976-11-18");
    // @ts-ignore
    expect(date.add({ seconds: 1 }).toString()).toBe("1976-11-18");
    // @ts-ignore
    expect(date.add({ milliseconds: 1 }).toString()).toBe("1976-11-18");
    // @ts-ignore
    expect(date.add({ microseconds: 1 }).toString()).toBe("1976-11-18");
    // @ts-ignore
    expect(date.add({ nanoseconds: 1 }).toString()).toBe("1976-11-18");
  });
  it("adds lower units that balance up to a day or more", () => {
    // @ts-ignore
    expect(date.add({ hours: 24 }).toString()).toBe("1976-11-19");
    // @ts-ignore
    expect(date.add({ hours: 36 }).toString()).toBe("1976-11-19");
    // @ts-ignore
    expect(date.add({ hours: 48 }).toString()).toBe("1976-11-20");
    // @ts-ignore
    expect(date.add({ minutes: 1440 }).toString()).toBe("1976-11-19");
    // @ts-ignore
    expect(date.add({ seconds: 86400 }).toString()).toBe("1976-11-19");
    // @ts-ignore
    expect(date.add({ milliseconds: 86400000 }).toString()).toBe("1976-11-19");
    // expect(date.add({ microseconds: 86400000000 }).toString()).toBe('1976-11-19');
    // expect(date.add({ nanoseconds: 86400000000000 }).toString()).toBe('1976-11-19');
  });
  xit("adds lower units that balance up to a day or more - 64 bit ints", () => {
    // expect(date.add({ microseconds: 86400000000 }).toString()).toBe('1976-11-19');
    // expect(date.add({ nanoseconds: 86400000000000 }).toString()).toBe('1976-11-19');
  });
  xit("invalid overflow", () => {
    //   ['', 'CONSTRAIN', 'balance', 3, null].forEach((overflow) =>
    //     throws(() => date.add({ months: 1 }, { overflow }), RangeError)
    //   );
  });
  xit("mixed positive and negative values always throw", () => {
    //   ['constrain', 'reject'].forEach((overflow) =>
    //     throws(() => date.add({ months: 1, days: -30 }, { overflow }), RangeError)
    //   );
  });
});

describe("date.subtract() works", () => {
  date = PlainDate.from("2019-11-18");
  it("date.subtract({ years: 43 })", () => {
    // @ts-ignore
    expect(date.subtract({ years: 43 }).toString()).toBe("1976-11-18");
  });
  it("date.subtract({ months: 11 })", () => {
    // @ts-ignore
    expect(date.subtract({ months: 11 }).toString()).toBe("2018-12-18");
  });
  it("date.subtract({ days: 20 })", () => {
    // @ts-ignore
    expect(date.subtract({ days: 20 }).toString()).toBe("2019-10-29");
  });
  it('Date.from("2019-02-28").subtract({ months: 1 })', () => {
    expect(
      // @ts-ignore
      PlainDate.from("2019-02-28").subtract({ months: 1 }).toString()
    ).toBe("2019-01-28");
  });
  it("Date.subtract(durationObj)", () => {
    expect(date.subtract(new Duration(43)).toString()).toBe("1976-11-18");
  });
  it("casts argument", () => {
    expect(date.subtract("P43Y").toString()).toBe("1976-11-18");
  });
  xit("constrain when overflowing result", () => {
    //     const mar31 = PlainDate.from('2020-03-31');
    //     expect(mar31.subtract({ months: 1 }).toString()).toBe('2020-02-29');
    //     expect(mar31.subtract({ months: 1 }, { overflow: 'constrain' }).toString()).toBe('2020-02-29');
  });
  xit("throw when overflowing result with reject", () => {
    //     const mar31 = PlainDate.from('2020-03-31');
    //     throws(() => mar31.subtract({ months: 1 }, { overflow: 'reject' }), RangeError);
  });
  it("symmetrical with regard to negative durations", () => {
    expect(
      // @ts-ignore
      PlainDate.from("1976-11-18").subtract({ years: -43 }).toString()
    ).toBe("2019-11-18");
    expect(
      // @ts-ignore
      PlainDate.from("2018-12-18").subtract({ months: -11 }).toString()
    ).toBe("2019-11-18");
    expect(
      // @ts-ignore
      PlainDate.from("2019-10-29").subtract({ days: -20 }).toString()
    ).toBe("2019-11-18");
    expect(
      // @ts-ignore
      PlainDate.from("2019-01-28").subtract({ months: -1 }).toString()
    ).toBe("2019-02-28");
  });
  it("ignores lower units that don't balance up to a day", () => {
    // @ts-ignore
    expect(date.subtract({ hours: 1 }).toString()).toBe("2019-11-18");
    // @ts-ignore
    expect(date.subtract({ minutes: 1 }).toString()).toBe("2019-11-18");
    // @ts-ignore
    expect(date.subtract({ seconds: 1 }).toString()).toBe("2019-11-18");
    // @ts-ignore
    expect(date.subtract({ milliseconds: 1 }).toString()).toBe("2019-11-18");
    // expect(date.subtract({ microseconds: 1 }).toString()).toBe('2019-11-18');
    // expect(date.subtract({ nanoseconds: 1 }).toString()).toBe('2019-11-18');
  });
  it("subtracts lower units that balance up to a day or more", () => {
    // @ts-ignore
    expect(date.subtract({ hours: 24 }).toString()).toBe("2019-11-17");
    // @ts-ignore
    expect(date.subtract({ hours: 36 }).toString()).toBe("2019-11-17");
    // @ts-ignore
    expect(date.subtract({ hours: 48 }).toString()).toBe("2019-11-16");
    // @ts-ignore
    expect(date.subtract({ minutes: 1440 }).toString()).toBe("2019-11-17");
    // @ts-ignore
    expect(date.subtract({ seconds: 86400 }).toString()).toBe("2019-11-17");
    // expect(date.subtract({ milliseconds: 86400_000 }).toString()).toBe('2019-11-17');
    // expect(date.subtract({ microseconds: 86400_000_000 }).toString()).toBe('2019-11-17');
    // expect(date.subtract({ nanoseconds: 86400_000_000_000 }).toString()).toBe('2019-11-17');
  });
  // it('invalid overflow', () => {
  //   ['', 'CONSTRAIN', 'balance', 3, null].forEach((overflow) =>
  //     throws(() => date.subtract({ months: 1 }, { overflow }), RangeError)
  //   );
  // });
  // it('mixed positive and negative values always throw', () => {
  //   ['constrain', 'reject'].forEach((overflow) =>
  //     throws(() => date.subtract({ months: 1, days: -30 }, { overflow }), RangeError)
  //   );
  // });
});

describe("date.toString() works", () => {
  it("new Date(1976, 11, 18).toString()", () => {
    expect(new PlainDate(1976, 11, 18).toString()).toBe("1976-11-18");
  });
  it("new Date(1914, 2, 23).toString()", () => {
    expect(new PlainDate(1914, 2, 23).toString()).toBe("1914-02-23");
  });
  // const d = new PlainDate(1976, 11, 18);
  xit("shows only non-ISO calendar if calendarName = auto", () => {
    // expect(d.toString({ calendarName: 'auto' })).toBe('1976-11-18');
    // expect(d.withCalendar('gregory').toString({ calendarName: 'auto' })).toBe('1976-11-18[u-ca-gregory]');
  });
  xit("shows ISO calendar if calendarName = always", () => {
    // expect(d.toString({ calendarName: 'always' })).toBe('1976-11-18[u-ca-iso8601]');
  });
  xit("omits non-ISO calendar if calendarName = never", () => {
    // expect(d.withCalendar('gregory').toString({ calendarName: 'never' })).toBe('1976-11-18');
  });
  xit("default is calendar = auto", () => {
    // expect(d.toString()).toBe('1976-11-18');
    // expect(d.withCalendar('gregory').toString()).toBe('1976-11-18[u-ca-gregory]');
  });
});

describe("Date.from() works", () => {
  it('Date.from("1976-11-18")', () => {
    const date = PlainDate.from("1976-11-18");
    expect(date.year).toBe(1976);
    expect(date.month).toBe(11);
    expect(date.day).toBe(18);
  });
  it('Date.from("2019-06-30")', () => {
    const date = PlainDate.from("2019-06-30");
    expect(date.year).toBe(2019);
    expect(date.month).toBe(6);
    expect(date.day).toBe(30);
  });
  it('Date.from("+000050-06-30")', () => {
    const date = PlainDate.from("+000050-06-30");
    expect(date.year).toBe(50);
    expect(date.month).toBe(6);
    expect(date.day).toBe(30);
  });
  it('Date.from("+010583-06-30")', () => {
    const date = PlainDate.from("+010583-06-30");
    expect(date.year).toBe(10583);
    expect(date.month).toBe(6);
    expect(date.day).toBe(30);
  });
  it('Date.from("-010583-06-30")', () => {
    const date = PlainDate.from("-010583-06-30");
    expect(date.year).toBe(-10583);
    expect(date.month).toBe(6);
    expect(date.day).toBe(30);
  });
  it('Date.from("-000333-06-30")', () => {
    const date = PlainDate.from("-000333-06-30");
    expect(date.year).toBe(-333);
    expect(date.month).toBe(6);
    expect(date.day).toBe(30);
  });
  it("Date.from(1976-11-18) is not the same object", () => {
    const orig = new PlainDate(1976, 11, 18);
    const actual = PlainDate.from(orig);
    expect(actual).not.toBe(orig);
  });

  // xit('Date.from({ year: 1976, month: 11, day: 18 }) == 1976-11-18', () =>
  //   expect(PlainDate.from({ year: 1976, month: 11, day: 18 }).toString()).toBe('1976-11-18'));

  // it('can be constructed with month and without monthCode', () =>
  //   expect(PlainDate.from({ year: 1976, month: 11, day: 18 }).toString()).toBe('1976-11-18'));
  // it('can be constructed with monthCode and without month', () =>
  //   expect(PlainDate.from({ year: 1976, monthCode: 'M11', day: 18 }).toString()).toBe('1976-11-18'));
  // it('month and monthCode must agree', () =>
  //   throws(() => PlainDate.from({ year: 1976, month: 11, monthCode: 'M12', day: 18 }), RangeError));
  // it('Date.from({ year: 2019, day: 15 }) throws', () =>
  //   throws(() => PlainDate.from({ year: 2019, day: 15 }), TypeError));
  // it('Date.from({ month: 12 }) throws', () => throws(() => PlainDate.from({ month: 12 }), TypeError));
  // it.skip('Date.from(required prop undefined) throws', () =>
  //   throws(() => PlainDate.from({ year: undefined, month: 11, day: 18 }), TypeError));
  // it.skip('Date.from(number) is converted to string', () => PlainDate.from(19761118).equals(PlainDate.from('19761118')));

  it("basic format", () => {
    expect(PlainDate.from("19761118").toString()).toBe("1976-11-18");
    expect(PlainDate.from("+0019761118").toString()).toBe("1976-11-18");
  });
  it("mixture of basic and extended format", () => {
    expect(PlainDate.from("1976-11-18T152330.1+00:00").toString()).toBe(
      "1976-11-18"
    );
    expect(PlainDate.from("19761118T15:23:30.1+00:00").toString()).toBe(
      "1976-11-18"
    );
    expect(PlainDate.from("1976-11-18T15:23:30.1+0000").toString()).toBe(
      "1976-11-18"
    );
    expect(PlainDate.from("1976-11-18T152330.1+0000").toString()).toBe(
      "1976-11-18"
    );
    expect(PlainDate.from("19761118T15:23:30.1+0000").toString()).toBe(
      "1976-11-18"
    );
    expect(PlainDate.from("19761118T152330.1+00:00").toString()).toBe(
      "1976-11-18"
    );
    expect(PlainDate.from("19761118T152330.1+0000").toString()).toBe(
      "1976-11-18"
    );
    expect(PlainDate.from("+001976-11-18T152330.1+00:00").toString()).toBe(
      "1976-11-18"
    );
    expect(PlainDate.from("+0019761118T15:23:30.1+00:00").toString()).toBe(
      "1976-11-18"
    );
    expect(PlainDate.from("+001976-11-18T15:23:30.1+0000").toString()).toBe(
      "1976-11-18"
    );
    expect(PlainDate.from("+001976-11-18T152330.1+0000").toString()).toBe(
      "1976-11-18"
    );
    expect(PlainDate.from("+0019761118T15:23:30.1+0000").toString()).toBe(
      "1976-11-18"
    );
    expect(PlainDate.from("+0019761118T152330.1+00:00").toString()).toBe(
      "1976-11-18"
    );
    expect(PlainDate.from("+0019761118T152330.1+0000").toString()).toBe(
      "1976-11-18"
    );
  });

  // it('no junk at end of string', () => throws(() => PlainDate.from('1976-11-18junk'), RangeError));
  // it('ignores if a timezone is specified', () =>
  //   expect(PlainDate.from('2020-01-01[Asia/Kolkata]').toString()).toBe('2020-01-01'));

  // describe('Overflow', () => {
  //   const bad = { year: 2019, month: 1, day: 32 };
  //   it('reject', () => throws(() => PlainDate.from(bad, { overflow: 'reject' }), RangeError));
  //   it('constrain', () => {
  //     expect(PlainDate.from(bad).toString()).toBe('2019-01-31');
  //     expect(PlainDate.from(bad, { overflow: 'constrain' }).toString()).toBe('2019-01-31');
  //   });
  //   it('throw when bad overflow', () => {
  //     [new PlainDate(1976, 11, 18), { year: 2019, month: 1, day: 1 }, '2019-01-31'].forEach((input) => {
  //       ['', 'CONSTRAIN', 'balance', 3, null].forEach((overflow) =>
  //         throws(() => PlainDate.from(input, { overflow }), RangeError)
  //       );
  //     });
  //   });
  //   it('constrain has no effect on invalid ISO string', () => {
  //     throws(() => PlainDate.from('2020-13-34', { overflow: 'constrain' }), RangeError);
  //   });
  // });
});

const d1 = PlainDate.from("1976-11-18");
const d2 = PlainDate.from("2019-06-30");
describe("Date.compare works", () => {
  it("equal", () => {
    expect(PlainDate.compare(d1, d1)).toBe(0);
  });
  it("smaller/larger", () => {
    expect(PlainDate.compare(d1, d2)).toBe(-1);
  });
  it("larger/smaller", () => {
    expect(PlainDate.compare(d2, d1)).toBe(1);
  });
  xit("casts first argument", () => {
    //   expect(PlainDate.compare({ year: 1976, month: 11, day: 18 }, d2)).toBe(-1);
    //   expect(PlainDate.compare('1976-11-18', d2)).toBe(-1);
  });
  xit("casts second argument", () => {
    //   expect(PlainDate.compare(d1, { year: 2019, month: 6, day: 30 })).toBe(-1);
    //   expect(PlainDate.compare(d1, '2019-06-30')).toBe(-1);
  });
});

describe("Date.equal works", () => {
  it("equal", () => {
    assert(d1.equals(d1));
  });
  it("unequal", () => {
    assert(!d1.equals(d2));
  });
  xit("casts argument", () => {
    //   assert(!d2.equals({ year: 1976, month: 11, day: 18 }));
    //   assert(!d2.equals('1976-11-18'));
  });
});

// describe.skip("Comparison operators don't work", () => {
//   const d1 = PlainDate.from('1963-02-13');
//   const d1again = PlainDate.from('1963-02-13');
//   const d2 = PlainDate.from('1976-11-18');
//   it('=== is object equality', () => expect(d1).toBe(d1));
//   it('!== is object equality', () => notexpect(d1).toBe(d1again));
//   it('<', () => throws(() => d1 < d2));
//   it('>', () => throws(() => d1 > d2));
//   it('<=', () => throws(() => d1 <= d2));
//   it('>=', () => throws(() => d1 >= d2));
// });

describe("Min/max range", () => {
  it("constructing from numbers", () => {
    // throws("RangeError", () => { new PlainDate(-271821, 4, 18) });
    // throws("RangeError", () => { new PlainDate(275760, 9, 14) });
    expect(new PlainDate(-271821, 4, 19).toString()).toBe("-271821-04-19");
    expect(new PlainDate(275760, 9, 13).toString()).toBe("275760-09-13");
  });
  //   it('constructing from property bag', () => {
  //     const tooEarly = { year: -271821, month: 4, day: 18 };
  //     const tooLate = { year: 275760, month: 9, day: 14 };
  //     ['reject', 'constrain'].forEach((overflow) => {
  //       [tooEarly, tooLate].forEach((props) => {
  //         throws(() => PlainDate.from(props, { overflow }), RangeError);
  //       });
  //     });
  //     expect(PlainDate.from({ year: -271821, month: 4, day: 19 }).toString()).toBe('-271821-04-19');
  //     expect(PlainDate.from({ year: 275760, month: 9, day: 13 }).toString()).toBe('+275760-09-13');
  //   });
  //   it('constructing from ISO string', () => {
  //     ['reject', 'constrain'].forEach((overflow) => {
  //       ['-271821-04-18', '+275760-09-14'].forEach((str) => {
  //         throws(() => PlainDate.from(str, { overflow }), RangeError);
  //       });
  //     });
  //     expect(PlainDate.from('-271821-04-19').toString()).toBe('-271821-04-19');
  //     expect(PlainDate.from('+275760-09-13').toString()).toBe('+275760-09-13');
  //   });
  //   it('converting from DateTime', () => {
  //     const min = Temporal.PlainDateTime.from('-271821-04-19T00:00:00.000000001');
  //     const max = Temporal.PlainDateTime.from('+275760-09-13T23:59:59.999999999');
  //     expect(min.toPlainDate().toString()).toBe('-271821-04-19');
  //     expect(max.toPlainDate().toString()).toBe('+275760-09-13');
  //   });
  //   it('converting from YearMonth', () => {
  //     const min = Temporal.PlainYearMonth.from('-271821-04');
  //     const max = Temporal.PlainYearMonth.from('+275760-09');
  //     throws(() => min.toPlainDate({ day: 1 }), RangeError);
  //     throws(() => max.toPlainDate({ day: 30 }), RangeError);
  //     expect(min.toPlainDate({ day: 19 }).toString()).toBe('-271821-04-19');
  //     expect(max.toPlainDate({ day: 13 }).toString()).toBe('+275760-09-13');
  //   });
  //   it('converting from MonthDay', () => {
  //     const jan1 = Temporal.PlainMonthDay.from('01-01');
  //     const dec31 = Temporal.PlainMonthDay.from('12-31');
  //     const minYear = -271821;
  //     const maxYear = 275760;
  //     throws(() => jan1.toPlainDate({ year: minYear }), RangeError);
  //     throws(() => dec31.toPlainDate({ year: maxYear }), RangeError);
  //     expect(jan1.toPlainDate({ year: minYear + 1 }).toString()).toBe('-271820-01-01');
  //     expect(dec31.toPlainDate({ year: maxYear - 1 }).toString()).toBe('+275759-12-31');
  //   });
  //   it('adding and subtracting beyond limit', () => {
  //     const min = PlainDate.from('-271821-04-19');
  //     const max = PlainDate.from('+275760-09-13');
  //     ['reject', 'constrain'].forEach((overflow) => {
  //       throws(() => min.subtract({ days: 1 }, { overflow }), RangeError);
  //       throws(() => max.add({ days: 1 }, { overflow }), RangeError);
  //     });
  //   });
});

// describe('date.getISOFields() works', () => {
//   const d1 = PlainDate.from('1976-11-18');
//   const fields = d1.getISOFields();
//   it('fields', () => {
//     expect(fields.isoYear).toBe(1976);
//     expect(fields.isoMonth).toBe(11);
//     expect(fields.isoDay).toBe(18);
//     expect(fields.calendar.id).toBe('iso8601');
//   });
//   it('enumerable', () => {
//     const fields2 = { ...fields };
//     expect(fields2.isoYear).toBe(1976);
//     expect(fields2.isoMonth).toBe(11);
//     expect(fields2.isoDay).toBe(18);
//     expect(fields2.calendar).toBe(fields.calendar);
//   });
//   it('as input to constructor', () => {
//     const d2 = new PlainDate(fields.isoYear, fields.isoMonth, fields.isoDay, fields.calendar);
//     assert(d2.equals(d1));
//   });
// });

// describe('date.withCalendar()', () => {
//   const d1 = PlainDate.from('1976-11-18');
//   it('works', () => {
//     const calendar = Temporal.Calendar.from('iso8601');
//     expect(d1.withCalendar(calendar).toString()).toBe('1976-11-18');
//   });
//   it('casts its argument', () => {
//     expect(d1.withCalendar('iso8601').toString()).toBe('1976-11-18');
//   });
// });
// });
