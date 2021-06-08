import { JsDate } from "../../date";
import { offsetForTimezone } from "../index";

const testDate = (
  date: string,
  offset: i32,
  timezone: string = "Europe/London"
): void => {
  expect(
    offsetForTimezone(timezone, JsDate.fromString(date).epochMilliseconds)
  ).toBe(offset, date);
};

describe("offsetForTimezone", () => {
  it("returns standard offset when no rule refs present", () => {
    // UK times pre 1847 always have a -75 sec offset applied
    testDate("1830-3-1", -75000);
  });

  it("returns the offset defined by the rules", () => {
    // test the most recent BST transition based on EU rules
    testDate("2021-03-28T00:59:00", 0);
    testDate("2021-03-28T01:00:00", 3600000);
    testDate("2021-10-31T00:59:00", 3600000);
    testDate("2021-10-31T01:00:00", 0);

    // Within 1994, the GB-Eire rules are applied
    // the shift back to UTC occurs on "Oct	Sun>=22", which is different
    // to the EU rules which specify lastSun.
    testDate("1994-03-27T00:59:00", 0);
    testDate("1994-03-27T01:00:00", 3600000);
    // under EU rules, this would Sun 30th Oct
    testDate("1994-10-23T00:59:00", 3600000);
    testDate("1994-10-23T01:00:00", 0);
  });

  xit("handles rules with offsets based on standard time", () => {
  });
  
});
