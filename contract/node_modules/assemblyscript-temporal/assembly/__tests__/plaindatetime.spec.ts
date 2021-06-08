import { Duration, DurationLike } from "../duration";
import { Overflow, TimeComponent } from "../enums";
import { PlainDate } from "../plaindate";
import { DateTimeLike, PlainDateTime } from "../plaindatetime";
import { TimeZone } from "../timezone";

let datetime: PlainDateTime;

describe("Construction", () => {
  datetime = new PlainDateTime(1976, 11, 18, 15, 23, 30, 123, 456, 789);
  it("datetime.year is 1976", () => {
    expect(datetime.year).toBe(1976);
  });
  it("datetime.month is 11", () => {
    expect(datetime.month).toBe(11);
  });
  xit('datetime.monthCode is "M11"', () => {
    // expect(datetime.monthCode).toBe("M11");
  });
  it("datetime.day is 18", () => {
    expect(datetime.day).toBe(18);
  });
  it("datetime.hour is 15", () => {
    expect(datetime.hour).toBe(15);
  });
  it("datetime.minute is 23", () => {
    expect(datetime.minute).toBe(23);
  });
  it("datetime.second is 30", () => {
    expect(datetime.second).toBe(30);
  });
  it("datetime.millisecond is 123", () => {
    expect(datetime.millisecond).toBe(123);
  });
  it("datetime.microsecond is 456", () => {
    expect(datetime.microsecond).toBe(456);
  });
  it("datetime.nanosecond is 789", () => {
    expect(datetime.nanosecond).toBe(789);
  });
  xit("datetime.calendar is the object", () => {
    // expect(datetime.calendar).toBe(calendar);
  });
  it("datetime.dayOfWeek is 4", () => {
    expect(datetime.dayOfWeek).toBe(4);
  });
  it("datetime.dayOfYear is 323", () => {
    expect(datetime.dayOfYear).toBe(323);
  });
  it("datetime.weekOfYear is 47", () => {
    expect(datetime.weekOfYear).toBe(47);
  });
  it("datetime.daysInWeek is 7", () => {
    expect(datetime.daysInWeek).toBe(7);
  });
  it("datetime.monthsInYear is 12", () => {
    expect(datetime.monthsInYear).toBe(12);
  });
  it("datetime.inLeapYear is true", () => {
    expect(datetime.inLeapYear).toBe(true);
  });
  it("`${datetime}` is 1976-11-18T15:23:30.123456789", () => {
    expect(datetime.toString()).toBe("1976-11-18T15:23:30.123456789");
  });

  describe("new DateTime(1976, 11, 18, 15)", () => {
    datetime = new PlainDateTime(1976, 11, 18, 15);
    it("`${datetime}` is 1976-11-18T15:00:00", () => {
      expect<string>(datetime.toString()).toBe("1976-11-18T15:00:00");
    });
  });

  describe("new DateTime(1976, 11, 18)", () => {
    datetime = new PlainDateTime(1976, 11, 18);
    it("`${datetime}` is 1976-11-18T00:00:00", () => {
      expect<string>(datetime.toString()).toBe("1976-11-18T00:00:00");
    });
  });

  describe("constructor treats -0 as 0", () => {
    it("ignores the sign of -0", () => {
      const datetime = new PlainDateTime(1976, 11, 18, -0, -0, -0, -0, -0);
      expect(datetime.hour).toBe(0);
      expect(datetime.minute).toBe(0);
      expect(datetime.second).toBe(0);
      expect(datetime.millisecond).toBe(0);
      expect(datetime.microsecond).toBe(0);
      expect(datetime.nanosecond).toBe(0);
    });
  });
});

describe(".with manipulation", () => {
  datetime = new PlainDateTime(1976, 11, 18, 15, 23, 30, 123, 456, 789);
  it("datetime.with({ year: 2019 } works", () => {
    // @ts-ignore
    expect(datetime.with({ year: 2019 }).toString()).toBe(
      "2019-11-18T15:23:30.123456789"
    );
  });
  it("datetime.with({ month: 5 } works", () => {
    // @ts-ignore
    expect(datetime.with({ month: 5 }).toString()).toBe(
      "1976-05-18T15:23:30.123456789"
    );
  });
  xit('datetime.with({ monthCode: "M05" } works', () => {
    //  expect(`${datetime.with({ monthCode: 'M05' })}`).toBe('1976-05-18T15:23:30.123456789');
  });
  xit("month and monthCode must agree", () => {
    //  throws(() => datetime.with({ month: 5, monthCode: 'M06' }), RangeError);
  });
  it("datetime.with({ day: 5 } works", () => {
    // @ts-ignore
    expect(datetime.with({ day: 5 }).toString()).toBe(
      "1976-11-05T15:23:30.123456789"
    );
  });
  it("datetime.with({ hour: 5 } works", () => {
    // @ts-ignore
    expect(datetime.with({ hour: 5 }).toString()).toBe(
      "1976-11-18T05:23:30.123456789"
    );
  });
  it("datetime.with({ minute: 5 } works", () => {
    // @ts-ignore
    expect(datetime.with({ minute: 5 }).toString()).toBe(
      "1976-11-18T15:05:30.123456789"
    );
  });
  it("datetime.with({ second: 5 } works", () => {
    // @ts-ignore
    expect(datetime.with({ second: 5 }).toString()).toBe(
      "1976-11-18T15:23:05.123456789"
    );
  });
  it("datetime.with({ millisecond: 5 } works", () => {
    // @ts-ignore
    expect(datetime.with({ millisecond: 5 }).toString()).toBe(
      "1976-11-18T15:23:30.005456789"
    );
  });
  it("datetime.with({ microsecond: 5 } works", () => {
    // @ts-ignore
    expect(datetime.with({ microsecond: 5 }).toString()).toBe(
      "1976-11-18T15:23:30.123005789"
    );
  });
  it("datetime.with({ nanosecond: 5 } works", () => {
    // @ts-ignore
    expect(datetime.with({ nanosecond: 5 }).toString()).toBe(
      "1976-11-18T15:23:30.123456005"
    );
  });
  it("datetime.with({ month: 5, second: 15 } works", () => {
    // @ts-ignore
    expect(datetime.with({ month: 5, second: 15 }).toString()).toBe(
      "1976-05-18T15:23:15.123456789"
    );
  });
});

//    describe('.withPlainTime manipulation', () => {
//      const dt = Temporal.PlainDateTime.from('2015-12-07T03:24:30.000003500');
//      it('datetime.withPlainTime({ hour: 10 }) works', () => {
//        expect(`${dt.withPlainTime({ hour: 10 })}`).toBe('2015-12-07T10:00:00');
//      });
//      it('datetime.withPlainTime(time) works', () => {
//        const time = Temporal.PlainTime.from('11:22');
//        expect(`${dt.withPlainTime(time)}`).toBe('2015-12-07T11:22:00');
//      });
//      it("datetime.withPlainTime('12:34') works", () => {
//        expect(`${dt.withPlainTime('12:34')}`).toBe('2015-12-07T12:34:00');
//      });
//      it('datetime.withPlainTime() defaults to midnight', () => {
//        expect(`${dt.withPlainTime()}`).toBe('2015-12-07T00:00:00');
//      });
//      it('object must contain at least one correctly-spelled property', () => {
//        throws(() => dt.withPlainTime({}), TypeError);
//        throws(() => dt.withPlainTime({ minutes: 12 }), TypeError);
//      });
//      it('incorrectly-spelled properties are ignored', () => {
//        expect(`${dt.withPlainTime({ hour: 10, seconds: 123 })}`).toBe('2015-12-07T10:00:00');
//      });
//    });
//    describe('.withPlainDate manipulation', () => {
//      const dt = Temporal.PlainDateTime.from('1995-12-07T03:24:30');
//      it('datetime.withPlainDate({ year: 2000, month: 6, day: 1 }) works', () => {
//        expect(`${dt.withPlainDate({ year: 2000, month: 6, day: 1 })}`).toBe('2000-06-01T03:24:30');
//      });
//      it('datetime.withPlainDate(plainDate) works', () => {
//        const date = Temporal.PlainDate.from('2020-01-23');
//        expect(`${dt.withPlainDate(date)}`).toBe('2020-01-23T03:24:30');
//      });
//      it("datetime.withPlainDate('2018-09-15') works", () => {
//        expect(`${dt.withPlainDate('2018-09-15')}`).toBe('2018-09-15T03:24:30');
//      });
//      it('result contains a non-ISO calendar if present in the input', () => {
//        expect(`${dt.withCalendar('japanese').withPlainDate('2008-09-06')}`).toBe('2008-09-06T03:24:30[u-ca-japanese]');
//      });
//      it('calendar is unchanged if input has ISO calendar', () => {
//        expect(`${dt.withPlainDate('2008-09-06[u-ca-japanese]')}`).toBe('2008-09-06T03:24:30[u-ca-japanese]');
//      });
//      it('throws if both `this` and `other` have a non-ISO calendar', () => {
//        throws(() => dt.withCalendar('gregory').withPlainDate('2008-09-06[u-ca-japanese]'), RangeError);
//      });
//      it('object must contain at least one correctly-spelled property', () => {
//        throws(() => dt.withPlainDate({}), TypeError);
//        throws(() => dt.withPlainDate({ months: 12 }), TypeError);
//      });
//      it('incorrectly-spelled properties are ignored', () => {
//        expect(`${dt.withPlainDate({ year: 2000, month: 6, day: 1, months: 123 })}`).toBe('2000-06-01T03:24:30');
//      });
//    });

describe("DateTime.fromString() works", () => {
  it("date components only", () => {
    expect(PlainDateTime.from("1976-11-18T00:00:00").toString()).toBe(
      "1976-11-18T00:00:00"
    );
  });
  it("date components without dash separator", () => {
    expect(PlainDateTime.from("19761118T00:00:00").toString()).toBe(
      "1976-11-18T00:00:00"
    );
  });
  it("date and time components only", () => {
    expect(PlainDateTime.from("1976-11-18T12:34:56").toString()).toBe(
      "1976-11-18T12:34:56"
    );
  });
  it("with milliseconds", () => {
    expect(PlainDateTime.from("1976-11-18T12:34:56.123456789").toString()).toBe(
      "1976-11-18T12:34:56.123456789"
    );
  });
  it("throws on invalid string", () => {
    expect(() => {
      PlainDateTime.from("fish");
    }).toThrow();
  });
});

let dt1: PlainDateTime, dt2: PlainDateTime;

describe("DateTime.compare() works", () => {
  dt1 = PlainDateTime.from("1976-11-18T15:23:30.123456789");
  dt2 = PlainDateTime.from("2019-10-29T10:46:38.271986102");
  it("equal", () => {
    expect(PlainDateTime.compare(dt1, dt1)).toBe(0);
  });
  it("smaller/larger", () => {
    expect(PlainDateTime.compare(dt1, dt2)).toBe(-1);
  });
  it("larger/smaller", () => {
    expect(PlainDateTime.compare(dt2, dt1)).toBe(1);
  });
  xit("casts first argument", () => {
    //    expect(PlainDateTime.compare({ year: 1976, month: 11, day: 18, hour: 15 }, dt2)).toBe(-1);
    //    expect(PlainDateTime.compare('1976-11-18T15:23:30.123456789', dt2)).toBe(-1);
  });
  xit("casts second argument", () => {
    //    expect(PlainDateTime.compare(dt1, { year: 2019, month: 10, day: 29, hour: 10 })).toBe(-1);
    //    expect(PlainDateTime.compare(dt1, '2019-10-29T10:46:38.271986102')).toBe(-1);
  });
  xit("object must contain at least the required properties", () => {
    //  throws(() => PlainDateTime.compare({ year: 1976 }, dt2), TypeError);
    //  throws(() => PlainDateTime.compare(dt1, { year: 2019 }), TypeError);
  });
});

describe("DateTime.equals() works", () => {
  const dt1 = PlainDateTime.from("1976-11-18T15:23:30.123456789");
  const dt2 = PlainDateTime.from("2019-10-29T10:46:38.271986102");
  it("equal", () => {
    assert(dt1.equals(dt1));
  });
  it("unequal", () => {
    assert(!dt1.equals(dt2));
  });
  xit("casts argument", () => {
    // assert(!dt2.equals({ year: 1976, month: 11, day: 18, hour: 15 }));
    // assert(!dt2.equals("1976-11-18T15:23:30.123456789"));
  });
  xit("object must contain at least the required properties", () => {
    // throws(() => dt2.equals({ year: 1976 }), TypeError);
  });
});

//    describe('date/time maths', () => {
//      const earlier = PlainDateTime.from('1976-11-18T15:23:30.123456789');
//      const later = PlainDateTime.from('2019-10-29T10:46:38.271986102');
//      ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'].forEach((largestUnit) => {
//        const diff = later.since(earlier, { largestUnit });
//        it(`(${earlier}).since(${later}) == (${later}).since(${earlier}).negated()`, () =>
//          expect(`${earlier.since(later, { largestUnit })}`).toBe(`${diff.negated()}`));
//        it(`(${earlier}).until(${later}) == (${later}).since(${earlier})`, () =>
//          expect(`${earlier.until(later, { largestUnit })}`).toBe(`${diff}`));
//        it(`(${earlier}).add(${diff}) == (${later})`, () => assert(earlier.add(diff).equals(later)));
//        it(`(${later}).subtract(${diff}) == (${earlier})`, () => assert(later.subtract(diff).equals(earlier)));
//        it('symmetrical with regard to negative durations', () => {
//          assert(earlier.subtract(diff.negated()).equals(later));
//          assert(later.add(diff.negated()).equals(earlier));
//        });
//      });
//    });

//    describe('date/time maths: hours overflow', () => {
//      it('subtract result', () => {
//        const later = PlainDateTime.from('2019-10-29T10:46:38.271986102');
//        const earlier = later.subtract({ hours: 12 });
//        expect(`${earlier}`).toBe('2019-10-28T22:46:38.271986102');
//      });
//      it('add result', () => {
//        const earlier = PlainDateTime.from('2020-05-31T23:12:38.271986102');
//        const later = earlier.add({ hours: 2 });
//        expect(`${later}`).toBe('2020-06-01T01:12:38.271986102');
//      });
//      it('symmetrical with regard to negative durations', () => {
//        equal(
//          `${PlainDateTime.from('2019-10-29T10:46:38.271986102').add({ hours: -12 })}`,
//          '2019-10-28T22:46:38.271986102'
//        );
//        equal(
//          `${PlainDateTime.from('2020-05-31T23:12:38.271986102').subtract({ hours: -2 })}`,
//          '2020-06-01T01:12:38.271986102'
//        );
//      });
//    });

let jan31: PlainDateTime;

describe("DateTime.add() works", () => {
  jan31 = PlainDateTime.from("2020-01-31T15:00");
  it("constrain when ambiguous result", () => {
    expect(
      jan31
        // @ts-ignore
        .add<DurationLike>({ months: 1 })
        .toString()
    ).toBe("2020-02-29T15:00:00");
  });
  it("symmetrical with regard to negative durations in the time part", () => {
    expect(
      jan31
        // @ts-ignore
        .add<DurationLike>({ minutes: -30 })
        .toString()
    ).toBe("2020-01-31T14:30:00");
    expect(
      jan31
        // @ts-ignore
        .add<DurationLike>({ seconds: -30 })
        .toString()
    ).toBe("2020-01-31T14:59:30");
  });
  it("throw when overflowing result with reject", () => {
    throws("TypeError", () => {
      jan31.add({ months: 1 }, Overflow.Reject);
    });
  });
  xit("mixed positive and negative values always throw", () => {
    //        ['constrain', 'reject'].forEach((overflow) =>
    //          throws(() => jan31.add({ hours: 1, minutes: -30 }, { overflow }), RangeError)
    //        );
  });
  it("casts argument", () => {
    expect(`${jan31.add(Duration.from("P1MT1S"))}`).toBe("2020-02-29T15:00:01");
    expect(`${jan31.add("P1MT1S")}`).toBe("2020-02-29T15:00:01");
  });
});

let mar31: PlainDateTime;

describe("date.subtract() works", () => {
  mar31 = PlainDateTime.from("2020-03-31T15:00");
  it("constrain when ambiguous result", () => {
    expect(
      mar31
        // @ts-ignore
        .subtract<DurationLike>({ months: 1 })
        .toString()
    ).toBe("2020-02-29T15:00:00");
  });
  it("symmetrical with regard to negative durations in the time part", () => {
    expect(
      mar31
        // @ts-ignore
        .subtract<DurationLike>({ minutes: -30 })
        .toString()
    ).toBe("2020-03-31T15:30:00");
    expect(
      mar31
        // @ts-ignore
        .subtract<DurationLike>({ seconds: -30 })
        .toString()
    ).toBe("2020-03-31T15:00:30");
  });
  xit("throw when ambiguous result with reject", () => {
    // throws(() => mar31.subtract({ months: 1 }, { overflow: 'reject' }), RangeError);
  });
  xit("invalid overflow", () => {
    // ['', 'CONSTRAIN', 'balance', 3, null].forEach((overflow) =>
    //   throws(() => PlainDateTime.from('2019-11-18T15:00').subtract({ months: 1 }, { overflow }), RangeError)
    // );
  });
  xit("mixed positive and negative values always throw", () => {
    // ['constrain', 'reject'].forEach((overflow) =>
    //   throws(() => mar31.add({ hours: 1, minutes: -30 }, { overflow }), RangeError)
    // );
  });
  it("casts argument", () => {
    expect(`${mar31.subtract(Duration.from("P1MT1S"))}`).toBe(
      "2020-02-29T14:59:59"
    );
    expect(`${mar31.subtract("P1MT1S")}`).toBe("2020-02-29T14:59:59");
  });
});

describe("Date.toPlainDate() works", () => {
  it("combines the date and time", () => {
    expect(
      PlainDateTime.from("1976-11-18T11:30:23").toPlainDate().toString()
    ).toBe("1976-11-18");
  });
});

describe("Date.toPlainYearMonth() works", () => {
  it("combines the date and time", () => {
    expect(PlainDateTime.from("1976-11-18").toPlainYearMonth().toString()).toBe(
      "1976-11"
    );
  });
});

describe("Date.toPlainMonthDay() works", () => {
  it("combines the date and time", () => {
    expect(PlainDateTime.from("1976-11-18").toPlainMonthDay().toString()).toBe(
      "11-18"
    );
  });
});

describe("Date.toZonedDateTime()", () => {
  it("works", () => {
    const date = PlainDateTime.from("2020-01-01");
    const tz = TimeZone.from("America/Los_Angeles");
    const zdt = date.toZonedDateTime(tz);
    expect(zdt.toString()).toBe(
      "2020-01-01T00:00:00-08:00[America/Los_Angeles]"
    );
  });
});

let dt: PlainDateTime, feb20: PlainDateTime, feb21: PlainDateTime;

describe("DateTime.until()", () => {
  dt = PlainDateTime.from("1976-11-18T15:23:30.123456789");
  it("dt.until(later) === later.since(dt)", () => {
    const later = PlainDateTime.from({
      year: 2016,
      month: 3,
      day: 3,
      hour: 18,
    });
    expect(`${dt.until(later)}`).toBe(`${later.since(dt)}`);
  });
  it("casts argument", () => {
    expect(
      dt
        // @ts-ignore
        .until({ year: 2019, month: 10, day: 29, hour: 10 })
        .toString()
    ).toBe("P15684DT18H36M29.876543211S");
    expect(
      // @ts-ignore
      dt.until("2019-10-29T10:46:38.271986102").toString()
    ).toBe("P15684DT19H23M8.148529313S");
  });
  feb20 = PlainDateTime.from("2020-02-01T00:00");
  feb21 = PlainDateTime.from("2021-02-01T00:00");
  it("defaults to returning days", () => {
    expect(`${feb20.until(feb21)}`).toBe("P366D");
    //  expect(`${feb20.until(feb21, TimeComponent.Auto)}`).toBe('P366D');
    expect(`${feb20.until(feb21, TimeComponent.Days)}`).toBe("P366D");
    // see: https://github.com/ColinEberhardt/assemblyscript-temporal/issues/50
    // expect(
    //   `${feb20.until(PlainDateTime.from("2021-02-01T00:00:00.000000001"))}`
    // ).toBe("P366DT0.000000001S");
    // expect(
    //   `${PlainDateTime.from("2020-02-01T00:00:00.000000001").until(feb21)}`
    // ).toBe("P365DT23H59M59.999999999S");
  });
  it("can return lower or higher units", () => {
    expect(`${feb20.until(feb21, TimeComponent.Years)}`).toBe("P1Y");
    expect(`${feb20.until(feb21, TimeComponent.Months)}`).toBe("P12M");
    expect(`${feb20.until(feb21, TimeComponent.Hours)}`).toBe("PT8784H");
    expect(`${feb20.until(feb21, TimeComponent.Minutes)}`).toBe("PT527040M");
    expect(`${feb20.until(feb21, TimeComponent.Seconds)}`).toBe("PT31622400S");
  });
  it("can return subseconds", () => {
    const later = feb20.add({
      days: 1,
      milliseconds: 250,
      microseconds: 250,
      nanoseconds: 250,
    });

    const msDiff = feb20.until(later, TimeComponent.Milliseconds);
    expect(msDiff.seconds).toBe(0);
    expect(msDiff.milliseconds).toBe(86400250);
    expect(msDiff.microseconds).toBe(250);
    expect(msDiff.nanoseconds).toBe(250);

    const µsDiff = feb20.until(later, TimeComponent.Microseconds);
    expect(µsDiff.milliseconds).toBe(0);
    // expect(µsDiff.microseconds).toBe(86400250250);
    expect(µsDiff.nanoseconds).toBe(250);

    const nsDiff = feb20.until(later, TimeComponent.Nanoseconds);
    expect(nsDiff.microseconds).toBe(0);
    // expect(nsDiff.nanoseconds).toBe(86400250250250);
  });
  it("does not include higher units than necessary", () => {
    const lastFeb20 = PlainDateTime.from("2020-02-29T00:00");
    const lastFeb21 = PlainDateTime.from("2021-02-28T00:00");
    expect(`${lastFeb20.until(lastFeb21)}`).toBe("P365D");
    expect(`${lastFeb20.until(lastFeb21, TimeComponent.Months)}`).toBe("P12M");
    expect(`${lastFeb20.until(lastFeb21, TimeComponent.Years)}`).toBe("P1Y");
  });
  it("weeks and months are mutually exclusive", () => {
    const laterDateTime = dt.add({ days: 42, hours: 3 });
    const weeksDifference = dt.until(laterDateTime, TimeComponent.Weeks);
    expect(weeksDifference.weeks).not.toBe(0);
    expect(weeksDifference.months).toBe(0);
    const monthsDifference = dt.until(laterDateTime, TimeComponent.Months);
    expect(monthsDifference.weeks).toBe(0);
    expect(monthsDifference.months).not.toBe(0);
  });
});

//      it('no two different calendars', () => {
//        const dt1 = new PlainDateTime(2000, 1, 1, 0, 0, 0, 0, 0, 0);
//        const dt2 = new PlainDateTime(2000, 1, 1, 0, 0, 0, 0, 0, 0, Temporal.Calendar.from('japanese'));
//        throws(() => dt1.until(dt2), RangeError);
//      });
//      const earlier = PlainDateTime.from('2019-01-08T08:22:36.123456789');
//      const later = PlainDateTime.from('2021-09-07T12:39:40.987654321');
//      it('throws on disallowed or invalid smallestUnit', () => {
//        ['era', 'nonsense'].forEach((smallestUnit) => {
//          throws(() => earlier.until(later, { smallestUnit }), RangeError);
//        });
//      });
//      it('throws if smallestUnit is larger than largestUnit', () => {
//        const units = [
//          'years',
//          'months',
//          'weeks',
//          'days',
//          'hours',
//          'minutes',
//          'seconds',
//          'milliseconds',
//          'microseconds',
//          'nanoseconds'
//        ];
//        for (let largestIdx = 1; largestIdx < units.length; largestIdx++) {
//          for (let smallestIdx = 0; smallestIdx < largestIdx; smallestIdx++) {
//            const largestUnit = units[largestIdx];
//            const smallestUnit = units[smallestIdx];
//            throws(() => earlier.until(later, { largestUnit, smallestUnit }), RangeError);
//          }
//        }
//      });
//      it('assumes a different default for largestUnit if smallestUnit is larger than days', () => {
//        expect(`${earlier.until(later, { smallestUnit: 'years', roundingMode: 'halfExpand' })}`).toBe('P3Y');
//        expect(`${earlier.until(later, { smallestUnit: 'months', roundingMode: 'halfExpand' })}`).toBe('P32M');
//        expect(`${earlier.until(later, { smallestUnit: 'weeks', roundingMode: 'halfExpand' })}`).toBe('P139W');
//      });
//      it('throws on invalid roundingMode', () => {
//        throws(() => earlier.until(later, { roundingMode: 'cile' }), RangeError);
//      });
//      const incrementOneNearest = [
//        ['years', 'P3Y'],
//        ['months', 'P32M'],
//        ['weeks', 'P139W'],
//        ['days', 'P973D'],
//        ['hours', 'P973DT4H'],
//        ['minutes', 'P973DT4H17M'],
//        ['seconds', 'P973DT4H17M5S'],
//        ['milliseconds', 'P973DT4H17M4.864S'],
//        ['microseconds', 'P973DT4H17M4.864198S'],
//        ['nanoseconds', 'P973DT4H17M4.864197532S']
//      ];
//      incrementOneNearest.forEach(([smallestUnit, expected]) => {
//        const roundingMode = 'halfExpand';
//        it(`rounds to nearest ${smallestUnit}`, () => {
//          expect(`${earlier.until(later, { smallestUnit, roundingMode })}`).toBe(expected);
//          expect(`${later.until(earlier, { smallestUnit, roundingMode })}`).toBe(`-${expected}`);
//        });
//      });
//      const incrementOneCeil = [
//        ['years', 'P3Y', '-P2Y'],
//        ['months', 'P32M', '-P31M'],
//        ['weeks', 'P140W', '-P139W'],
//        ['days', 'P974D', '-P973D'],
//        ['hours', 'P973DT5H', '-P973DT4H'],
//        ['minutes', 'P973DT4H18M', '-P973DT4H17M'],
//        ['seconds', 'P973DT4H17M5S', '-P973DT4H17M4S'],
//        ['milliseconds', 'P973DT4H17M4.865S', '-P973DT4H17M4.864S'],
//        ['microseconds', 'P973DT4H17M4.864198S', '-P973DT4H17M4.864197S'],
//        ['nanoseconds', 'P973DT4H17M4.864197532S', '-P973DT4H17M4.864197532S']
//      ];
//      incrementOneCeil.forEach(([smallestUnit, expectedPositive, expectedNegative]) => {
//        const roundingMode = 'ceil';
//        it(`rounds up to ${smallestUnit}`, () => {
//          expect(`${earlier.until(later, { smallestUnit, roundingMode })}`).toBe(expectedPositive);
//          expect(`${later.until(earlier, { smallestUnit, roundingMode })}`).toBe(expectedNegative);
//        });
//      });
//      const incrementOneFloor = [
//        ['years', 'P2Y', '-P3Y'],
//        ['months', 'P31M', '-P32M'],
//        ['weeks', 'P139W', '-P140W'],
//        ['days', 'P973D', '-P974D'],
//        ['hours', 'P973DT4H', '-P973DT5H'],
//        ['minutes', 'P973DT4H17M', '-P973DT4H18M'],
//        ['seconds', 'P973DT4H17M4S', '-P973DT4H17M5S'],
//        ['milliseconds', 'P973DT4H17M4.864S', '-P973DT4H17M4.865S'],
//        ['microseconds', 'P973DT4H17M4.864197S', '-P973DT4H17M4.864198S'],
//        ['nanoseconds', 'P973DT4H17M4.864197532S', '-P973DT4H17M4.864197532S']
//      ];
//      incrementOneFloor.forEach(([smallestUnit, expectedPositive, expectedNegative]) => {
//        const roundingMode = 'floor';
//        it(`rounds down to ${smallestUnit}`, () => {
//          expect(`${earlier.until(later, { smallestUnit, roundingMode })}`).toBe(expectedPositive);
//          expect(`${later.until(earlier, { smallestUnit, roundingMode })}`).toBe(expectedNegative);
//        });
//      });
//      const incrementOneTrunc = [
//        ['years', 'P2Y'],
//        ['months', 'P31M'],
//        ['weeks', 'P139W'],
//        ['days', 'P973D'],
//        ['hours', 'P973DT4H'],
//        ['minutes', 'P973DT4H17M'],
//        ['seconds', 'P973DT4H17M4S'],
//        ['milliseconds', 'P973DT4H17M4.864S'],
//        ['microseconds', 'P973DT4H17M4.864197S'],
//        ['nanoseconds', 'P973DT4H17M4.864197532S']
//      ];
//      incrementOneTrunc.forEach(([smallestUnit, expected]) => {
//        const roundingMode = 'trunc';
//        it(`truncates to ${smallestUnit}`, () => {
//          expect(`${earlier.until(later, { smallestUnit, roundingMode })}`).toBe(expected);
//          expect(`${later.until(earlier, { smallestUnit, roundingMode })}`).toBe(`-${expected}`);
//        });
//      });
//      it('trunc is the default', () => {
//        expect(`${earlier.until(later, { smallestUnit: 'minutes' })}`).toBe('P973DT4H17M');
//        expect(`${earlier.until(later, { smallestUnit: 'seconds' })}`).toBe('P973DT4H17M4S');
//      });
//      it('rounds to an increment of hours', () => {
//        equal(
//          `${earlier.until(later, { smallestUnit: 'hours', roundingIncrement: 3, roundingMode: 'halfExpand' })}`,
//          'P973DT3H'
//        );
//      });
//      it('rounds to an increment of minutes', () => {
//        equal(
//          `${earlier.until(later, { smallestUnit: 'minutes', roundingIncrement: 30, roundingMode: 'halfExpand' })}`,
//          'P973DT4H30M'
//        );
//      });
//      it('rounds to an increment of seconds', () => {
//        equal(
//          `${earlier.until(later, { smallestUnit: 'seconds', roundingIncrement: 15, roundingMode: 'halfExpand' })}`,
//          'P973DT4H17M'
//        );
//      });
//      it('rounds to an increment of milliseconds', () => {
//        equal(
//          `${earlier.until(later, { smallestUnit: 'milliseconds', roundingIncrement: 10, roundingMode: 'halfExpand' })}`,
//          'P973DT4H17M4.86S'
//        );
//      });
//      it('rounds to an increment of microseconds', () => {
//        equal(
//          `${earlier.until(later, { smallestUnit: 'microseconds', roundingIncrement: 10, roundingMode: 'halfExpand' })}`,
//          'P973DT4H17M4.8642S'
//        );
//      });
//      it('rounds to an increment of nanoseconds', () => {
//        equal(
//          `${earlier.until(later, { smallestUnit: 'nanoseconds', roundingIncrement: 10, roundingMode: 'halfExpand' })}`,
//          'P973DT4H17M4.86419753S'
//        );
//      });
//      it('valid hour increments divide into 24', () => {
//        [1, 2, 3, 4, 6, 8, 12].forEach((roundingIncrement) => {
//          const options = { smallestUnit: 'hours', roundingIncrement };
//          assert(earlier.until(later, options) instanceof Temporal.Duration);
//        });
//      });
//      ['minutes', 'seconds'].forEach((smallestUnit) => {
//        it(`valid ${smallestUnit} increments divide into 60`, () => {
//          [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30].forEach((roundingIncrement) => {
//            const options = { smallestUnit, roundingIncrement };
//            assert(earlier.until(later, options) instanceof Temporal.Duration);
//          });
//        });
//      });
//      ['milliseconds', 'microseconds', 'nanoseconds'].forEach((smallestUnit) => {
//        it(`valid ${smallestUnit} increments divide into 1000`, () => {
//          [1, 2, 4, 5, 8, 10, 20, 25, 40, 50, 100, 125, 200, 250, 500].forEach((roundingIncrement) => {
//            const options = { smallestUnit, roundingIncrement };
//            assert(earlier.until(later, options) instanceof Temporal.Duration);
//          });
//        });
//      });
//      it('throws on increments that do not divide evenly into the next highest', () => {
//        throws(() => earlier.until(later, { smallestUnit: 'hours', roundingIncrement: 11 }), RangeError);
//        throws(() => earlier.until(later, { smallestUnit: 'minutes', roundingIncrement: 29 }), RangeError);
//        throws(() => earlier.until(later, { smallestUnit: 'seconds', roundingIncrement: 29 }), RangeError);
//        throws(() => earlier.until(later, { smallestUnit: 'milliseconds', roundingIncrement: 29 }), RangeError);
//        throws(() => earlier.until(later, { smallestUnit: 'microseconds', roundingIncrement: 29 }), RangeError);
//        throws(() => earlier.until(later, { smallestUnit: 'nanoseconds', roundingIncrement: 29 }), RangeError);
//      });
//      it('throws on increments that are equal to the next highest', () => {
//        throws(() => earlier.until(later, { smallestUnit: 'hours', roundingIncrement: 24 }), RangeError);
//        throws(() => earlier.until(later, { smallestUnit: 'minutes', roundingIncrement: 60 }), RangeError);
//        throws(() => earlier.until(later, { smallestUnit: 'seconds', roundingIncrement: 60 }), RangeError);
//        throws(() => earlier.until(later, { smallestUnit: 'milliseconds', roundingIncrement: 1000 }), RangeError);
//        throws(() => earlier.until(later, { smallestUnit: 'microseconds', roundingIncrement: 1000 }), RangeError);
//        throws(() => earlier.until(later, { smallestUnit: 'nanoseconds', roundingIncrement: 1000 }), RangeError);
//      });
//      it('accepts singular units', () => {
//        expect(`${earlier.until(later, { largestUnit: 'year' })}`, `${earlier.until(later).toBe({ largestUnit: 'years' })}`);
//        expect(`${earlier.until(later, { smallestUnit: 'year' })}`, `${earlier.until(later).toBe({ smallestUnit: 'years' })}`);
//        expect(`${earlier.until(later, { largestUnit: 'month' })}`, `${earlier.until(later).toBe({ largestUnit: 'months' })}`);
//        equal(
//          `${earlier.until(later, { smallestUnit: 'month' })}`,
//          `${earlier.until(later, { smallestUnit: 'months' })}`
//        );
//        expect(`${earlier.until(later, { largestUnit: 'day' })}`, `${earlier.until(later).toBe({ largestUnit: 'days' })}`);
//        expect(`${earlier.until(later, { smallestUnit: 'day' })}`, `${earlier.until(later).toBe({ smallestUnit: 'days' })}`);
//        expect(`${earlier.until(later, { largestUnit: 'hour' })}`, `${earlier.until(later).toBe({ largestUnit: 'hours' })}`);
//        expect(`${earlier.until(later, { smallestUnit: 'hour' })}`, `${earlier.until(later).toBe({ smallestUnit: 'hours' })}`);
//        equal(
//          `${earlier.until(later, { largestUnit: 'minute' })}`,
//          `${earlier.until(later, { largestUnit: 'minutes' })}`
//        );
//        equal(
//          `${earlier.until(later, { smallestUnit: 'minute' })}`,
//          `${earlier.until(later, { smallestUnit: 'minutes' })}`
//        );
//        equal(
//          `${earlier.until(later, { largestUnit: 'second' })}`,
//          `${earlier.until(later, { largestUnit: 'seconds' })}`
//        );
//        equal(
//          `${earlier.until(later, { smallestUnit: 'second' })}`,
//          `${earlier.until(later, { smallestUnit: 'seconds' })}`
//        );
//        equal(
//          `${earlier.until(later, { largestUnit: 'millisecond' })}`,
//          `${earlier.until(later, { largestUnit: 'milliseconds' })}`
//        );
//        equal(
//          `${earlier.until(later, { smallestUnit: 'millisecond' })}`,
//          `${earlier.until(later, { smallestUnit: 'milliseconds' })}`
//        );
//        equal(
//          `${earlier.until(later, { largestUnit: 'microsecond' })}`,
//          `${earlier.until(later, { largestUnit: 'microseconds' })}`
//        );
//        equal(
//          `${earlier.until(later, { smallestUnit: 'microsecond' })}`,
//          `${earlier.until(later, { smallestUnit: 'microseconds' })}`
//        );
//        equal(
//          `${earlier.until(later, { largestUnit: 'nanosecond' })}`,
//          `${earlier.until(later, { largestUnit: 'nanoseconds' })}`
//        );
//        equal(
//          `${earlier.until(later, { smallestUnit: 'nanosecond' })}`,
//          `${earlier.until(later, { smallestUnit: 'nanoseconds' })}`
//        );
//      });
//      it('rounds relative to the receiver', () => {
//        const dt1 = PlainDateTime.from('2019-01-01');
//        const dt2 = PlainDateTime.from('2020-07-02');
//        expect(`${dt1.until(dt2, { smallestUnit: 'years', roundingMode: 'halfExpand' })}`).toBe('P2Y');
//        expect(`${dt2.until(dt1, { smallestUnit: 'years', roundingMode: 'halfExpand' })}`).toBe('-P1Y');
//      });
//    });

describe("DateTime.since()", () => {
  dt = PlainDateTime.from("1976-11-18T15:23:30.123456789");
  it("dt.since(earlier) === earlier.until(dt)", () => {
    const earlier = PlainDateTime.from({
      year: 1966,
      month: 3,
      day: 3,
      hour: 18,
    });
    expect(`${dt.since(earlier)}`).toBe(`${earlier.until(dt)}`);
  });
  it("casts argument", () => {
    expect(`${dt.since({ year: 2019, month: 10, day: 29, hour: 10 })}`).toBe(
      "-P15684DT18H36M29.876543211S"
    );
    expect(`${dt.since("2019-10-29T10:46:38.271986102")}`).toBe(
      "-P15684DT19H23M8.148529313S"
    );
  });
  it("defaults to returning days", () => {
    expect(`${feb21.since(feb20)}`).toBe("P366D");
    // expect(`${feb21.since(feb20, { largestUnit: "auto" })}`).toBe("P366D");
    expect(`${feb21.since(feb20, TimeComponent.Days)}`).toBe("P366D");
    // expect(
    //   `${PlainDateTime.from("2021-02-01T00:00:00.000000001").since(feb20)}`
    // ).toBe("P366DT0.000000001S");
    // expect(
    //   `${feb21.since(PlainDateTime.from("2020-02-01T00:00:00.000000001"))}`
    // ).toBe("P365DT23H59M59.999999999S");
  });
  it("can return lower or higher units", () => {
    expect(`${feb21.since(feb20, TimeComponent.Years)}`).toBe("P1Y");
    expect(`${feb21.since(feb20, TimeComponent.Months)}`).toBe("P12M");
    expect(`${feb21.since(feb20, TimeComponent.Hours)}`).toBe("PT8784H");
    expect(`${feb21.since(feb20, TimeComponent.Minutes)}`).toBe("PT527040M");
    expect(`${feb21.since(feb20, TimeComponent.Seconds)}`).toBe("PT31622400S");
  });
});

//      it('can return subseconds', () => {
//        const later = feb20.add({ days: 1, milliseconds: 250, microseconds: 250, nanoseconds: 250 });

//        const msDiff = later.since(feb20, { largestUnit: 'milliseconds' });
//        expect(msDiff.seconds).toBe(0);
//        expect(msDiff.milliseconds).toBe(86400250);
//        expect(msDiff.microseconds).toBe(250);
//        expect(msDiff.nanoseconds).toBe(250);

//        const µsDiff = later.since(feb20, { largestUnit: 'microseconds' });
//        expect(µsDiff.milliseconds).toBe(0);
//        expect(µsDiff.microseconds).toBe(86400250250);
//        expect(µsDiff.nanoseconds).toBe(250);

//        const nsDiff = later.since(feb20, { largestUnit: 'nanoseconds' });
//        expect(nsDiff.microseconds).toBe(0);
//        expect(nsDiff.nanoseconds).toBe(86400250250250);
//      });
//      it('does not include higher units than necessary', () => {
//        const lastFeb20 = PlainDateTime.from('2020-02-29T00:00');
//        const lastFeb21 = PlainDateTime.from('2021-02-28T00:00');
//        expect(`${lastFeb21.since(lastFeb20)}`).toBe('P365D');
//        expect(`${lastFeb21.since(lastFeb20, { largestUnit: 'months' })}`).toBe('P11M28D');
//        expect(`${lastFeb21.since(lastFeb20, { largestUnit: 'years' })}`).toBe('P11M28D');
//      });
//      it('weeks and months are mutually exclusive', () => {
//        const laterDateTime = dt.add({ days: 42, hours: 3 });
//        const weeksDifference = laterDateTime.since(dt, { largestUnit: 'weeks' });
//        notexpect(weeksDifference.weeks).toBe(0);
//        expect(weeksDifference.months).toBe(0);
//        const monthsDifference = laterDateTime.since(dt, { largestUnit: 'months' });
//        expect(monthsDifference.weeks).toBe(0);
//        notexpect(monthsDifference.months).toBe(0);
//      });
//      it('no two different calendars', () => {
//        const dt1 = new PlainDateTime(2000, 1, 1, 0, 0, 0, 0, 0, 0);
//        const dt2 = new PlainDateTime(2000, 1, 1, 0, 0, 0, 0, 0, 0, Temporal.Calendar.from('japanese'));
//        throws(() => dt1.since(dt2), RangeError);
//      });
//      it('options may only be an object or undefined', () => {
//        [null, 1, 'hello', true, Symbol('foo'), 1n].forEach((badOptions) =>
//          throws(() => feb21.since(feb20, badOptions), TypeError)
//        );
//        [{}, () => {}, undefined].forEach((options) => expect(`${feb21.since(feb20, options)}`).toBe('P366D'));
//      });
//      const earlier = PlainDateTime.from('2019-01-08T08:22:36.123456789');
//      const later = PlainDateTime.from('2021-09-07T12:39:40.987654321');
//      it('throws on disallowed or invalid smallestUnit', () => {
//        ['era', 'nonsense'].forEach((smallestUnit) => {
//          throws(() => later.since(earlier, { smallestUnit }), RangeError);
//        });
//      });
//      it('throws if smallestUnit is larger than largestUnit', () => {
//        const units = [
//          'years',
//          'months',
//          'weeks',
//          'days',
//          'hours',
//          'minutes',
//          'seconds',
//          'milliseconds',
//          'microseconds',
//          'nanoseconds'
//        ];
//        for (let largestIdx = 1; largestIdx < units.length; largestIdx++) {
//          for (let smallestIdx = 0; smallestIdx < largestIdx; smallestIdx++) {
//            const largestUnit = units[largestIdx];
//            const smallestUnit = units[smallestIdx];
//            throws(() => later.since(earlier, { largestUnit, smallestUnit }), RangeError);
//          }
//        }
//      });
//      it('assumes a different default for largestUnit if smallestUnit is larger than days', () => {
//        expect(`${later.since(earlier, { smallestUnit: 'years', roundingMode: 'halfExpand' })}`).toBe('P3Y');
//        expect(`${later.since(earlier, { smallestUnit: 'months', roundingMode: 'halfExpand' })}`).toBe('P32M');
//        expect(`${later.since(earlier, { smallestUnit: 'weeks', roundingMode: 'halfExpand' })}`).toBe('P139W');
//      });
//      it('throws on invalid roundingMode', () => {
//        throws(() => later.since(earlier, { roundingMode: 'cile' }), RangeError);
//      });
//      const incrementOneNearest = [
//        ['years', 'P3Y'],
//        ['months', 'P32M'],
//        ['weeks', 'P139W'],
//        ['days', 'P973D'],
//        ['hours', 'P973DT4H'],
//        ['minutes', 'P973DT4H17M'],
//        ['seconds', 'P973DT4H17M5S'],
//        ['milliseconds', 'P973DT4H17M4.864S'],
//        ['microseconds', 'P973DT4H17M4.864198S'],
//        ['nanoseconds', 'P973DT4H17M4.864197532S']
//      ];
//      incrementOneNearest.forEach(([smallestUnit, expected]) => {
//        const roundingMode = 'halfExpand';
//        it(`rounds to nearest ${smallestUnit}`, () => {
//          expect(`${later.since(earlier, { smallestUnit, roundingMode })}`).toBe(expected);
//          expect(`${earlier.since(later, { smallestUnit, roundingMode })}`).toBe(`-${expected}`);
//        });
//      });
//      const incrementOneCeil = [
//        ['years', 'P3Y', '-P2Y'],
//        ['months', 'P32M', '-P31M'],
//        ['weeks', 'P140W', '-P139W'],
//        ['days', 'P974D', '-P973D'],
//        ['hours', 'P973DT5H', '-P973DT4H'],
//        ['minutes', 'P973DT4H18M', '-P973DT4H17M'],
//        ['seconds', 'P973DT4H17M5S', '-P973DT4H17M4S'],
//        ['milliseconds', 'P973DT4H17M4.865S', '-P973DT4H17M4.864S'],
//        ['microseconds', 'P973DT4H17M4.864198S', '-P973DT4H17M4.864197S'],
//        ['nanoseconds', 'P973DT4H17M4.864197532S', '-P973DT4H17M4.864197532S']
//      ];
//      incrementOneCeil.forEach(([smallestUnit, expectedPositive, expectedNegative]) => {
//        const roundingMode = 'ceil';
//        it(`rounds up to ${smallestUnit}`, () => {
//          expect(`${later.since(earlier, { smallestUnit, roundingMode })}`).toBe(expectedPositive);
//          expect(`${earlier.since(later, { smallestUnit, roundingMode })}`).toBe(expectedNegative);
//        });
//      });
//      const incrementOneFloor = [
//        ['years', 'P2Y', '-P3Y'],
//        ['months', 'P31M', '-P32M'],
//        ['weeks', 'P139W', '-P140W'],
//        ['days', 'P973D', '-P974D'],
//        ['hours', 'P973DT4H', '-P973DT5H'],
//        ['minutes', 'P973DT4H17M', '-P973DT4H18M'],
//        ['seconds', 'P973DT4H17M4S', '-P973DT4H17M5S'],
//        ['milliseconds', 'P973DT4H17M4.864S', '-P973DT4H17M4.865S'],
//        ['microseconds', 'P973DT4H17M4.864197S', '-P973DT4H17M4.864198S'],
//        ['nanoseconds', 'P973DT4H17M4.864197532S', '-P973DT4H17M4.864197532S']
//      ];
//      incrementOneFloor.forEach(([smallestUnit, expectedPositive, expectedNegative]) => {
//        const roundingMode = 'floor';
//        it(`rounds down to ${smallestUnit}`, () => {
//          expect(`${later.since(earlier, { smallestUnit, roundingMode })}`).toBe(expectedPositive);
//          expect(`${earlier.since(later, { smallestUnit, roundingMode })}`).toBe(expectedNegative);
//        });
//      });
//      const incrementOneTrunc = [
//        ['years', 'P2Y'],
//        ['months', 'P31M'],
//        ['weeks', 'P139W'],
//        ['days', 'P973D'],
//        ['hours', 'P973DT4H'],
//        ['minutes', 'P973DT4H17M'],
//        ['seconds', 'P973DT4H17M4S'],
//        ['milliseconds', 'P973DT4H17M4.864S'],
//        ['microseconds', 'P973DT4H17M4.864197S'],
//        ['nanoseconds', 'P973DT4H17M4.864197532S']
//      ];
//      incrementOneTrunc.forEach(([smallestUnit, expected]) => {
//        const roundingMode = 'trunc';
//        it(`truncates to ${smallestUnit}`, () => {
//          expect(`${later.since(earlier, { smallestUnit, roundingMode })}`).toBe(expected);
//          expect(`${earlier.since(later, { smallestUnit, roundingMode })}`).toBe(`-${expected}`);
//        });
//      });
//      it('trunc is the default', () => {
//        expect(`${later.since(earlier, { smallestUnit: 'minutes' })}`).toBe('P973DT4H17M');
//        expect(`${later.since(earlier, { smallestUnit: 'seconds' })}`).toBe('P973DT4H17M4S');
//      });
//      it('rounds to an increment of hours', () => {
//        equal(
//          `${later.since(earlier, { smallestUnit: 'hours', roundingIncrement: 3, roundingMode: 'halfExpand' })}`,
//          'P973DT3H'
//        );
//      });
//      it('rounds to an increment of minutes', () => {
//        equal(
//          `${later.since(earlier, { smallestUnit: 'minutes', roundingIncrement: 30, roundingMode: 'halfExpand' })}`,
//          'P973DT4H30M'
//        );
//      });
//      it('rounds to an increment of seconds', () => {
//        equal(
//          `${later.since(earlier, { smallestUnit: 'seconds', roundingIncrement: 15, roundingMode: 'halfExpand' })}`,
//          'P973DT4H17M'
//        );
//      });
//      it('rounds to an increment of milliseconds', () => {
//        equal(
//          `${later.since(earlier, { smallestUnit: 'milliseconds', roundingIncrement: 10, roundingMode: 'halfExpand' })}`,
//          'P973DT4H17M4.86S'
//        );
//      });
//      it('rounds to an increment of microseconds', () => {
//        equal(
//          `${later.since(earlier, { smallestUnit: 'microseconds', roundingIncrement: 10, roundingMode: 'halfExpand' })}`,
//          'P973DT4H17M4.8642S'
//        );
//      });
//      it('rounds to an increment of nanoseconds', () => {
//        equal(
//          `${later.since(earlier, { smallestUnit: 'nanoseconds', roundingIncrement: 10, roundingMode: 'halfExpand' })}`,
//          'P973DT4H17M4.86419753S'
//        );
//      });
//      it('valid hour increments divide into 24', () => {
//        [1, 2, 3, 4, 6, 8, 12].forEach((roundingIncrement) => {
//          const options = { smallestUnit: 'hours', roundingIncrement };
//          assert(later.since(earlier, options) instanceof Temporal.Duration);
//        });
//      });
//      ['minutes', 'seconds'].forEach((smallestUnit) => {
//        it(`valid ${smallestUnit} increments divide into 60`, () => {
//          [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30].forEach((roundingIncrement) => {
//            const options = { smallestUnit, roundingIncrement };
//            assert(later.since(earlier, options) instanceof Temporal.Duration);
//          });
//        });
//      });
//      ['milliseconds', 'microseconds', 'nanoseconds'].forEach((smallestUnit) => {
//        it(`valid ${smallestUnit} increments divide into 1000`, () => {
//          [1, 2, 4, 5, 8, 10, 20, 25, 40, 50, 100, 125, 200, 250, 500].forEach((roundingIncrement) => {
//            const options = { smallestUnit, roundingIncrement };
//            assert(later.since(earlier, options) instanceof Temporal.Duration);
//          });
//        });
//      });
//      it('throws on increments that do not divide evenly into the next highest', () => {
//        throws(() => later.since(earlier, { smallestUnit: 'hours', roundingIncrement: 11 }), RangeError);
//        throws(() => later.since(earlier, { smallestUnit: 'minutes', roundingIncrement: 29 }), RangeError);
//        throws(() => later.since(earlier, { smallestUnit: 'seconds', roundingIncrement: 29 }), RangeError);
//        throws(() => later.since(earlier, { smallestUnit: 'milliseconds', roundingIncrement: 29 }), RangeError);
//        throws(() => later.since(earlier, { smallestUnit: 'microseconds', roundingIncrement: 29 }), RangeError);
//        throws(() => later.since(earlier, { smallestUnit: 'nanoseconds', roundingIncrement: 29 }), RangeError);
//      });
//      it('throws on increments that are equal to the next highest', () => {
//        throws(() => later.since(earlier, { smallestUnit: 'hours', roundingIncrement: 24 }), RangeError);
//        throws(() => later.since(earlier, { smallestUnit: 'minutes', roundingIncrement: 60 }), RangeError);
//        throws(() => later.since(earlier, { smallestUnit: 'seconds', roundingIncrement: 60 }), RangeError);
//        throws(() => later.since(earlier, { smallestUnit: 'milliseconds', roundingIncrement: 1000 }), RangeError);
//        throws(() => later.since(earlier, { smallestUnit: 'microseconds', roundingIncrement: 1000 }), RangeError);
//        throws(() => later.since(earlier, { smallestUnit: 'nanoseconds', roundingIncrement: 1000 }), RangeError);
//      });
//      it('accepts singular units', () => {
//        expect(`${later.since(earlier, { largestUnit: 'year' })}`, `${later.since(earlier).toBe({ largestUnit: 'years' })}`);
//        expect(`${later.since(earlier, { smallestUnit: 'year' })}`, `${later.since(earlier).toBe({ smallestUnit: 'years' })}`);
//        expect(`${later.since(earlier, { largestUnit: 'month' })}`, `${later.since(earlier).toBe({ largestUnit: 'months' })}`);
//        equal(
//          `${later.since(earlier, { smallestUnit: 'month' })}`,
//          `${later.since(earlier, { smallestUnit: 'months' })}`
//        );
//        expect(`${later.since(earlier, { largestUnit: 'day' })}`, `${later.since(earlier).toBe({ largestUnit: 'days' })}`);
//        expect(`${later.since(earlier, { smallestUnit: 'day' })}`, `${later.since(earlier).toBe({ smallestUnit: 'days' })}`);
//        expect(`${later.since(earlier, { largestUnit: 'hour' })}`, `${later.since(earlier).toBe({ largestUnit: 'hours' })}`);
//        expect(`${later.since(earlier, { smallestUnit: 'hour' })}`, `${later.since(earlier).toBe({ smallestUnit: 'hours' })}`);
//        equal(
//          `${later.since(earlier, { largestUnit: 'minute' })}`,
//          `${later.since(earlier, { largestUnit: 'minutes' })}`
//        );
//        equal(
//          `${later.since(earlier, { smallestUnit: 'minute' })}`,
//          `${later.since(earlier, { smallestUnit: 'minutes' })}`
//        );
//        equal(
//          `${later.since(earlier, { largestUnit: 'second' })}`,
//          `${later.since(earlier, { largestUnit: 'seconds' })}`
//        );
//        equal(
//          `${later.since(earlier, { smallestUnit: 'second' })}`,
//          `${later.since(earlier, { smallestUnit: 'seconds' })}`
//        );
//        equal(
//          `${later.since(earlier, { largestUnit: 'millisecond' })}`,
//          `${later.since(earlier, { largestUnit: 'milliseconds' })}`
//        );
//        equal(
//          `${later.since(earlier, { smallestUnit: 'millisecond' })}`,
//          `${later.since(earlier, { smallestUnit: 'milliseconds' })}`
//        );
//        equal(
//          `${later.since(earlier, { largestUnit: 'microsecond' })}`,
//          `${later.since(earlier, { largestUnit: 'microseconds' })}`
//        );
//        equal(
//          `${later.since(earlier, { smallestUnit: 'microsecond' })}`,
//          `${later.since(earlier, { smallestUnit: 'microseconds' })}`
//        );
//        equal(
//          `${later.since(earlier, { largestUnit: 'nanosecond' })}`,
//          `${later.since(earlier, { largestUnit: 'nanoseconds' })}`
//        );
//        equal(
//          `${later.since(earlier, { smallestUnit: 'nanosecond' })}`,
//          `${later.since(earlier, { smallestUnit: 'nanoseconds' })}`
//        );
//      });
//      it('rounds relative to the receiver', () => {
//        const dt1 = PlainDateTime.from('2019-01-01');
//        const dt2 = PlainDateTime.from('2020-07-02');
//        expect(`${dt2.since(dt1, { smallestUnit: 'years', roundingMode: 'halfExpand' })}`).toBe('P1Y');
//        expect(`${dt1.since(dt2, { smallestUnit: 'years', roundingMode: 'halfExpand' })}`).toBe('-P2Y');
//      });
//    });
//    describe('DateTime.round works', () => {
//      const dt = PlainDateTime.from('1976-11-18T14:23:30.123456789');
//      it('throws without parameter', () => {
//        throws(() => dt.round(), TypeError);
//      });
//      it('throws without required smallestUnit parameter', () => {
//        throws(() => dt.round({}), RangeError);
//        throws(() => dt.round({ roundingIncrement: 1, roundingMode: 'ceil' }), RangeError);
//      });
//      it('throws on disallowed or invalid smallestUnit', () => {
//        ['era', 'year', 'month', 'week', 'years', 'months', 'weeks', 'nonsense'].forEach((smallestUnit) => {
//          throws(() => dt.round({ smallestUnit }), RangeError);
//        });
//      });
//      it('throws on invalid roundingMode', () => {
//        throws(() => dt.round({ smallestUnit: 'second', roundingMode: 'cile' }), RangeError);
//      });
//      const incrementOneNearest = [
//        ['day', '1976-11-19T00:00:00'],
//        ['hour', '1976-11-18T14:00:00'],
//        ['minute', '1976-11-18T14:24:00'],
//        ['second', '1976-11-18T14:23:30'],
//        ['millisecond', '1976-11-18T14:23:30.123'],
//        ['microsecond', '1976-11-18T14:23:30.123457'],
//        ['nanosecond', '1976-11-18T14:23:30.123456789']
//      ];
//      incrementOneNearest.forEach(([smallestUnit, expected]) => {
//        it(`rounds to nearest ${smallestUnit}`, () =>
//          expect(`${dt.round({ smallestUnit, roundingMode: 'halfExpand' })}`).toBe(expected));
//      });
//      const incrementOneCeil = [
//        ['day', '1976-11-19T00:00:00'],
//        ['hour', '1976-11-18T15:00:00'],
//        ['minute', '1976-11-18T14:24:00'],
//        ['second', '1976-11-18T14:23:31'],
//        ['millisecond', '1976-11-18T14:23:30.124'],
//        ['microsecond', '1976-11-18T14:23:30.123457'],
//        ['nanosecond', '1976-11-18T14:23:30.123456789']
//      ];
//      incrementOneCeil.forEach(([smallestUnit, expected]) => {
//        it(`rounds up to ${smallestUnit}`, () => expect(`${dt.round({ smallestUnit, roundingMode: 'ceil' })}`).toBe(expected));
//      });
//      const incrementOneFloor = [
//        ['day', '1976-11-18T00:00:00'],
//        ['hour', '1976-11-18T14:00:00'],
//        ['minute', '1976-11-18T14:23:00'],
//        ['second', '1976-11-18T14:23:30'],
//        ['millisecond', '1976-11-18T14:23:30.123'],
//        ['microsecond', '1976-11-18T14:23:30.123456'],
//        ['nanosecond', '1976-11-18T14:23:30.123456789']
//      ];
//      incrementOneFloor.forEach(([smallestUnit, expected]) => {
//        it(`rounds down to ${smallestUnit}`, () =>
//          expect(`${dt.round({ smallestUnit, roundingMode: 'floor' })}`).toBe(expected));
//        it(`truncates to ${smallestUnit}`, () => expect(`${dt.round({ smallestUnit, roundingMode: 'trunc' })}`).toBe(expected));
//      });
//      it('halfExpand is the default', () => {
//        expect(`${dt.round({ smallestUnit: 'minute' })}`).toBe('1976-11-18T14:24:00');
//        expect(`${dt.round({ smallestUnit: 'second' })}`).toBe('1976-11-18T14:23:30');
//      });
//      it('rounding down is towards the Big Bang, not towards 1 BCE', () => {
//        const dt2 = PlainDateTime.from('-000099-12-15T12:00:00.5Z');
//        const smallestUnit = 'second';
//        expect(`${dt2.round({ smallestUnit, roundingMode: 'ceil' })}`).toBe('-000099-12-15T12:00:01');
//        expect(`${dt2.round({ smallestUnit, roundingMode: 'floor' })}`).toBe('-000099-12-15T12:00:00');
//        expect(`${dt2.round({ smallestUnit, roundingMode: 'trunc' })}`).toBe('-000099-12-15T12:00:00');
//        expect(`${dt2.round({ smallestUnit, roundingMode: 'halfExpand' })}`).toBe('-000099-12-15T12:00:01');
//      });
//      it('rounds to an increment of hours', () => {
//        expect(`${dt.round({ smallestUnit: 'hour', roundingIncrement: 4 })}`).toBe('1976-11-18T16:00:00');
//      });
//      it('rounds to an increment of minutes', () => {
//        expect(`${dt.round({ smallestUnit: 'minute', roundingIncrement: 15 })}`).toBe('1976-11-18T14:30:00');
//      });
//      it('rounds to an increment of seconds', () => {
//        expect(`${dt.round({ smallestUnit: 'second', roundingIncrement: 30 })}`).toBe('1976-11-18T14:23:30');
//      });
//      it('rounds to an increment of milliseconds', () => {
//        expect(`${dt.round({ smallestUnit: 'millisecond', roundingIncrement: 10 })}`).toBe('1976-11-18T14:23:30.12');
//      });
//      it('rounds to an increment of microseconds', () => {
//        expect(`${dt.round({ smallestUnit: 'microsecond', roundingIncrement: 10 })}`).toBe('1976-11-18T14:23:30.12346');
//      });
//      it('rounds to an increment of nanoseconds', () => {
//        expect(`${dt.round({ smallestUnit: 'nanosecond', roundingIncrement: 10 })}`).toBe('1976-11-18T14:23:30.12345679');
//      });
//      it('1 day is a valid increment', () => {
//        expect(`${dt.round({ smallestUnit: 'day', roundingIncrement: 1 })}`).toBe('1976-11-19T00:00:00');
//      });
//      it('valid hour increments divide into 24', () => {
//        const smallestUnit = 'hour';
//        [1, 2, 3, 4, 6, 8, 12].forEach((roundingIncrement) => {
//          assert(dt.round({ smallestUnit, roundingIncrement }) instanceof PlainDateTime);
//        });
//      });
//      ['minute', 'second'].forEach((smallestUnit) => {
//        it(`valid ${smallestUnit} increments divide into 60`, () => {
//          [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30].forEach((roundingIncrement) => {
//            assert(dt.round({ smallestUnit, roundingIncrement }) instanceof PlainDateTime);
//          });
//        });
//      });
//      ['millisecond', 'microsecond', 'nanosecond'].forEach((smallestUnit) => {
//        it(`valid ${smallestUnit} increments divide into 1000`, () => {
//          [1, 2, 4, 5, 8, 10, 20, 25, 40, 50, 100, 125, 200, 250, 500].forEach((roundingIncrement) => {
//            assert(dt.round({ smallestUnit, roundingIncrement }) instanceof PlainDateTime);
//          });
//        });
//      });
//      it('throws on increments that do not divide evenly into the next highest', () => {
//        throws(() => dt.round({ smallestUnit: 'day', roundingIncrement: 29 }), RangeError);
//        throws(() => dt.round({ smallestUnit: 'hour', roundingIncrement: 29 }), RangeError);
//        throws(() => dt.round({ smallestUnit: 'minute', roundingIncrement: 29 }), RangeError);
//        throws(() => dt.round({ smallestUnit: 'second', roundingIncrement: 29 }), RangeError);
//        throws(() => dt.round({ smallestUnit: 'millisecond', roundingIncrement: 29 }), RangeError);
//        throws(() => dt.round({ smallestUnit: 'microsecond', roundingIncrement: 29 }), RangeError);
//        throws(() => dt.round({ smallestUnit: 'nanosecond', roundingIncrement: 29 }), RangeError);
//      });
//      it('throws on increments that are equal to the next highest', () => {
//        throws(() => dt.round({ smallestUnit: 'hour', roundingIncrement: 24 }), RangeError);
//        throws(() => dt.round({ smallestUnit: 'minute', roundingIncrement: 60 }), RangeError);
//        throws(() => dt.round({ smallestUnit: 'second', roundingIncrement: 60 }), RangeError);
//        throws(() => dt.round({ smallestUnit: 'millisecond', roundingIncrement: 1000 }), RangeError);
//        throws(() => dt.round({ smallestUnit: 'microsecond', roundingIncrement: 1000 }), RangeError);
//        throws(() => dt.round({ smallestUnit: 'nanosecond', roundingIncrement: 1000 }), RangeError);
//      });
//      const bal = PlainDateTime.from('1976-11-18T23:59:59.999999999');
//      ['day', 'hour', 'minute', 'second', 'millisecond', 'microsecond'].forEach((smallestUnit) => {
//        it(`balances to next ${smallestUnit}`, () => {
//          expect(`${bal.round({ smallestUnit })}`).toBe('1976-11-19T00:00:00');
//        });
//      });
//      it('accepts plural units', () => {
//        assert(dt.round({ smallestUnit: 'days' }).equals(dt.round({ smallestUnit: 'day' })));
//        assert(dt.round({ smallestUnit: 'hours' }).equals(dt.round({ smallestUnit: 'hour' })));
//        assert(dt.round({ smallestUnit: 'minutes' }).equals(dt.round({ smallestUnit: 'minute' })));
//        assert(dt.round({ smallestUnit: 'seconds' }).equals(dt.round({ smallestUnit: 'second' })));
//        assert(dt.round({ smallestUnit: 'milliseconds' }).equals(dt.round({ smallestUnit: 'millisecond' })));
//        assert(dt.round({ smallestUnit: 'microseconds' }).equals(dt.round({ smallestUnit: 'microsecond' })));
//        assert(dt.round({ smallestUnit: 'nanoseconds' }).equals(dt.round({ smallestUnit: 'nanosecond' })));
//      });
//    });
//    describe('DateTime.from() works', () => {
//      it('DateTime.from("1976-11-18 15:23:30")', () =>
//        expect(`${PlainDateTime.from('1976-11-18 15:23:30')}`).toBe('1976-11-18T15:23:30'));
//      it('DateTime.from("1976-11-18 15:23:30.001")', () =>
//        expect(`${PlainDateTime.from('1976-11-18 15:23:30.001')}`).toBe('1976-11-18T15:23:30.001'));
//      it('DateTime.from("1976-11-18 15:23:30.001123")', () =>
//        expect(`${PlainDateTime.from('1976-11-18 15:23:30.001123')}`).toBe('1976-11-18T15:23:30.001123'));
//      it('DateTime.from("1976-11-18 15:23:30.001123456")', () =>
//        expect(`${PlainDateTime.from('1976-11-18 15:23:30.001123456')}`).toBe('1976-11-18T15:23:30.001123456'));
//      it('DateTime.from(1976-11-18) is not the same object', () => {
//        const orig = new PlainDateTime(1976, 11, 18, 15, 23, 20, 123, 456, 789);
//        const actual = PlainDateTime.from(orig);
//        notexpect(actual).toBe(orig);
//      });
//      it('DateTime.from({ year: 1976, month: 11, day: 18 }) == 1976-11-18T00:00:00', () =>
//        expect(`${PlainDateTime.from({ year: 1976, month: 11, monthCode: 'M11', day: 18 })}`).toBe('1976-11-18T00:00:00'));
//      it('can be constructed with month and without monthCode', () =>
//        expect(`${PlainDateTime.from({ year: 1976, month: 11, day: 18 })}`).toBe('1976-11-18T00:00:00'));
//      it('can be constructed with monthCode and without month', () =>
//        expect(`${PlainDateTime.from({ year: 1976, monthCode: 'M11', day: 18 })}`).toBe('1976-11-18T00:00:00'));
//      it('month and monthCode must agree', () =>
//        throws(() => PlainDateTime.from({ year: 1976, month: 11, monthCode: 'M12', day: 18 }), RangeError));
//      it('DateTime.from({ year: 1976, month: 11, day: 18, millisecond: 123 }) == 1976-11-18T00:00:00.123', () =>
//        expect(`${PlainDateTime.from({ year: 1976, month: 11, day: 18, millisecond: 123 })}`).toBe('1976-11-18T00:00:00.123'));
//      it('DateTime.from({ year: 1976, day: 18, hour: 15, minute: 23, second: 30, millisecond: 123 }) throws', () =>
//        throws(
//          () => PlainDateTime.from({ year: 1976, day: 18, hour: 15, minute: 23, second: 30, millisecond: 123 }),
//          TypeError
//        ));
//      it('DateTime.from({}) throws', () => throws(() => PlainDateTime.from({}), TypeError));
//      it('DateTime.from(required prop undefined) throws', () =>
//        throws(() => PlainDateTime.from({ year: 1976, month: undefined, monthCode: undefined, day: 18 }), TypeError));
//      it('DateTime.from(ISO string leap second) is constrained', () => {
//        expect(`${PlainDateTime.from('2016-12-31T23:59:60')}`).toBe('2016-12-31T23:59:59');
//      });
//      it('DateTime.from(number) is converted to string', () =>
//        assert(PlainDateTime.from(19761118).equals(PlainDateTime.from('19761118'))));
//      describe('Overflow', () => {
//        const bad = { year: 2019, month: 1, day: 32 };
//        it('reject', () => throws(() => PlainDateTime.from(bad, { overflow: 'reject' }), RangeError));
//        it('constrain', () => {
//          expect(`${PlainDateTime.from(bad)}`).toBe('2019-01-31T00:00:00');
//          expect(`${PlainDateTime.from(bad, { overflow: 'constrain' })}`).toBe('2019-01-31T00:00:00');
//        });
//        it('throw when bad overflow', () => {
//          [new PlainDateTime(1976, 11, 18, 15, 23), { year: 2019, month: 1, day: 1 }, '2019-01-31T00:00'].forEach(
//            (input) => {
//              ['', 'CONSTRAIN', 'balance', 3, null].forEach((overflow) =>
//                throws(() => PlainDateTime.from(input, { overflow }), RangeError)
//              );
//            }
//          );
//        });
//        const leap = { year: 2016, month: 12, day: 31, hour: 23, minute: 59, second: 60 };
//        it('reject leap second', () => throws(() => PlainDateTime.from(leap, { overflow: 'reject' }), RangeError));
//        it('constrain leap second', () => expect(`${PlainDateTime.from(leap)}`).toBe('2016-12-31T23:59:59'));
//        it('constrain has no effect on invalid ISO string', () => {
//          throws(() => PlainDateTime.from('2020-13-34T24:60', { overflow: 'constrain' }), RangeError);
//        });
//      });
//      it('variant time separators', () => {
//        expect(`${PlainDateTime.from('1976-11-18t15:23Z')}`).toBe('1976-11-18T15:23:00');
//        expect(`${PlainDateTime.from('1976-11-18 15:23Z')}`).toBe('1976-11-18T15:23:00');
//      });
//      it('any number of decimal places', () => {
//        expect(`${PlainDateTime.from('1976-11-18T15:23:30.1Z')}`).toBe('1976-11-18T15:23:30.1');
//        expect(`${PlainDateTime.from('1976-11-18T15:23:30.12Z')}`).toBe('1976-11-18T15:23:30.12');
//        expect(`${PlainDateTime.from('1976-11-18T15:23:30.123Z')}`).toBe('1976-11-18T15:23:30.123');
//        expect(`${PlainDateTime.from('1976-11-18T15:23:30.1234Z')}`).toBe('1976-11-18T15:23:30.1234');
//        expect(`${PlainDateTime.from('1976-11-18T15:23:30.12345Z')}`).toBe('1976-11-18T15:23:30.12345');
//        expect(`${PlainDateTime.from('1976-11-18T15:23:30.123456Z')}`).toBe('1976-11-18T15:23:30.123456');
//        expect(`${PlainDateTime.from('1976-11-18T15:23:30.1234567Z')}`).toBe('1976-11-18T15:23:30.1234567');
//        expect(`${PlainDateTime.from('1976-11-18T15:23:30.12345678Z')}`).toBe('1976-11-18T15:23:30.12345678');
//        expect(`${PlainDateTime.from('1976-11-18T15:23:30.123456789Z')}`).toBe('1976-11-18T15:23:30.123456789');
//      });
//      it('variant decimal separator', () => {
//        expect(`${PlainDateTime.from('1976-11-18T15:23:30,12Z')}`).toBe('1976-11-18T15:23:30.12');
//      });
//      it('variant minus sign', () => {
//        expect(`${PlainDateTime.from('1976-11-18T15:23:30.12\u221202:00')}`).toBe('1976-11-18T15:23:30.12');
//        expect(`${PlainDateTime.from('\u2212009999-11-18T15:23:30.12')}`).toBe('-009999-11-18T15:23:30.12');
//      });
//      it('mixture of basic and extended format', () => {
//        expect(`${PlainDateTime.from('1976-11-18T152330.1+00:00')}`).toBe('1976-11-18T15:23:30.1');
//        expect(`${PlainDateTime.from('19761118T15:23:30.1+00:00')}`).toBe('1976-11-18T15:23:30.1');
//        expect(`${PlainDateTime.from('1976-11-18T15:23:30.1+0000')}`).toBe('1976-11-18T15:23:30.1');
//        expect(`${PlainDateTime.from('1976-11-18T152330.1+0000')}`).toBe('1976-11-18T15:23:30.1');
//        expect(`${PlainDateTime.from('19761118T15:23:30.1+0000')}`).toBe('1976-11-18T15:23:30.1');
//        expect(`${PlainDateTime.from('19761118T152330.1+00:00')}`).toBe('1976-11-18T15:23:30.1');
//        expect(`${PlainDateTime.from('19761118T152330.1+0000')}`).toBe('1976-11-18T15:23:30.1');
//        expect(`${PlainDateTime.from('+001976-11-18T152330.1+00:00')}`).toBe('1976-11-18T15:23:30.1');
//        expect(`${PlainDateTime.from('+0019761118T15:23:30.1+00:00')}`).toBe('1976-11-18T15:23:30.1');
//        expect(`${PlainDateTime.from('+001976-11-18T15:23:30.1+0000')}`).toBe('1976-11-18T15:23:30.1');
//        expect(`${PlainDateTime.from('+001976-11-18T152330.1+0000')}`).toBe('1976-11-18T15:23:30.1');
//        expect(`${PlainDateTime.from('+0019761118T15:23:30.1+0000')}`).toBe('1976-11-18T15:23:30.1');
//        expect(`${PlainDateTime.from('+0019761118T152330.1+00:00')}`).toBe('1976-11-18T15:23:30.1');
//        expect(`${PlainDateTime.from('+0019761118T152330.1+0000')}`).toBe('1976-11-18T15:23:30.1');
//      });
//      it('optional parts', () => {
//        expect(`${PlainDateTime.from('1976-11-18T15:23:30+00')}`).toBe('1976-11-18T15:23:30');
//        expect(`${PlainDateTime.from('1976-11-18T15')}`).toBe('1976-11-18T15:00:00');
//        expect(`${PlainDateTime.from('1976-11-18')}`).toBe('1976-11-18T00:00:00');
//      });
//      it('no junk at end of string', () =>
//        throws(() => PlainDateTime.from('1976-11-18T15:23:30.123456789junk'), RangeError));
//      it('ignores if a timezone is specified', () =>
//        expect(`${PlainDateTime.from('2020-01-01T01:23:45[Asia/Kolkata]')}`).toBe('2020-01-01T01:23:45'));
//      it('options may only be an object or undefined', () => {
//        [null, 1, 'hello', true, Symbol('foo'), 1n].forEach((badOptions) =>
//          throws(() => PlainDateTime.from({ year: 1976, month: 11, day: 18 }, badOptions), TypeError)
//        );
//        [{}, () => {}, undefined].forEach((options) =>
//          expect(`${PlainDateTime.from({ year: 1976, month: 11, day: 18 }, options)}`).toBe('1976-11-18T00:00:00')
//        );
//      });
//      it('object must contain at least the required correctly-spelled properties', () => {
//        throws(() => PlainDateTime.from({}), TypeError);
//        throws(() => PlainDateTime.from({ year: 1976, months: 11, day: 18 }), TypeError);
//      });
//      it('incorrectly-spelled properties are ignored', () => {
//        expect(`${PlainDateTime.from({ year: 1976, month: 11, day: 18, hours: 12 })}`).toBe('1976-11-18T00:00:00');
//      });
//    });
//    describe('DateTime.toZonedDateTime()', () => {
//      it('works', () => {
//        const dt = Temporal.PlainDateTime.from('2020-01-01T00:00');
//        const zdt = dt.toZonedDateTime('America/Los_Angeles');
//        expect(zdt.toString()).toBe('2020-01-01T00:00:00-08:00[America/Los_Angeles]');
//      });
//      it('works with disambiguation option', () => {
//        const dt = Temporal.PlainDateTime.from('2020-03-08T02:00');
//        const zdt = dt.toZonedDateTime('America/Los_Angeles', { disambiguation: 'earlier' });
//        expect(zdt.toString()).toBe('2020-03-08T01:00:00-08:00[America/Los_Angeles]');
//      });
//      it('datetime with multiple instants - Fall DST in Brazil', () => {
//        const dt = PlainDateTime.from('2019-02-16T23:45');
//        expect(`${dt.toZonedDateTime('America/Sao_Paulo')}`).toBe('2019-02-16T23:45:00-02:00[America/Sao_Paulo]');
//        equal(
//          `${dt.toZonedDateTime('America/Sao_Paulo', { disambiguation: 'compatible' })}`,
//          '2019-02-16T23:45:00-02:00[America/Sao_Paulo]'
//        );
//        equal(
//          `${dt.toZonedDateTime('America/Sao_Paulo', { disambiguation: 'earlier' })}`,
//          '2019-02-16T23:45:00-02:00[America/Sao_Paulo]'
//        );
//        equal(
//          `${dt.toZonedDateTime('America/Sao_Paulo', { disambiguation: 'later' })}`,
//          '2019-02-16T23:45:00-03:00[America/Sao_Paulo]'
//        );
//        throws(() => dt.toZonedDateTime('America/Sao_Paulo', { disambiguation: 'reject' }), RangeError);
//      });
//      it('datetime with multiple instants - Spring DST in Los Angeles', () => {
//        const dt = PlainDateTime.from('2020-03-08T02:30');
//        expect(`${dt.toZonedDateTime('America/Los_Angeles')}`).toBe('2020-03-08T03:30:00-07:00[America/Los_Angeles]');
//        equal(
//          `${dt.toZonedDateTime('America/Los_Angeles', { disambiguation: 'compatible' })}`,
//          '2020-03-08T03:30:00-07:00[America/Los_Angeles]'
//        );
//        equal(
//          `${dt.toZonedDateTime('America/Los_Angeles', { disambiguation: 'earlier' })}`,
//          '2020-03-08T01:30:00-08:00[America/Los_Angeles]'
//        );
//        equal(
//          `${dt.toZonedDateTime('America/Los_Angeles', { disambiguation: 'later' })}`,
//          '2020-03-08T03:30:00-07:00[America/Los_Angeles]'
//        );
//        throws(() => dt.toZonedDateTime('America/Los_Angeles', { disambiguation: 'reject' }), RangeError);
//      });
//      it('outside of Instant range', () => {
//        const max = Temporal.PlainDateTime.from('+275760-09-13T23:59:59.999999999');
//        throws(() => max.toZonedDateTime('America/Godthab'), RangeError);
//      });
//      it('throws on bad disambiguation', () => {
//        ['', 'EARLIER', 'xyz', 3, null].forEach((disambiguation) =>
//          throws(() => PlainDateTime.from('2019-10-29T10:46').toZonedDateTime('UTC', { disambiguation }), RangeError)
//        );
//      });
//      it('options may only be an object or undefined', () => {
//        const dt = PlainDateTime.from('2019-10-29T10:46:38.271986102');
//        [null, 1, 'hello', true, Symbol('foo'), 1n].forEach((badOptions) =>
//          throws(() => dt.toZonedDateTime('America/Sao_Paulo', badOptions), TypeError)
//        );
//        [{}, () => {}, undefined].forEach((options) =>
//          equal(
//            `${dt.toZonedDateTime('America/Sao_Paulo', options)}`,
//            '2019-10-29T10:46:38.271986102-03:00[America/Sao_Paulo]'
//          )
//        );
//      });
//    });
//    describe('Min/max range', () => {
//      it('constructing from numbers', () => {
//        throws(() => new PlainDateTime(-271821, 4, 19, 0, 0, 0, 0, 0, 0), RangeError);
//        throws(() => new PlainDateTime(275760, 9, 14, 0, 0, 0, 0, 0, 0), RangeError);
//        expect(`${new PlainDateTime(-271821, 4, 19, 0, 0, 0, 0, 0, 1)}`).toBe('-271821-04-19T00:00:00.000000001');
//        expect(`${new PlainDateTime(275760, 9, 13, 23, 59, 59, 999, 999, 999)}`).toBe('+275760-09-13T23:59:59.999999999');
//      });
//      it('constructing from property bag', () => {
//        const tooEarly = { year: -271821, month: 4, day: 19 };
//        const tooLate = { year: 275760, month: 9, day: 14 };
//        ['reject', 'constrain'].forEach((overflow) => {
//          [tooEarly, tooLate].forEach((props) => {
//            throws(() => PlainDateTime.from(props, { overflow }), RangeError);
//          });
//        });
//        equal(
//          `${PlainDateTime.from({ year: -271821, month: 4, day: 19, nanosecond: 1 })}`,
//          '-271821-04-19T00:00:00.000000001'
//        );
//        equal(
//          `${PlainDateTime.from({
//            year: 275760,
//            month: 9,
//            day: 13,
//            hour: 23,
//            minute: 59,
//            second: 59,
//            millisecond: 999,
//            microsecond: 999,
//            nanosecond: 999
//          })}`,
//          '+275760-09-13T23:59:59.999999999'
//        );
//      });
//      it('constructing from ISO string', () => {
//        ['reject', 'constrain'].forEach((overflow) => {
//          ['-271821-04-19T00:00', '+275760-09-14T00:00'].forEach((str) => {
//            throws(() => PlainDateTime.from(str, { overflow }), RangeError);
//          });
//        });
//        expect(`${PlainDateTime.from('-271821-04-19T00:00:00.000000001')}`).toBe('-271821-04-19T00:00:00.000000001');
//        expect(`${PlainDateTime.from('+275760-09-13T23:59:59.999999999')}`).toBe('+275760-09-13T23:59:59.999999999');
//      });
//      it('converting from Instant', () => {
//        const min = Temporal.Instant.from('-271821-04-20T00:00Z');
//        const offsetMin = Temporal.TimeZone.from('-23:59');
//        expect(`${offsetMin.getPlainDateTimeFor(min, 'iso8601')}`).toBe('-271821-04-19T00:01:00');
//        const max = Temporal.Instant.from('+275760-09-13T00:00Z');
//        const offsetMax = Temporal.TimeZone.from('+23:59');
//        expect(`${offsetMax.getPlainDateTimeFor(max, 'iso8601')}`).toBe('+275760-09-13T23:59:00');
//      });
//      it('converting from Date and Time', () => {
//        const midnight = Temporal.PlainTime.from('00:00');
//        const firstNs = Temporal.PlainTime.from('00:00:00.000000001');
//        const lastNs = Temporal.PlainTime.from('23:59:59.999999999');
//        const min = Temporal.PlainDate.from('-271821-04-19');
//        const max = Temporal.PlainDate.from('+275760-09-13');
//        throws(() => min.toPlainDateTime(midnight), RangeError);
//        throws(() => midnight.toPlainDateTime(min), RangeError);
//        expect(`${min.toPlainDateTime(firstNs)}`).toBe('-271821-04-19T00:00:00.000000001');
//        expect(`${firstNs.toPlainDateTime(min)}`).toBe('-271821-04-19T00:00:00.000000001');
//        expect(`${max.toPlainDateTime(lastNs)}`).toBe('+275760-09-13T23:59:59.999999999');
//        expect(`${lastNs.toPlainDateTime(max)}`).toBe('+275760-09-13T23:59:59.999999999');
//      });
//      it('adding and subtracting beyond limit', () => {
//        const min = PlainDateTime.from('-271821-04-19T00:00:00.000000001');
//        const max = PlainDateTime.from('+275760-09-13T23:59:59.999999999');
//        ['reject', 'constrain'].forEach((overflow) => {
//          throws(() => min.subtract({ nanoseconds: 1 }, { overflow }), RangeError);
//          throws(() => max.add({ nanoseconds: 1 }, { overflow }), RangeError);
//        });
//      });
//      it('rounding beyond limit', () => {
//        const min = PlainDateTime.from('-271821-04-19T00:00:00.000000001');
//        const max = PlainDateTime.from('+275760-09-13T23:59:59.999999999');
//        ['day', 'hour', 'minute', 'second', 'millisecond', 'microsecond'].forEach((smallestUnit) => {
//          throws(() => min.round({ smallestUnit, roundingMode: 'floor' }), RangeError);
//          throws(() => max.round({ smallestUnit, roundingMode: 'ceil' }), RangeError);
//        });
//      });
//    });
//    describe('dateTime.getISOFields() works', () => {
//      const dt1 = PlainDateTime.from('1976-11-18T15:23:30.123456789');
//      const fields = dt1.getISOFields();
//      it('fields', () => {
//        expect(fields.isoYear).toBe(1976);
//        expect(fields.isoMonth).toBe(11);
//        expect(fields.isoDay).toBe(18);
//        expect(fields.isoHour).toBe(15);
//        expect(fields.isoMinute).toBe(23);
//        expect(fields.isoSecond).toBe(30);
//        expect(fields.isoMillisecond).toBe(123);
//        expect(fields.isoMicrosecond).toBe(456);
//        expect(fields.isoNanosecond).toBe(789);
//        expect(fields.calendar.id).toBe('iso8601');
//      });
//      it('enumerable', () => {
//        const fields2 = { ...fields };
//        expect(fields2.isoYear).toBe(1976);
//        expect(fields2.isoMonth).toBe(11);
//        expect(fields2.isoDay).toBe(18);
//        expect(fields2.isoHour).toBe(15);
//        expect(fields2.isoMinute).toBe(23);
//        expect(fields2.isoSecond).toBe(30);
//        expect(fields2.isoMillisecond).toBe(123);
//        expect(fields2.isoMicrosecond).toBe(456);
//        expect(fields2.isoNanosecond).toBe(789);
//        expect(fields2.calendar).toBe(fields.calendar);
//      });
//      it('as input to constructor', () => {
//        const dt2 = new PlainDateTime(
//          fields.isoYear,
//          fields.isoMonth,
//          fields.isoDay,
//          fields.isoHour,
//          fields.isoMinute,
//          fields.isoSecond,
//          fields.isoMillisecond,
//          fields.isoMicrosecond,
//          fields.isoNanosecond,
//          fields.calendar
//        );
//        assert(dt2.equals(dt1));
//      });
//    });
//    describe('dateTime.withCalendar()', () => {
//      const dt1 = PlainDateTime.from('1976-11-18T15:23:30.123456789');
//      it('works', () => {
//        const calendar = Temporal.Calendar.from('iso8601');
//        expect(`${dt1.withCalendar(calendar)}`).toBe('1976-11-18T15:23:30.123456789');
//      });
//      it('casts its argument', () => {
//        expect(`${dt1.withCalendar('iso8601')}`).toBe('1976-11-18T15:23:30.123456789');
//      });
//    });
//    describe('dateTime.toString()', () => {
//      const dt1 = PlainDateTime.from('1976-11-18T15:23');
//      const dt2 = PlainDateTime.from('1976-11-18T15:23:30');
//      const dt3 = PlainDateTime.from('1976-11-18T15:23:30.1234');
//      it('default is to emit seconds and drop trailing zeros after the decimal', () => {
//        expect(dt1.toString()).toBe('1976-11-18T15:23:00');
//        expect(dt2.toString()).toBe('1976-11-18T15:23:30');
//        expect(dt3.toString()).toBe('1976-11-18T15:23:30.1234');
//      });
//      it('shows only non-ISO calendar if calendarName = auto', () => {
//        expect(dt1.toString({ calendarName: 'auto' })).toBe('1976-11-18T15:23:00');
//        expect(dt1.withCalendar('gregory').toString({ calendarName: 'auto' })).toBe('1976-11-18T15:23:00[u-ca-gregory]');
//      });
//      it('shows ISO calendar if calendarName = always', () => {
//        expect(dt1.toString({ calendarName: 'always' })).toBe('1976-11-18T15:23:00[u-ca-iso8601]');
//      });
//      it('omits non-ISO calendar if calendarName = never', () => {
//        expect(dt1.withCalendar('gregory').toString({ calendarName: 'never' })).toBe('1976-11-18T15:23:00');
//      });
//      it('default is calendar = auto', () => {
//        expect(dt1.toString()).toBe('1976-11-18T15:23:00');
//        expect(dt1.withCalendar('gregory').toString()).toBe('1976-11-18T15:23:00[u-ca-gregory]');
//      });
//      it('throws on invalid calendar', () => {
//        ['ALWAYS', 'sometimes', false, 3, null].forEach((calendarName) => {
//          throws(() => dt1.toString({ calendarName }), RangeError);
//        });
//      });
//      it('truncates to minute', () => {
//        [dt1, dt2, dt3].forEach((dt) => expect(dt.toString({ smallestUnit: 'minute' })).toBe('1976-11-18T15:23'));
//      });
//      it('other smallestUnits are aliases for fractional digits', () => {
//        expect(dt3.toString({ smallestUnit: 'second' })).toBe(dt3.toString({ fractionalSecondDigits: 0 }));
//        expect(dt3.toString({ smallestUnit: 'millisecond' })).toBe(dt3.toString({ fractionalSecondDigits: 3 }));
//        expect(dt3.toString({ smallestUnit: 'microsecond' })).toBe(dt3.toString({ fractionalSecondDigits: 6 }));
//        expect(dt3.toString({ smallestUnit: 'nanosecond' })).toBe(dt3.toString({ fractionalSecondDigits: 9 }));
//      });
//      it('throws on invalid or disallowed smallestUnit', () => {
//        ['era', 'year', 'month', 'day', 'hour', 'nonsense'].forEach((smallestUnit) =>
//          throws(() => dt1.toString({ smallestUnit }), RangeError)
//        );
//      });
//      it('accepts plural units', () => {
//        expect(dt3.toString({ smallestUnit: 'minutes' })).toBe(dt3.toString({ smallestUnit: 'minute' }));
//        expect(dt3.toString({ smallestUnit: 'seconds' })).toBe(dt3.toString({ smallestUnit: 'second' }));
//        expect(dt3.toString({ smallestUnit: 'milliseconds' })).toBe(dt3.toString({ smallestUnit: 'millisecond' }));
//        expect(dt3.toString({ smallestUnit: 'microseconds' })).toBe(dt3.toString({ smallestUnit: 'microsecond' }));
//        expect(dt3.toString({ smallestUnit: 'nanoseconds' })).toBe(dt3.toString({ smallestUnit: 'nanosecond' }));
//      });
//      it('truncates or pads to 2 places', () => {
//        const options = { fractionalSecondDigits: 2 };
//        expect(dt1.toString(options)).toBe('1976-11-18T15:23:00.00');
//        expect(dt2.toString(options)).toBe('1976-11-18T15:23:30.00');
//        expect(dt3.toString(options)).toBe('1976-11-18T15:23:30.12');
//      });
//      it('pads to 7 places', () => {
//        const options = { fractionalSecondDigits: 7 };
//        expect(dt1.toString(options)).toBe('1976-11-18T15:23:00.0000000');
//        expect(dt2.toString(options)).toBe('1976-11-18T15:23:30.0000000');
//        expect(dt3.toString(options)).toBe('1976-11-18T15:23:30.1234000');
//      });
//      it('auto is the default', () => {
//        [dt1, dt2, dt3].forEach((dt) => expect(dt.toString({ fractionalSecondDigits: 'auto' })).toBe(dt.toString()));
//      });
//      it('throws on out of range or invalid fractionalSecondDigits', () => {
//        [-1, 10, Infinity, NaN, 'not-auto'].forEach((fractionalSecondDigits) =>
//          throws(() => dt1.toString({ fractionalSecondDigits }), RangeError)
//        );
//      });
//      it('accepts and truncates fractional fractionalSecondDigits', () => {
//        expect(dt3.toString({ fractionalSecondDigits: 5.5 })).toBe('1976-11-18T15:23:30.12340');
//      });
//      it('smallestUnit overrides fractionalSecondDigits', () => {
//        expect(dt3.toString({ smallestUnit: 'minute', fractionalSecondDigits: 9 })).toBe('1976-11-18T15:23');
//      });
//      it('throws on invalid roundingMode', () => {
//        throws(() => dt1.toString({ roundingMode: 'cile' }), RangeError);
//      });
//      it('rounds to nearest', () => {
//        expect(dt2.toString({ smallestUnit: 'minute', roundingMode: 'halfExpand' })).toBe('1976-11-18T15:24');
//        expect(dt3.toString({ fractionalSecondDigits: 3, roundingMode: 'halfExpand' })).toBe('1976-11-18T15:23:30.123');
//      });
//      it('rounds up', () => {
//        expect(dt2.toString({ smallestUnit: 'minute', roundingMode: 'ceil' })).toBe('1976-11-18T15:24');
//        expect(dt3.toString({ fractionalSecondDigits: 3, roundingMode: 'ceil' })).toBe('1976-11-18T15:23:30.124');
//      });
//      it('rounds down', () => {
//        ['floor', 'trunc'].forEach((roundingMode) => {
//          expect(dt2.toString({ smallestUnit: 'minute', roundingMode })).toBe('1976-11-18T15:23');
//          expect(dt3.toString({ fractionalSecondDigits: 3, roundingMode })).toBe('1976-11-18T15:23:30.123');
//        });
//      });
//      it('rounding down is towards the Big Bang, not towards 1 BCE', () => {
//        const dt4 = PlainDateTime.from('-000099-12-15T12:00:00.5');
//        expect(dt4.toString({ smallestUnit: 'second', roundingMode: 'floor' })).toBe('-000099-12-15T12:00:00');
//      });
//      it('rounding can affect all units', () => {
//        const dt5 = PlainDateTime.from('1999-12-31T23:59:59.999999999');
//        expect(dt5.toString({ fractionalSecondDigits: 8, roundingMode: 'halfExpand' })).toBe('2000-01-01T00:00:00.00000000');
//      });
//      it('options may only be an object or undefined', () => {
//        [null, 1, 'hello', true, Symbol('foo'), 1n].forEach((badOptions) =>
//          throws(() => dt1.toString(badOptions), TypeError)
//        );
//        [{}, () => {}, undefined].forEach((options) => expect(dt1.toString(options)).toBe('1976-11-18T15:23:00'));
//      });
//    });
