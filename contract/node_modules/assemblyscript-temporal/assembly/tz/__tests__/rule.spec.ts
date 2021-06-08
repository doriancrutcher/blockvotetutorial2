import { JsDate } from "../../date";
import { AtTimeZone, DayOfMonth, DayOfMonthCalculator, LastDay, NextDayAfter, Rule } from "../rule";


let rule: Rule;

describe("matches on date", () => {
  it("matches if year within range", () => {
    rule = new Rule("EU", 1979, 1995, 2, new LastDay(0), 60, AtTimeZone.UTC, 0);

    // note - month is > inMonth
    expect(rule.matches(JsDate.fromString("1979-3-1").epochMilliseconds)).toBe(true);
    expect(rule.matches(JsDate.fromString("1995-3-1").epochMilliseconds)).toBe(true);
    expect(rule.matches(JsDate.fromString("1978-3-1").epochMilliseconds)).toBe(false);
    expect(rule.matches(JsDate.fromString("1996-3-1").epochMilliseconds)).toBe(false);
  });

  it("matches when toYear is undefined", () => {
    rule = new Rule("EU", 1979, -1, 2, new LastDay(0), 60, AtTimeZone.UTC, 0);

    // note - month is > inMonth
    expect(rule.matches(JsDate.fromString("1979-3-1").epochMilliseconds)).toBe(true);
    expect(rule.matches(JsDate.fromString("2005-3-1").epochMilliseconds)).toBe(true);
    expect(rule.matches(JsDate.fromString("1978-3-1").epochMilliseconds)).toBe(false);
  });

  it("matches month", () => {
    rule = new Rule("EU", 1979, -1, 2, new LastDay(0), 60, AtTimeZone.UTC, 0);

    expect(rule.matches(JsDate.fromString("1979-01-1").epochMilliseconds)).toBe(false);
    expect(rule.matches(JsDate.fromString("1979-02-29").epochMilliseconds)).toBe(true);
    expect(rule.matches(JsDate.fromString("1979-04-29").epochMilliseconds)).toBe(true);
  });

  it("matches DayOfMonthCalculator rule", () => {
    rule = new Rule("EU", 1979, -1, 2, new DayOfMonth(10), 0, AtTimeZone.UTC, 0);

    expect(rule.matches(JsDate.fromString("1979-02-01T12:00:00").epochMilliseconds)).toBe(false);
    expect(rule.matches(JsDate.fromString("1979-02-09T12:00:00").epochMilliseconds)).toBe(false);
    expect(rule.matches(JsDate.fromString("1979-02-10T12:00:00").epochMilliseconds)).toBe(true);
    expect(rule.matches(JsDate.fromString("1979-02-12T12:00:00").epochMilliseconds)).toBe(true);
  });

  it("matches time rule", () => {
    rule = new Rule("EU", 1979, -1, 2, new DayOfMonth(10), 120, AtTimeZone.UTC, 0);

    expect(rule.matches(JsDate.fromString("1979-02-10T01:00:00").epochMilliseconds)).toBe(false);
    expect(rule.matches(JsDate.fromString("1979-02-10T05:00:00").epochMilliseconds)).toBe(true);
  });
});

let dayCalc: DayOfMonthCalculator;

describe("day of month calculators", () => {
  it("last day", () => {
    // matches last sunday in month
    dayCalc = new LastDay(7);

    // for 2021 check the last sunday's for a few months
    expect(dayCalc.dayOfMonth(2021, 2)).toBe(28);
    expect(dayCalc.dayOfMonth(2021, 3)).toBe(28);
    expect(dayCalc.dayOfMonth(2021, 4)).toBe(25);

    // matches last Wed in month
    dayCalc = new LastDay(3);

    // for 2021 check the last sunday's for a few months
    expect(dayCalc.dayOfMonth(2021, 2)).toBe(24);
    expect(dayCalc.dayOfMonth(2021, 3)).toBe(31);
    expect(dayCalc.dayOfMonth(2021, 4)).toBe(28);
  });

  it("day of month", () => {
    // matches last sunday in month
    dayCalc = new DayOfMonth(7);

    expect(dayCalc.dayOfMonth(2021, 2)).toBe(7);
    expect(dayCalc.dayOfMonth(2021, 3)).toBe(7);
    expect(dayCalc.dayOfMonth(2021, 4)).toBe(7);
  });

  it("next day after", () => {
    // Sun >= 10
    dayCalc = new NextDayAfter(7, 10);

    expect(dayCalc.dayOfMonth(2021, 2)).toBe(14);
    expect(dayCalc.dayOfMonth(2021, 3)).toBe(14);
    expect(dayCalc.dayOfMonth(2021, 4)).toBe(11);
    expect(dayCalc.dayOfMonth(2021, 10)).toBe(10);

    // Mon >= 5
    dayCalc = new NextDayAfter(1, 5);

    expect(dayCalc.dayOfMonth(2021, 2)).toBe(8);
    expect(dayCalc.dayOfMonth(2021, 3)).toBe(8);
    expect(dayCalc.dayOfMonth(2021, 4)).toBe(5);
  });

});
