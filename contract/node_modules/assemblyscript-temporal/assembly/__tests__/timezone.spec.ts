import { Disambiguation } from "../enums";
import { Instant } from "../instant";
import { PlainDateTime } from "../plaindatetime";
import { TimeZone } from "../timezone";

let dtm: PlainDateTime;
let zone: TimeZone;

describe("getInstantFor", () => {
  it("supports unambiguous datetime before daylight saving", () => {
    zone = new TimeZone("Europe/Berlin");
    dtm = new PlainDateTime(2019, 2, 22, 2, 45);
    const instant = zone.getInstantFor(dtm);
    expect(instant.epochSeconds).toBe(1550799900);
  });

  it("supports unambiguous datetime within daylight saving", () => {
    zone = new TimeZone("Europe/Berlin");
    dtm = new PlainDateTime(2019, 6, 22, 2, 45);
    const instant = zone.getInstantFor(dtm);
    expect(instant.epochSeconds).toBe(1561164300);
  });

  it("clock moving forward", () => {
    zone = new TimeZone("Europe/London");
    dtm = new PlainDateTime(2021, 3, 28, 1, 45);
    expect(zone.getInstantFor(dtm, Disambiguation.Earlier).epochSeconds).toBe(
      1616892300
    ); // 2021-03-28T00:45:00Z
    expect(zone.getInstantFor(dtm, Disambiguation.Later).epochSeconds).toBe(
      1616895900
    ); // 2021-03-28T01:45:00Z
    expect(
      zone.getInstantFor(dtm, Disambiguation.Compatible).epochSeconds
    ).toBe(1616895900); // 2021-03-28T01:45:00Z
    expect(() => {
      zone.getInstantFor(dtm, Disambiguation.Reject)
    }).toThrow();
  });

  it("clock moving backward", () => {
    zone = new TimeZone("Europe/London");
    dtm = new PlainDateTime(2021, 10, 31, 1, 30);
    expect(zone.getInstantFor(dtm, Disambiguation.Earlier).epochSeconds).toBe(
      1635640200
    ); // 2021-03-28T00:45:00Z
    expect(zone.getInstantFor(dtm, Disambiguation.Later).epochSeconds).toBe(
      1635643800
    ); // 2021-03-28T01:45:00Z
    expect(
      zone.getInstantFor(dtm, Disambiguation.Compatible).epochSeconds
    ).toBe(1635640200); // 2021-03-28T01:45:00Z
    expect(() => {
      zone.getInstantFor(dtm, Disambiguation.Reject)
    }).toThrow();
  });
});

describe("timezones", () => {
  it('handles UTC', () => {
    const zone = new TimeZone('UTC');
    const inst = new Instant(1000);
    const dtm = new PlainDateTime(1976, 11, 18, 15, 23, 30, 123, 456, 789);
    expect(zone.id).toBe("UTC");
    expect(zone.getOffsetNanosecondsFor(inst)).toBe(0);
    expect(zone.getOffsetStringFor(inst)).toBe("+00:00");
    // it(`(${zone}).getNextTransition(${inst})`, () => zone.getNextTransition(inst), null);
    // it(`(${zone}).getPreviousTransition(${inst})`, () => zone.getPreviousTransition(inst), null);
  });
});