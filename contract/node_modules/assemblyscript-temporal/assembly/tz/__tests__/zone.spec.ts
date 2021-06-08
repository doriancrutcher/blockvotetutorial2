import { Zone, ZoneOffset } from "../zone";

let zone: Zone;

describe("zone", () => {
  it("zone with single offset always returns the same offset", () => {
    zone = new Zone("Europe/London", [
      new ZoneOffset(0, "-", "LMT", -235),
    ]);

    expect(zone.getOffset(-1000).format).toBe("LMT");
    expect(zone.getOffset(1000).format).toBe("LMT");
    expect(zone.getOffset(0).format).toBe("LMT");
  });

  it("zone with multiple offsets returns offset based on untilMillis", () => {
    zone = new Zone("Europe/London", [
      new ZoneOffset(0, "-", "one", -1000),
      new ZoneOffset(0, "-", "two", 0),
      new ZoneOffset(0, "-", "three", 1000),
      new ZoneOffset(0, "-", "four", -1), // until forever!
    ]);

    expect(zone.getOffset(-2000).format).toBe("one");
    expect(zone.getOffset(-500).format).toBe("two");
    expect(zone.getOffset(1).format).toBe("three");
    expect(zone.getOffset(1000000).format).toBe("four");
  });
});
