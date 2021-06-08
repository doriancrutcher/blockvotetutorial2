import { Duration, DurationLike } from "../duration";
import { TimeComponent } from "../enums";
import { PlainDate } from "../plaindate";
import { PlainDateTime } from "../plaindatetime";
import { PlainTime, TimeLike } from "../plaintime";
import { TimeZone } from "../timezone";

let time: PlainTime,
  t1: PlainTime,
  t2: PlainTime,
  t3: PlainTime,
  dt: PlainDateTime;

describe("Construction", () => {
  describe("complete", () => {
    time = new PlainTime(15, 23, 30, 123, 456, 789);
    it("time.hour is 15", () => {
      expect(time.hour).toBe(15);
    });
    it("time.minute is 23", () => {
      expect(time.minute).toBe(23);
    });
    it("time.second is 30", () => {
      expect(time.second).toBe(30);
    });
    it("time.millisecond is 123", () => {
      expect(time.millisecond).toBe(123);
    });
    it("time.microsecond is 456", () => {
      expect(time.microsecond).toBe(456);
    });
    it("time.nanosecond is 789", () => {
      expect(time.nanosecond).toBe(789);
    });
    // it("time.calendar.id is iso8601", () =>
    //   expect(time.calendar.id).toBe("iso8601"));
    // it("time}` is 15:23:30.123456789", () =>
    //   expect(time}`).toBe("15:23:30.123456789"));
  });
  describe("missing nanosecond", () => {
    time = new PlainTime(15, 23, 30, 123, 456);
    it("time.hour is 15", () => {
      expect(time.hour).toBe(15);
    });
    it("time.minute is 23", () => {
      expect(time.minute).toBe(23);
    });
    it("time.second is 30", () => {
      expect(time.second).toBe(30);
    });
    it("time.millisecond is 123", () => {
      expect(time.millisecond).toBe(123);
    });
    it("time.microsecond is 456", () => {
      expect(time.microsecond).toBe(456);
    });
    it("time.nanosecond is 0", () => {
      expect(time.nanosecond).toBe(0);
    });
    // it("time}` is 15:23:30.123456", () => {
    //   expect(time}`).toBe("15:23:30.123456");
    // });
  });
  describe("missing microsecond", () => {
    time = new PlainTime(15, 23, 30, 123);
    it("time.hour is 15", () => {
      expect(time.hour).toBe(15);
    });
    it("time.minute is 23", () => {
      expect(time.minute).toBe(23);
    });
    it("time.second is 30", () => {
      expect(time.second).toBe(30);
    });
    it("time.millisecond is 123", () => {
      expect(time.millisecond).toBe(123);
    });
    it("time.microsecond is 0", () => {
      expect(time.microsecond).toBe(0);
    });
    it("time.nanosecond is 0", () => {
      expect(time.nanosecond).toBe(0);
    });
    // it("time}` is 15:23:30.123", () => {
    //   expect(time}`).toBe("15:23:30.123");
    // });
  });
  describe("missing millisecond", () => {
    time = new PlainTime(15, 23, 30);
    it("time.hour is 15", () => {
      expect(time.hour).toBe(15);
    });
    it("time.minute is 23", () => {
      expect(time.minute).toBe(23);
    });
    it("time.second is 30", () => {
      expect(time.second).toBe(30);
    });
    it("time.millisecond is 0", () => {
      expect(time.millisecond).toBe(0);
    });
    it("time.microsecond is 0", () => {
      expect(time.microsecond).toBe(0);
    });
    it("time.nanosecond is 0", () => {
      expect(time.nanosecond).toBe(0);
    });
    // it("time}` is 15:23:30", () => expect(time).toBe( "15:23:30"));
  });
  describe("missing second", () => {
    time = new PlainTime(15, 23);
    it("time.hour is 15", () => {
      expect(time.hour).toBe(15);
    });
    it("time.minute is 23", () => {
      expect(time.minute).toBe(23);
    });
    it("time.second is 0", () => {
      expect(time.second).toBe(0);
    });
    it("time.millisecond is 0", () => {
      expect(time.millisecond).toBe(0);
    });
    it("time.microsecond is 0", () => {
      expect(time.microsecond).toBe(0);
    });
    it("time.nanosecond is 0", () => {
      expect(time.nanosecond).toBe(0);
    });
    // it("time}` is 15:23:00", () => expect(time).toBe( "15:23:00"));
  });
  describe("missing minute", () => {
    const time = new PlainTime(15);
    // it("time}` is 15:00:00", () => expect(time).toBe( "15:00:00"));
  });
  describe("missing all parameters", () => {
    const time = new PlainTime();
    // it("time}` is 00:00:00", () => expect(time).toBe( "00:00:00"));
  });
});

describe(".with manipulation", () => {
  time = new PlainTime(15, 23, 30, 123, 456, 789);
  it("time.with({ hour: 3 } works", () => {
    expect(time.with({ hour: 3 }).toString()).toBe("03:23:30.123456789");
  });
  it("time.with({ minute: 3 } works", () => {
    expect(time.with({ minute: 3 }).toString()).toBe("15:03:30.123456789");
  });
  it("time.with({ second: 3 } works", () => {
    expect(time.with({ second: 3 }).toString()).toBe("15:23:03.123456789");
  });
  it("time.with({ millisecond: 3 } works", () => {
    expect(time.with({ millisecond: 3 }).toString()).toBe("15:23:30.003456789");
  });
  it("time.with({ microsecond: 3 } works", () => {
    expect(time.with({ microsecond: 3 }).toString()).toBe("15:23:30.123003789");
  });
  it("time.with({ nanosecond: 3 } works", () => {
    expect(time.with({ nanosecond: 3 }).toString()).toBe("15:23:30.123456003");
  });
  it("time.with({ minute: 8, nanosecond: 3 } works", () => {
    expect(time.with({ minute: 8, nanosecond: 3 }).toString()).toBe(
      "15:08:30.123456003"
    );
  });
  // it("invalid overflow", () => {
  //   ["", "CONSTRAIN", "balance", 3, null].forEach((overflow) =>
  //     throws(() => time.with({ hour: 3 }, { overflow }), RangeError)
  //   );
  // });
  // it("options may only be an object or undefined", () => {
  //   [null, 1, "hello", true, Symbol("foo"), 1n].forEach((badOptions) =>
  //     throws(() => time.with({ hour: 3 }, badOptions), TypeError)
  //   );
  //   [{}, () => {}, undefined].forEach((options) =>
  //     expect(time.with({ hour: 3 }, options).toString()).toBe(
  //       "03:23:30.123456789"
  //     )
  //   );
  // });
  // it("object must contain at least one correctly-spelled property", () => {
  //   throws(() => time.with({}), TypeError);
  //   throws(() => time.with({ minutes: 12 }), TypeError);
  // });
  // it("incorrectly-spelled properties are ignored", () => {
  //   expect(time.with({ minutes: 1, hour: 1 }).toString()).toBe(
  //     "01:23:30.123456789"
  //   );
  // });
  // it("time.with(string) throws", () => {
  //   throws(() => time.with("18:05:42.577"), TypeError);
  //   throws(() => time.with("2019-05-17T18:05:42.577"), TypeError);
  //   throws(() => time.with("2019-05-17T18:05:42.577Z"), TypeError);
  //   throws(() => time.with("2019-05-17"), TypeError);
  //   throws(() => time.with("42"), TypeError);
  // // });
  // it("throws with calendar property", () => {
  //   throws(() => time.with({ hour: 21, calendar: "iso8601" }), TypeError);
  // });
  // it("throws with timeZone property", () => {
  //   throws(() => time.with({ hour: 21, timeZone: "UTC" }), TypeError);
  // });
});

describe("time.toZonedDateTime()", function () {
  it("works", () => {
    const date = PlainDate.from("2020-01-01");
    const time = PlainTime.from("12:00");
    const tz = TimeZone.from("America/Los_Angeles");
    const zdt = time.toZonedDateTime(tz, date);
    expect(zdt.toString()).toBe(
      "2020-01-01T12:00:00-08:00[America/Los_Angeles]"
    );
  });
});

describe("time.toPlainDateTime() works", () => {
  time = PlainTime.from("11:30:23.123456789");
  dt = time.toPlainDateTime({ year: 1976, month: 11, day: 18 });
  it("with no argument", () => {
    expect(time.toPlainDateTime().toString()).toBe(
      "0-00-00T11:30:23.123456789"
    );
  });
  it("returns a Temporal.PlainDateTime", () => {
    assert(dt instanceof PlainDateTime);
  });
  it("combines the date and time", () => {
    expect(dt.toString()).toBe("1976-11-18T11:30:23.123456789");
  });
  it("casts argument date like", () => {
    expect(
      time.toPlainDateTime({ year: 1976, month: 11, day: 18 }).toString()
    ).toBe("1976-11-18T11:30:23.123456789");
  });
});

let one: PlainTime;
let two: PlainTime;
let msDiff: Duration;
let µsDiff: Duration;
let nsDiff: Duration;
describe("time.until() works", () => {
  time = new PlainTime(15, 23, 30, 123, 456, 789);
  one = new PlainTime(16, 23, 30, 123, 456, 789);
  two = new PlainTime(17, 0, 30, 123, 456, 789);

  it("(" + time.toString() + ").until(" + one.toString() + ") => PT1H", () => {
    expect(time.until(one).toString()).toBe("PT1H");
  });
  it(
    "(" + time.toString() + ").until(" + two.toString() + ") => PT1H37M",
    () => {
      expect(time.until(two).toString()).toBe("PT1H37M");
    }
  );
  it(
    "(" + two.toString() + ").until(" + time.toString() + ") => -PT1H37M",
    () => {
      expect(two.until(time).toString()).toBe("-PT1H37M");
    }
  );
  it(
    "(" +
      time.toString() +
      ").until(" +
      two.toString() +
      ") === (" +
      two.toString() +
      ").since(" +
      time.toString() +
      ")",
    () => {
      expect(time.until(two).toString()).toBe(two.since(time).toString());
    }
  );
  it("casts argument", () => {
    expect(time.until({ hour: 16, minute: 34 }).toString()).toBe(
      "PT1H10M29.876543211S"
    );
    expect(time.until("16:34").toString()).toBe("PT1H10M29.876543211S");
  });
  t1 = PlainTime.from("10:23:15");
  t2 = PlainTime.from("17:15:57");
  it("the default largest unit is at least hours", () => {
    expect(t1.until(t2).toString()).toBe("PT6H52M42S");
    // expect(t1.until(t2, { largestUnit: "auto" }).toString()).toBe( "PT6H52M42S");
    expect(t1.until(t2, TimeComponent.Hours).toString()).toBe("PT6H52M42S");
  });
  it("higher units are not allowed", () => {
    expect(() => {
      t1.until(t2, TimeComponent.Days);
    }).toThrow();
    expect(() => {
      t1.until(t2, TimeComponent.Weeks);
    }).toThrow();
    expect(() => {
      t1.until(t2, TimeComponent.Months);
    }).toThrow();
    expect(() => {
      t1.until(t2, TimeComponent.Years);
    }).toThrow();
  });
  it("can return lower units", () => {
    expect(t1.until(t2, TimeComponent.Minutes).toString()).toBe("PT412M42S");
    expect(t1.until(t2, TimeComponent.Seconds).toString()).toBe("PT24762S");
  });
  xit("can return subseconds", () => {
    t3 = t2.add({
      milliseconds: 250,
      microseconds: 250,
      nanoseconds: 250,
    });

    msDiff = t1.until(t3, TimeComponent.Milliseconds);
    expect(msDiff.seconds).toBe(0);
    expect(msDiff.milliseconds).toBe(24762250);
    expect(msDiff.microseconds).toBe(250);
    expect(msDiff.nanoseconds).toBe(250);

    µsDiff = t1.until(t3, TimeComponent.Microseconds);
    expect(µsDiff.milliseconds).toBe(0);
    expect(µsDiff.microseconds).toBe(<i32>24762250250);
    expect(µsDiff.nanoseconds).toBe(250);

    nsDiff = t1.until(t3, TimeComponent.Nanoseconds);
    expect(nsDiff.microseconds).toBe(0);
    expect(nsDiff.nanoseconds).toBe(<i32>24762250250250);
  });
  // it("options may only be an object or undefined", () => {
  //   [null, 1, "hello", true, Symbol("foo"), 1n].forEach((badOptions) =>
  //     throws(() => time.until(one, badOptions), TypeError)
  //   );
  //   [{}, () => {}, undefined].forEach((options) =>
  //     expect(time.until(one, options).toString()).toBe( "PT1H")
  //   );
  // });
  // earlier = PlainTime.from("08:22:36.123456789");
  // later = PlainTime.from("12:39:40.987654321");
  // it("throws on disallowed or invalid smallestUnit", () => {
  //   [
  //     "era",
  //     "years",
  //     "months",
  //     "weeks",
  //     "days",
  //     "year",
  //     "month",
  //     "week",
  //     "day",
  //     "nonsense",
  //   ].forEach((smallestUnit) => {
  //     throws(() => earlier.until(later, { smallestUnit }), RangeError);
  //   });
  // });
  // it("throws if smallestUnit is larger than largestUnit", () => {
  //   const units = [
  //     "hours",
  //     "minutes",
  //     "seconds",
  //     "milliseconds",
  //     "microseconds",
  //     "nanoseconds",
  //   ];
  //   for (let largestIdx = 1; largestIdx < units.length; largestIdx++) {
  //     for (let smallestIdx = 0; smallestIdx < largestIdx; smallestIdx++) {
  //       const largestUnit = units[largestIdx];
  //       const smallestUnit = units[smallestIdx];
  //       throws(
  //         () => earlier.until(later, { largestUnit, smallestUnit }),
  //         RangeError
  //       );
  //     }
  //   }
  // });
  // it("throws on invalid roundingMode", () => {
  //   throws(() => earlier.until(later, { roundingMode: "cile" }), RangeError);
  // });
  // const incrementOneNearest = [
  //   ["hours", "PT4H"],
  //   ["minutes", "PT4H17M"],
  //   ["seconds", "PT4H17M5S"],
  //   ["milliseconds", "PT4H17M4.864S"],
  //   ["microseconds", "PT4H17M4.864198S"],
  //   ["nanoseconds", "PT4H17M4.864197532S"],
  // ];
  // incrementOneNearest.forEach(([smallestUnit, expected]) => {
  //   const roundingMode = "halfExpand";
  //   it(`rounds to nearest ${smallestUnit.toString()).toBe( () => {
  //     equal(
  //       `${earlier.until(later, { smallestUnit, roundingMode })}`,
  //       expected
  //     );
  //     equal(
  //       `${later.until(earlier, { smallestUnit, roundingMode })}`,
  //       `-${expected}`
  //     );
  //   });
  // });
  // const incrementOneCeil = [
  //   ["hours", "PT5H", "-PT4H"],
  //   ["minutes", "PT4H18M", "-PT4H17M"],
  //   ["seconds", "PT4H17M5S", "-PT4H17M4S"],
  //   ["milliseconds", "PT4H17M4.865S", "-PT4H17M4.864S"],
  //   ["microseconds", "PT4H17M4.864198S", "-PT4H17M4.864197S"],
  //   ["nanoseconds", "PT4H17M4.864197532S", "-PT4H17M4.864197532S"],
  // ];
  // incrementOneCeil.forEach(
  //   ([smallestUnit, expectedPositive, expectedNegative]) => {
  //     const roundingMode = "ceil";
  //     it(`rounds up to ${smallestUnit.toString()).toBe( () => {
  //       equal(
  //         `${earlier.until(later, { smallestUnit, roundingMode })}`,
  //         expectedPositive
  //       );
  //       equal(
  //         `${later.until(earlier, { smallestUnit, roundingMode })}`,
  //         expectedNegative
  //       );
  //     });
  //   }
  // );
  // const incrementOneFloor = [
  //   ["hours", "PT4H", "-PT5H"],
  //   ["minutes", "PT4H17M", "-PT4H18M"],
  //   ["seconds", "PT4H17M4S", "-PT4H17M5S"],
  //   ["milliseconds", "PT4H17M4.864S", "-PT4H17M4.865S"],
  //   ["microseconds", "PT4H17M4.864197S", "-PT4H17M4.864198S"],
  //   ["nanoseconds", "PT4H17M4.864197532S", "-PT4H17M4.864197532S"],
  // ];
  // incrementOneFloor.forEach(
  //   ([smallestUnit, expectedPositive, expectedNegative]) => {
  //     const roundingMode = "floor";
  //     it(`rounds down to ${smallestUnit.toString()).toBe( () => {
  //       equal(
  //         `${earlier.until(later, { smallestUnit, roundingMode })}`,
  //         expectedPositive
  //       );
  //       equal(
  //         `${later.until(earlier, { smallestUnit, roundingMode })}`,
  //         expectedNegative
  //       );
  //     });
  //   }
  // );
  // const incrementOneTrunc = [
  //   ["hours", "PT4H"],
  //   ["minutes", "PT4H17M"],
  //   ["seconds", "PT4H17M4S"],
  //   ["milliseconds", "PT4H17M4.864S"],
  //   ["microseconds", "PT4H17M4.864197S"],
  //   ["nanoseconds", "PT4H17M4.864197532S"],
  // ];
  // incrementOneTrunc.forEach(([smallestUnit, expected]) => {
  //   const roundingMode = "trunc";
  //   it(`truncates to ${smallestUnit.toString()).toBe( () => {
  //     equal(
  //       `${earlier.until(later, { smallestUnit, roundingMode })}`,
  //       expected
  //     );
  //     equal(
  //       `${later.until(earlier, { smallestUnit, roundingMode })}`,
  //       `-${expected}`
  //     );
  //   });
  // });
  // it("trunc is the default", () => {
  //   expect(earlier.until(later, { smallestUnit: "minutes" }).toString()).toBe( "PT4H17M");
  //   expect(earlier.until(later, { smallestUnit: "seconds" }).toString()).toBe( "PT4H17M4S");
  // });
  // it("rounds to an increment of hours", () => {
  //   equal(
  //     `${earlier.until(later, {
  //       smallestUnit: "hours",
  //       roundingIncrement: 3,
  //       roundingMode: "halfExpand",
  //     })}`,
  //     "PT3H"
  //   );
  // });
  // it("rounds to an increment of minutes", () => {
  //   equal(
  //     `${earlier.until(later, {
  //       smallestUnit: "minutes",
  //       roundingIncrement: 30,
  //       roundingMode: "halfExpand",
  //     })}`,
  //     "PT4H30M"
  //   );
  // });
  // it("rounds to an increment of seconds", () => {
  //   equal(
  //     `${earlier.until(later, {
  //       smallestUnit: "seconds",
  //       roundingIncrement: 15,
  //       roundingMode: "halfExpand",
  //     })}`,
  //     "PT4H17M"
  //   );
  // });
  // it("rounds to an increment of milliseconds", () => {
  //   equal(
  //     `${earlier.until(later, {
  //       smallestUnit: "milliseconds",
  //       roundingIncrement: 10,
  //       roundingMode: "halfExpand",
  //     })}`,
  //     "PT4H17M4.86S"
  //   );
  // });
  // it("rounds to an increment of microseconds", () => {
  //   equal(
  //     `${earlier.until(later, {
  //       smallestUnit: "microseconds",
  //       roundingIncrement: 10,
  //       roundingMode: "halfExpand",
  //     })}`,
  //     "PT4H17M4.8642S"
  //   );
  // });
  // it("rounds to an increment of nanoseconds", () => {
  //   equal(
  //     `${earlier.until(later, {
  //       smallestUnit: "nanoseconds",
  //       roundingIncrement: 10,
  //       roundingMode: "halfExpand",
  //     })}`,
  //     "PT4H17M4.86419753S"
  //   );
  // });
  // it("valid hour increments divide into 24", () => {
  //   [1, 2, 3, 4, 6, 8, 12].forEach((roundingIncrement) => {
  //     const options = { smallestUnit: "hours", roundingIncrement };
  //     assert(earlier.until(later, options) instanceof Temporal.Duration);
  //   });
  // });
  // ["minutes", "seconds"].forEach((smallestUnit) => {
  //   it(`valid ${smallestUnit} increments divide into 60", () => {
  //     [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30].forEach((roundingIncrement) => {
  //       const options = { smallestUnit, roundingIncrement };
  //       assert(earlier.until(later, options) instanceof Temporal.Duration);
  //     });
  //   });
  // });
  // ["milliseconds", "microseconds", "nanoseconds"].forEach((smallestUnit) => {
  //   it(`valid ${smallestUnit} increments divide into 1000", () => {
  //     [1, 2, 4, 5, 8, 10, 20, 25, 40, 50, 100, 125, 200, 250, 500].forEach(
  //       (roundingIncrement) => {
  //         const options = { smallestUnit, roundingIncrement };
  //         assert(earlier.until(later, options) instanceof Temporal.Duration);
  //       }
  //     );
  //   });
  // });
  // it("throws on increments that do not divide evenly into the next highest", () => {
  //   throws(
  //     () =>
  //       earlier.until(later, { smallestUnit: "hours", roundingIncrement: 11 }),
  //     RangeError
  //   );
  //   throws(
  //     () =>
  //       earlier.until(later, {
  //         smallestUnit: "minutes",
  //         roundingIncrement: 29,
  //       }),
  //     RangeError
  //   );
  //   throws(
  //     () =>
  //       earlier.until(later, {
  //         smallestUnit: "seconds",
  //         roundingIncrement: 29,
  //       }),
  //     RangeError
  //   );
  //   throws(
  //     () =>
  //       earlier.until(later, {
  //         smallestUnit: "milliseconds",
  //         roundingIncrement: 29,
  //       }),
  //     RangeError
  //   );
  //   throws(
  //     () =>
  //       earlier.until(later, {
  //         smallestUnit: "microseconds",
  //         roundingIncrement: 29,
  //       }),
  //     RangeError
  //   );
  //   throws(
  //     () =>
  //       earlier.until(later, {
  //         smallestUnit: "nanoseconds",
  //         roundingIncrement: 29,
  //       }),
  //     RangeError
  //   );
  // });
  // it("throws on increments that are equal to the next highest", () => {
  //   throws(
  //     () =>
  //       earlier.until(later, { smallestUnit: "hours", roundingIncrement: 24 }),
  //     RangeError
  //   );
  //   throws(
  //     () =>
  //       earlier.until(later, {
  //         smallestUnit: "minutes",
  //         roundingIncrement: 60,
  //       }),
  //     RangeError
  //   );
  //   throws(
  //     () =>
  //       earlier.until(later, {
  //         smallestUnit: "seconds",
  //         roundingIncrement: 60,
  //       }),
  //     RangeError
  //   );
  //   throws(
  //     () =>
  //       earlier.until(later, {
  //         smallestUnit: "milliseconds",
  //         roundingIncrement: 1000,
  //       }),
  //     RangeError
  //   );
  //   throws(
  //     () =>
  //       earlier.until(later, {
  //         smallestUnit: "microseconds",
  //         roundingIncrement: 1000,
  //       }),
  //     RangeError
  //   );
  //   throws(
  //     () =>
  //       earlier.until(later, {
  //         smallestUnit: "nanoseconds",
  //         roundingIncrement: 1000,
  //       }),
  //     RangeError
  //   );
  // });
  // it("accepts singular units", () => {
  //   equal(
  //     `${earlier.until(later, { largestUnit: "hour" })}`,
  //     `${earlier.until(later, { largestUnit: "hours" })}`
  //   );
  //   equal(
  //     `${earlier.until(later, { smallestUnit: "hour" })}`,
  //     `${earlier.until(later, { smallestUnit: "hours" })}`
  //   );
  //   equal(
  //     `${earlier.until(later, { largestUnit: "minute" })}`,
  //     `${earlier.until(later, { largestUnit: "minutes" })}`
  //   );
  //   equal(
  //     `${earlier.until(later, { smallestUnit: "minute" })}`,
  //     `${earlier.until(later, { smallestUnit: "minutes" })}`
  //   );
  //   equal(
  //     `${earlier.until(later, { largestUnit: "second" })}`,
  //     `${earlier.until(later, { largestUnit: "seconds" })}`
  //   );
  //   equal(
  //     `${earlier.until(later, { smallestUnit: "second" })}`,
  //     `${earlier.until(later, { smallestUnit: "seconds" })}`
  //   );
  //   equal(
  //     `${earlier.until(later, { largestUnit: "millisecond" })}`,
  //     `${earlier.until(later, { largestUnit: "milliseconds" })}`
  //   );
  //   equal(
  //     `${earlier.until(later, { smallestUnit: "millisecond" })}`,
  //     `${earlier.until(later, { smallestUnit: "milliseconds" })}`
  //   );
  //   equal(
  //     `${earlier.until(later, { largestUnit: "microsecond" })}`,
  //     `${earlier.until(later, { largestUnit: "microseconds" })}`
  //   );
  //   equal(
  //     `${earlier.until(later, { smallestUnit: "microsecond" })}`,
  //     `${earlier.until(later, { smallestUnit: "microseconds" })}`
  //   );
  //   equal(
  //     `${earlier.until(later, { largestUnit: "nanosecond" })}`,
  //     `${earlier.until(later, { largestUnit: "nanoseconds" })}`
  //   );
  //   equal(
  //     `${earlier.until(later, { smallestUnit: "nanosecond" })}`,
  //     `${earlier.until(later, { smallestUnit: "nanoseconds" })}`
  //   );
  // });
});

describe("time.since() works", () => {
  time = new PlainTime(15, 23, 30, 123, 456, 789);
  one = new PlainTime(14, 23, 30, 123, 456, 789);
  it("(" + time.toString() + ").since(" + one.toString() + ") => PT1H", () => {
    expect(time.since(one).toString()).toBe("PT1H");
  });
  two = new PlainTime(13, 30, 30, 123, 456, 789);
  it(
    "(" + time.toString() + ").since(" + two.toString() + ") => PT1H53M",
    () => {
      expect(time.since(two).toString()).toBe("PT1H53M");
    }
  );
  it(
    "(" + two.toString() + ").since(" + time.toString() + ") => -PT1H53M",
    () => {
      expect(two.since(time).toString()).toBe("-PT1H53M");
    }
  );
  it(
    "(" +
      two.toString() +
      ").since(" +
      time.toString() +
      ") === (" +
      time.toString() +
      ").until(" +
      two.toString() +
      ")",
    () => {
      expect(two.since(time).toString()).toBe(time.until(two).toString());
    }
  );
  it("casts argument", () => {
    expect(`${time.since({ hour: 16, minute: 34 })}`).toBe(
      "-PT1H10M29.876543211S"
    );
    expect(`${time.since("16:34")}`).toBe("-PT1H10M29.876543211S");
  });
  // it('object must contain at least one correctly-spelled property', () => {
  //   throws(() => time.since({}), TypeError);
  //   throws(() => time.since({ minutes: 30 }), TypeError);
  // });
  t1 = PlainTime.from("10:23:15");
  t2 = PlainTime.from("17:15:57");
  it("the default largest unit is at least hours", () => {
    expect(t2.since(t1).toString()).toBe("PT6H52M42S");
    // expect(t2.since(t1, largestUnit: 'auto)", 'PT6H52M42S');
    expect(t2.since(t1, TimeComponent.Hours).toString()).toBe("PT6H52M42S");
  });
  it("higher units are not allowed", () => {
    expect(() => {
      t1.until(t2, TimeComponent.Days);
    }).toThrow();
    expect(() => {
      t1.until(t2, TimeComponent.Weeks);
    }).toThrow();
    expect(() => {
      t1.until(t2, TimeComponent.Months);
    }).toThrow();
    expect(() => {
      t1.until(t2, TimeComponent.Years);
    }).toThrow();
  });
  it("can return lower units", () => {
    expect(t2.since(t1, TimeComponent.Minutes).toString()).toBe("PT412M42S");
    expect(t2.since(t1, TimeComponent.Seconds).toString()).toBe("PT24762S");
  });
  xit("can return subseconds", () => {
    t3 = t2.add({ milliseconds: 250, microseconds: 250, nanoseconds: 250 });

    msDiff = t3.since(t1, TimeComponent.Milliseconds);
    expect(msDiff.seconds).toBe(0);
    expect(msDiff.milliseconds).toBe(24762250);
    expect(msDiff.microseconds).toBe(250);
    expect(msDiff.nanoseconds).toBe(250);

    µsDiff = t3.since(t1, TimeComponent.Microseconds);
    expect(µsDiff.milliseconds).toBe(0);
    expect(µsDiff.microseconds).toBe(24762250250 as i32);
    expect(µsDiff.nanoseconds).toBe(250);

    nsDiff = t3.since(t1, TimeComponent.Nanoseconds);
    expect(nsDiff.microseconds).toBe(0);
    expect(nsDiff.nanoseconds).toBe(24762250250250 as i32);
  });
  // it('options may only be an object or undefined', () => {
  //   [null, 1, 'hello', true, Symbol('foo'), 1n].forEach((badOptions) =>
  //     throws(() => time.since(one, badOptions), TypeError)
  //   );
  //   [{}, () => {}, undefined].forEach((options) => equal(`${time.since(one, options)}", 'PT1H'));
  // });
  // const earlier = PlainTime.from('08:22:36.123456789');
  // const later = PlainTime.from('12:39:40.987654321');
  // it('throws on disallowed or invalid smallestUnit', () => {
  //   ['era', 'years', 'months', 'weeks', 'days', 'year', 'month', 'week', 'day', 'nonsense'].forEach(
  //     (smallestUnit) => {
  //       throws(() => later.since(earlier, { smallestUnit }), RangeError);
  //     }
  //   );
  // });
  // it('throws if smallestUnit is larger than largestUnit', () => {
  //   const units = ['hours', 'minutes', 'seconds', 'milliseconds', 'microseconds', 'nanoseconds'];
  //   for (let largestIdx = 1; largestIdx < units.length; largestIdx++) {
  //     for (let smallestIdx = 0; smallestIdx < largestIdx; smallestIdx++) {
  //       const largestUnit = units[largestIdx];
  //       const smallestUnit = units[smallestIdx];
  //       throws(() => later.since(earlier, { largestUnit, smallestUnit }), RangeError);
  //     }
  //   }
  // });
  // it('throws on invalid roundingMode', () => {
  //   throws(() => later.since(earlier, { roundingMode: 'cile' }), RangeError);
  // });
  // const incrementOneNearest = [
  //   ['hours', 'PT4H'],
  //   ['minutes', 'PT4H17M'],
  //   ['seconds', 'PT4H17M5S'],
  //   ['milliseconds', 'PT4H17M4.864S'],
  //   ['microseconds', 'PT4H17M4.864198S'],
  //   ['nanoseconds', 'PT4H17M4.864197532S']
  // ];
  // incrementOneNearest.forEach(([smallestUnit, expected]) => {
  //   const roundingMode = 'halfExpand';
  //   it(`rounds to nearest ${smallestUnit}", () => {
  //     equal(`${later.since(earlier, { smallestUnit, roundingMode })}", expected);
  //     equal(`${earlier.since(later, { smallestUnit, roundingMode })}", `-${expected}`);
  //   });
  // });
  // const incrementOneCeil = [
  //   ['hours', 'PT5H', '-PT4H'],
  //   ['minutes', 'PT4H18M', '-PT4H17M'],
  //   ['seconds', 'PT4H17M5S', '-PT4H17M4S'],
  //   ['milliseconds', 'PT4H17M4.865S', '-PT4H17M4.864S'],
  //   ['microseconds', 'PT4H17M4.864198S', '-PT4H17M4.864197S'],
  //   ['nanoseconds', 'PT4H17M4.864197532S', '-PT4H17M4.864197532S']
  // ];
  // incrementOneCeil.forEach(([smallestUnit, expectedPositive, expectedNegative]) => {
  //   const roundingMode = 'ceil';
  //   it(`rounds up to ${smallestUnit}", () => {
  //     equal(`${later.since(earlier, { smallestUnit, roundingMode })}", expectedPositive);
  //     equal(`${earlier.since(later, { smallestUnit, roundingMode })}", expectedNegative);
  //   });
  // });
  // const incrementOneFloor = [
  //   ['hours', 'PT4H', '-PT5H'],
  //   ['minutes', 'PT4H17M', '-PT4H18M'],
  //   ['seconds', 'PT4H17M4S', '-PT4H17M5S'],
  //   ['milliseconds', 'PT4H17M4.864S', '-PT4H17M4.865S'],
  //   ['microseconds', 'PT4H17M4.864197S', '-PT4H17M4.864198S'],
  //   ['nanoseconds', 'PT4H17M4.864197532S', '-PT4H17M4.864197532S']
  // ];
  // incrementOneFloor.forEach(([smallestUnit, expectedPositive, expectedNegative]) => {
  //   const roundingMode = 'floor';
  //   it(`rounds down to ${smallestUnit}", () => {
  //     equal(`${later.since(earlier, { smallestUnit, roundingMode })}", expectedPositive);
  //     equal(`${earlier.since(later, { smallestUnit, roundingMode })}", expectedNegative);
  //   });
  // });
  // const incrementOneTrunc = [
  //   ['hours', 'PT4H'],
  //   ['minutes', 'PT4H17M'],
  //   ['seconds', 'PT4H17M4S'],
  //   ['milliseconds', 'PT4H17M4.864S'],
  //   ['microseconds', 'PT4H17M4.864197S'],
  //   ['nanoseconds', 'PT4H17M4.864197532S']
  // ];
  // incrementOneTrunc.forEach(([smallestUnit, expected]) => {
  //   const roundingMode = 'trunc';
  //   it(`truncates to ${smallestUnit}", () => {
  //     equal(`${later.since(earlier, { smallestUnit, roundingMode })}", expected);
  //     equal(`${earlier.since(later, { smallestUnit, roundingMode })}", `-${expected}`);
  //   });
  // });
  // it('trunc is the default', () => {
  //   equal(`${later.since(earlier, { smallestUnit: 'minutes' })}", 'PT4H17M');
  //   equal(`${later.since(earlier, { smallestUnit: 'seconds' })}", 'PT4H17M4S');
  // });
  // it('rounds to an increment of hours', () => {
  //   equal(
  //     `${later.since(earlier, { smallestUnit: 'hours', roundingIncrement: 3, roundingMode: 'halfExpand' })}`,
  //     'PT3H'
  //   );
  // });
  // it('rounds to an increment of minutes', () => {
  //   equal(
  //     `${later.since(earlier, { smallestUnit: 'minutes', roundingIncrement: 30, roundingMode: 'halfExpand' })}`,
  //     'PT4H30M'
  //   );
  // });
  // it('rounds to an increment of seconds', () => {
  //   equal(
  //     `${later.since(earlier, { smallestUnit: 'seconds', roundingIncrement: 15, roundingMode: 'halfExpand' })}`,
  //     'PT4H17M'
  //   );
  // });
  // it('rounds to an increment of milliseconds', () => {
  //   equal(
  //     `${later.since(earlier, { smallestUnit: 'milliseconds', roundingIncrement: 10, roundingMode: 'halfExpand' })}`,
  //     'PT4H17M4.86S'
  //   );
  // });
  // it('rounds to an increment of microseconds', () => {
  //   equal(
  //     `${later.since(earlier, { smallestUnit: 'microseconds', roundingIncrement: 10, roundingMode: 'halfExpand' })}`,
  //     'PT4H17M4.8642S'
  //   );
  // });
  // it('rounds to an increment of nanoseconds', () => {
  //   equal(
  //     `${later.since(earlier, { smallestUnit: 'nanoseconds', roundingIncrement: 10, roundingMode: 'halfExpand' })}`,
  //     'PT4H17M4.86419753S'
  //   );
  // });
  // it('valid hour increments divide into 24', () => {
  //   [1, 2, 3, 4, 6, 8, 12].forEach((roundingIncrement) => {
  //     const options = { smallestUnit: 'hours', roundingIncrement };
  //     assert(later.since(earlier, options) instanceof Temporal.Duration);
  //   });
  // });
  // ['minutes', 'seconds'].forEach((smallestUnit) => {
  //   it(`valid ${smallestUnit} increments divide into 60", () => {
  //     [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30].forEach((roundingIncrement) => {
  //       const options = { smallestUnit, roundingIncrement };
  //       assert(later.since(earlier, options) instanceof Temporal.Duration);
  //     });
  //   });
  // });
  // ['milliseconds', 'microseconds', 'nanoseconds'].forEach((smallestUnit) => {
  //   it(`valid ${smallestUnit} increments divide into 1000", () => {
  //     [1, 2, 4, 5, 8, 10, 20, 25, 40, 50, 100, 125, 200, 250, 500].forEach((roundingIncrement) => {
  //       const options = { smallestUnit, roundingIncrement };
  //       assert(later.since(earlier, options) instanceof Temporal.Duration);
  //     });
  //   });
  // });
  // it('throws on increments that do not divide evenly into the next highest', () => {
  //   throws(() => later.since(earlier, { smallestUnit: 'hours', roundingIncrement: 11 }), RangeError);
  //   throws(() => later.since(earlier, { smallestUnit: 'minutes', roundingIncrement: 29 }), RangeError);
  //   throws(() => later.since(earlier, { smallestUnit: 'seconds', roundingIncrement: 29 }), RangeError);
  //   throws(() => later.since(earlier, { smallestUnit: 'milliseconds', roundingIncrement: 29 }), RangeError);
  //   throws(() => later.since(earlier, { smallestUnit: 'microseconds', roundingIncrement: 29 }), RangeError);
  //   throws(() => later.since(earlier, { smallestUnit: 'nanoseconds', roundingIncrement: 29 }), RangeError);
  // });
  // it('throws on increments that are equal to the next highest', () => {
  //   throws(() => later.since(earlier, { smallestUnit: 'hours', roundingIncrement: 24 }), RangeError);
  //   throws(() => later.since(earlier, { smallestUnit: 'minutes', roundingIncrement: 60 }), RangeError);
  //   throws(() => later.since(earlier, { smallestUnit: 'seconds', roundingIncrement: 60 }), RangeError);
  //   throws(() => later.since(earlier, { smallestUnit: 'milliseconds', roundingIncrement: 1000 }), RangeError);
  //   throws(() => later.since(earlier, { smallestUnit: 'microseconds', roundingIncrement: 1000 }), RangeError);
  //   throws(() => later.since(earlier, { smallestUnit: 'nanoseconds', roundingIncrement: 1000 }), RangeError);
  // });
  // it('accepts singular units', () => {
  //   equal(`${later.since(earlier, { largestUnit: 'hour' })}", `${later.since(earlier, { largestUnit: 'hours' })}`);
  //   equal(`${later.since(earlier, { smallestUnit: 'hour' })}", `${later.since(earlier, { smallestUnit: 'hours' })}`);
  //   equal(
  //     `${later.since(earlier, { largestUnit: 'minute' })}`,
  //     `${later.since(earlier, { largestUnit: 'minutes' })}`
  //   );
  //   equal(
  //     `${later.since(earlier, { smallestUnit: 'minute' })}`,
  //     `${later.since(earlier, { smallestUnit: 'minutes' })}`
  //   );
  //   equal(
  //     `${later.since(earlier, { largestUnit: 'second' })}`,
  //     `${later.since(earlier, { largestUnit: 'seconds' })}`
  //   );
  //   equal(
  //     `${later.since(earlier, { smallestUnit: 'second' })}`,
  //     `${later.since(earlier, { smallestUnit: 'seconds' })}`
  //   );
  //   equal(
  //     `${later.since(earlier, { largestUnit: 'millisecond' })}`,
  //     `${later.since(earlier, { largestUnit: 'milliseconds' })}`
  //   );
  //   equal(
  //     `${later.since(earlier, { smallestUnit: 'millisecond' })}`,
  //     `${later.since(earlier, { smallestUnit: 'milliseconds' })}`
  //   );
  //   equal(
  //     `${later.since(earlier, { largestUnit: 'microsecond' })}`,
  //     `${later.since(earlier, { largestUnit: 'microseconds' })}`
  //   );
  //   equal(
  //     `${later.since(earlier, { smallestUnit: 'microsecond' })}`,
  //     `${later.since(earlier, { smallestUnit: 'microseconds' })}`
  //   );
  //   equal(
  //     `${later.since(earlier, { largestUnit: 'nanosecond' })}`,
  //     `${later.since(earlier, { largestUnit: 'nanoseconds' })}`
  //   );
  //   equal(
  //     `${later.since(earlier, { smallestUnit: 'nanosecond' })}`,
  //     `${later.since(earlier, { smallestUnit: 'nanoseconds' })}`
  //   );
  // });
});

describe("Time.compare() works", () => {
  t1 = PlainTime.from("08:44:15.321");
  t2 = PlainTime.from("14:23:30.123");

  it("equal", () => {
    expect(PlainTime.compare(t1, t1)).toBe(0);
  });
  it("smaller/larger", () => {
    expect(PlainTime.compare(t1, t2)).toBe(-1);
  });
  it("larger/smaller", () => {
    expect(PlainTime.compare(t2, t1)).toBe(1);
  });
  // it("casts first argument", () => {
  //   expect(PlainTime.compare({ hour: 16, minute: 34 }, t2), 1);
  //   expect(PlainTime.compare("16:34", t2), 1);
  // });
  // it("casts second argument", () => {
  //   expect(PlainTime.compare(t1, { hour: 16, minute: 34 }), -1);
  //   expect(PlainTime.compare(t1, "16:34"), -1);
  // });
  // it("object must contain at least one correctly-spelled property", () => {
  //   throws(() => PlainTime.compare({ hours: 16 }, t2), TypeError);
  //   throws(() => PlainTime.compare(t1, { hours: 16 }), TypeError);
  // });
});

describe("time.equals() works", () => {
  t1 = PlainTime.from("08:44:15.321");
  t2 = PlainTime.from("14:23:30.123");
  it("equal", () => {
    expect(t1).toBe(t1);
  });
  it("unequal", () => {
    expect(t2).not.toBe(t1);
  });
  // it("casts argument", () => {
  //   assert(t1.equals("08:44:15.321"));
  //   assert(t1.equals({ hour: 8, minute: 44, second: 15, millisecond: 321 }));
  // });
  // it("object must contain at least one correctly-spelled property", () => {
  //   throws(() => t1.equals({ hours: 8 }), TypeError);
  // });
});

describe("time.add() works", () => {
  time = new PlainTime(15, 23, 30, 123, 456, 789);
  it(time.toString() + ".add({ hours: 16 })", () => {
    expect(time.add({ hours: 16 }).toString()).toBe("07:23:30.123456789");
  });
  it(time.toString() + ".add({ minutes: 45 })", () => {
    expect(time.add({ minutes: 45 }).toString()).toBe("16:08:30.123456789");
  });
  xit(time.toString() + ".add({ nanoseconds: 300 })", () => {
    // https://github.com/ColinEberhardt/assemblyscript-temporal/pull/25#issuecomment-812995856
    expect(time.add({ nanoseconds: 300 }).toString()).toBe(
      "15:23:30.123457089"
    );
  });
  it("symmetric with regard to negative durations", () => {
    expect(
      PlainTime.from<string>("07:23:30.123456789")
        .add({ hours: -16 })
        .toString()
    ).toBe("15:23:30.123456789");
    expect(
      PlainTime.from<string>("16:08:30.123456789")
        .add({ minutes: -45 })
        .toString()
    ).toBe("15:23:30.123456789");
    expect(
      PlainTime.from<string>("15:23:30.123457089")
        .add({ nanoseconds: -300 })
        .toString()
    ).toBe("15:23:30.123456789");
  });
  it("time.add(durationObj)", () => {
    expect(time.add(Duration.from("PT16H")).toString()).toBe(
      "07:23:30.123456789"
    );
  });
  it("casts argument", () => {
    expect(time.add("PT16H").toString()).toBe("07:23:30.123456789");
  });
  // it("ignores higher units", () => {
  //   expect(time.add({ days: 1 }).toString()).toBe("15:23:30.123456789");
  //   expect(time.add({ months: 1 }).toString()).toBe("15:23:30.123456789");
  //   expect(time.add({ years: 1 }).toString()).toBe("15:23:30.123456789");
  // });
  // it("mixed positive and negative values always throw", () => {
  //   ["constrain", "reject"].forEach((overflow) =>
  //     throws(
  //       () => time.add({ hours: 1, minutes: -30 }, { overflow }),
  //       RangeError
  //     )
  //   );
  // });
  // it("options is ignored", () => {
  //   [
  //     null,
  //     1,
  //     "hello",
  //     true,
  //     Symbol("foo"),
  //     1n,
  //     {},
  //     () => {},
  //     undefined,
  //   ].forEach((options) =>
  //     expect(time.add({ hours: 1 }, options).toString()).toBe(
  //       "16:23:30.123456789"
  //     )
  //   );
  //   ["", "CONSTRAIN", "balance", 3, null].forEach((overflow) =>
  //     expect(time.add({ hours: 1 }, { overflow }).toString()).toBe(
  //       "16:23:30.123456789"
  //     )
  //   );
  // });
  // it("object must contain at least one correctly-spelled property", () => {
  //   throws(() => time.add({}), TypeError);
  //   throws(() => time.add({ minute: 12 }), TypeError);
  // });
  // it("incorrectly-spelled properties are ignored", () => {
  //   expect(time.add({ minute: 1, hours: 1 }).toString()).toBe(
  //     "16:23:30.123456789"
  //   );
  // });
});

describe("time.subtract() works", () => {
  time = PlainTime.from("15:23:30.123456789");
  it(time.toString() + ".subtract({ hours: 16 })", () => {
    expect(time.subtract({ hours: 16 }).toString()).toBe("23:23:30.123456789");
  });
  it(time.toString() + ".subtract({ minutes: 45 })", () => {
    expect(time.subtract({ minutes: 45 }).toString()).toBe(
      "14:38:30.123456789"
    );
  });
  it(time.toString() + ".subtract({ seconds: 45 })", () => {
    expect(time.subtract({ seconds: 45 }).toString()).toBe(
      "15:22:45.123456789"
    );
  });
  it(time.toString() + ".subtract({ milliseconds: 800 })", () => {
    expect(time.subtract({ milliseconds: 800 }).toString()).toBe(
      "15:23:29.323456789"
    );
  });
  it(time.toString() + ".subtract({ microseconds: 800 })", () => {
    expect(time.subtract({ microseconds: 800 }).toString()).toBe(
      "15:23:30.122656789"
    );
  });
  it(time.toString() + ".subtract({ nanoseconds: 800 })", () => {
    expect(time.subtract({ nanoseconds: 800 }).toString()).toBe(
      "15:23:30.123455989"
    );
  });
  it("symmetric with regard to negative durations", () => {
    expect(
      PlainTime.from("23:23:30.123456789").subtract({ hours: -16 }).toString()
    ).toBe("15:23:30.123456789");
    expect(
      PlainTime.from("14:38:30.123456789").subtract({ minutes: -45 }).toString()
    ).toBe("15:23:30.123456789");
    expect(
      PlainTime.from("15:22:45.123456789").subtract({ seconds: -45 }).toString()
    ).toBe("15:23:30.123456789");
    expect(
      PlainTime.from("15:23:29.323456789")
        .subtract({ milliseconds: -800 })
        .toString()
    ).toBe("15:23:30.123456789");
    expect(
      PlainTime.from("15:23:30.122656789")
        .subtract({ microseconds: -800 })
        .toString()
    ).toBe("15:23:30.123456789");
    expect(
      PlainTime.from("15:23:30.123455989")
        .subtract({ nanoseconds: -800 })
        .toString()
    ).toBe("15:23:30.123456789");
  });
  it("time.subtract(durationObj)", () => {
    expect(time.subtract(Duration.from("PT16H")).toString()).toBe(
      "23:23:30.123456789"
    );
  });
  it("casts argument", () => {
    expect(time.subtract("PT16H").toString()).toBe("23:23:30.123456789");
  });
  it("ignores higher units", () => {
    expect(time.subtract({ days: 1 }).toString()).toBe("15:23:30.123456789");
    expect(time.subtract({ months: 1 }).toString()).toBe("15:23:30.123456789");
    expect(time.subtract({ years: 1 }).toString()).toBe("15:23:30.123456789");
  });
  // it("mixed positive and negative values always throw", () => {
  //   ["constrain", "reject"].forEach((overflow) =>
  //     throws(
  //       () => time.subtract({ hours: 1, minutes: -30 }, { overflow }),
  //       RangeError
  //     )
  //   );
  // });
  // it("options is ignored", () => {
  //   [
  //     null,
  //     1,
  //     "hello",
  //     true,
  //     Symbol("foo"),
  //     1n,
  //     {},
  //     () => {},
  //     undefined,
  //   ].forEach((options) =>
  //     expect(time.subtract({ hours: 1 }, options).toString()).toBe(
  //       "14:23:30.123456789"
  //     )
  //   );
  //   ["", "CONSTRAIN", "balance", 3, null].forEach((overflow) =>
  //     expect(time.subtract({ hours: 1 }, { overflow }).toString()).toBe(
  //       "14:23:30.123456789"
  //     )
  //   );
  // });
  // it("object must contain at least one correctly-spelled property", () => {
  //   throws(() => time.subtract({}), TypeError);
  //   throws(() => time.subtract({ minute: 12 }), TypeError);
  // });
  // it("incorrectly-spelled properties are ignored", () => {
  //   expect(time.subtract({ minute: 1, hours: 1 }).toString()).toBe(
  //     "14:23:30.123456789"
  //   );
  // });
});

describe("time.toString() works", () => {
  it("new Time(15, 23).toString()", () => {
    expect(new PlainTime(15, 23).toString()).toBe("15:23:00");
  });
  it("new Time(15, 23, 30).toString()", () => {
    expect(new PlainTime(15, 23, 30).toString()).toBe("15:23:30");
  });
  it("new Time(15, 23, 30, 123).toString()", () => {
    expect(new PlainTime(15, 23, 30, 123).toString()).toBe("15:23:30.123");
  });
  it("new Time(15, 23, 30, 123, 456).toString()", () => {
    expect(new PlainTime(15, 23, 30, 123, 456).toString()).toBe(
      "15:23:30.123456"
    );
  });
  it("new Time(15, 23, 30, 123, 456, 789).toString()", () => {
    expect(new PlainTime(15, 23, 30, 123, 456, 789).toString()).toBe(
      "15:23:30.123456789"
    );
  });
  t1 = PlainTime.from("15:23");
  t2 = PlainTime.from("15:23:30");
  t3 = PlainTime.from("15:23:30.1234");
  it("default is to emit seconds and drop trailing zeros after the decimal", () => {
    expect(t1.toString()).toBe("15:23:00");
    expect(t2.toString()).toBe("15:23:30");
    expect(t3.toString()).toBe("15:23:30.1234");
  });
  // it("truncates to minute", () => {
  //   [t1, t2, t3].forEach((t) =>
  //     expect(t.toString({ smallestUnit: "minute" }), "15:23")
  //   );
  // });
  // it("other smallestUnits are aliases for fractional digits", () => {
  //   expect(
  //     t3.toString({ smallestUnit: "second" }),
  //     t3.toString({ fractionalSecondDigits: 0 })
  //   );
  //   expect(
  //     t3.toString({ smallestUnit: "millisecond" }),
  //     t3.toString({ fractionalSecondDigits: 3 })
  //   );
  //   expect(
  //     t3.toString({ smallestUnit: "microsecond" }),
  //     t3.toString({ fractionalSecondDigits: 6 })
  //   );
  //   expect(
  //     t3.toString({ smallestUnit: "nanosecond" }),
  //     t3.toString({ fractionalSecondDigits: 9 })
  //   );
  // });
  // it("throws on invalid or disallowed smallestUnit", () => {
  //   [
  //     "era",
  //     "year",
  //     "month",
  //     "day",
  //     "hour",
  //     "nonsense",
  //   ].forEach((smallestUnit) =>
  //     throws(() => t1.toString({ smallestUnit }), RangeError)
  //   );
  // });
  // it("accepts plural units", () => {
  //   expect(
  //     t3.toString({ smallestUnit: "minutes" }),
  //     t3.toString({ smallestUnit: "minute" })
  //   );
  //   expect(
  //     t3.toString({ smallestUnit: "seconds" }),
  //     t3.toString({ smallestUnit: "second" })
  //   );
  //   expect(
  //     t3.toString({ smallestUnit: "milliseconds" }),
  //     t3.toString({ smallestUnit: "millisecond" })
  //   );
  //   expect(
  //     t3.toString({ smallestUnit: "microseconds" }),
  //     t3.toString({ smallestUnit: "microsecond" })
  //   );
  //   expect(
  //     t3.toString({ smallestUnit: "nanoseconds" }),
  //     t3.toString({ smallestUnit: "nanosecond" })
  //   );
  // });
  // it("truncates or pads to 2 places", () => {
  //   const options = { fractionalSecondDigits: 2 };
  //   expect(t1.toString(options), "15:23:00.00");
  //   expect(t2.toString(options), "15:23:30.00");
  //   expect(t3.toString(options), "15:23:30.12");
  // });
  // it("pads to 7 places", () => {
  //   const options = { fractionalSecondDigits: 7 };
  //   expect(t1.toString(options), "15:23:00.0000000");
  //   expect(t2.toString(options), "15:23:30.0000000");
  //   expect(t3.toString(options), "15:23:30.1234000");
  // });
  // it("auto is the default", () => {
  //   [t1, t2, t3].forEach((dt) =>
  //     expect(dt.toString({ fractionalSecondDigits: "auto" }), dt.toString())
  //   );
  // });
  // it("throws on out of range or invalid fractionalSecondDigits", () => {
  //   [-1, 10, Infinity, NaN, "not-auto"].forEach((fractionalSecondDigits) =>
  //     throws(() => t1.toString({ fractionalSecondDigits }), RangeError)
  //   );
  // });
  // it("accepts and truncates fractional fractionalSecondDigits", () => {
  //   expect(t3.toString({ fractionalSecondDigits: 5.5 }), "15:23:30.12340");
  // });
  // it("smallestUnit overrides fractionalSecondDigits", () => {
  //   expect(
  //     t3.toString({ smallestUnit: "minute", fractionalSecondDigits: 9 }),
  //     "15:23"
  //   );
  // });
  // it("throws on invalid roundingMode", () => {
  //   throws(() => t1.toString({ roundingMode: "cile" }), RangeError);
  // });
  // it("rounds to nearest", () => {
  //   expect(
  //     t2.toString({ smallestUnit: "minute", roundingMode: "halfExpand" }),
  //     "15:24"
  //   );
  //   expect(
  //     t3.toString({ fractionalSecondDigits: 3, roundingMode: "halfExpand" }),
  //     "15:23:30.123"
  //   );
  // });
  // it("rounds up", () => {
  //   expect(
  //     t2.toString({ smallestUnit: "minute", roundingMode: "ceil" }),
  //     "15:24"
  //   );
  //   expect(
  //     t3.toString({ fractionalSecondDigits: 3, roundingMode: "ceil" }),
  //     "15:23:30.124"
  //   );
  // });
  // it("rounds down", () => {
  //   ["floor", "trunc"].forEach((roundingMode) => {
  //     expect(t2.toString({ smallestUnit: "minute", roundingMode }), "15:23");
  //     expect(
  //       t3.toString({ fractionalSecondDigits: 3, roundingMode }),
  //       "15:23:30.123"
  //     );
  //   });
  // });
  // it("rounding can affect all units", () => {
  //   const t4 = PlainTime.from("23:59:59.999999999");
  //   expect(
  //     t4.toString({ fractionalSecondDigits: 8, roundingMode: "halfExpand" }),
  //     "00:00:00.00000000"
  //   );
  // });
  // it("options may only be an object or undefined", () => {
  //   [null, 1, "hello", true, Symbol("foo"), 1n].forEach((badOptions) =>
  //     throws(() => t1.toString(badOptions), TypeError)
  //   );
  //   [{}, () => {}, undefined].forEach((options) =>
  //     expect(t1.toString(options), "15:23:00")
  //   );
  // });
});

describe("Time.from() works", () => {
  it('Time.from("15:23")', () => {
    expect(PlainTime.from("15:23").toString()).toBe("15:23:00");
  });
  it('Time.from("15:23:30")', () => {
    expect(PlainTime.from("15:23:30").toString()).toBe("15:23:30");
  });
  it('Time.from("15:23:30.123")', () => {
    expect(PlainTime.from("15:23:30.123").toString()).toBe("15:23:30.123");
  });
  it('Time.from("15:23:30.123456")', () => {
    expect(PlainTime.from("15:23:30.123456").toString()).toBe(
      "15:23:30.123456"
    );
  });
  it('Time.from("15:23:30.123456789")', () => {
    expect(PlainTime.from("15:23:30.123456789").toString()).toBe(
      "15:23:30.123456789"
    );
  });
  it("Time.from({ hour: 15, minute: 23 })", () => {
    expect(
      PlainTime.from<TimeLike>({
        hour: 15,
        minute: 23,
        second: 0,
        microsecond: 0,
        millisecond: 0,
        nanosecond: 0,
      }).toString()
    ).toBe("15:23:00");
  });
  it("Time.from({ minute: 30, microsecond: 555 })", () => {
    expect(PlainTime.from({ minute: 30, microsecond: 555 }).toString()).toBe(
      "00:30:00.000555"
    );
  });
  it("Time.from(ISO string leap second) is constrained", () => {
    expect(PlainTime.from("23:59:60").toString()).toBe("23:59:59");
    expect(PlainTime.from("23:59:60").toString()).toBe("23:59:59");
  });
  // it("Time.from(number) is converted to string", () => {
  //   expect(PlainTime.from(152343).toString()).toBe(
  //     PlainTime.from("152343").toString()
  //   );
  // });
  it("Time.from(time) returns the same properties", () => {
    const t = PlainTime.from("2020-02-12T11:42:00+01:00[Europe/Amsterdam]");
    expect(PlainTime.from(t).toString()).toBe(t.toString());
  });
  it("Time.from(dateTime) returns the same time properties", () => {
    const dt = PlainDateTime.from(
      "2020-02-12T11:42:00+01:00[Europe/Amsterdam]"
    );
    expect(PlainTime.from(dt).toString()).toBe(dt.toPlainTime().toString());
  });
  it("Time.from(time) is not the same object", () => {
    const t = PlainTime.from("2020-02-12T11:42:00+01:00[Europe/Amsterdam]");
    expect(PlainTime.from(t)).not.toBe(t);
  });
  it("any number of decimal places", () => {
    expect(PlainTime.from("1976-11-18T15:23:30.1Z").toString()).toBe(
      "15:23:30.1"
    );
    expect(PlainTime.from("1976-11-18T15:23:30.12Z").toString()).toBe(
      "15:23:30.12"
    );
    expect(PlainTime.from("1976-11-18T15:23:30.123Z").toString()).toBe(
      "15:23:30.123"
    );
    expect(PlainTime.from("1976-11-18T15:23:30.1234Z").toString()).toBe(
      "15:23:30.1234"
    );
    expect(PlainTime.from("1976-11-18T15:23:30.12345Z").toString()).toBe(
      "15:23:30.12345"
    );
    expect(PlainTime.from("1976-11-18T15:23:30.123456Z").toString()).toBe(
      "15:23:30.123456"
    );
    expect(PlainTime.from("1976-11-18T15:23:30.1234567Z").toString()).toBe(
      "15:23:30.1234567"
    );
    expect(PlainTime.from("1976-11-18T15:23:30.12345678Z").toString()).toBe(
      "15:23:30.12345678"
    );
    expect(PlainTime.from("1976-11-18T15:23:30.123456789Z").toString()).toBe(
      "15:23:30.123456789"
    );
  });
  it("variant decimal separator", () => {
    expect(PlainTime.from("1976-11-18T15:23:30,12Z").toString()).toBe(
      "15:23:30.12"
    );
  });
  // it("variant minus sign", () => {
  //   expect(PlainTime.from("1976-11-18T15:23:30.12\u221202:00").toString()).toBe(
  //     "15:23:30.12"
  //   );
  // });
  it("basic format", () => {
    expect(PlainTime.from("152330").toString()).toBe("15:23:30");
    expect(PlainTime.from("152330.1").toString()).toBe("15:23:30.1");
    expect(PlainTime.from("152330-08").toString()).toBe("15:23:30");
    expect(PlainTime.from("152330.1-08").toString()).toBe("15:23:30.1");
    expect(PlainTime.from("152330-0800").toString()).toBe("15:23:30");
    expect(PlainTime.from("152330.1-0800").toString()).toBe("15:23:30.1");
  });
  it("mixture of basic and extended format", () => {
    expect(PlainTime.from("1976-11-18T152330.1+00:00").toString()).toBe(
      "15:23:30.1"
    );
    expect(PlainTime.from("19761118T15:23:30.1+00:00").toString()).toBe(
      "15:23:30.1"
    );
    expect(PlainTime.from("1976-11-18T15:23:30.1+0000").toString()).toBe(
      "15:23:30.1"
    );
    expect(PlainTime.from("1976-11-18T152330.1+0000").toString()).toBe(
      "15:23:30.1"
    );
    expect(PlainTime.from("19761118T15:23:30.1+0000").toString()).toBe(
      "15:23:30.1"
    );
    expect(PlainTime.from("19761118T152330.1+00:00").toString()).toBe(
      "15:23:30.1"
    );
    expect(PlainTime.from("19761118T152330.1+0000").toString()).toBe(
      "15:23:30.1"
    );
    expect(PlainTime.from("+001976-11-18T152330.1+00:00").toString()).toBe(
      "15:23:30.1"
    );
    expect(PlainTime.from("+0019761118T15:23:30.1+00:00").toString()).toBe(
      "15:23:30.1"
    );
    expect(PlainTime.from("+001976-11-18T15:23:30.1+0000").toString()).toBe(
      "15:23:30.1"
    );
    expect(PlainTime.from("+001976-11-18T152330.1+0000").toString()).toBe(
      "15:23:30.1"
    );
    expect(PlainTime.from("+0019761118T15:23:30.1+0000").toString()).toBe(
      "15:23:30.1"
    );
    expect(PlainTime.from("+0019761118T152330.1+00:00").toString()).toBe(
      "15:23:30.1"
    );
    expect(PlainTime.from("+0019761118T152330.1+0000").toString()).toBe(
      "15:23:30.1"
    );
  });
  it("optional parts", () => {
    expect(PlainTime.from("15").toString()).toBe("15:00:00");
  });
  it("no junk at end of string", () => {
    expect(() => {
      PlainTime.from("15:23:30.100junk");
    }).toThrow();
  });
  // it("options may only be an object or undefined", () => {
  //   [null, 1, "hello", true, Symbol("foo"), 1n].forEach((badOptions) =>
  //     throws(() => PlainTime.from({ hour: 12 }, badOptions), TypeError)
  //   );
  //   [{}, () => {}, undefined].forEach((options) =>
  //     expect(PlainTime.from({ hour: 12 }, options)).toBe("12:00:00")
  //   );
  // });
  // describe("Overflow", () => {
  //   const bad = { nanosecond: 1000 };
  //   it("reject", () =>
  //     throws(() => PlainTime.from(bad, { overflow: "reject" }), RangeError));
  //   it("constrain", () => {
  //     expect(PlainTime.from(bad)).toBe("00:00:00.000000999");
  //     expect(PlainTime.from(bad, { overflow: "constrain" })).toBe(
  //       "00:00:00.000000999"
  //     );
  //   });
  //   it("throw on bad overflow", () => {
  //     [new PlainTime(15), { hour: 15 }, "15:00"].forEach((input) => {
  //       ["", "CONSTRAIN", "balance", 3, null].forEach((overflow) =>
  //         throws(() => PlainTime.from(input, { overflow }), RangeError)
  //       );
  //     });
  //   });
  //   const leap = { hour: 23, minute: 59, second: 60 };
  //   it("reject leap second", () =>
  //     throws(() => PlainTime.from(leap, { overflow: "reject" }), RangeError));
  //   it("constrain leap second", () =>
  //     expect(PlainTime.from(leap)).toBe("23:59:59"));
  //   it("constrain has no effect on invalid ISO string", () => {
  //     throws(
  //       () => PlainTime.from("24:60", { overflow: "constrain" }),
  //       RangeError
  //     );
  //   });
  // });
  // it("object must contain at least one correctly-spelled property", () => {
  //   throws(() => PlainTime.from({}), TypeError);
  //   throws(() => PlainTime.from({ minutes: 12 }), TypeError);
  // });
  // it("incorrectly-spelled properties are ignored", () => {
  //   expect(PlainTime.from({ minutes: 1, hour: 1 })).toBe("01:00:00");
  // });
});
