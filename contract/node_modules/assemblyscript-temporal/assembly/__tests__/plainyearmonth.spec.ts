/// <reference types="@as-pect/assembly/types/as-pect" />

import { Duration, DurationLike } from "../duration";
import { Overflow, TimeComponent } from "../enums";
import { PlainDate } from "../plaindate";
import { PlainDateTime } from "../plaindatetime";
import { PlainYearMonth, YearMonthLike } from "../plainyearmonth";

let ym: PlainYearMonth,
  ym1: PlainYearMonth,
  ym2: PlainYearMonth,
  orig: PlainYearMonth,
  actu: PlainYearMonth,
  plainDate1: PlainYearMonth,
  plainDate2: PlainYearMonth,
  one: PlainYearMonth,
  two: PlainYearMonth,
  nov94: PlainYearMonth,
  jun13: PlainYearMonth,
  feb21: PlainYearMonth,
  feb20: PlainYearMonth;

let diff: Duration;

describe("YearMonth", () => {
  describe("Construction", () => {
    ym = new PlainYearMonth(1976, 11);
    // it("YearMonth can be constructed", () => {
    //   assert(ym);
    //   expect(typeof ym, "object");
    // });
    it("ym.year is 1976", () => {
      expect(ym.year).toBe(1976);
    });
    it("ym.month is 11", () => {
      expect(ym.month).toBe(11);
    });
    xit('ym.monthCode is "M11"', () => {
      //   expect(ym.monthCode, "M11");
    });
    it("ym.daysInMonth is 30", () => {
      expect(ym.daysInMonth).toBe(30);
    });
    it("ym.daysInYear is 366", () => {
      expect(ym.daysInYear).toBe(366);
    });
    it("ym.monthsInYear is 12", () => {
      expect(ym.monthsInYear).toBe(12);
    });
    describe(".from()", () => {
      it("YearMonth.from(2019-10) == 2019-10", () => {
        expect(PlainYearMonth.from("2019-10").toString()).toBe("2019-10");
      });
      it("YearMonth.from(2019-10-01T09:00:00Z) == 2019-10", () => {
        expect(PlainYearMonth.from("2019-10-01T09:00:00Z").toString()).toBe(
          "2019-10"
        );
      });
      it("YearMonth.from('1976-11') == (1976-11)", () => {
        expect(PlainYearMonth.from("1976-11").toString()).toBe("1976-11");
      });
      it("YearMonth.from('1976-11-18') == (1976-11)", () => {
        expect(PlainYearMonth.from("1976-11-18").toString()).toBe("1976-11");
      });
      xit("can be constructed with monthCode and without month", () => {
        // expect(
        //   PlainYearMonth.from({ year: 2019, monthCode: "M11" }).toString()
        // ).toBe("2019-11");
      });
      it("can be constructed with month and without monthCode", () => {
        expect(PlainYearMonth.from({ year: 2019, month: 11 }).toString()).toBe(
          "2019-11"
        );
      });
      xit("month and monthCode must agree", () =>
        // expect(() => {
        //   PlainYearMonth.from({ year: 2019, month: 11, monthCode: "M12" });
        // }).toThrow()
        {});
      it("ignores day when determining the ISO reference day from year/month", () => {
        // const one = PlainYearMonth.from({ year: 2019, month: 11, day: 1 });
        // const two = PlainYearMonth.from({ year: 2019, month: 11, day: 2 });
        // expect(one.getISOFields().isoDay).toBe(two.getISOFields().isoDay);
      });
      xit("ignores day when determining the ISO reference day from year/monthCode", () => {
        // const one = PlainYearMonth.from({
        //   year: 2019,
        //   monthCode: "M11",
        //   day: 1,
        // });
        // const two = PlainYearMonth.from({
        //   year: 2019,
        //   monthCode: "M11",
        //   day: 2,
        // });
        // expect(one.getISOFields().isoDay, two.getISOFields().isoDay);
      });
      xit("ignores day when determining the ISO reference day from era/eraYear/month", () => {
        // const one = PlainYearMonth.from({
        //   era: "ce",
        //   eraYear: 2019,
        //   month: 11,
        //   day: 1,
        //   calendar: "gregory",
        // });
        // const two = PlainYearMonth.from({
        //   era: "ce",
        //   eraYear: 2019,
        //   month: 11,
        //   day: 2,
        //   calendar: "gregory",
        // });
        // expect(one.getISOFields().isoDay, two.getISOFields().isoDay);
      });
      xit("ignores day when determining the ISO reference day from era/eraYear/monthCode", () => {
        // const one = PlainYearMonth.from({
        //   era: "ce",
        //   eraYear: 2019,
        //   monthCode: "M11",
        //   day: 1,
        //   calendar: "gregory",
        // });
        // const two = PlainYearMonth.from({
        //   era: "ce",
        //   eraYear: 2019,
        //   monthCode: "M11",
        //   day: 2,
        //   calendar: "gregory",
        // });
        // expect(one.getISOFields().isoDay, two.getISOFields().isoDay);
      });
      xit("YearMonth.from(2019-11) is not the same object", () => {
        orig = new PlainYearMonth(2019, 11);
        actu = PlainYearMonth.from(orig);
        expect(actu).not.toBe(orig);
      });
      xit("ignores day when determining the ISO reference day from other Temporal object", () => {
        // plainDate1 = PlainDate.from("1976-11-01");
        // plainDate2 = PlainDate.from("1976-11-18");
        // one = PlainYearMonth.from(plainDate1);
        // two = PlainYearMonth.from(plainDate2);
        // expect(one.getISOFields().isoDay, two.getISOFields().isoDay);
      });
      it("YearMonth.from({ year: 2019 }) throws", () => {
        expect(() => {
          PlainYearMonth.from({ year: 2019 });
        }).toThrow();
      });
      it("YearMonth.from({ month: 6 }) throws", () => {
        expect(() => {
          PlainYearMonth.from({ month: 6 });
        }).toThrow();
      });
      xit('YearMonth.from({ monthCode: "M06" }) throws', () => {
        // expect(() => PlainYearMonth.from({ monthCode: "M06" })).toThrow();
      });
      it("YearMonth.from({}) throws", () => {
        expect(() => {
          PlainYearMonth.from({});
        });
      });
      //   it("YearMonth.from(required prop undefined) throws", () => {
      //     expect(() => {
      //       PlainYearMonth.from({ year: null, month: 6 });
      //     }).toThrows();
      //   });
      xit("YearMonth.from(number) is converted to string", () =>
        // assert(
        //   PlainYearMonth.from(201906).expects(PlainYearMonth.from("201906"))
        // )
        {});
      it("basic format", () => {
        expect(PlainYearMonth.from("197611").toString()).toBe("1976-11");
        expect(PlainYearMonth.from("+00197611").toString()).toBe("1976-11");
      });
      it("variant minus sign", () => {
        expect(PlainYearMonth.from("\u2212009999-11").toString()).toBe(
          "-009999-11"
        );
        expect(
          PlainYearMonth.from("1976-11-18T15:23:30.1\u221202:00").toString()
        ).toBe("1976-11");
      });
      it("mixture of basic and extended format", () => {
        expect(
          PlainYearMonth.from("1976-11-18T152330.1+00:00").toString()
        ).toBe("1976-11");
        expect(
          PlainYearMonth.from("19761118T15:23:30.1+00:00").toString()
        ).toBe("1976-11");
        expect(
          PlainYearMonth.from("1976-11-18T15:23:30.1+0000").toString()
        ).toBe("1976-11");
        expect(PlainYearMonth.from("1976-11-18T152330.1+0000").toString()).toBe(
          "1976-11"
        );
        expect(PlainYearMonth.from("19761118T15:23:30.1+0000").toString()).toBe(
          "1976-11"
        );
        expect(PlainYearMonth.from("19761118T152330.1+00:00").toString()).toBe(
          "1976-11"
        );
        expect(PlainYearMonth.from("19761118T152330.1+0000").toString()).toBe(
          "1976-11"
        );
        expect(
          PlainYearMonth.from("+001976-11-18T152330.1+00:00").toString()
        ).toBe("1976-11");
        expect(
          PlainYearMonth.from("+0019761118T15:23:30.1+00:00").toString()
        ).toBe("1976-11");
        expect(
          PlainYearMonth.from("+001976-11-18T15:23:30.1+0000").toString()
        ).toBe("1976-11");
        expect(
          PlainYearMonth.from("+001976-11-18T152330.1+0000").toString()
        ).toBe("1976-11");
        expect(
          PlainYearMonth.from("+0019761118T15:23:30.1+0000").toString()
        ).toBe("1976-11");
        expect(
          PlainYearMonth.from("+0019761118T152330.1+00:00").toString()
        ).toBe("1976-11");
        expect(
          PlainYearMonth.from("+0019761118T152330.1+0000").toString()
        ).toBe("1976-11");
      });
      it("optional components", () => {
        expect(PlainYearMonth.from("1976-11-18T15:23").toString()).toBe(
          "1976-11"
        );
        expect(PlainYearMonth.from("1976-11-18T15").toString()).toBe("1976-11");
        expect(PlainYearMonth.from("1976-11-18").toString()).toBe("1976-11");
      });
      it("ignores day when determining the ISO reference day from string", () => {
        one = PlainYearMonth.from("1976-11-01");
        two = PlainYearMonth.from("1976-11-18");
        expect(one.referenceISODay).toBe(two.referenceISODay);
      });
      it("no junk at end of string", () => {
        expect(() => {
          PlainYearMonth.from("1976-11junk");
        }).toThrow();
      });
      //   it("options may only be an object or undefined", () => {
      //     [null, 1, "hello", true, Symbol("foo"), 1n].forEach((badOptions) =>
      //       expect(
      //         () => PlainYearMonth.from({ year: 1976, month: 11 }, badOptions),
      //         TypeError
      //       )
      //     );
      //     [{}, () => {}, undefined].forEach((options) =>
      //       expect(
      //         PlainYearMonth.from({ year: 1976, month: 11 }, options).toString()
      //       ).toBe("1976-11")
      //     );
      //   });
      describe("Overflow", () => {
        // const bad = { year: 2019, month: 13 };
        xit("reject", () =>
          //   expect(
          //     () => PlainYearMonth.from(bad, { overflow: "reject" }),
          //     RangeError
          //   )
          {});
        xit("constrain", () => {
          //   expect(PlainYearMonth.from(bad).toString()).toBe("2019-12");
          //   expect(
          //     PlainYearMonth.from(bad, Overflow.Constrain).toString()
          //   ).toBe("2019-12");
        });
        xit("throw on bad overflow", () => {
          //   [
          //     new PlainYearMonth(2019, 1),
          //     { year: 2019, month: 1 },
          //     "2019-01",
          //   ].forEach((input) => {
          //     ["", "CONSTRAIN", "balance", 3, null].forEach((overflow) =>
          //       expect(() => PlainYearMonth.from(input, { overflow }), RangeError)
          //     );
          //   });
        });
        xit("constrain has no effect on invalid ISO string", () => {
          //   expect(
          //     () => PlainYearMonth.from("2020-13", { overflow: "constrain" }),
          //     RangeError
          //   );
        });
      });
      //   it("object must contain at least the required correctly-spelled properties", () => {
      //     expect(() => PlainYearMonth.from({}), TypeError);
      //     expect(
      //       () => PlainYearMonth.from({ year: 1976, months: 11 }),
      //       TypeError
      //     );
      //   });
      //   it("incorrectly-spelled properties are ignored", () => {
      //     expect(
      //       PlainYearMonth.from({ year: 1976, month: 11, months: 12 }).toString()
      //     ).toBe("1976-11");
      //   });
    });
    describe(".with()", () => {
      ym = PlainYearMonth.from("2019-10");
      it("with(2020)", () => {
        expect(ym.with({ year: 2020 }).toString()).toBe("2020-10");
      });
      it("with(09)", () => {
        expect(ym.with({ month: 9 }).toString()).toBe("2019-09");
      });
      xit("with(monthCode)", () => {
        // expect(ym.with({ monthCode: "M09" }).toString()).toBe("2019-09");
      });
      xit("month and monthCode must agree", () => {
        // expect(() => {
        //   ym.with({ month: 9, monthCode: "M10" });
        // }).toThrow();
      });
    });
  });

  describe("YearMonth.with() works", () => {
    ym = PlainYearMonth.from("2019-10");
    it("YearMonth.with({month}) works", () => {
      expect(ym.with({ month: 12 }).toString()).toBe("2019-12");
    });
    it("YearMonth.with({year}) works", () => {
      expect(ym.with({ year: 2025 }).toString()).toBe("2025-10");
    });
    xit("throws with calendar property", () => {
      // throws(() => ym.with({ year: 2021, calendar: 'iso8601' }), TypeError);
    });
    xit("throws with timeZone property", () => {
      // throws(() => ym.with({ year: 2021, timeZone: 'UTC' }), TypeError);
    });
    // it('options may only be an object or undefined', () => {
    //   [null, 1, 'hello', true, Symbol('foo'), 1n].forEach((badOptions) =>
    //     throws(() => ym.with({ year: 2020 }, badOptions), TypeError)
    //   );
    //   [{}, () => {}, undefined].forEach((options) => expect("${ym.with({ year: 2020 }, options)}", '2020-10'));
    // });
    // it('object must contain at least one correctly-spelled property', () => {
    //   throws(() => ym.with({}), TypeError);
    //   throws(() => ym.with({ months: 12 }), TypeError);
    // });
    // it('incorrectly-spelled properties are ignored', () => {
    //   expect("${ym.with({ month: 1, years: 2020 })}", '2019-01');
    // });
    // it('day is ignored when determining ISO reference day', () => {
    //   expect(ym.with({ year: ym.year, day: 31 }).getISOFields().isoDay, ym.getISOFields().isoDay);
    // });
  });

  describe("YearMonth.compare() works", () => {
    nov94 = PlainYearMonth.from("1994-11");
    jun13 = PlainYearMonth.from("2013-06");
    it("expect", () => {
      expect(PlainYearMonth.compare(nov94, nov94)).toBe(0);
    });
    it("smaller/larger", () => {
      expect(PlainYearMonth.compare(nov94, jun13)).toBe(-1);
    });
    it("larger/smaller", () => {
      expect(PlainYearMonth.compare(jun13, nov94)).toBe(1);
    });
    xit("casts first argument", () => {
      // expect(PlainYearMonth.compare({ year: 1994, month: 11 }, jun13), -1);
      // expect(PlainYearMonth.compare('1994-11', jun13), -1);
    });
    xit("casts second argument", () => {
      // expect(PlainYearMonth.compare(nov94, { year: 2013, month: 6 }), -1);
      // expect(PlainYearMonth.compare(nov94, '2013-06'), -1);
    });
    // it('object must contain at least the required properties', () => {
    //   throws(() => PlainYearMonth.compare({ year: 1994 }, jun13), TypeError);
    //   throws(() => PlainYearMonth.compare(nov94, { year: 2013 }), TypeError);
    // });
    it("takes [[ISODay]] into account", () => {
      // const iso = Temporal.Calendar.from('iso8601');
      const ym1 = new PlainYearMonth(2000, 1, 1);
      const ym2 = new PlainYearMonth(2000, 1, 2);
      expect(PlainYearMonth.compare(ym1, ym2)).toBe(-1);
    });
  });

  describe("YearMonth.equals() works", () => {
    nov94 = PlainYearMonth.from("1994-11");
    jun13 = PlainYearMonth.from("2013-06");
    it("equal", () => {
      expect(nov94.equals(nov94)).toBe(true);
    });
    it("unequal", () => {
      expect(nov94.equals(jun13)).toBe(false);
    });
    xit("casts argument", () => {
      // assert(nov94.equals({ year: 1994, month: 11 }));
      // assert(nov94.equals("1994-11"));
    });
    // it("object must contain at least the required properties", () => {
    //   throws(() => nov94.equals({ year: 1994 }), TypeError);
  });
  it("takes [[ISODay]] into account", () => {
    ym1 = new PlainYearMonth(2000, 1, 1);
    ym2 = new PlainYearMonth(2000, 1, 2);
    expect(ym1.equals(ym2)).toBe(false);
  });

  describe("YearMonth.until() works", () => {
    nov94 = PlainYearMonth.from("1994-11");
    jun13 = PlainYearMonth.from("2013-06");
    diff = nov94.until(jun13);
    it(
      "(" +
        jun13.toString() +
        ").until((" +
        nov94.toString() +
        ")) == (" +
        nov94.toString() +
        ").until((" +
        jun13.toString() +
        ")).negated()",
      () => {
         expect(jun13.until(nov94).toString()).toBe(diff.negated().toString())
      }
    );

    it(
      "(" +
        nov94.toString() +
        ").add(" +
        diff.toString() +
        ") == (" +
        jun13.toString() +
        ")",
      () => {
        expect(nov94.add(diff).equals(jun13)).toBe(true);
      }
    );
    it(
      "(" +
        jun13.toString() +
        ").subtract(" +
        diff.toString() +
        ") == (" +
        nov94.toString() +
        ")",
      () => {
        expect(jun13.subtract(diff).equals(nov94)).toBe(true);
      }
    );
    it(
      "(" +
        nov94.toString() +
        ").until((" +
        jun13.toString() +
        ")) == (" +
        jun13.toString() +
        ").since((" +
        nov94.toString() +
        "))",
      () => {
        expect(diff.toString()).toBe(jun13.since(nov94).toString());
      }
    );
    it("casts argument", () => {
      expect(`${nov94.until({ year: 2013, month: 6 })}`).toBe(diff.toString());
      expect(`${nov94.until("2013-06")}`).toBe(diff.toString());
    });
    //   it("object must contain at least the required properties", () => {
    //     throws(() => nov94.until({ year: 2013 }), TypeError);
    //   });
    feb20 = PlainYearMonth.from("2020-02");
    feb21 = PlainYearMonth.from("2021-02");
    //   it("defaults to returning years", () => {
    //     equal("${feb20.until(feb21)}", "P1Y");
    //     equal("${feb20.until(feb21, { largestUnit: "auto" })}", "P1Y");
    //     equal("${feb20.until(feb21, { largestUnit: "years" })}", "P1Y");
    //   });
    it("can return months", () => {
      expect(feb20.until(feb21, TimeComponent.Months).toString()).toBe("P12M");
    });
    it("cannot return lower units", () => {
      expect(() => {
        feb20.until(feb21, TimeComponent.Weeks);
      }).toThrow();
      expect(() => {
        feb20.until(feb21, TimeComponent.Days);
      }).toThrow();
      expect(() => {
        feb20.until(feb21, TimeComponent.Hours);
      }).toThrow();
      expect(() => {
        feb20.until(feb21, TimeComponent.Minutes);
      }).toThrow();
      expect(() => {
        feb20.until(feb21, TimeComponent.Seconds);
      }).toThrow();
      expect(() => {
        feb20.until(feb21, TimeComponent.Milliseconds);
      }).toThrow();
      expect(() => {
        feb20.until(feb21, TimeComponent.Microseconds);
      }).toThrow();
      expect(() => {
        feb20.until(feb21, TimeComponent.Nanoseconds);
      }).toThrow();
    });
    //   it("no two different calendars", () => {
    //     const ym1 = new PlainYearMonth(2000, 1);
    //     const ym2 = new PlainYearMonth(
    //       2000,
    //       1,
    //       Temporal.Calendar.from("japanese")
    //     );
    //     throws(() => ym1.until(ym2), RangeError);
    //   });
    //   it("options may only be an object or undefined", () => {
    //     [null, 1, "hello", true, Symbol("foo"), 1n].forEach((badOptions) =>
    //       throws(() => feb20.until(feb21, badOptions), TypeError)
    //     );
    //     [{}, () => {}, undefined].forEach((options) =>
    //       equal("${feb20.until(feb21, options)}", "P1Y")
    //     );
    //   });
    //   const earlier = PlainYearMonth.from("2019-01");
    //   const later = PlainYearMonth.from("2021-09");
    //   it("throws on disallowed or invalid smallestUnit", () => {
    //     [
    //       "era",
    //       "weeks",
    //       "days",
    //       "hours",
    //       "minutes",
    //       "seconds",
    //       "milliseconds",
    //       "microseconds",
    //       "nanoseconds",
    //       "nonsense",
    //     ].forEach((smallestUnit) => {
    //       throws(() => earlier.until(later, { smallestUnit }), RangeError);
    //     });
    //   });
    //   it("throws if smallestUnit is larger than largestUnit", () => {
    //     throws(
    //       () =>
    //         earlier.until(later, {
    //           largestUnit: "months",
    //           smallestUnit: "years",
    //         }),
    //       RangeError
    //     );
    //   });
    //   it("throws on invalid roundingMode", () => {
    //     throws(() => earlier.until(later, { roundingMode: "cile" }), RangeError);
    //   });
    //   const incrementOneNearest = [
    //     ["years", "P3Y"],
    //     ["months", "P2Y8M"],
    //   ];
    //   incrementOneNearest.forEach(([smallestUnit, expected]) => {
    //     const roundingMode = "halfExpand";
    //     it("rounds to nearest ${smallestUnit}", () => {
    //       equal(
    //         "${earlier.until(later, { smallestUnit, roundingMode })}",
    //         expected
    //       );
    //       equal(
    //         "${later.until(earlier, { smallestUnit, roundingMode })}",
    //         "-${expected}"
    //       );
    //     });
    //   });
    //   const incrementOneCeil = [
    //     ["years", "P3Y", "-P2Y"],
    //     ["months", "P2Y8M", "-P2Y8M"],
    //   ];
    //   incrementOneCeil.forEach(
    //     ([smallestUnit, expectedPositive, expectedNegative]) => {
    //       const roundingMode = "ceil";
    //       it("rounds up to ${smallestUnit}", () => {
    //         equal(
    //           "${earlier.until(later, { smallestUnit, roundingMode })}",
    //           expectedPositive
    //         );
    //         equal(
    //           "${later.until(earlier, { smallestUnit, roundingMode })}",
    //           expectedNegative
    //         );
    //       });
    //     }
    //   );
    //   const incrementOneFloor = [
    //     ["years", "P2Y", "-P3Y"],
    //     ["months", "P2Y8M", "-P2Y8M"],
    //   ];
    //   incrementOneFloor.forEach(
    //     ([smallestUnit, expectedPositive, expectedNegative]) => {
    //       const roundingMode = "floor";
    //       it("rounds down to ${smallestUnit}", () => {
    //         equal(
    //           "${earlier.until(later, { smallestUnit, roundingMode })}",
    //           expectedPositive
    //         );
    //         equal(
    //           "${later.until(earlier, { smallestUnit, roundingMode })}",
    //           expectedNegative
    //         );
    //       });
    //     }
    //   );
    //   const incrementOneTrunc = [
    //     ["years", "P2Y"],
    //     ["months", "P2Y8M"],
    //   ];
    //   incrementOneTrunc.forEach(([smallestUnit, expected]) => {
    //     const roundingMode = "trunc";
    //     it("truncates to ${smallestUnit}", () => {
    //       equal(
    //         "${earlier.until(later, { smallestUnit, roundingMode })}",
    //         expected
    //       );
    //       equal(
    //         "${later.until(earlier, { smallestUnit, roundingMode })}",
    //         "-${expected}"
    //       );
    //     });
    //   });
    //   it("trunc is the default", () => {
    //     equal("${earlier.until(later, { smallestUnit: "years" })}", "P2Y");
    //     equal("${later.until(earlier, { smallestUnit: "years" })}", "-P2Y");
    //   });
    //   it("rounds to an increment of years", () => {
    //     equal(
    //       "${earlier.until(later, {
    //         smallestUnit: "years",
    //         roundingIncrement: 4,
    //         roundingMode: "halfExpand",
    //       })}",
    //       "P4Y"
    //     );
    //   });
    //   it("rounds to an increment of months", () => {
    //     equal(
    //       "${earlier.until(later, {
    //         smallestUnit: "months",
    //         roundingIncrement: 5,
    //       })}",
    //       "P2Y5M"
    //     );
    //     equal(
    //       "${earlier.until(later, {
    //         largestUnit: "months",
    //         smallestUnit: "months",
    //         roundingIncrement: 10,
    //       })}",
    //       "P30M"
    //     );
    //   });
    //   it("accepts singular units", () => {
    //     equal(
    //       "${earlier.until(later, { largestUnit: "year" })}",
    //       "${earlier.until(later, { largestUnit: "years" })}"
    //     );
    //     equal(
    //       "${earlier.until(later, { smallestUnit: "year" })}",
    //       "${earlier.until(later, { smallestUnit: "years" })}"
    //     );
    //     equal(
    //       "${earlier.until(later, { largestUnit: "month" })}",
    //       "${earlier.until(later, { largestUnit: "months" })}"
    //     );
    //     equal(
    //       "${earlier.until(later, { smallestUnit: "month" })}",
    //       "${earlier.until(later, { smallestUnit: "months" })}"
    //     );
    //   });
  });

  describe("YearMonth.since() works", () => {
    nov94 = PlainYearMonth.from("1994-11");
    jun13 = PlainYearMonth.from("2013-06");
    diff = jun13.since(nov94);
    xit(
      `(` +
        nov94.toString() +
        `).since(` +
        jun13.toString() +
        `) == (` +
        jun13.toString() +
        `).since((` +
        nov94.toString() +
        `)).negated()`,
      () => {
        //expect(nov94.since(jun13).toString()).toBe(`${diff.negated()}`)
      }
    );
    it(
      `(` + nov94.toString() + `).add(${diff}) == (` + jun13.toString() + `)`,
      () => {
        expect(nov94.add(diff).equals(jun13)).toBe(true);
      }
    );
    it(
      `(` +
        jun13.toString() +
        `).subtract(${diff}) == (` +
        nov94.toString() +
        `)`,
      () => {
        expect(jun13.subtract(diff).equals(nov94)).toBe(true);
      }
    );
    it(
      `(` +
        jun13.toString() +
        `).since((` +
        nov94.toString() +
        `)) == (` +
        nov94.toString() +
        `).until((` +
        jun13.toString() +
        `))`,
      () => {
        expect(diff.toString()).toBe(nov94.until(jun13).toString());
      }
    );
    xit("casts argument", () => {
      //expect(jun13.since({ year: 1994, month: 11 }).toString()).toBe(`${diff}`);
      //expect(jun13.since("1994-11").toString()).toBe(`${diff}`);
    });
    // it("object must contain at least the required properties", () => {
    //   throws(() => jun13.since({ year: 1994 }), TypeError);
    // });
    feb20 = PlainYearMonth.from("2020-02");
    feb21 = PlainYearMonth.from("2021-02");
    it("defaults to returning years", () => {
      expect(feb21.since(feb20).toString()).toBe("P1Y");
      expect(feb21.since(feb20, TimeComponent.Years).toString()).toBe("P1Y");
    });
    it("can return months", () => {
      expect(feb21.since(feb20, TimeComponent.Months).toString()).toBe("P12M");
    });
    it("cannot return lower units", () => {
      expect(() => {
        feb20.since(feb21, TimeComponent.Weeks);
      }).toThrow();
      expect(() => {
        feb20.since(feb21, TimeComponent.Days);
      }).toThrow();
      expect(() => {
        feb20.since(feb21, TimeComponent.Hours);
      }).toThrow();
      expect(() => {
        feb20.since(feb21, TimeComponent.Minutes);
      }).toThrow();
      expect(() => {
        feb20.since(feb21, TimeComponent.Seconds);
      }).toThrow();
      expect(() => {
        feb20.since(feb21, TimeComponent.Milliseconds);
      }).toThrow();
      expect(() => {
        feb20.since(feb21, TimeComponent.Microseconds);
      }).toThrow();
      expect(() => {
        feb20.since(feb21, TimeComponent.Nanoseconds);
      }).toThrow();
    });
    // it('no two different calendars', () => {
    //   const ym1 = new PlainYearMonth(2000, 1);
    //   const ym2 = new PlainYearMonth(2000, 1, Temporal.Calendar.from('japanese'));
    //   throws(() => ym1.since(ym2), RangeError);
    // });
    // it('options may only be an object or undefined', () => {
    //   [null, 1, 'hello', true, Symbol('foo'), 1n].forEach((badOptions) =>
    //     throws(() => feb21.since(feb20, badOptions), TypeError)
    //   );
    //   [{}, () => {}, undefined].forEach((options) =>expect(feb21.since(feb20, options).toString()).toBe('P1Y'));
    // });
    // const earlier = PlainYearMonth.from('2019-01');
    // const later = PlainYearMonth.from('2021-09');
    // it('throws on disallowed or invalid smallestUnit', () => {
    //   [
    //     'era',
    //     'weeks',
    //     'days',
    //     'hours',
    //     'minutes',
    //     'seconds',
    //     'milliseconds',
    //     'microseconds',
    //     'nanoseconds',
    //     'nonsense'
    //   ].forEach((smallestUnit) => {
    //     throws(() => later.since(earlier, { smallestUnit }), RangeError);
    //   });
    // });
    // it('throws if smallestUnit is larger than largestUnit', () => {
    //   throws(() => later.since(earlier, { largestUnit: 'months', smallestUnit: 'years' }), RangeError);
    // });
    // it('throws on invalid roundingMode', () => {
    //   throws(() => later.since(earlier, { roundingMode: 'cile' }), RangeError);
    // });
    // const incrementOneNearest = [
    //   ['years', 'P3Y'],
    //   ['months', 'P2Y8M']
    // ];
    // incrementOneNearest.forEach(([smallestUnit, expected]) => {
    //   const roundingMode = 'halfExpand';
    //   it(`rounds to nearest ${smallestUnit.toString()).toBe(() => {
    //    expect(later.since(earlier, { smallestUnit, roundingMode }).toString()).toBe(expected);
    //    expect(earlier.since(later, { smallestUnit, roundingMode }).toString()).toBe(`-${expected}`);
    //   });
    // });
    // const incrementOneCeil = [
    //   ['years', 'P3Y', '-P2Y'],
    //   ['months', 'P2Y8M', '-P2Y8M']
    // ];
    // incrementOneCeil.forEach(([smallestUnit, expectedPositive, expectedNegative]) => {
    //   const roundingMode = 'ceil';
    //   it(`rounds up to ${smallestUnit.toString()).toBe(() => {
    //    expect(later.since(earlier, { smallestUnit, roundingMode }).toString()).toBe(expectedPositive);
    //    expect(earlier.since(later, { smallestUnit, roundingMode }).toString()).toBe(expectedNegative);
    //   });
    // });
    // const incrementOneFloor = [
    //   ['years', 'P2Y', '-P3Y'],
    //   ['months', 'P2Y8M', '-P2Y8M']
    // ];
    // incrementOneFloor.forEach(([smallestUnit, expectedPositive, expectedNegative]) => {
    //   const roundingMode = 'floor';
    //   it(`rounds down to ${smallestUnit.toString()).toBe(() => {
    //    expect(later.since(earlier, { smallestUnit, roundingMode }).toString()).toBe(expectedPositive);
    //    expect(earlier.since(later, { smallestUnit, roundingMode }).toString()).toBe(expectedNegative);
    //   });
    // });
    // const incrementOneTrunc = [
    //   ['years', 'P2Y'],
    //   ['months', 'P2Y8M']
    // ];
    // incrementOneTrunc.forEach(([smallestUnit, expected]) => {
    //   const roundingMode = 'trunc';
    //   it(`truncates to ${smallestUnit.toString()).toBe(() => {
    //    expect(later.since(earlier, { smallestUnit, roundingMode }).toString()).toBe(expected);
    //    expect(earlier.since(later, { smallestUnit, roundingMode }).toString()).toBe(`-${expected}`);
    //   });
    // });
    // it('trunc is the default', () => {
    //  expect(later.since(earlier, { smallestUnit: 'years' }).toString()).toBe('P2Y');
    //  expect(earlier.since(later, { smallestUnit: 'years' }).toString()).toBe('-P2Y');
    // });
    // it('rounds to an increment of years', () => {
    //   equal(
    //     `${later.since(earlier, { smallestUnit: 'years', roundingIncrement: 4, roundingMode: 'halfExpand' })}`,
    //     'P4Y'
    //   );
    // });
    // it('rounds to an increment of months', () => {
    //  expect(later.since(earlier, { smallestUnit: 'months', roundingIncrement: 5 }).toString()).toBe('P2Y5M');
    //   equal(
    //     `${later.since(earlier, { largestUnit: 'months', smallestUnit: 'months', roundingIncrement: 10 })}`,
    //     'P30M'
    //   );
    // });
    // it('accepts singular units', () => {
    //  expect(later.since(earlier, { largestUnit: 'year' }).toString()).toBe(`${later.since(earlier, { largestUnit: 'years' })}`);
    //  expect(later.since(earlier, { smallestUnit: 'year' }).toString()).toBe(`${later.since(earlier, { smallestUnit: 'years' })}`);
    //  expect(later.since(earlier, { largestUnit: 'month' }).toString()).toBe(`${later.since(earlier, { largestUnit: 'months' })}`);
    //   equal(
    //     `${later.since(earlier, { smallestUnit: 'month' })}`,
    //     `${later.since(earlier, { smallestUnit: 'months' })}`
    //   );
    // });
  });

  describe("YearMonth.add() works", () => {
    ym = PlainYearMonth.from("2019-11");
    it("(2019-11) plus 2 months === 2020-01", () => {
      expect(ym.add({ months: 2 }).toString()).toBe("2020-01");
      expect(ym.add({ months: 2 }, Overflow.Constrain).toString()).toBe(
        "2020-01"
      );
      expect(ym.add({ months: 2 }, Overflow.Reject).toString()).toBe("2020-01");
    });
    it("(2019-11) plus 1 year === 2020-11", () => {
      expect(ym.add({ years: 1 }).toString()).toBe("2020-11");
      expect(ym.add({ years: 1 }, Overflow.Constrain).toString()).toBe(
        "2020-11"
      );
      expect(ym.add({ years: 1 }, Overflow.Reject).toString()).toBe("2020-11");
    });
    it("symmetrical with regard to negative durations", () => {
      expect(
        PlainYearMonth.from("2020-01").add({ months: -2 }).toString()
      ).toBe("2019-11");
      expect(PlainYearMonth.from("2020-11").add({ years: -1 }).toString()).toBe(
        "2019-11"
      );
    });
    it("yearMonth.add(durationObj)", () => {
      expect(ym.add(new Duration(0, 2)).toString()).toBe("2020-01");
    });
    it("casts argument", () => {;
      expect(ym.add("P2M").toString()).toBe("2020-01");
    });
    it("ignores lower units that don't balance up to the length of the month", () => {
      expect(ym.add({ days: 1 }).toString()).toBe("2019-11");
      expect(ym.add({ days: 29 }).toString()).toBe("2019-11");
      expect(ym.add({ hours: 1 }).toString()).toBe("2019-11");
      expect(ym.add({ minutes: 1 }).toString()).toBe("2019-11");
      expect(ym.add({ seconds: 1 }).toString()).toBe("2019-11");
      expect(ym.add({ milliseconds: 1 }).toString()).toBe("2019-11");
      expect(ym.add({ microseconds: 1 }).toString()).toBe("2019-11");
      expect(ym.add({ nanoseconds: 1 }).toString()).toBe("2019-11");
    });
    it("adds lower units that balance up to a month or more", () => {
      expect(ym.add({ days: 30 }).toString()).toBe("2019-12");
      expect(ym.add({ days: 31 }).toString()).toBe("2019-12");
      expect(ym.add({ days: 60 }).toString()).toBe("2019-12");
      expect(ym.add({ days: 61 }).toString()).toBe("2020-01");
      expect(ym.add({ hours: 720 }).toString()).toBe("2019-12");
      expect(ym.add({ minutes: 43200 }).toString()).toBe("2019-12");
      expect(ym.add({ seconds: 2592000 }).toString()).toBe("2019-12");

      // // These are overflowing due to i32
      // expect(ym.add({ milliseconds: 2592000_000 }).toString()).toBe("2019-12");
      // expect(ym.add({ microseconds: 2592000_000_000 }).toString()).toBe(
      //   "2019-12"
      // );
      // expect(ym.add({ nanoseconds: 2592000_000_000_000 }).toString()).toBe(
      //   "2019-12"
      // );
    });
    it("balances days to months based on the number of days in the ISO month", () => {
      expect(PlainYearMonth.from("2019-02").add({ days: 27 }).toString()).toBe(
        "2019-02"
      );
      expect(PlainYearMonth.from("2019-02").add({ days: 28 }).toString()).toBe(
        "2019-03"
      );
      expect(PlainYearMonth.from("2020-02").add({ days: 28 }).toString()).toBe(
        "2020-02"
      );
      expect(PlainYearMonth.from("2020-02").add({ days: 29 }).toString()).toBe(
        "2020-03"
      );
      expect(PlainYearMonth.from("2019-11").add({ days: 29 }).toString()).toBe(
        "2019-11"
      );
      expect(PlainYearMonth.from("2019-11").add({ days: 30 }).toString()).toBe(
        "2019-12"
      );
      expect(PlainYearMonth.from("2020-01").add({ days: 30 }).toString()).toBe(
        "2020-01"
      );
      expect(PlainYearMonth.from("2020-01").add({ days: 31 }).toString()).toBe(
        "2020-02"
      );
    });
    // it("invalid overflow", () => {
    //   ["", "CONSTRAIN", "balance", 3, null].forEach((overflow) =>
    //     throws(() => ym.add({ months: 1 }, { overflow }), RangeError)
    //   );
    // });
    xit("mixed positive and negative values always throw", () => {
      // ["constrain", "reject"].forEach((overflow) =>
      //   throws(() => ym.add({ years: 1, months: -6 }, { overflow }), RangeError)
      // );
    });
    // it("options may only be an object or undefined", () => {
    //   [null, 1, "hello", true, Symbol("foo"), 1n].forEach((badOptions) =>
    //     throws(() => ym.add({ months: 1 }, badOptions), TypeError)
    //   );
    //   [{}, () => {}, undefined].forEach((options) =>
    //     expect(ym.add({ months: 1 }, options).toString()).toBe("2019-12")
    //   );
    // });
    // it("object must contain at least one correctly-spelled property", () => {
    //   throws(() => ym.add({}), TypeError);
    //   throws(() => ym.add({ month: 12 }), TypeError);
    // });
    // it("incorrectly-spelled properties are ignored", () => {
    //   expect(ym.add({ month: 1, years: 1 }).toString()).toBe("2020-11");
    // });
  });

  describe("YearMonth.subtract() works", () => {
    ym = PlainYearMonth.from("2019-11");
    it("(2019-11) minus 11 months === 2018-12", () => {
      expect(ym.subtract({ months: 11 }).toString()).toBe("2018-12");
      expect(ym.subtract({ months: 11 }, Overflow.Constrain).toString()).toBe(
        "2018-12"
      );
      expect(ym.subtract({ months: 11 }, Overflow.Reject).toString()).toBe(
        "2018-12"
      );
    });
    it("(2019-11) minus 12 years === 2007-11", () => {
      expect(ym.subtract({ years: 12 }).toString()).toBe("2007-11");
      expect(ym.subtract({ years: 12 }, Overflow.Constrain).toString()).toBe(
        "2007-11"
      );
      expect(ym.subtract({ years: 12 }, Overflow.Reject).toString()).toBe(
        "2007-11"
      );
    });
    it("symmetrical with regard to negative durations", () => {
      expect(
        PlainYearMonth.from("2018-12").subtract({ months: -11 }).toString()
      ).toBe("2019-11");
      expect(
        PlainYearMonth.from("2007-11").subtract({ years: -12 }).toString()
      ).toBe("2019-11");
    });
    it("yearMonth.subtract(durationObj)", () => {
      expect(ym.subtract(new Duration(0, 11)).toString()).toBe("2018-12");
    });
    it("casts argument", () => {;
      expect(ym.subtract("P11M").toString()).toBe("2018-12");
    });
    it("ignores lower units that don't balance up to the length of the month", () => {
      expect(ym.subtract({ days: 1 }).toString()).toBe("2019-11");
      expect(ym.subtract({ hours: 1 }).toString()).toBe("2019-11");
      expect(ym.subtract({ minutes: 1 }).toString()).toBe("2019-11");
      expect(ym.subtract({ seconds: 1 }).toString()).toBe("2019-11");
      expect(ym.subtract({ milliseconds: 1 }).toString()).toBe("2019-11");
      expect(ym.subtract({ microseconds: 1 }).toString()).toBe("2019-11");
      expect(ym.subtract({ nanoseconds: 1 }).toString()).toBe("2019-11");
    });
    it("subtracts lower units that balance up to a day or more", () => {
      expect(ym.subtract({ days: 29 }).toString()).toBe("2019-11");
      expect(ym.subtract({ days: 30 }).toString()).toBe("2019-10");
      expect(ym.subtract({ days: 60 }).toString()).toBe("2019-10");
      expect(ym.subtract({ days: 61 }).toString()).toBe("2019-09");
      expect(ym.subtract({ hours: 720 }).toString()).toBe("2019-10");
      expect(ym.subtract({ minutes: 43200 }).toString()).toBe("2019-10");
      expect(ym.subtract({ seconds: 2592000 }).toString()).toBe("2019-10");
      // expect(ym.subtract({ milliseconds: 2592000_000 }).toString()).toBe(
      //   "2019-10"
      // );
      // expect(ym.subtract({ microseconds: 2592000_000_000 }).toString()).toBe(
      //   "2019-10"
      // );
      // expect(ym.subtract({ nanoseconds: 2592000_000_000_000 }).toString()).toBe(
      //   "2019-10"
      // );
    });
    it("balances days to months based on the number of days in the ISO month", () => {
      expect(
        PlainYearMonth.from("2019-02").subtract({ days: 27 }).toString()
      ).toBe("2019-02");
      expect(
        PlainYearMonth.from("2019-02").subtract({ days: 28 }).toString()
      ).toBe("2019-01");
      expect(
        PlainYearMonth.from("2020-02").subtract({ days: 28 }).toString()
      ).toBe("2020-02");
      expect(
        PlainYearMonth.from("2020-02").subtract({ days: 29 }).toString()
      ).toBe("2020-01");
      expect(
        PlainYearMonth.from("2019-11").subtract({ days: 29 }).toString()
      ).toBe("2019-11");
      expect(
        PlainYearMonth.from("2019-11").subtract({ days: 30 }).toString()
      ).toBe("2019-10");
      expect(
        PlainYearMonth.from("2020-01").subtract({ days: 30 }).toString()
      ).toBe("2020-01");
      expect(
        PlainYearMonth.from("2020-01").subtract({ days: 31 }).toString()
      ).toBe("2019-12");
    });
    // it("invalid overflow", () => {
    //   ["", "CONSTRAIN", "balance", 3, null].forEach((overflow) =>
    //     throws(() => ym.subtract({ months: 1 }, { overflow }), RangeError)
    //   );
    // });
    xit("mixed positive and negative values always throw", () => {
      // ["constrain", "reject"].forEach((overflow) =>
      //   throws(
      //     () => ym.subtract({ years: 1, months: -6 }, { overflow }),
      //     RangeError
      //   )
      // );
    });
    // it("options may only be an object or undefined", () => {
    //   [null, 1, "hello", true, Symbol("foo"), 1n].forEach((badOptions) =>
    //     throws(() => ym.subtract({ months: 1 }, badOptions), TypeError)
    //   );
    //   [{}, () => {}, undefined].forEach((options) =>
    //     expect(ym.subtract({ months: 1 }, options).toString()).toBe("2019-10")
    //   );
    // });
    // it("object must contain at least one correctly-spelled property", () => {
    //   throws(() => ym.subtract({}), TypeError);
    //   throws(() => ym.subtract({ month: 12 }), TypeError);
    // });
    // it("incorrectly-spelled properties are ignored", () => {
    //   expect(ym.subtract({ month: 1, years: 1 }).toString()).toBe("2018-11");
    // });
  });

  describe("YearMonth.toPlainDate()", () => {
    ym = PlainYearMonth.from("2002-01");
    it("takes a day parameter", () => {
      expect(ym.toPlainDate(22).toString()).toBe("2002-01-22");
    });
    // it("doesn't take a primitive argument", () => {
    //   [22, '22', false, 22n, Symbol('22'), null].forEach((bad) => {
    //     throws(() => ym.toPlainDate(bad), TypeError);
    //   });
    // });
    // it('takes an object argument with day property', () => {
    //  expect(ym.toPlainDate({ day: 22 }).toString()).toBe('2002-01-22');
    // });
    // it('needs at least a day property on the object in the ISO calendar', () => {
    //   throws(() => ym.toPlainDate({ something: 'nothing' }), TypeError);
    // });
  });

  describe("YearMonth.toString()", () => {
    ym1 = PlainYearMonth.from("1976-11");
    // ym2 = PlainYearMonth.from({ year: 1976, month: 11, calendar: 'gregory' });
    it("YearMonth(1976, 11).toString() == 1976-11", () => {
      expect(ym1.toString()).toBe("1976-11");
    });
    // it('shows only non-ISO calendar if calendarName = auto', () => {
    //   equal(ym1.toString({ calendarName: 'auto' }), '1976-11');
    //   equal(ym2.toString({ calendarName: 'auto' }), '1976-11-01[u-ca=gregory]');
    // });
    // it('shows ISO calendar if calendarName = always', () => {
    //   equal(ym1.toString({ calendarName: 'always' }), '1976-11[u-ca=iso8601]');
    // });
    // it('omits non-ISO calendar, but not day, if calendarName = never', () => {
    //   equal(ym1.toString({ calendarName: 'never' }), '1976-11');
    //   equal(ym2.toString({ calendarName: 'never' }), '1976-11-01');
    // });
    // it('default is calendar = auto', () => {
    //   equal(ym1.toString(), '1976-11');
    //   equal(ym2.toString(), '1976-11-01[u-ca=gregory]');
    // });
    // it('throws on invalid calendar', () => {
    //   ['ALWAYS', 'sometimes', false, 3, null].forEach((calendarName) => {
    //     throws(() => ym1.toString({ calendarName }), RangeError);
    //   });
    // });
  });
});
