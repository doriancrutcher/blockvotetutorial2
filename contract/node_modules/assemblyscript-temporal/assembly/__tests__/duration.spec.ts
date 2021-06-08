import { Duration, DurationLike } from "../duration";
import { TimeComponent } from "../enums";
import { PlainDateTime } from "../plaindatetime";

describe("Construction", () => {
  it("positive duration, sets fields", () => {
    const d = new Duration(5, 5, 5, 5, 5, 5, 5, 5, 5, 0);
    expect(d.sign).toBe(1);
    expect(d.years).toBe(5);
    expect(d.months).toBe(5);
    expect(d.weeks).toBe(5);
    expect(d.days).toBe(5);
    expect(d.hours).toBe(5);
    expect(d.minutes).toBe(5);
    expect(d.seconds).toBe(5);
    expect(d.milliseconds).toBe(5);
    expect(d.microseconds).toBe(5);
    expect(d.nanoseconds).toBe(0);
  });

  it("negative duration, sets fields", () => {
    const d = new Duration(-5, -5, -5, -5, -5, -5, -5, -5, -5, 0);
    expect(d.sign).toBe(-1);
    expect(d.years).toBe(-5);
    expect(d.months).toBe(-5);
    expect(d.weeks).toBe(-5);
    expect(d.days).toBe(-5);
    expect(d.hours).toBe(-5);
    expect(d.minutes).toBe(-5);
    expect(d.seconds).toBe(-5);
    expect(d.milliseconds).toBe(-5);
    expect(d.microseconds).toBe(-5);
    expect(d.nanoseconds).toBe(0);
  });

  it("zero-length, sets fields", () => {
    const d = new Duration();
    expect(d.sign).toBe(0);
    expect(d.years).toBe(0);
    expect(d.months).toBe(0);
    expect(d.weeks).toBe(0);
    expect(d.days).toBe(0);
    expect(d.hours).toBe(0);
    expect(d.minutes).toBe(0);
    expect(d.seconds).toBe(0);
    expect(d.milliseconds).toBe(0);
    expect(d.microseconds).toBe(0);
    expect(d.nanoseconds).toBe(0);
  });

  it("constructor treats -0 as 0", () => {
    const d = new Duration(-0, -0, -0, -0, -0, -0, -0, -0, -0, -0);
    expect(d.sign).toBe(0);
    expect(d.years).toBe(0);
    expect(d.months).toBe(0);
    expect(d.weeks).toBe(0);
    expect(d.days).toBe(0);
    expect(d.hours).toBe(0);
    expect(d.minutes).toBe(0);
    expect(d.seconds).toBe(0);
    expect(d.milliseconds).toBe(0);
    expect(d.microseconds).toBe(0);
    expect(d.nanoseconds).toBe(0);
  });

  it("mixed positive and negative values throw", () => {
    expect(() => {
      new Duration(-1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
    }).toThrow();
    expect(() => {
      new Duration(1, -1, 1, 1, 1, 1, 1, 1, 1, 1);
    }).toThrow();
    expect(() => {
      new Duration(1, 1, -1, 1, 1, 1, 1, 1, 1, 1);
    }).toThrow();
    expect(() => {
      new Duration(1, 1, 1, -1, 1, 1, 1, 1, 1, 1);
    }).toThrow();
    expect(() => {
      new Duration(1, 1, 1, 1, -1, 1, 1, 1, 1, 1);
    }).toThrow();
    expect(() => {
      new Duration(1, 1, 1, 1, 1, -1, 1, 1, 1, 1);
    }).toThrow();
    expect(() => {
      new Duration(1, 1, 1, 1, 1, 1, -1, 1, 1, 1);
    }).toThrow();
    expect(() => {
      new Duration(1, 1, 1, 1, 1, 1, 1, -1, 1, 1);
    }).toThrow();
    expect(() => {
      new Duration(1, 1, 1, 1, 1, 1, 1, 1, -1, 1);
    }).toThrow();
    expect(() => {
      new Duration(1, 1, 1, 1, 1, 1, 1, 1, 1, -1);
    }).toThrow();
  });
});

describe("from()", () => {
  it("Duration.from({ milliseconds: 5 }) == PT0.005S", () => {
    expect(
      `${Duration.from<DurationLike>({ milliseconds: 5 })}`
    ).toBe("PT0.005S");
  });
  it('Duration.from("P1D") == P1D', () => {
    expect(`${Duration.from("P1D")}`).toBe("P1D");
  });
  it("lowercase variant", () => {
    expect(`${Duration.from("p1y1m1dt1h1m1s")}`).toBe("P1Y1M1DT1H1M1S");
  });
  it("upto nine decimal places work", () => {
    expect(`${Duration.from("P1Y1M1W1DT1H1M1.1S")}`).toBe("P1Y1M1W1DT1H1M1.1S");
    expect(`${Duration.from("P1Y1M1W1DT1H1M1.12S")}`).toBe(
      "P1Y1M1W1DT1H1M1.12S"
    );
    expect(`${Duration.from("P1Y1M1W1DT1H1M1.123S")}`).toBe(
      "P1Y1M1W1DT1H1M1.123S"
    );
    expect(`${Duration.from("P1Y1M1W1DT1H1M1.1234S")}`).toBe(
      "P1Y1M1W1DT1H1M1.1234S"
    );
    expect(`${Duration.from("P1Y1M1W1DT1H1M1.12345S")}`).toBe(
      "P1Y1M1W1DT1H1M1.12345S"
    );
    expect(`${Duration.from("P1Y1M1W1DT1H1M1.123456S")}`).toBe(
      "P1Y1M1W1DT1H1M1.123456S"
    );
    expect(`${Duration.from("P1Y1M1W1DT1H1M1.1234567S")}`).toBe(
      "P1Y1M1W1DT1H1M1.1234567S"
    );
    expect(`${Duration.from("P1Y1M1W1DT1H1M1.12345678S")}`).toBe(
      "P1Y1M1W1DT1H1M1.12345678S"
    );
    expect(`${Duration.from("P1Y1M1W1DT1H1M1.123456789S")}`).toBe(
      "P1Y1M1W1DT1H1M1.123456789S"
    );
  });
  it("above nine decimal places throw", () => {
    expect(() => {
      Duration.from("P1Y1M1W1DT1H1M1.123456789123S");
    }).toThrow();
  });
  it("variant decimal separator", () => {
    expect(`${Duration.from("P1Y1M1W1DT1H1M1,12S")}`).toBe(
      "P1Y1M1W1DT1H1M1.12S"
    );
  });
  xit("decimal places only allowed in time units", () => {
    //     [
    //       'P0.5Y',
    //       'P1Y0,5M',
    //       'P1Y1M0.5W',
    //       'P1Y1M1W0,5D',
    //       { years: 0.5 },
    //       { months: 0.5 },
    //       { weeks: 0.5 },
    //       { days: 0.5 }
    //     ].forEach((str) => throws(() => Duration.from(str), RangeError));
  });
  //   it('decimal places only allowed in last non-zero unit', () => {
  //     [
  //       'P1Y1M1W1DT0.5H5S',
  //       'P1Y1M1W1DT1.5H0,5M',
  //       'P1Y1M1W1DT1H0.5M0.5S',
  //       { hours: 0.5, minutes: 20 },
  //       { hours: 0.5, seconds: 15 },
  //       { minutes: 10.7, nanoseconds: 400 }
  //     ].forEach((str) => throws(() => Duration.from(str), RangeError));
  //   });
  //   it('decimal places are properly handled on valid units', () => {
  //     expect(`${Duration.from('P1DT0.5M')}`).toBe('P1DT30S');
  //     equal(`${Duration.from('P1DT0,5H')}`, 'P1DT30M');
  //   });
  it('"P" by itself is not a valid string', () => {
    expect(() => {
      Duration.from("P");
    }).toThrow();
    expect(() => {
      Duration.from("PT");
    }).toThrow();
    expect(() => {
      Duration.from("-P");
    }).toThrow();
  });
  it("no junk at end of string", () => {
    expect(() => {
      Duration.from("P1Y1M1W1DT1H1M1.01Sjunk");
    }).toThrow();
  });
  it("with a + sign", () => {
    const d = Duration.from("+P1D");
    expect(d.days).toBe(1);
  });
  it("with a - sign", () => {
    const d = Duration.from("-P1D");
    expect(d.days).toBe(-1);
  });
  it("variant minus sign", () => {
    const d = Duration.from("\u2212P1D");
    expect(d.days).toBe(-1);
  });
  it("all units have the same sign", () => {
    const d = Duration.from("-P1Y1M1W1DT1H1M1.123456789S");
    expect(d.years).toBe(-1);
    expect(d.months).toBe(-1);
    expect(d.weeks).toBe(-1);
    expect(d.days).toBe(-1);
    expect(d.hours).toBe(-1);
    expect(d.minutes).toBe(-1);
    expect(d.seconds).toBe(-1);
    expect(d.milliseconds).toBe(-123);
    expect(d.microseconds).toBe(-456);
    expect(d.nanoseconds).toBe(-789);
  });
  it("does not accept minus signs in individual units", () => {
    expect(() => {
      Duration.from("P-1Y1M");
    }).toThrow();
    expect(() => {
      Duration.from("P1Y-1M");
    }).toThrow();
  });
  it("mixed positive and negative values throw", () => {
    expect(() => {
      Duration.from({ hours: 1, minutes: -30 });
    }).toThrow();
  });
  it("excessive values unchanged", () => {
    expect(`${Duration.from({ minutes: 100 })}`).toBe("PT100M");
  });
});

describe("toString()", () => {
  it("excessive sub-second units balance themselves when serializing", () => {
    expect(`${Duration.from({ milliseconds: 3500 })}`).toBe("PT3.5S");
    expect(`${Duration.from({ microseconds: 3500 })}`).toBe("PT0.0035S");
    expect(`${Duration.from({ nanoseconds: 3500 })}`).toBe("PT0.0000035S");
    expect(`${new Duration(0, 0, 0, 0, 0, 0, 0, 1111, 1111, 1111)}`).toBe(
      "PT1.112112111S"
    );
    expect(`${Duration.from({ seconds: 120, milliseconds: 3500 })}`).toBe(
      "PT123.5S"
    );
  });
  xit("supports nanosecond precision", () => {
    expect(`${Duration.from({ nanoseconds: -250 })}`).toBe("-PT0.00000025S");
    expect(`${Duration.from({ nanoseconds: -3500 })}`).toBe("-PT0.0000035S");
  });
  it("negative sub-second units are balanced correctly", () => {
    expect(`${Duration.from({ milliseconds: -250 })}`).toBe("-PT0.25S");
    expect(`${Duration.from({ milliseconds: -3500 })}`).toBe("-PT3.5S");
    expect(`${Duration.from({ microseconds: -250 })}`).toBe("-PT0.00025S");
    expect(`${Duration.from({ microseconds: -3500 })}`).toBe("-PT0.0035S");
    expect(`${new Duration(0, 0, 0, 0, 0, 0, 0, -1111, -1111, -1111)}`).toBe(
      "-PT1.112112111S"
    );
    expect(`${Duration.from({ seconds: -120, milliseconds: -3500 })}`).toBe(
      "-PT123.5S"
    );
  });
  it("emits a negative sign for a negative duration", () => {
    expect(`${Duration.from({ weeks: -1, days: -1 })}`).toBe("-P1W1D");
  });

  xit("supports various configuration options", () => {
    //   const d1 = new Duration(0, 0, 0, 0, 15, 23);
    //   const d2 = new Duration(0, 0, 0, 0, 15, 23, 30);
    //   const d3 = new Duration(0, 0, 0, 0, 15, 23, 30, 543, 200);
    //   it('smallestUnits are aliases for fractional digits', () => {
    //     expect(d3.toString({ smallestUnit: 'seconds' })).toBe(d3.toString({ fractionalSecondDigits: 0 }));
    //     expect(d3.toString({ smallestUnit: 'milliseconds' })).toBe(d3.toString({ fractionalSecondDigits: 3 }));
    //     expect(d3.toString({ smallestUnit: 'microseconds' })).toBe(d3.toString({ fractionalSecondDigits: 6 }));
    //     expect(d3.toString({ smallestUnit: 'nanoseconds' })).toBe(d3.toString({ fractionalSecondDigits: 9 }));
    //   });
    //   it('throws on invalid or disallowed smallestUnit', () => {
    //     ['eras', 'years', 'months', 'weeks', 'days', 'hours', 'minutes', 'nonsense'].forEach((smallestUnit) =>
    //       throws(() => d1.toString({ smallestUnit }), RangeError)
    //     );
    //   });
    //   it('accepts singular units', () => {
    //     expect(d3.toString({ smallestUnit: 'second' })).toBe(d3.toString({ smallestUnit: 'seconds' }));
    //     expect(d3.toString({ smallestUnit: 'millisecond' })).toBe(d3.toString({ smallestUnit: 'milliseconds' }));
    //     expect(d3.toString({ smallestUnit: 'microsecond' })).toBe(d3.toString({ smallestUnit: 'microseconds' }));
    //     expect(d3.toString({ smallestUnit: 'nanosecond' })).toBe(d3.toString({ smallestUnit: 'nanoseconds' }));
    //   });
    //   it('truncates or pads to 2 places', () => {
    //     const options = { fractionalSecondDigits: 2 };
    //     expect(d1.toString(options)).toBe('PT15H23M0.00S');
    //     expect(d2.toString(options)).toBe('PT15H23M30.00S');
    //     expect(d3.toString(options)).toBe('PT15H23M30.54S');
    //   });
    //   it('pads to 7 places', () => {
    //     const options = { fractionalSecondDigits: 7 };
    //     expect(d1.toString(options)).toBe('PT15H23M0.0000000S');
    //     expect(d2.toString(options)).toBe('PT15H23M30.0000000S');
    //     expect(d3.toString(options)).toBe('PT15H23M30.5432000S');
    //   });
    //   it('auto is the default', () => {
    //     [d1, d2, d3].forEach((d) => expect(d.toString({ fractionalSecondDigits: 'auto' })).toBe(d.toString()));
    //   });
    //   it('throws on out of range or invalid fractionalSecondDigits', () => {
    //     [-1, 10, Infinity, NaN, 'not-auto'].forEach((fractionalSecondDigits) =>
    //       throws(() => d1.toString({ fractionalSecondDigits }), RangeError)
    //     );
    //   });
    //   it('accepts and truncates fractional fractionalSecondDigits', () => {
    //     expect(d3.toString({ fractionalSecondDigits: 5.5 })).toBe('PT15H23M30.54320S');
    //   });
    //   it('smallestUnit overrides fractionalSecondDigits', () => {
    //     expect(d3.toString({ smallestUnit: 'seconds').toBe(fractionalSecondDigits: 9 }), 'PT15H23M30S');
    //   });
    //   it('throws on invalid roundingMode', () => {
    //     throws(() => d1.toString({ roundingMode: 'cile' }), RangeError);
    //   });
    //   it('rounds to nearest', () => {
    //     expect(d3.toString({ smallestUnit: 'seconds').toBe(roundingMode: 'halfExpand' }), 'PT15H23M31S');
    //     expect(d3.toString({ fractionalSecondDigits: 3).toBe(roundingMode: 'halfExpand' }), 'PT15H23M30.543S');
    //   });
    //   it('rounds up', () => {
    //     expect(d3.toString({ smallestUnit: 'seconds').toBe(roundingMode: 'ceil' }), 'PT15H23M31S');
    //     expect(d3.toString({ fractionalSecondDigits: 3).toBe(roundingMode: 'ceil' }), 'PT15H23M30.544S');
    //   });
    //   it('rounds down', () => {
    //     expect(d3.negated().toString({ smallestUnit: 'seconds').toBe(roundingMode: 'floor' }), '-PT15H23M31S');
    //     expect(d3.negated().toString({ fractionalSecondDigits: 3).toBe(roundingMode: 'floor' }), '-PT15H23M30.544S');
    //   });
    //   it('truncates', () => {
    //     expect(d3.toString({ smallestUnit: 'seconds').toBe(roundingMode: 'trunc' }), 'PT15H23M30S');
    //     expect(d3.toString({ fractionalSecondDigits: 3).toBe(roundingMode: 'trunc' }), 'PT15H23M30.543S');
    //   });
    //   it('rounding can affect units up to seconds', () => {
    //     const d4 = Duration.from('P1Y1M1W1DT23H59M59.999999999S');
    //     expect(d4.toString({ fractionalSecondDigits: 8).toBe(roundingMode: 'halfExpand' }), 'P1Y1M1W1DT23H59M60.00000000S');
    //   });
    //   it('options may only be an object or undefined', () => {
    //     [null, 1, 'hello', true, Symbol('foo'), 1n].forEach((badOptions) =>
    //       throws(() => d1.toString(badOptions), TypeError)
    //     );
    //     [{}, () => {}, undefined].forEach((options) => expect(d1.toString(options)).toBe('PT15H23M'));
    //   });
    // });
  });
});

describe("min/max values", () => {
  it("minimum is zero", () => {
    ["P0Y", "P0M", "P0W", "P0D", "PT0H", "PT0M", "PT0S"].forEach((unit) => {
      expect(`${Duration.from(unit)}`).toBe("PT0S");
    });
  });
});

let duration: Duration, d: Duration, dy: Duration, dw: Duration, dm: Duration;

describe("Duration.with()", () => {
  duration = new Duration(5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
  it("duration.with({ years: 1 } works", () => {
    expect(`${duration.with({ years: 1 })}`).toBe("P1Y5M5W5DT5H5M5.005005005S");
  });
  it("duration.with({ months: 1 } works", () => {
    expect(`${duration.with({ months: 1 })}`).toBe(
      "P5Y1M5W5DT5H5M5.005005005S"
    );
  });
  it("duration.with({ weeks: 1 } works", () => {
    expect(`${duration.with({ weeks: 1 })}`).toBe("P5Y5M1W5DT5H5M5.005005005S");
  });
  it("duration.with({ days: 1 } works", () => {
    expect(`${duration.with({ days: 1 })}`).toBe("P5Y5M5W1DT5H5M5.005005005S");
  });
  it("duration.with({ hours: 1 } works", () => {
    expect(`${duration.with({ hours: 1 })}`).toBe("P5Y5M5W5DT1H5M5.005005005S");
  });
  it("duration.with({ minutes: 1 } works", () => {
    expect(`${duration.with({ minutes: 1 })}`).toBe(
      "P5Y5M5W5DT5H1M5.005005005S"
    );
  });
  it("duration.with({ seconds: 1 } works", () => {
    expect(`${duration.with({ seconds: 1 })}`).toBe(
      "P5Y5M5W5DT5H5M1.005005005S"
    );
  });
  it("duration.with({ milliseconds: 1 } works", () => {
    expect(`${duration.with({ milliseconds: 1 })}`).toBe(
      "P5Y5M5W5DT5H5M5.001005005S"
    );
  });
  it("duration.with({ microseconds: 1 } works", () => {
    expect(`${duration.with({ microseconds: 1 })}`).toBe(
      "P5Y5M5W5DT5H5M5.005001005S"
    );
  });
  it("duration.with({ nanoseconds: 1 } works", () => {
    expect(`${duration.with({ nanoseconds: 1 })}`).toBe(
      "P5Y5M5W5DT5H5M5.005005001S"
    );
  });
  it("duration.with({ months: 1, seconds: 15 } works", () => {
    expect(`${duration.with({ months: 1, seconds: 15 })}`).toBe(
      "P5Y1M5W5DT5H5M15.005005005S"
    );
  });
  it("mixed positive and negative values throw", () => {
    expect(() => {
      duration.with({ hours: 1, minutes: -1 });
    }).toThrow();
  });
  it("can reverse the sign if all the fields are replaced", () => {
    duration = Duration.from({ years: 5, days: 1 });
    duration = duration.with({ years: -1, days: -1, minutes: 0 });
    expect(`${duration}`).toBe("-P1Y1D");
  });
  it("throws if new fields have a different sign from the old fields", () => {
    duration = Duration.from({ years: 5, days: 1 });
    expect(() => {
      duration.with({ months: -5, minutes: 0 });
    }).toThrow();
  });
});

describe("Duration.add()", () => {
  duration = Duration.from({ days: 1, minutes: 5 });
  it("adds nothing", () => {
    expect(`${duration.add(new Duration())}`).toBe("P1DT5M");
  });
  it("adds same units", () => {
    expect(`${duration.add({ days: 2, minutes: 5 })}`).toBe("P3DT10M");
  });
  it("adds different units", () => {
    expect(`${duration.add({ hours: 12, seconds: 30 })}`).toBe("P1DT12H5M30S");
  });
  it("symmetric with regard to negative durations", () => {
    expect(`${Duration.from("P3DT10M").add({ days: -2, minutes: -5 })}`).toBe(
      "P1DT5M"
    );
    expect(
      `${Duration.from("P1DT12H5M30S").add({ hours: -12, seconds: -30 })}`
    ).toBe("P1DT5M");
  });
  it("balances time units even if both operands are positive", () => {
    const d = Duration.from("P50DT50H50M50.500500500S");
    const result = d.add(d);
    expect(result.days).toBe(104);
    expect(result.hours).toBe(5);
    expect(result.minutes).toBe(41);
    expect(result.seconds).toBe(41);
    expect(result.milliseconds).toBe(1);
    expect(result.microseconds).toBe(1);
    expect(result.nanoseconds).toBe(0);
  });
  it("balances correctly if adding different units flips the overall sign", () => {
    const d1 = Duration.from({ hours: -1, seconds: -60 });
    expect(`${d1.add({ minutes: 122 })}`).toBe("PT1H1M");
    const d2 = Duration.from({ hours: -1, seconds: -3721 });
    // expect(`${d2.add({ minutes: 61, nanoseconds: 3722000000001 })}`).toBe(
    //   "PT1M1.000000001S"
    // );
  });
  it("balances correctly if adding different units flips the overall sign", () => {
    const d1 = Duration.from({ hours: -1, seconds: -60 });
    expect(`${d1.add({ minutes: 122 })}`).toBe("PT1H1M");
    // const d2 = Duration.from({ hours: -1, seconds: -3721 });
    // expect(`${d2.add({ minutes: 61, nanoseconds: 3722000000001 })}`).toBe('PT1M1.000000001S');
  });
  it("mixed positive and negative values always throw", () => {
    expect(() => {
      duration.add({ hours: 1, minutes: -30 });
    }).toThrow();
  });
  xit("always throws when addition overflows", () => {
    //     throws(() => max.add(max), RangeError);
  });
  it("relativeTo required for years, months, and weeks", () => {
    d = Duration.from({ hours: 1 });
    dy = Duration.from({ years: 1 });
    dm = Duration.from({ months: 1 });
    dw = Duration.from({ weeks: 1 });
    expect(() => {
      d.add(dy);
    }).toThrow();
    expect(() => {
      d.add(dm);
    }).toThrow();
    expect(() => {
      d.add(dw);
    }).toThrow();
    expect(() => {
      dy.add(d);
    }).toThrow();
    expect(() => {
      dm.add(d);
    }).toThrow();
    expect(() => {
      dw.add(d);
    }).toThrow();
    const relativeTo = PlainDateTime.from("2000-01-01");
    expect(`${d.add(dy, relativeTo)}`).toBe("P1YT1H");
    expect(`${d.add(dm, relativeTo)}`).toBe("P1MT1H");
    expect(`${d.add(dw, relativeTo)}`).toBe("P1WT1H");
    expect(`${dy.add(d, relativeTo)}`).toBe("P1YT1H");
    expect(`${dm.add(d, relativeTo)}`).toBe("P1MT1H");
    expect(`${dw.add(d, relativeTo)}`).toBe("P1WT1H");
  });
  it("relativeTo affects year length", () => {
    const oneYear = new Duration(1);
    const days365 = new Duration(0, 0, 0, 365);
    expect(`${oneYear.add(days365, PlainDateTime.from("2016-01-01"))}`).toBe(
      "P2Y"
    );
    expect(`${oneYear.add(days365, PlainDateTime.from("2015-01-01"))}`).toBe(
      "P1Y11M30D"
    );
  });
  it("relativeTo affects month length", () => {
    const oneMonth = new Duration(0, 1);
    const days30 = new Duration(0, 0, 0, 30);
    expect(`${oneMonth.add(days30, PlainDateTime.from("2018-01-01"))}`).toBe(
      "P2M2D"
    );
    expect(`${oneMonth.add(days30, PlainDateTime.from("2018-02-01"))}`).toBe(
      "P1M30D"
    );
    expect(`${oneMonth.add(days30, PlainDateTime.from("2018-03-01"))}`).toBe(
      "P2M"
    );
  });

  it("first this is resolved against relativeTo, then the argument against relativeTo + this", () => {
    const d1 = new Duration(0, 1, 0, 1);
    const d2 = new Duration(0, 1, 0, 1);
    const relativeTo = new PlainDateTime(2000, 1, 1);
    expect(`${d1.add(d2, relativeTo)}`).toBe("P2M2D");
  });

  xit("supports zoned date time", () => {
    // it('relativeTo does not affect days if ZonedDateTime, and duration encompasses no DST change', () => {
    //     const relativeTo = Temporal.ZonedDateTime.from('2017-01-01T00:00[America/Montevideo]');
    //     expect(`${oneDay.add(hours24, relativeTo)}`, 'P2D');
    //   const skippedHourDay = Temporal.ZonedDateTime.from('2019-03-10T00:00[America/Vancouver]');
    //   const repeatedHourDay = Temporal.ZonedDateTime.from('2019-11-03T00:00[America/Vancouver]');
    //   const inRepeatedHour = Temporal.ZonedDateTime.from('2019-11-03T01:00-07:00[America/Vancouver]');
    //   const hours12 = new Duration(0, 0, 0, 0, 12);
    //   const hours25 = new Duration(0, 0, 0, 0, 25);
    //   describe('relativeTo affects days if ZonedDateTime, and duration encompasses DST change', () => {
    //     it('start inside repeated hour, end after', () => {
    //       expect(`${hours25.add(oneDay).toBe({ relativeTo: inRepeatedHour })}`, 'P2D');
    //       expect(`${oneDay.add(hours25).toBe({ relativeTo: inRepeatedHour })}`, 'P2DT1H');
    //     });
    //     it('start after repeated hour, end inside (negative)', () => {
    //       const relativeTo = Temporal.ZonedDateTime.from('2019-11-05T01:00[America/Vancouver]');
    //       expect(`${hours25.negated().add(oneDay.negated(), relativeTo)}`, '-P2DT1H');
    //       expect(`${oneDay.negated().add(hours25.negated(), relativeTo)}`, '-P2D');
    //     });
    //     it('start inside repeated hour, end in skipped hour', () => {
    //       expect(`${hours25.add(Duration.from({ days: 125).toBe(hours: 1 }), { relativeTo: inRepeatedHour })}`, 'P126DT1H');
    //       // this takes you to 03:00 on the next skipped-hour day
    //       expect(`${oneDay.add(Duration.from({ days: 125).toBe(hours: 1 }), { relativeTo: inRepeatedHour })}`, 'P126DT1H');
    //     });
    //     it('start in normal hour, end in skipped hour', () => {
    //       const relativeTo = Temporal.ZonedDateTime.from('2019-03-08T02:30[America/Vancouver]');
    //       expect(`${oneDay.add(hours25, relativeTo)}`, 'P2DT1H');
    //       expect(`${hours25.add(oneDay, relativeTo)}`, 'P2D');
    //     });
    //     it('start before skipped hour, end >1 day after', () => {
    //       expect(`${hours25.add(oneDay).toBe({ relativeTo: skippedHourDay })}`, 'P2DT2H');
    //       expect(`${oneDay.add(hours25).toBe({ relativeTo: skippedHourDay })}`, 'P2DT1H');
    //     });
    //     it('start after skipped hour, end >1 day before (negative)', () => {
    //       const relativeTo = Temporal.ZonedDateTime.from('2019-03-11T00:00[America/Vancouver]');
    //       expect(`${hours25.negated().add(oneDay.negated(), relativeTo)}`, '-P2DT2H');
    //       expect(`${oneDay.negated().add(hours25.negated(), relativeTo)}`, '-P2DT1H');
    //     });
    //     it('start before skipped hour, end <1 day after', () => {
    //       expect(`${hours12.add(oneDay).toBe({ relativeTo: skippedHourDay })}`, 'P1DT13H');
    //       expect(`${oneDay.add(hours12).toBe({ relativeTo: skippedHourDay })}`, 'P1DT12H');
    //     });
    //     it('start after skipped hour, end <1 day before (negative)', () => {
    //       const relativeTo = Temporal.ZonedDateTime.from('2019-03-10T12:00[America/Vancouver]');
    //       expect(`${hours12.negated().add(oneDay.negated(), relativeTo)}`, '-P1DT13H');
    //       expect(`${oneDay.negated().add(hours12.negated(), relativeTo)}`, '-P1DT12H');
    //     });
    //     it('start before repeated hour, end >1 day after', () => {
    //       expect(`${hours25.add(oneDay).toBe({ relativeTo: repeatedHourDay })}`, 'P2D');
    //       expect(`${oneDay.add(hours25).toBe({ relativeTo: repeatedHourDay })}`, 'P2DT1H');
    //     });
    //     it('start after repeated hour, end >1 day before (negative)', () => {
    //       const relativeTo = Temporal.ZonedDateTime.from('2019-11-04T00:00[America/Vancouver]');
    //       expect(`${hours25.negated().add(oneDay.negated(), relativeTo)}`, '-P2D');
    //       expect(`${oneDay.negated().add(hours25.negated(), relativeTo)}`, '-P2DT1H');
    //     });
    //     it('start before repeated hour, end <1 day after', () => {
    //       expect(`${hours12.add(oneDay).toBe({ relativeTo: repeatedHourDay })}`, 'P1DT11H');
    //       expect(`${oneDay.add(hours12).toBe({ relativeTo: repeatedHourDay })}`, 'P1DT12H');
    //     });
    //     it('start after repeated hour, end <1 day before (negative)', () => {
    //       const relativeTo = Temporal.ZonedDateTime.from('2019-11-03T12:00[America/Vancouver]');
    //       expect(`${hours12.negated().add(oneDay.negated(), relativeTo)}`, '-P1DT11H');
    //       expect(`${oneDay.negated().add(hours12.negated(), relativeTo)}`, '-P1DT12H');
    //     });
    //     it('Samoa skipped 24 hours', () => {
    //       const relativeTo = Temporal.ZonedDateTime.from('2011-12-29T12:00-10:00[Pacific/Apia]');
    //       expect(`${hours25.add(oneDay, relativeTo)}`, 'P3DT1H');
    //       expect(`${oneDay.add(hours25, relativeTo)}`, 'P3DT1H');
    //     });
    //   });
    //   it('casts relativeTo to ZonedDateTime if possible', () => {
    //     expect(`${oneDay.add(hours24).toBe({ relativeTo: '2019-11-02T00:00[America/Vancouver]' })}`, 'P1DT24H');
    //     equal(
    //       `${oneDay.add(hours24, { relativeTo: { year: 2019, month: 11, day: 2, timeZone: 'America/Vancouver' } })}`,
    //       'P1DT24H'
    //     );
    //   });
    //   it('casts relativeTo to PlainDateTime if possible', () => {
    //     expect(`${oneDay.add(hours24).toBe({ relativeTo: '2019-11-02T00:00' })}`, 'P2D');
    //     expect(`${oneDay.add(hours24).toBe({ relativeTo: { year: 2019, month: 11, day: 2 } })}`, 'P2D');
    //   });
    //   it('at least the required properties must be present in relativeTo', () => {
    //     throws(() => oneDay.add(hours24, { relativeTo: { month: 11, day: 3 } }), TypeError);
    //     throws(() => oneDay.add(hours24, { relativeTo: { year: 2019, month: 11 } }), TypeError);
    //     throws(() => oneDay.add(hours24, { relativeTo: { year: 2019, day: 3 } }), TypeError);
    //   });
  });
});

let tenDays: Duration, tenMinutes: Duration;

describe("Duration.subtract()", () => {
  duration = Duration.from({ days: 3, hours: 1, minutes: 10 });
  it("subtracts same units with positive result", () => {
    expect(`${duration.subtract({ days: 1, minutes: 5 })}`).toBe("P2DT1H5M");
  });
  it("subtracts same units with zero result", () => {
    expect(`${duration.subtract(duration)}`).toBe("PT0S");
    expect(`${duration.subtract({ days: 3 })}`).toBe("PT1H10M");
    expect(`${duration.subtract({ minutes: 10 })}`).toBe("P3DT1H");
  });
  it("balances when subtracting same units with negative result", () => {
    expect(`${duration.subtract({ minutes: 15 })}`).toBe("P3DT55M");
  });
  it("balances when subtracting different units", () => {
    expect(`${duration.subtract({ seconds: 30 })}`).toBe("P3DT1H9M30S");
  });
  it("symmetric with regard to negative durations", () => {
    expect(
      `${Duration.from("P2DT1H5M").subtract({ days: -1, minutes: -5 })}`
    ).toBe("P3DT1H10M");
    expect(
      `${new Duration().subtract({ days: -3, hours: -1, minutes: -10 })}`
    ).toBe("P3DT1H10M");
    expect(`${Duration.from("PT1H10M").subtract({ days: -3 })}`).toBe(
      "P3DT1H10M"
    );
    expect(`${Duration.from("P3DT1H").subtract({ minutes: -10 })}`).toBe(
      "P3DT1H10M"
    );
    expect(`${Duration.from("P3DT55M").subtract({ minutes: -15 })}`).toBe(
      "P3DT1H10M"
    );
    expect(`${Duration.from("P3DT1H9M30S").subtract({ seconds: -30 })}`).toBe(
      "P3DT1H10M"
    );
  });
  it("balances positive units up to the largest nonzero unit", () => {
    const d = Duration.from({
      minutes: 100,
      seconds: 100,
      milliseconds: 2000,
      microseconds: 2000,
      nanoseconds: 2000,
    });
    const less = Duration.from({
      minutes: 10,
      seconds: 10,
      milliseconds: 500,
      microseconds: 500,
      nanoseconds: 500,
    });
    const result = d.subtract(less);
    expect(result.minutes).toBe(91);
    expect(result.seconds).toBe(31);
    expect(result.milliseconds).toBe(501);
    expect(result.microseconds).toBe(501);
    expect(result.nanoseconds).toBe(500);
  });
  tenDays = Duration.from("P10D");
  tenMinutes = Duration.from("PT10M");
  it("has correct negative result", () => {
    let result = tenDays.subtract({ days: 15 });
    expect(result.days).toBe(-5);
    result = tenMinutes.subtract({ minutes: 15 });
    expect(result.minutes).toBe(-5);
  });
  it("balances correctly if subtracting different units flips the overall sign", () => {
    const d1 = Duration.from({ hours: 1, seconds: 60 });
    expect(`${d1.subtract({ minutes: 122 })}`).toBe("-PT1H1M");
    const d2 = Duration.from({ hours: 1, seconds: 3721 });
    // expect(`${d2.subtract({ minutes: 61, nanoseconds: 3722000000001 })}`).toBe(
    //   "-PT1M1.000000001S"
    // );
  });
  it("mixed positive and negative values always throw", () => {
    expect(() => {
      duration.subtract({ hours: 1, minutes: -30 });
    }).toThrow();
  });
  it("relativeTo required for years, months, and weeks", () => {
    const d = Duration.from({ hours: 1 });
    const dy = Duration.from({ years: 1, hours: 1 });
    const dm = Duration.from({ months: 1, hours: 1 });
    const dw = Duration.from({ weeks: 1, hours: 1 });
    expect(() => {
      d.subtract(dy);
    }).toThrow();
    expect(() => {
      d.subtract(dm);
    }).toThrow();
    expect(() => {
      d.subtract(dw);
    }).toThrow();
    expect(() => {
      dy.subtract(d);
    }).toThrow();
    expect(() => {
      dm.subtract(d);
    }).toThrow();
    expect(() => {
      dw.subtract(d);
    }).toThrow();
    const relativeTo = PlainDateTime.from("2000-01-01");
    expect(`${d.subtract(dy, relativeTo)}`).toBe("-P1Y");
    expect(`${d.subtract(dm, relativeTo)}`).toBe("-P1M");
    expect(`${d.subtract(dw, relativeTo)}`).toBe("-P1W");
    expect(`${dy.subtract(d, relativeTo)}`).toBe("P1Y");
    expect(`${dm.subtract(d, relativeTo)}`).toBe("P1M");
    expect(`${dw.subtract(d, relativeTo)}`).toBe("P1W");
  });
  it("relativeTo affects year length", () => {
    const oneYear = new Duration(1);
    const days365 = new Duration(0, 0, 0, 365);
    expect(
      `${oneYear.subtract(days365, PlainDateTime.from("2017-01-01"))}`
    ).toBe("PT0S");
    expect(
      `${oneYear.subtract(days365, PlainDateTime.from("2016-01-01"))}`
    ).toBe("P1D");
  });
  it("relativeTo affects month length", () => {
    const oneMonth = new Duration(0, 1);
    const days30 = new Duration(0, 0, 0, 30);
    expect(
      `${oneMonth.subtract(days30, PlainDateTime.from("2018-02-01"))}`
    ).toBe("-P2D");
    expect(
      `${oneMonth.subtract(days30, PlainDateTime.from("2018-03-01"))}`
    ).toBe("P1D");
    expect(
      `${oneMonth.subtract(days30, PlainDateTime.from("2018-04-01"))}`
    ).toBe("PT0S");
  });
  xit("supports zoned date time", () => {
    //   const oneDay = new Duration(0, 0, 0, 1);
    //   const hours24 = new Duration(0, 0, 0, 0, 24);
    //   it('relativeTo does not affect days if PlainDateTime', () => {
    //     const relativeTo = Temporal.PlainDateTime.from('2017-01-01');
    //     expect(`${oneDay.subtract(hours24, relativeTo)}`, 'PT0S');
    //   });
    //   it('relativeTo does not affect days if ZonedDateTime, and duration encompasses no DST change', () => {
    //     const relativeTo = Temporal.ZonedDateTime.from('2017-01-01T00:00[America/Montevideo]');
    //     expect(`${oneDay.subtract(hours24, relativeTo)}`, 'PT0S');
    //   });
    //   const skippedHourDay = Temporal.ZonedDateTime.from('2019-03-10T00:00[America/Vancouver]');
    //   const repeatedHourDay = Temporal.ZonedDateTime.from('2019-11-03T00:00[America/Vancouver]');
    //   const inRepeatedHour = Temporal.ZonedDateTime.from('2019-11-03T01:00-07:00[America/Vancouver]');
    //   const twoDays = new Duration(0, 0, 0, 2);
    //   const threeDays = new Duration(0, 0, 0, 3);
    //   describe('relativeTo affects days if ZonedDateTime, and duration encompasses DST change', () => {
    //     it('start inside repeated hour, end after', () => {
    //       expect(`${hours24.subtract(oneDay).toBe({ relativeTo: inRepeatedHour })}`, '-PT1H');
    //       expect(`${oneDay.subtract(hours24).toBe({ relativeTo: inRepeatedHour })}`, 'PT1H');
    //     });
    //     it('start inside repeated hour, end in skipped hour', () => {
    //       expect(`${Duration.from({ days: 127).toBe(hours: 1 }).subtract(oneDay, { relativeTo: inRepeatedHour })}`, 'P126DT1H');
    //       expect(`${Duration.from({ days: 127).toBe(hours: 1 }).subtract(hours24, { relativeTo: inRepeatedHour })}`, 'P126D');
    //     });
    //     it('start in normal hour, end in skipped hour', () => {
    //       const relativeTo = Temporal.ZonedDateTime.from('2019-03-09T02:30[America/Vancouver]');
    //       expect(`${hours24.subtract(oneDay, relativeTo)}`, 'PT1H');
    //       expect(`${oneDay.subtract(hours24, relativeTo)}`, 'PT0S');
    //     });
    //     it('start before skipped hour, end >1 day after', () => {
    //       expect(`${threeDays.subtract(hours24).toBe({ relativeTo: skippedHourDay })}`, 'P2D');
    //       expect(`${hours24.subtract(threeDays).toBe({ relativeTo: skippedHourDay })}`, '-P1DT23H');
    //     });
    //     it('start before skipped hour, end <1 day after', () => {
    //       expect(`${twoDays.subtract(hours24).toBe({ relativeTo: skippedHourDay })}`, 'P1D');
    //       expect(`${hours24.subtract(twoDays).toBe({ relativeTo: skippedHourDay })}`, '-PT23H');
    //     });
    //     it('start before repeated hour, end >1 day after', () => {
    //       expect(`${threeDays.subtract(hours24).toBe({ relativeTo: repeatedHourDay })}`, 'P2D');
    //       expect(`${hours24.subtract(threeDays).toBe({ relativeTo: repeatedHourDay })}`, '-P2DT1H');
    //     });
    //     it('start before repeated hour, end <1 day after', () => {
    //       expect(`${twoDays.subtract(hours24).toBe({ relativeTo: repeatedHourDay })}`, 'P1D');
    //       expect(`${hours24.subtract(twoDays).toBe({ relativeTo: repeatedHourDay })}`, '-P1DT1H');
    //     });
    //     it('Samoa skipped 24 hours', () => {
    //       const relativeTo = Temporal.ZonedDateTime.from('2011-12-29T12:00-10:00[Pacific/Apia]');
    //       expect(`${twoDays.subtract(Duration.from({ hours: 48 }), relativeTo)}`, '-P1D');
    //       expect(`${Duration.from({ hours: 48 }).subtract(twoDays, relativeTo)}`, 'P2D');
    //     });
    //   });
    //   it('casts relativeTo to ZonedDateTime if possible', () => {
    //     expect(`${oneDay.subtract(hours24).toBe({ relativeTo: '2019-11-03T00:00[America/Vancouver]' })}`, 'PT1H');
    //     equal(
    //       `${oneDay.subtract(hours24, { relativeTo: { year: 2019, month: 11, day: 3, timeZone: 'America/Vancouver' } })}`,
    //       'PT1H'
    //     );
    //   });
    //   it('casts relativeTo to PlainDateTime if possible', () => {
    //     expect(`${oneDay.subtract(hours24).toBe({ relativeTo: '2019-11-02T00:00' })}`, 'PT0S');
    //     expect(`${oneDay.subtract(hours24).toBe({ relativeTo: { year: 2019, month: 11, day: 2 } })}`, 'PT0S');
    //   });
    //   it('at least the required properties must be present in relativeTo', () => {
    //     throws(() => oneDay.subtract(hours24, { relativeTo: { month: 11, day: 3 } }), TypeError);
    //     throws(() => oneDay.subtract(hours24, { relativeTo: { year: 2019, month: 11 } }), TypeError);
    //     throws(() => oneDay.subtract(hours24, { relativeTo: { year: 2019, day: 3 } }), TypeError);
    //   });
    // });
  });
});

describe("Duration.negated()", () => {
  it("makes a positive duration negative", () => {
    const pos = Duration.from("P3DT1H");
    const neg = pos.negated();
    expect(`${neg}`).toBe("-P3DT1H");
    expect(neg.sign).toBe(-1);
  });
  it("makes a negative duration positive", () => {
    const neg = Duration.from("-PT2H20M30S");
    const pos = neg.negated();
    expect(`${pos}`).toBe("PT2H20M30S");
    expect(pos.sign).toBe(1);
  });
  it("makes a copy of a zero duration", () => {
    const zero = Duration.from("PT0S");
    const zero2 = zero.negated();
    expect(`${zero}`).toBe(`${zero2}`);
    expect(zero2.sign).toBe(0);
    expect(zero2.years).toBe(0);
    expect(zero2.months).toBe(0);
    expect(zero2.weeks).toBe(0);
    expect(zero2.days).toBe(0);
    expect(zero2.hours).toBe(0);
    expect(zero2.minutes).toBe(0);
    expect(zero2.seconds).toBe(0);
    expect(zero2.milliseconds).toBe(0);
    expect(zero2.microseconds).toBe(0);
    expect(zero2.nanoseconds).toBe(0);
  });
});

describe("Duration.abs()", () => {
  it("makes a copy of a positive duration", () => {
    const pos = Duration.from("P3DT1H");
    const pos2 = pos.abs();
    expect(`${pos}`).toBe(`${pos2}`);
    expect(pos2.sign).toBe(1);
  });
  it("makes a negative duration positive", () => {
    const neg = Duration.from("-PT2H20M30S");
    const pos = neg.abs();
    expect(`${pos}`).toBe("PT2H20M30S");
    expect(pos.sign).toBe(1);
  });
  it("makes a copy of a zero duration", () => {
    const zero = Duration.from("PT0S");
    const zero2 = zero.abs();
    expect(`${zero}`).toBe(`${zero2}`);
    expect(zero2.sign).toBe(0);
  });
});

describe('Duration.blank', () => {
  it('works', () => {
    assert(!Duration.from('P3DT1H').blank);
    assert(!Duration.from('-PT2H20M30S').blank);
    assert(Duration.from('PT0S').blank);
  });
  it('zero regardless of how many fields are in the duration', () => {
    const zero = Duration.from({
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      microseconds: 0,
      nanoseconds: 0
    });
    assert(zero.blank);
  });
});

// describe('Duration.round()', () => {
  // const d = new Duration(5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
  //   const d2 = new Duration(0, 0, 0, 5, 5, 5, 5, 5, 5, 5);
  //   const relativeTo = PlainDateTime.from('2020-01-01T00:00');
  //   it("succeeds with largestUnit: 'auto'", () => {
  //     expect(`${Duration.from({ hours: 25 }).round({ largestUnit: 'auto' })}`).toBe('PT25H');
  //   });

//   const d = new Duration(5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
//   const d2 = new Duration(0, 0, 0, 5, 5, 5, 5, 5, 5, 5);
//   const relativeTo = Temporal.PlainDateTime.from('2020-01-01T00:00');
//   it('options may only be an object', () => {
//     [null, 1, 'hello', true, Symbol('foo'), 1n].forEach((badOptions) => throws(() => d.round(badOptions), TypeError));
//   });
//   it('throws without parameter', () => {
//     throws(() => d.round(), TypeError);
//   });
//   it('throws with empty object', () => {
//     throws(() => d.round({}), RangeError);
//   });
//   it("succeeds with largestUnit: 'auto'", () => {
//     expect(`${Duration.from({ hours: 25 }).round({ largestUnit: 'auto' })}`).toBe('PT25H');
//   });
//   it('throws on disallowed or invalid smallestUnit', () => {
//     ['era', 'nonsense'].forEach((smallestUnit) => {
//       throws(() => d.round({ smallestUnit }), RangeError);
//     });
//   });
//   it('throws if smallestUnit is larger than largestUnit', () => {
//     const units = [
//       'years',
//       'months',
//       'weeks',
//       'days',
//       'hours',
//       'minutes',
//       'seconds',
//       'milliseconds',
//       'microseconds',
//       'nanoseconds'
//     ];
//     for (let largestIdx = 1; largestIdx < units.length; largestIdx++) {
//       for (let smallestIdx = 0; smallestIdx < largestIdx; smallestIdx++) {
//         const largestUnit = units[largestIdx];
//         const smallestUnit = units[smallestIdx];
//         throws(() => d.round({ largestUnit, smallestUnit, relativeTo }), RangeError);
//       }
//     }
//   });
//   it('assumes a different default for largestUnit if smallestUnit is larger than the default', () => {
//     const almostYear = Duration.from({ days: 364 });
//     expect(`${almostYear.round({ smallestUnit: 'years').toBe(relativeTo })}`, 'P1Y');
//     const almostMonth = Duration.from({ days: 27 });
//     expect(`${almostMonth.round({ smallestUnit: 'months').toBe(relativeTo })}`, 'P1M');
//     const almostWeek = Duration.from({ days: 6 });
//     expect(`${almostWeek.round({ smallestUnit: 'weeks').toBe(relativeTo })}`, 'P1W');
//     const almostDay = Duration.from({ seconds: 86399 });
//     expect(`${almostDay.round({ smallestUnit: 'days' })}`).toBe('P1D');
//     const almostHour = Duration.from({ seconds: 3599 });
//     expect(`${almostHour.round({ smallestUnit: 'hours' })}`).toBe('PT1H');
//     const almostMinute = Duration.from({ seconds: 59 });
//     expect(`${almostMinute.round({ smallestUnit: 'minutes' })}`).toBe('PT1M');
//     const almostSecond = Duration.from({ nanoseconds: 999999999 });
//     expect(`${almostSecond.round({ smallestUnit: 'seconds' })}`).toBe('PT1S');
//     const almostMillisecond = Duration.from({ nanoseconds: 999999 });
//     expect(`${almostMillisecond.round({ smallestUnit: 'milliseconds' })}`).toBe('PT0.001S');
//     const almostMicrosecond = Duration.from({ nanoseconds: 999 });
//     expect(`${almostMicrosecond.round({ smallestUnit: 'microseconds' })}`).toBe('PT0.000001S');
//   });
//   const hours25 = new Duration(0, 0, 0, 0, 25);
//   it('days are 24 hours if relativeTo not given', () => {
//     expect(`${hours25.round({ largestUnit: 'days' })}`).toBe('P1DT1H');
//   });
//   it('days are 24 hours if relativeTo is PlainDateTime', () => {
//     const relativeTo = Temporal.PlainDateTime.from('2017-01-01');
//     expect(`${hours25.round({ largestUnit: 'days').toBe(relativeTo })}`, 'P1DT1H');
//   });
//   it('days are 24 hours if relativeTo is ZonedDateTime, and duration encompasses no DST change', () => {
//     const relativeTo = Temporal.ZonedDateTime.from('2017-01-01T00:00[America/Montevideo]');
//     expect(`${hours25.round({ largestUnit: 'days').toBe(relativeTo })}`, 'P1DT1H');
//   });
//   const skippedHourDay = Temporal.ZonedDateTime.from('2019-03-10T00:00[America/Vancouver]');
//   const repeatedHourDay = Temporal.ZonedDateTime.from('2019-11-03T00:00[America/Vancouver]');
//   const inRepeatedHour = Temporal.ZonedDateTime.from('2019-11-03T01:00-07:00[America/Vancouver]');
//   const oneDay = new Duration(0, 0, 0, 1);
//   const hours12 = new Duration(0, 0, 0, 0, 12);
//   describe('relativeTo affects days if ZonedDateTime, and duration encompasses DST change', () => {
//     it('start inside repeated hour, end after', () => {
//       expect(`${hours25.round({ largestUnit: 'days').toBe(relativeTo: inRepeatedHour })}`, 'P1D');
//       expect(`${oneDay.round({ largestUnit: 'hours').toBe(relativeTo: inRepeatedHour })}`, 'PT25H');
//     });
//     it('start after repeated hour, end inside (negative)', () => {
//       const relativeTo = Temporal.ZonedDateTime.from('2019-11-04T01:00[America/Vancouver]');
//       expect(`${hours25.negated().round({ largestUnit: 'days').toBe(relativeTo })}`, '-P1D');
//       expect(`${oneDay.negated().round({ largestUnit: 'hours').toBe(relativeTo })}`, '-PT25H');
//     });
//     it('start inside repeated hour, end in skipped hour', () => {
//       equal(
//         `${Duration.from({ days: 126, hours: 1 }).round({ largestUnit: 'days', relativeTo: inRepeatedHour })}`,
//         'P126DT1H'
//       );
//       equal(
//         `${Duration.from({ days: 126, hours: 1 }).round({ largestUnit: 'hours', relativeTo: inRepeatedHour })}`,
//         'PT3026H'
//       );
//     });
//     it('start in normal hour, end in skipped hour', () => {
//       const relativeTo = Temporal.ZonedDateTime.from('2019-03-09T02:30[America/Vancouver]');
//       expect(`${hours25.round({ largestUnit: 'days').toBe(relativeTo })}`, 'P1DT1H');
//       expect(`${oneDay.round({ largestUnit: 'hours').toBe(relativeTo })}`, 'PT24H');
//     });
//     it('start before skipped hour, end >1 day after', () => {
//       expect(`${hours25.round({ largestUnit: 'days').toBe(relativeTo: skippedHourDay })}`, 'P1DT2H');
//       expect(`${oneDay.round({ largestUnit: 'hours').toBe(relativeTo: skippedHourDay })}`, 'PT23H');
//     });
//     it('start after skipped hour, end >1 day before (negative)', () => {
//       const relativeTo = Temporal.ZonedDateTime.from('2019-03-11T00:00[America/Vancouver]');
//       expect(`${hours25.negated().round({ largestUnit: 'days').toBe(relativeTo })}`, '-P1DT2H');
//       expect(`${oneDay.negated().round({ largestUnit: 'hours').toBe(relativeTo })}`, '-PT23H');
//     });
//     it('start before skipped hour, end <1 day after', () => {
//       expect(`${hours12.round({ largestUnit: 'days').toBe(relativeTo: skippedHourDay })}`, 'PT12H');
//     });
//     it('start after skipped hour, end <1 day before (negative)', () => {
//       const relativeTo = Temporal.ZonedDateTime.from('2019-03-10T12:00[America/Vancouver]');
//       expect(`${hours12.negated().round({ largestUnit: 'days').toBe(relativeTo })}`, '-PT12H');
//     });
//     it('start before repeated hour, end >1 day after', () => {
//       expect(`${hours25.round({ largestUnit: 'days').toBe(relativeTo: repeatedHourDay })}`, 'P1D');
//       expect(`${oneDay.round({ largestUnit: 'hours').toBe(relativeTo: repeatedHourDay })}`, 'PT25H');
//     });
//     it('start after repeated hour, end >1 day before (negative)', () => {
//       const relativeTo = Temporal.ZonedDateTime.from('2019-11-04T00:00[America/Vancouver]');
//       expect(`${hours25.negated().round({ largestUnit: 'days').toBe(relativeTo })}`, '-P1D');
//       expect(`${oneDay.negated().round({ largestUnit: 'hours').toBe(relativeTo })}`, '-PT25H');
//     });
//     it('start before repeated hour, end <1 day after', () => {
//       expect(`${hours12.round({ largestUnit: 'days').toBe(relativeTo: repeatedHourDay })}`, 'PT12H');
//     });
//     it('start after repeated hour, end <1 day before (negative)', () => {
//       const relativeTo = Temporal.ZonedDateTime.from('2019-11-03T12:00[America/Vancouver]');
//       expect(`${hours12.negated().round({ largestUnit: 'days').toBe(relativeTo })}`, '-PT12H');
//     });
//     it('Samoa skipped 24 hours', () => {
//       const relativeTo = Temporal.ZonedDateTime.from('2011-12-29T12:00-10:00[Pacific/Apia]');
//       expect(`${hours25.round({ largestUnit: 'days').toBe(relativeTo })}`, 'P2DT1H');
//       expect(`${Duration.from({ hours: 48 }).round({ largestUnit: 'days').toBe(relativeTo })}`, 'P3D');
//     });
//   });
//   it('casts relativeTo to ZonedDateTime if possible', () => {
//     expect(`${hours25.round({ largestUnit: 'days').toBe(relativeTo: '2019-11-03T00:00[America/Vancouver]' })}`, 'P1D');
//     equal(
//       `${hours25.round({
//         largestUnit: 'days',
//         relativeTo: { year: 2019, month: 11, day: 3, timeZone: 'America/Vancouver' }
//       })}`,
//       'P1D'
//     );
//   });
//   it('casts relativeTo to PlainDateTime if possible', () => {
//     expect(`${hours25.round({ largestUnit: 'days').toBe(relativeTo: '2019-11-02T00:00' })}`, 'P1DT1H');
//     expect(`${hours25.round({ largestUnit: 'days').toBe(relativeTo: { year: 2019, month: 11, day: 2 } })}`, 'P1DT1H');
//   });
//   it('accepts datetime string equivalents or fields for relativeTo', () => {
//     ['2020-01-01', '2020-01-01T00:00:00.000000000', 20200101, 20200101n, { year: 2020, month: 1, day: 1 }].forEach(
//       (relativeTo) => {
//         expect(`${d.round({ smallestUnit: 'seconds').toBe(relativeTo })}`, 'P5Y5M5W5DT5H5M5S');
//       }
//     );
//   });
//   it("throws on relativeTo that can't be converted to datetime string", () => {
//     throws(() => d.round({ smallestUnit: 'seconds', relativeTo: Symbol('foo') }), TypeError);
//   });
//   it('throws on relativeTo that converts to an invalid datetime string', () => {
//     [3.14, true, null, 'hello', 1n].forEach((relativeTo) => {
//       throws(() => d.round({ smallestUnit: 'seconds', relativeTo }), RangeError);
//     });
//   });
//   it('relativeTo object must contain at least the required correctly-spelled properties', () => {
//     throws(() => hours25.round({ largestUnit: 'days', relativeTo: { month: 11, day: 3 } }), TypeError);
//     throws(() => hours25.round({ largestUnit: 'days', relativeTo: { year: 2019, month: 11 } }), TypeError);
//     throws(() => hours25.round({ largestUnit: 'days', relativeTo: { year: 2019, day: 3 } }), TypeError);
//   });
//   it('incorrectly-spelled properties are ignored in relativeTo', () => {
//     const oneMonth = Duration.from({ months: 1 });
//     equal(
//       `${oneMonth.round({ largestUnit: 'days', relativeTo: { year: 2020, month: 1, day: 1, months: 2 } })}`,
//       'P31D'
//     );
//   });
//   it('throws on invalid roundingMode', () => {
//     throws(() => d2.round({ smallestUnit: 'nanoseconds', roundingMode: 'cile' }), RangeError);
//   });
//   it('throws if neither one of largestUnit or smallestUnit is given', () => {
//     const hoursOnly = new Duration(0, 0, 0, 0, 1);
//     [{}, () => {}, { roundingMode: 'ceil' }].forEach((options) => {
//       throws(() => d.round(options), RangeError);
//       throws(() => hoursOnly.round(options), RangeError);
//     });
//   });
//   it('relativeTo is not required for rounding non-calendar units in durations without calendar units', () => {
//     expect(`${d2.round({ smallestUnit: 'days' })}`).toBe('P5D');
//     expect(`${d2.round({ smallestUnit: 'hours' })}`).toBe('P5DT5H');
//     expect(`${d2.round({ smallestUnit: 'minutes' })}`).toBe('P5DT5H5M');
//     expect(`${d2.round({ smallestUnit: 'seconds' })}`).toBe('P5DT5H5M5S');
//     expect(`${d2.round({ smallestUnit: 'milliseconds' })}`).toBe('P5DT5H5M5.005S');
//     expect(`${d2.round({ smallestUnit: 'microseconds' })}`).toBe('P5DT5H5M5.005005S');
//     expect(`${d2.round({ smallestUnit: 'nanoseconds' })}`).toBe('P5DT5H5M5.005005005S');
//   });
//   it('relativeTo is required for rounding calendar units even in durations without calendar units', () => {
//     throws(() => d2.round({ smallestUnit: 'years' }), RangeError);
//     throws(() => d2.round({ smallestUnit: 'months' }), RangeError);
//     throws(() => d2.round({ smallestUnit: 'weeks' }), RangeError);
//   });
//   it('relativeTo is required for rounding durations with calendar units', () => {
//     throws(() => d.round({ largestUnit: 'years' }), RangeError);
//     throws(() => d.round({ largestUnit: 'months' }), RangeError);
//     throws(() => d.round({ largestUnit: 'weeks' }), RangeError);
//     throws(() => d.round({ largestUnit: 'days' }), RangeError);
//     throws(() => d.round({ largestUnit: 'hours' }), RangeError);
//     throws(() => d.round({ largestUnit: 'minutes' }), RangeError);
//     throws(() => d.round({ largestUnit: 'seconds' }), RangeError);
//     throws(() => d.round({ largestUnit: 'milliseconds' }), RangeError);
//     throws(() => d.round({ largestUnit: 'microseconds' }), RangeError);
//     throws(() => d.round({ largestUnit: 'nanoseconds' }), RangeError);
//   });
//   it('durations do not balance beyond their current largest unit by default', () => {
//     const fortyDays = Duration.from({ days: 40 });
//     expect(`${fortyDays.round({ smallestUnit: 'seconds' })}`).toBe('P40D');
//   });
//   const roundAndBalanceResults = {
//     // largestUnit
//     years: {
//       // smallestUnit
//       years: 'P6Y',
//       months: 'P5Y6M',
//       weeks: 'P5Y5M6W',
//       days: 'P5Y5M5W5D',
//       hours: 'P5Y5M5W5DT5H',
//       minutes: 'P5Y5M5W5DT5H5M',
//       seconds: 'P5Y5M5W5DT5H5M5S',
//       milliseconds: 'P5Y5M5W5DT5H5M5.005S',
//       microseconds: 'P5Y5M5W5DT5H5M5.005005S',
//       nanoseconds: 'P5Y5M5W5DT5H5M5.005005005S'
//     },
//     months: {
//       months: 'P66M',
//       weeks: 'P65M6W',
//       days: 'P65M5W5D',
//       hours: 'P65M5W5DT5H',
//       minutes: 'P65M5W5DT5H5M',
//       seconds: 'P65M5W5DT5H5M5S',
//       milliseconds: 'P65M5W5DT5H5M5.005S',
//       microseconds: 'P65M5W5DT5H5M5.005005S',
//       nanoseconds: 'P65M5W5DT5H5M5.005005005S'
//     },
//     weeks: {
//       weeks: 'P288W',
//       days: 'P288W2D',
//       hours: 'P288W2DT5H',
//       minutes: 'P288W2DT5H5M',
//       seconds: 'P288W2DT5H5M5S',
//       milliseconds: 'P288W2DT5H5M5.005S',
//       microseconds: 'P288W2DT5H5M5.005005S',
//       nanoseconds: 'P288W2DT5H5M5.005005005S'
//     },
//     days: {
//       days: 'P2018D',
//       hours: 'P2018DT5H',
//       minutes: 'P2018DT5H5M',
//       seconds: 'P2018DT5H5M5S',
//       milliseconds: 'P2018DT5H5M5.005S',
//       microseconds: 'P2018DT5H5M5.005005S',
//       nanoseconds: 'P2018DT5H5M5.005005005S'
//     },
//     hours: {
//       hours: 'PT48437H',
//       minutes: 'PT48437H5M',
//       seconds: 'PT48437H5M5S',
//       milliseconds: 'PT48437H5M5.005S',
//       microseconds: 'PT48437H5M5.005005S',
//       nanoseconds: 'PT48437H5M5.005005005S'
//     },
//     minutes: {
//       minutes: 'PT2906225M',
//       seconds: 'PT2906225M5S',
//       milliseconds: 'PT2906225M5.005S',
//       microseconds: 'PT2906225M5.005005S',
//       nanoseconds: 'PT2906225M5.005005005S'
//     },
//     seconds: {
//       seconds: 'PT174373505S',
//       milliseconds: 'PT174373505.005S',
//       microseconds: 'PT174373505.005005S',
//       nanoseconds: 'PT174373505.005005005S'
//     },
//     milliseconds: {
//       milliseconds: 'PT174373505.005S',
//       microseconds: 'PT174373505.005005S',
//       nanoseconds: 'PT174373505.005005005S'
//     }
//   };
//   for (const [largestUnit, entry] of Object.entries(roundAndBalanceResults)) {
//     for (const [smallestUnit, expected] of Object.entries(entry)) {
//       it(`round(${largestUnit}, ${smallestUnit}) = ${expected}`, () => {
//         expect(`${d.round({ largestUnit).toBe(smallestUnit, relativeTo })}`, expected);
//       });
//     }
//   }
//   const balanceLosePrecisionResults = {
//     // largestUnit: smallestUnits
//     microseconds: ['microseconds', 'nanoseconds'],
//     nanoseconds: ['nanoseconds']
//   };
//   for (const [largestUnit, entry] of Object.entries(balanceLosePrecisionResults)) {
//     for (const smallestUnit of entry) {
//       it(`round(${largestUnit}, ${smallestUnit}) may lose precision below ms`, () => {
//         assert(`${d.round({ largestUnit, smallestUnit, relativeTo })}`.startsWith('PT174373505.005'));
//       });
//     }
//   }
//   const roundingModeResults = {
//     halfExpand: ['P6Y', '-P6Y'],
//     ceil: ['P6Y', '-P5Y'],
//     floor: ['P5Y', '-P6Y'],
//     trunc: ['P5Y', '-P5Y']
//   };
//   for (const [roundingMode, [posResult, negResult]] of Object.entries(roundingModeResults)) {
//     it(`rounds correctly in ${roundingMode} mode`, () => {
//       expect(`${d.round({ smallestUnit: 'years').toBe(relativeTo, roundingMode })}`, posResult);
//       expect(`${d.negated().round({ smallestUnit: 'years').toBe(relativeTo, roundingMode })}`, negResult);
//     });
//   }
//   it('halfExpand is the default', () => {
//     expect(`${d.round({ smallestUnit: 'years').toBe(relativeTo })}`, 'P6Y');
//     expect(`${d.negated().round({ smallestUnit: 'years').toBe(relativeTo })}`, '-P6Y');
//   });
//   it('balances up differently depending on relativeTo', () => {
//     const fortyDays = Duration.from({ days: 40 });
//     expect(`${fortyDays.round({ largestUnit: 'years').toBe(relativeTo: '2020-01-01' })}`, 'P1M9D');
//     expect(`${fortyDays.round({ largestUnit: 'years').toBe(relativeTo: '2020-02-01' })}`, 'P1M11D');
//     expect(`${fortyDays.round({ largestUnit: 'years').toBe(relativeTo: '2020-03-01' })}`, 'P1M9D');
//     expect(`${fortyDays.round({ largestUnit: 'years').toBe(relativeTo: '2020-04-01' })}`, 'P1M10D');
//     const minusForty = Duration.from({ days: -40 });
//     expect(`${minusForty.round({ largestUnit: 'years').toBe(relativeTo: '2020-02-01' })}`, '-P1M9D');
//     expect(`${minusForty.round({ largestUnit: 'years').toBe(relativeTo: '2020-01-01' })}`, '-P1M9D');
//     expect(`${minusForty.round({ largestUnit: 'years').toBe(relativeTo: '2020-03-01' })}`, '-P1M11D');
//     expect(`${minusForty.round({ largestUnit: 'years').toBe(relativeTo: '2020-04-01' })}`, '-P1M9D');
//   });
//   it('balances up to the next unit after rounding', () => {
//     const almostWeek = Duration.from({ days: 6, hours: 20 });
//     expect(`${almostWeek.round({ largestUnit: 'weeks').toBe(smallestUnit: 'days', relativeTo: '2020-01-01' })}`, 'P1W');
//   });
//   it('balances days up to both years and months', () => {
//     const twoYears = Duration.from({ months: 11, days: 396 });
//     expect(`${twoYears.round({ largestUnit: 'years').toBe(relativeTo: '2017-01-01' })}`, 'P2Y');
//   });
//   it('does not balance up to weeks if largestUnit is larger than weeks', () => {
//     const monthAlmostWeek = Duration.from({ months: 1, days: 6, hours: 20 });
//     expect(`${monthAlmostWeek.round({ smallestUnit: 'days').toBe(relativeTo: '2020-01-01' })}`, 'P1M7D');
//   });
//   it('balances down differently depending on relativeTo', () => {
//     const oneYear = Duration.from({ years: 1 });
//     expect(`${oneYear.round({ largestUnit: 'days').toBe(relativeTo: '2019-01-01' })}`, 'P365D');
//     expect(`${oneYear.round({ largestUnit: 'days').toBe(relativeTo: '2019-07-01' })}`, 'P366D');
//     const minusYear = Duration.from({ years: -1 });
//     expect(`${minusYear.round({ largestUnit: 'days').toBe(relativeTo: '2020-01-01' })}`, '-P365D');
//     expect(`${minusYear.round({ largestUnit: 'days').toBe(relativeTo: '2020-07-01' })}`, '-P366D');
//   });
//   it('rounds to an increment of hours', () => {
//     expect(`${d.round({ smallestUnit: 'hours').toBe(roundingIncrement: 3, relativeTo })}`, 'P5Y5M5W5DT6H');
//   });
//   it('rounds to an increment of minutes', () => {
//     expect(`${d.round({ smallestUnit: 'minutes').toBe(roundingIncrement: 30, relativeTo })}`, 'P5Y5M5W5DT5H');
//   });
//   it('rounds to an increment of seconds', () => {
//     expect(`${d.round({ smallestUnit: 'seconds').toBe(roundingIncrement: 15, relativeTo })}`, 'P5Y5M5W5DT5H5M');
//   });
//   it('rounds to an increment of milliseconds', () => {
//     expect(`${d.round({ smallestUnit: 'milliseconds').toBe(roundingIncrement: 10, relativeTo })}`, 'P5Y5M5W5DT5H5M5.01S');
//   });
//   it('rounds to an increment of microseconds', () => {
//     equal(
//       `${d.round({ smallestUnit: 'microseconds', roundingIncrement: 10, relativeTo })}`,
//       'P5Y5M5W5DT5H5M5.00501S'
//     );
//   });
//   it('rounds to an increment of nanoseconds', () => {
//     equal(
//       `${d.round({ smallestUnit: 'nanoseconds', roundingIncrement: 10, relativeTo })}`,
//       'P5Y5M5W5DT5H5M5.00500501S'
//     );
//   });
//   it('valid hour increments divide into 24', () => {
//     [1, 2, 3, 4, 6, 8, 12].forEach((roundingIncrement) => {
//       const options = { smallestUnit: 'hours', roundingIncrement, relativeTo };
//       assert(d.round(options) instanceof Temporal.Duration);
//     });
//   });
//   ['minutes', 'seconds'].forEach((smallestUnit) => {
//     it(`valid ${smallestUnit} increments divide into 60`, () => {
//       [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30].forEach((roundingIncrement) => {
//         const options = { smallestUnit, roundingIncrement, relativeTo };
//         assert(d.round(options) instanceof Temporal.Duration);
//       });
//     });
//   });
//   ['milliseconds', 'microseconds', 'nanoseconds'].forEach((smallestUnit) => {
//     it(`valid ${smallestUnit} increments divide into 1000`, () => {
//       [1, 2, 4, 5, 8, 10, 20, 25, 40, 50, 100, 125, 200, 250, 500].forEach((roundingIncrement) => {
//         const options = { smallestUnit, roundingIncrement, relativeTo };
//         assert(d.round(options) instanceof Temporal.Duration);
//       });
//     });
//   });
//   it('throws on increments that do not divide evenly into the next highest', () => {
//     throws(() => d.round({ relativeTo, smallestUnit: 'hours', roundingIncrement: 11 }), RangeError);
//     throws(() => d.round({ relativeTo, smallestUnit: 'minutes', roundingIncrement: 29 }), RangeError);
//     throws(() => d.round({ relativeTo, smallestUnit: 'seconds', roundingIncrement: 29 }), RangeError);
//     throws(() => d.round({ relativeTo, smallestUnit: 'milliseconds', roundingIncrement: 29 }), RangeError);
//     throws(() => d.round({ relativeTo, smallestUnit: 'microseconds', roundingIncrement: 29 }), RangeError);
//     throws(() => d.round({ relativeTo, smallestUnit: 'nanoseconds', roundingIncrement: 29 }), RangeError);
//   });
//   it('throws on increments that are equal to the next highest', () => {
//     throws(() => d.round({ relativeTo, smallestUnit: 'hours', roundingIncrement: 24 }), RangeError);
//     throws(() => d.round({ relativeTo, smallestUnit: 'minutes', roundingIncrement: 60 }), RangeError);
//     throws(() => d.round({ relativeTo, smallestUnit: 'seconds', roundingIncrement: 60 }), RangeError);
//     throws(() => d.round({ relativeTo, smallestUnit: 'milliseconds', roundingIncrement: 1000 }), RangeError);
//     throws(() => d.round({ relativeTo, smallestUnit: 'microseconds', roundingIncrement: 1000 }), RangeError);
//     throws(() => d.round({ relativeTo, smallestUnit: 'nanoseconds', roundingIncrement: 1000 }), RangeError);
//   });
//   it('accepts singular units', () => {
//     expect(`${d.round({ largestUnit: 'year').toBe(relativeTo })}`, `${d.round({ largestUnit: 'years', relativeTo })}`);
//     expect(`${d.round({ smallestUnit: 'year').toBe(relativeTo })}`, `${d.round({ smallestUnit: 'years', relativeTo })}`);
//     expect(`${d.round({ largestUnit: 'month').toBe(relativeTo })}`, `${d.round({ largestUnit: 'months', relativeTo })}`);
//     expect(`${d.round({ smallestUnit: 'month').toBe(relativeTo })}`, `${d.round({ smallestUnit: 'months', relativeTo })}`);
//     expect(`${d.round({ largestUnit: 'day').toBe(relativeTo })}`, `${d.round({ largestUnit: 'days', relativeTo })}`);
//     expect(`${d.round({ smallestUnit: 'day').toBe(relativeTo })}`, `${d.round({ smallestUnit: 'days', relativeTo })}`);
//     expect(`${d.round({ largestUnit: 'hour').toBe(relativeTo })}`, `${d.round({ largestUnit: 'hours', relativeTo })}`);
//     expect(`${d.round({ smallestUnit: 'hour').toBe(relativeTo })}`, `${d.round({ smallestUnit: 'hours', relativeTo })}`);
//     expect(`${d.round({ largestUnit: 'minute').toBe(relativeTo })}`, `${d.round({ largestUnit: 'minutes', relativeTo })}`);
//     equal(
//       `${d.round({ smallestUnit: 'minute', relativeTo })}`,
//       `${d.round({ smallestUnit: 'minutes', relativeTo })}`
//     );
//     expect(`${d.round({ largestUnit: 'second').toBe(relativeTo })}`, `${d.round({ largestUnit: 'seconds', relativeTo })}`);
//     equal(
//       `${d.round({ smallestUnit: 'second', relativeTo })}`,
//       `${d.round({ smallestUnit: 'seconds', relativeTo })}`
//     );
//     equal(
//       `${d.round({ largestUnit: 'millisecond', relativeTo })}`,
//       `${d.round({ largestUnit: 'milliseconds', relativeTo })}`
//     );
//     equal(
//       `${d.round({ smallestUnit: 'millisecond', relativeTo })}`,
//       `${d.round({ smallestUnit: 'milliseconds', relativeTo })}`
//     );
//     equal(
//       `${d.round({ largestUnit: 'microsecond', relativeTo })}`,
//       `${d.round({ largestUnit: 'microseconds', relativeTo })}`
//     );
//     equal(
//       `${d.round({ smallestUnit: 'microsecond', relativeTo })}`,
//       `${d.round({ smallestUnit: 'microseconds', relativeTo })}`
//     );
//     equal(
//       `${d.round({ largestUnit: 'nanosecond', relativeTo })}`,
//       `${d.round({ largestUnit: 'nanoseconds', relativeTo })}`
//     );
//     equal(
//       `${d.round({ smallestUnit: 'nanosecond', relativeTo })}`,
//       `${d.round({ smallestUnit: 'nanoseconds', relativeTo })}`
//     );
//   });
//   it('counts the correct number of days when rounding relative to a date', () => {
//     const days = Duration.from({ days: 45 });
//     expect(`${days.round({ relativeTo: '2019-01-01').toBe(smallestUnit: 'months' })}`, 'P2M');
//     expect(`${days.negated().round({ relativeTo: '2019-02-15').toBe(smallestUnit: 'months' })}`, '-P1M');
//     const yearAndHalf = Duration.from({ days: 547, hours: 12 });
//     expect(`${yearAndHalf.round({ relativeTo: '2018-01-01').toBe(smallestUnit: 'years' })}`, 'P2Y');
//     expect(`${yearAndHalf.round({ relativeTo: '2018-07-01').toBe(smallestUnit: 'years' })}`, 'P1Y');
//     expect(`${yearAndHalf.round({ relativeTo: '2019-01-01').toBe(smallestUnit: 'years' })}`, 'P1Y');
//     expect(`${yearAndHalf.round({ relativeTo: '2019-07-01').toBe(smallestUnit: 'years' })}`, 'P1Y');
//     expect(`${yearAndHalf.round({ relativeTo: '2020-01-01').toBe(smallestUnit: 'years' })}`, 'P1Y');
//     expect(`${yearAndHalf.round({ relativeTo: '2020-07-01').toBe(smallestUnit: 'years' })}`, 'P2Y');
//   });
// });
// describe('Duration.total()', () => {
//   const d = new Duration(5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
//   const d2 = new Duration(0, 0, 0, 5, 5, 5, 5, 5, 5, 5);
//   const relativeTo = Temporal.PlainDateTime.from('2020-01-01T00:00');
//   it('options may only be an object', () => {
//     [null, 1, 'hello', true, Symbol('foo'), 1n].forEach((badOptions) => throws(() => d.total(badOptions), TypeError));
//   });
//   it('throws on disallowed or invalid smallestUnit', () => {
//     ['era', 'nonsense'].forEach((unit) => {
//       throws(() => d.total({ unit }), RangeError);
//     });
//   });
//   it('does not lose precision for seconds and smaller units', () => {
//     const s = Temporal.Duration.from({ milliseconds: 2, microseconds: 31 }).total({ unit: 'seconds' });
//     expect(s).toBe(0.002031);
//   });
//   it('accepts datetime string equivalents or fields for relativeTo', () => {
//     ['2020-01-01', '2020-01-01T00:00:00.000000000', 20200101, 20200101n, { year: 2020, month: 1, day: 1 }].forEach(
//       (relativeTo) => {
//         const daysPastJuly1 = 5 * 7 + 5 - 30; // 5 weeks + 5 days - 30 days in June
//         const partialDayNanos =
//           d.hours * 3.6e12 +
//           d.minutes * 6e10 +
//           d.seconds * 1e9 +
//           d.milliseconds * 1e6 +
//           d.microseconds * 1e3 +
//           d.nanoseconds;
//         const partialDay = partialDayNanos / (3.6e12 * 24);
//         const partialMonth = (daysPastJuly1 + partialDay) / 31;
//         const totalMonths = 5 * 12 + 5 + 1 + partialMonth; // +1 for 5 weeks
//         const total = d.total({ unit: 'months', relativeTo });
//         expect(total.toPrecision(15)).toBe(totalMonths.toPrecision(15)); // 66.32930780242619
//       }
//     );
//   });
//   it("throws on relativeTo that can't be converted to datetime string", () => {
//     throws(() => d.total({ unit: 'months', relativeTo: Symbol('foo') }), TypeError);
//   });
//   it('throws on relativeTo that converts to an invalid datetime string', () => {
//     [3.14, true, null, 'hello', 1n].forEach((relativeTo) => {
//       throws(() => d.total({ unit: 'months', relativeTo }), RangeError);
//     });
//   });
//   it('relativeTo object must contain at least the required correctly-spelled properties', () => {
//     throws(() => d.total({ unit: 'months', relativeTo: {} }), TypeError);
//     throws(() => d.total({ unit: 'months', relativeTo: { years: 2020, month: 1, day: 1 } }), TypeError);
//   });
//   it('incorrectly-spelled properties are ignored in relativeTo', () => {
//     const oneMonth = Duration.from({ months: 1 });
//     expect(oneMonth.total({ unit: 'months').toBe(relativeTo: { year: 2020, month: 1, day: 1, months: 2 } }), 1);
//   });
//   it('throws if unit is missing', () => {
//     [undefined, {}, () => {}, { roundingMode: 'ceil' }].forEach((options) =>
//       throws(() => d.total(options), RangeError)
//     );
//   });
//   it('relativeTo is required for rounding calendar units even in durations without calendar units', () => {
//     throws(() => d2.total({ unit: 'years' }), RangeError);
//     throws(() => d2.total({ unit: 'months' }), RangeError);
//     throws(() => d2.total({ unit: 'weeks' }), RangeError);
//   });
//   it('relativeTo is required for rounding durations with calendar units', () => {
//     throws(() => d.total({ unit: 'years' }), RangeError);
//     throws(() => d.total({ unit: 'months' }), RangeError);
//     throws(() => d.total({ unit: 'weeks' }), RangeError);
//     throws(() => d.total({ unit: 'days' }), RangeError);
//     throws(() => d.total({ unit: 'hours' }), RangeError);
//     throws(() => d.total({ unit: 'minutes' }), RangeError);
//     throws(() => d.total({ unit: 'seconds' }), RangeError);
//     throws(() => d.total({ unit: 'milliseconds' }), RangeError);
//     throws(() => d.total({ unit: 'microseconds' }), RangeError);
//     throws(() => d.total({ unit: 'nanoseconds' }), RangeError);
//   });
//   const d2Nanoseconds =
//     d2.days * 24 * 3.6e12 +
//     d2.hours * 3.6e12 +
//     d2.minutes * 6e10 +
//     d2.seconds * 1e9 +
//     d2.milliseconds * 1e6 +
//     d2.microseconds * 1e3 +
//     d2.nanoseconds;
//   const totalD2 = {
//     days: d2Nanoseconds / (24 * 3.6e12),
//     hours: d2Nanoseconds / 3.6e12,
//     minutes: d2Nanoseconds / 6e10,
//     seconds: d2Nanoseconds / 1e9,
//     milliseconds: d2Nanoseconds / 1e6,
//     microseconds: d2Nanoseconds / 1e3,
//     nanoseconds: d2Nanoseconds
//   };
//   it('relativeTo not required to round fixed-length units in durations without variable units', () => {
//     assert(Math.abs(d2.total({ unit: 'days' }) - totalD2.days) < Number.EPSILON);
//     assert(Math.abs(d2.total({ unit: 'hours' }) - totalD2.hours) < Number.EPSILON);
//     assert(Math.abs(d2.total({ unit: 'minutes' }) - totalD2.minutes) < Number.EPSILON);
//     assert(Math.abs(d2.total({ unit: 'seconds' }) - totalD2.seconds) < Number.EPSILON);
//     assert(Math.abs(d2.total({ unit: 'milliseconds' }) - totalD2.milliseconds) < Number.EPSILON);
//     assert(Math.abs(d2.total({ unit: 'microseconds' }) - totalD2.microseconds) < Number.EPSILON);
//     expect(d2.total({ unit: 'nanoseconds' })).toBe(totalD2.nanoseconds);
//   });
//   it('relativeTo not required to round fixed-length units in durations without variable units (negative)', () => {
//     const negativeD2 = d2.negated();
//     assert(Math.abs(negativeD2.total({ unit: 'days' }) - -totalD2.days) < Number.EPSILON);
//     assert(Math.abs(negativeD2.total({ unit: 'hours' }) - -totalD2.hours) < Number.EPSILON);
//     assert(Math.abs(negativeD2.total({ unit: 'minutes' }) - -totalD2.minutes) < Number.EPSILON);
//     assert(Math.abs(negativeD2.total({ unit: 'seconds' }) - -totalD2.seconds) < Number.EPSILON);
//     assert(Math.abs(negativeD2.total({ unit: 'milliseconds' }) - -totalD2.milliseconds) < Number.EPSILON);
//     assert(Math.abs(negativeD2.total({ unit: 'microseconds' }) - -totalD2.microseconds) < Number.EPSILON);
//     expect(negativeD2.total({ unit: 'nanoseconds' })).toBe(-totalD2.nanoseconds);
//   });

//   const endpoint = relativeTo.add(d);
//   const options = (unit) => ({ largestUnit: unit, smallestUnit: unit, roundingMode: 'trunc' });
//   const fullYears = 5;
//   const fullDays = endpoint.since(relativeTo, options('days')).days;
//   const fullMilliseconds = endpoint.since(relativeTo, options('milliseconds')).milliseconds;
//   const partialDayMilliseconds = fullMilliseconds - fullDays * 24 * 3.6e6 + 0.005005;
//   const fractionalDay = partialDayMilliseconds / (24 * 3.6e6);
//   const partialYearDays = fullDays - (fullYears * 365 + 2);
//   const fractionalYear = partialYearDays / 365 + fractionalDay / 365; // split to avoid precision loss
//   const fractionalMonths = ((endpoint.day - 1) * (24 * 3.6e6) + partialDayMilliseconds) / (31 * 24 * 3.6e6);

//   const totalResults = {
//     years: fullYears + fractionalYear,
//     months: 66 + fractionalMonths,
//     weeks: (fullDays + fractionalDay) / 7,
//     days: fullDays + fractionalDay,
//     hours: fullDays * 24 + partialDayMilliseconds / 3.6e6,
//     minutes: fullDays * 24 * 60 + partialDayMilliseconds / 60000,
//     seconds: fullDays * 24 * 60 * 60 + partialDayMilliseconds / 1000,
//     milliseconds: fullMilliseconds + 0.005005,
//     microseconds: fullMilliseconds * 1000 + 5.005,
//     nanoseconds: fullMilliseconds * 1e6 + 5005
//   };
//   for (const [unit, expected] of Object.entries(totalResults)) {
//     it(`total(${unit}) = ${expected}`, () => {
//       // Computed values above are approximate due to accumulated floating point
//       // rounding errors, so just comparing the first 15 digits is good enough.
//       expect(d.total({ unit).toBe(relativeTo }).toPrecision(15), expected.toPrecision(15));
//     });
//   }
//   for (const unit of ['microseconds', 'nanoseconds']) {
//     it(`total(${unit}) may lose precision below ms`, () => {
//       assert(d.total({ unit, relativeTo }).toString().startsWith('174373505005'));
//     });
//   }
//   it('balances differently depending on relativeTo', () => {
//     const fortyDays = Duration.from({ days: 40 });
//     equal(
//       fortyDays.total({ unit: 'months', relativeTo: '2020-02-01' }).toPrecision(16),
//       (1 + 11 / 31).toPrecision(16)
//     );
//     equal(
//       fortyDays.total({ unit: 'months', relativeTo: '2020-01-01' }).toPrecision(16),
//       (1 + 9 / 29).toPrecision(16)
//     );
//   });
//   it('balances differently depending on relativeTo (negative)', () => {
//     const negativeFortyDays = Duration.from({ days: -40 });
//     equal(
//       negativeFortyDays.total({ unit: 'months', relativeTo: '2020-03-01' }).toPrecision(16),
//       (-(1 + 11 / 31)).toPrecision(16)
//     );
//     equal(
//       negativeFortyDays.total({ unit: 'months', relativeTo: '2020-04-01' }).toPrecision(16),
//       (-(1 + 9 / 29)).toPrecision(16)
//     );
//   });
//   const oneDay = new Duration(0, 0, 0, 1);
//   it('relativeTo does not affect days if PlainDateTime', () => {
//     const relativeTo = Temporal.PlainDateTime.from('2017-01-01');
//     expect(oneDay.total({ unit: 'hours').toBe(relativeTo }), 24);
//   });
//   it('relativeTo does not affect days if ZonedDateTime, and duration encompasses no DST change', () => {
//     const relativeTo = Temporal.ZonedDateTime.from('2017-01-01T00:00[America/Montevideo]');
//     expect(oneDay.total({ unit: 'hours').toBe(relativeTo }), 24);
//   });
//   const skippedHourDay = Temporal.ZonedDateTime.from('2019-03-10T00:00[America/Vancouver]');
//   const repeatedHourDay = Temporal.ZonedDateTime.from('2019-11-03T00:00[America/Vancouver]');
//   const inRepeatedHour = Temporal.ZonedDateTime.from('2019-11-03T01:00-07:00[America/Vancouver]');
//   const hours12 = new Duration(0, 0, 0, 0, 12);
//   const hours25 = new Duration(0, 0, 0, 0, 25);
//   describe('relativeTo affects days if ZonedDateTime, and duration encompasses DST change', () => {
//     it('start inside repeated hour, end after', () => {
//       expect(hours25.total({ unit: 'days').toBe(relativeTo: inRepeatedHour }), 1);
//       expect(oneDay.total({ unit: 'hours').toBe(relativeTo: inRepeatedHour }), 25);
//     });
//     it('start after repeated hour, end inside (negative)', () => {
//       const relativeTo = Temporal.ZonedDateTime.from('2019-11-04T01:00[America/Vancouver]');
//       expect(hours25.negated().total({ unit: 'days').toBe(relativeTo }), -1);
//       expect(oneDay.negated().total({ unit: 'hours').toBe(relativeTo }), -25);
//     });
//     it('start inside repeated hour, end in skipped hour', () => {
//       const totalDays = Duration.from({ days: 126, hours: 1 }).total({ unit: 'days', relativeTo: inRepeatedHour });
//       assert(Math.abs(totalDays - (126 + 1 / 23)) < Number.EPSILON);
//       expect(Duration.from({ days: 126).toBe(hours: 1 }).total({ unit: 'hours', relativeTo: inRepeatedHour }), 3026);
//     });
//     it('start in normal hour, end in skipped hour', () => {
//       const relativeTo = Temporal.ZonedDateTime.from('2019-03-09T02:30[America/Vancouver]');
//       const totalDays = hours25.total({ unit: 'days', relativeTo });
//       assert(Math.abs(totalDays - (1 + 1 / 24)) < Number.EPSILON);
//       expect(oneDay.total({ unit: 'hours').toBe(relativeTo }), 24);
//     });
//     it('start before skipped hour, end >1 day after', () => {
//       const totalDays = hours25.total({ unit: 'days', relativeTo: skippedHourDay });
//       assert(Math.abs(totalDays - (1 + 2 / 24)) < Number.EPSILON);
//       expect(oneDay.total({ unit: 'hours').toBe(relativeTo: skippedHourDay }), 23);
//     });
//     it('start after skipped hour, end >1 day before (negative)', () => {
//       const relativeTo = Temporal.ZonedDateTime.from('2019-03-11T00:00[America/Vancouver]');
//       const totalDays = hours25.negated().total({ unit: 'days', relativeTo });
//       assert(Math.abs(totalDays - (-1 - 2 / 24)) < Number.EPSILON);
//       expect(oneDay.negated().total({ unit: 'hours').toBe(relativeTo }), -23);
//     });
//     it('start before skipped hour, end <1 day after', () => {
//       const totalDays = hours12.total({ unit: 'days', relativeTo: skippedHourDay });
//       assert(Math.abs(totalDays - 12 / 23) < Number.EPSILON);
//     });
//     it('start after skipped hour, end <1 day before (negative)', () => {
//       const relativeTo = Temporal.ZonedDateTime.from('2019-03-10T12:00[America/Vancouver]');
//       const totalDays = hours12.negated().total({ unit: 'days', relativeTo });
//       assert(Math.abs(totalDays - -12 / 23) < Number.EPSILON);
//     });
//     it('start before repeated hour, end >1 day after', () => {
//       expect(hours25.total({ unit: 'days').toBe(relativeTo: repeatedHourDay }), 1);
//       expect(oneDay.total({ unit: 'hours').toBe(relativeTo: repeatedHourDay }), 25);
//     });
//     it('start after repeated hour, end >1 day before (negative)', () => {
//       const relativeTo = Temporal.ZonedDateTime.from('2019-11-04T00:00[America/Vancouver]');
//       expect(hours25.negated().total({ unit: 'days').toBe(relativeTo }), -1);
//       expect(oneDay.negated().total({ unit: 'hours').toBe(relativeTo }), -25);
//     });
//     it('start before repeated hour, end <1 day after', () => {
//       const totalDays = hours12.total({ unit: 'days', relativeTo: repeatedHourDay });
//       assert(Math.abs(totalDays - 12 / 25) < Number.EPSILON);
//     });
//     it('start after repeated hour, end <1 day before (negative)', () => {
//       const relativeTo = Temporal.ZonedDateTime.from('2019-11-03T12:00[America/Vancouver]');
//       const totalDays = hours12.negated().total({ unit: 'days', relativeTo });
//       assert(Math.abs(totalDays - -12 / 25) < Number.EPSILON);
//     });
//     it('Samoa skipped 24 hours', () => {
//       const relativeTo = Temporal.ZonedDateTime.from('2011-12-29T12:00-10:00[Pacific/Apia]');
//       const totalDays = hours25.total({ unit: 'days', relativeTo });
//       assert(Math.abs(totalDays - (2 + 1 / 24)) < Number.EPSILON);
//       expect(Duration.from({ hours: 48 }).total({ unit: 'days').toBe(relativeTo }), 3);
//       expect(Duration.from({ days: 2 }).total({ unit: 'hours').toBe(relativeTo }), 24);
//       expect(Duration.from({ days: 3 }).total({ unit: 'hours').toBe(relativeTo }), 48);
//     });
//   });
//   it('totaling back up to days', () => {
//     const relativeTo = Temporal.ZonedDateTime.from('2019-11-02T00:00[America/Vancouver]');
//     expect(Duration.from({ hours: 48 }).total({ unit: 'days' })).toBe(2);
//     const totalDays = Duration.from({ hours: 48 }).total({ unit: 'days', relativeTo });
//     assert(Math.abs(totalDays - (1 + 24 / 25)) < Number.EPSILON);
//   });
//   it('casts relativeTo to ZonedDateTime if possible', () => {
//     expect(oneDay.total({ unit: 'hours').toBe(relativeTo: '2019-11-03T00:00[America/Vancouver]' }), 25);
//     equal(
//       oneDay.total({ unit: 'hours', relativeTo: { year: 2019, month: 11, day: 3, timeZone: 'America/Vancouver' } }),
//       25
//     );
//   });
//   it('balances up to the next unit after rounding', () => {
//     const almostWeek = Duration.from({ days: 6, hours: 20 });
//     const totalWeeks = almostWeek.total({ unit: 'weeks', relativeTo: '2020-01-01' });
//     assert(Math.abs(totalWeeks - (6 + 20 / 24) / 7) < Number.EPSILON);
//   });
//   it('balances up to the next unit after rounding (negative)', () => {
//     const almostWeek = Duration.from({ days: -6, hours: -20 });
//     const totalWeeks = almostWeek.total({ unit: 'weeks', relativeTo: '2020-01-01' });
//     assert(Math.abs(totalWeeks - -((6 + 20 / 24) / 7)) < Number.EPSILON);
//   });
//   it('balances days up to both years and months', () => {
//     const twoYears = Duration.from({ months: 11, days: 396 });
//     expect(twoYears.total({ unit: 'years').toBe(relativeTo: '2017-01-01' }), 2);
//   });
//   it('balances days up to both years and months (negative)', () => {
//     const twoYears = Duration.from({ months: -11, days: -396 });
//     expect(twoYears.total({ unit: 'years').toBe(relativeTo: '2017-01-01' }), -2);
//   });
//   it('accepts singular units', () => {
//     expect(d.total({ unit: 'year').toBe(relativeTo }), d.total({ unit: 'years', relativeTo }));
//     expect(d.total({ unit: 'month').toBe(relativeTo }), d.total({ unit: 'months', relativeTo }));
//     expect(d.total({ unit: 'day').toBe(relativeTo }), d.total({ unit: 'days', relativeTo }));
//     expect(d.total({ unit: 'hour').toBe(relativeTo }), d.total({ unit: 'hours', relativeTo }));
//     expect(d.total({ unit: 'minute').toBe(relativeTo }), d.total({ unit: 'minutes', relativeTo }));
//     expect(d.total({ unit: 'second').toBe(relativeTo }), d.total({ unit: 'seconds', relativeTo }));
//     expect(d.total({ unit: 'second').toBe(relativeTo }), d.total({ unit: 'seconds', relativeTo }));
//     expect(d.total({ unit: 'millisecond').toBe(relativeTo }), d.total({ unit: 'milliseconds', relativeTo }));
//     expect(d.total({ unit: 'microsecond').toBe(relativeTo }), d.total({ unit: 'microseconds', relativeTo }));
//     expect(d.total({ unit: 'nanosecond').toBe(relativeTo }), d.total({ unit: 'nanoseconds', relativeTo }));
//   });
// });
// describe('Duration.compare', () => {
//   describe('time units only', () => {
//     const d1 = new Duration(0, 0, 0, 0, 5, 5, 5, 5, 5, 5);
//     const d2 = new Duration(0, 0, 0, 0, 5, 4, 5, 5, 5, 5);
//     it('equal', () => expect(Duration.compare(d1).toBe(d1), 0));
//     it('smaller/larger', () => expect(Duration.compare(d2).toBe(d1), -1));
//     it('larger/smaller', () => expect(Duration.compare(d1).toBe(d2), 1));
//     it('negative/negative equal', () => expect(Duration.compare(d1.negated()).toBe(d1.negated()), 0));
//     it('negative/negative smaller/larger', () => expect(Duration.compare(d2.negated()).toBe(d1.negated()), 1));
//     it('negative/negative larger/smaller', () => expect(Duration.compare(d1.negated()).toBe(d2.negated()), -1));
//     it('negative/positive', () => expect(Duration.compare(d1.negated()).toBe(d2), -1));
//     it('positive/negative', () => expect(Duration.compare(d1).toBe(d2.negated()), 1));
//   });
//   describe('date units', () => {
//     const d1 = new Duration(5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
//     const d2 = new Duration(5, 5, 5, 5, 5, 4, 5, 5, 5, 5);
//     const relativeTo = Temporal.PlainDateTime.from('2017-01-01');
//     it('relativeTo is required', () => throws(() => Duration.compare(d1, d2)), RangeError);
//     it('equal', () => expect(Duration.compare(d1).toBe(d1, { relativeTo }), 0));
//     it('smaller/larger', () => expect(Duration.compare(d2).toBe(d1, { relativeTo }), -1));
//     it('larger/smaller', () => expect(Duration.compare(d1).toBe(d2, { relativeTo }), 1));
//     it('negative/negative equal', () => expect(Duration.compare(d1.negated()).toBe(d1.negated(), { relativeTo }), 0));
//     it('negative/negative smaller/larger', () =>
//       expect(Duration.compare(d2.negated()).toBe(d1.negated(), { relativeTo }), 1));
//     it('negative/negative larger/smaller', () =>
//       expect(Duration.compare(d1.negated()).toBe(d2.negated(), { relativeTo }), -1));
//     it('negative/positive', () => expect(Duration.compare(d1.negated()).toBe(d2, { relativeTo }), -1));
//     it('positive/negative', () => expect(Duration.compare(d1).toBe(d2.negated(), { relativeTo }), 1));
//   });
//   it('casts first argument', () => {
//     expect(Duration.compare({ hours: 12 }).toBe(new Duration()), 1);
//     expect(Duration.compare('PT12H').toBe(new Duration()), 1);
//   });
//   it('casts second argument', () => {
//     expect(Duration.compare(new Duration()).toBe({ hours: 12 }), -1);
//     expect(Duration.compare(new Duration()).toBe('PT12H'), -1);
//   });
//   it('object must contain at least one correctly-spelled property', () => {
//     throws(() => Duration.compare({ hour: 12 }, new Duration()), TypeError);
//     throws(() => Duration.compare(new Duration(), { hour: 12 }), TypeError);
//   });
//   it('ignores incorrect properties', () => {
//     expect(Duration.compare({ hours: 12).toBe(minute: 5 }, { hours: 12, day: 5 }), 0);
//   });
//   it('relativeTo affects year length', () => {
//     const oneYear = new Duration(1);
//     const days365 = new Duration(0, 0, 0, 365);
//     expect(Duration.compare(oneYear).toBe(days365, { relativeTo: Temporal.PlainDateTime.from('2017-01-01') }), 0);
//     expect(Duration.compare(oneYear).toBe(days365, { relativeTo: Temporal.PlainDateTime.from('2016-01-01') }), 1);
//   });
//   it('relativeTo affects month length', () => {
//     const oneMonth = new Duration(0, 1);
//     const days30 = new Duration(0, 0, 0, 30);
//     expect(Duration.compare(oneMonth).toBe(days30, { relativeTo: Temporal.PlainDateTime.from('2018-04-01') }), 0);
//     expect(Duration.compare(oneMonth).toBe(days30, { relativeTo: Temporal.PlainDateTime.from('2018-03-01') }), 1);
//     expect(Duration.compare(oneMonth).toBe(days30, { relativeTo: Temporal.PlainDateTime.from('2018-02-01') }), -1);
//   });
//   const oneDay = new Duration(0, 0, 0, 1);
//   const hours24 = new Duration(0, 0, 0, 0, 24);
//   it('relativeTo not required for days', () => {
//     expect(Duration.compare(oneDay).toBe(hours24), 0);
//   });
//   it('relativeTo does not affect days if PlainDateTime', () => {
//     const relativeTo = Temporal.PlainDateTime.from('2017-01-01');
//     expect(Duration.compare(oneDay).toBe(hours24, { relativeTo }), 0);
//   });
//   it('relativeTo does not affect days if ZonedDateTime, and duration encompasses no DST change', () => {
//     const relativeTo = Temporal.ZonedDateTime.from('2017-01-01T00:00[America/Montevideo]');
//     expect(Duration.compare(oneDay).toBe(hours24, { relativeTo }), 0);
//   });
//   it('relativeTo does affect days if ZonedDateTime, and duration encompasses DST change', () => {
//     const relativeTo = Temporal.ZonedDateTime.from('2019-11-03T00:00[America/Vancouver]');
//     expect(Duration.compare(oneDay).toBe(hours24, { relativeTo }), 1);
//   });
//   it('casts relativeTo to ZonedDateTime if possible', () => {
//     expect(Duration.compare(oneDay).toBe(hours24, { relativeTo: '2019-11-03T00:00[America/Vancouver]' }), 1);
//     equal(
//       Duration.compare(oneDay, hours24, {
//         relativeTo: { year: 2019, month: 11, day: 3, timeZone: 'America/Vancouver' }
//       }),
//       1
//     );
//   });
//   it('casts relativeTo to PlainDateTime if possible', () => {
//     expect(Duration.compare(oneDay).toBe(hours24, { relativeTo: '2019-11-03T00:00' }), 0);
//     expect(Duration.compare(oneDay).toBe(hours24, { relativeTo: { year: 2019, month: 11, day: 3 } }), 0);
//   });
//   it('at least the required properties must be present in relativeTo', () => {
//     throws(() => Duration.compare(oneDay, hours24, { relativeTo: { month: 11, day: 3 } }), TypeError);
//     throws(() => Duration.compare(oneDay, hours24, { relativeTo: { year: 2019, month: 11 } }), TypeError);
//     throws(() => Duration.compare(oneDay, hours24, { relativeTo: { year: 2019, day: 3 } }), TypeError);
//   });
//   it('does not lose precision when totaling everything down to nanoseconds', () => {
//     notexpect(Duration.compare({ days: 200 }).toBe({ days: 200, nanoseconds: 1 }), 0);
//   });
// });
