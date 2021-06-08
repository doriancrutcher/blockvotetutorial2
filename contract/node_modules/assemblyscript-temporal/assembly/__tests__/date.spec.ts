import { JsDate } from "../date";

let date: JsDate;

describe("construction from millis", () => {
  it("supports millis from epoch", () => {
    date = new JsDate(7677635557323226);
    expect(date.getTime()).toBe(7677635557323226);
  });
});

describe("construction from ISO date string", () => {
  it("supports year / month / day", () => {
    date = JsDate.fromString("1976-02-02");
    expect(date.getTime()).toBe(192067200000);
    date = JsDate.fromString("1976-2-2");
    expect(date.getTime()).toBe(192067200000);
    date = JsDate.fromString("2345-11-04");
    expect(date.getTime()).toBe(11860387200000);
  });

  it("supports two digit years", () => {
    expect(JsDate.fromString("1976-04-02").getTime()).toBe(
      JsDate.fromString("76-04-02").getTime()
    );
  });

  it("supports year / month / day / hour / minute / second", () => {
    date = JsDate.fromString("1976-02-02T12:34:56");
    expect(date.getTime()).toBe(192112496000);
  });
  it("supports milliseconds", () => {
    date = JsDate.fromString("1976-02-02T12:34:56.456");
    expect(date.getTime()).toBe(192112496456);
  });
});

describe("date component getter functions", () => {
  it("from +126687-01-19T04:05:45.198Z", () => {
    date = new JsDate(3935689963545198);
    expect(date.getUTCFullYear()).toBe(126687);
    expect(date.getUTCMonth()).toBe(0);
    expect(date.getUTCDate()).toBe(19);
    expect(date.getUTCHours()).toBe(4);
    expect(date.getUTCMinutes()).toBe(5);
    expect(date.getUTCSeconds()).toBe(45);
    expect(date.getUTCMilliseconds()).toBe(198);
  });

  it("from +148425-05-18T08:33:26.350Z", () => {
    date = new JsDate(4621685330006350);
    expect(date.getUTCFullYear()).toBe(148425);
    expect(date.getUTCMonth()).toBe(4);
    expect(date.getUTCDate()).toBe(18);
    expect(date.getUTCHours()).toBe(8);
    expect(date.getUTCMinutes()).toBe(33);
    expect(date.getUTCSeconds()).toBe(26);
    expect(date.getUTCMilliseconds()).toBe(350);
  });

  it("from +029119-10-01T07:51:02.758Z", () => {
    date = new JsDate(856763250662758);
    expect(date.getUTCFullYear()).toBe(29119);
    expect(date.getUTCMonth()).toBe(9);
    expect(date.getUTCDate()).toBe(1);
    expect(date.getUTCHours()).toBe(7);
    expect(date.getUTCMinutes()).toBe(51);
    expect(date.getUTCSeconds()).toBe(2);
    expect(date.getUTCMilliseconds()).toBe(758);
  });

  it("from +220765-08-19T13:42:38.020Z", () => {
    date = new JsDate(6904523252558020);
    expect(date.getUTCFullYear()).toBe(220765);
    expect(date.getUTCMonth()).toBe(7);
    expect(date.getUTCDate()).toBe(19);
    expect(date.getUTCHours()).toBe(13);
    expect(date.getUTCMinutes()).toBe(42);
    expect(date.getUTCSeconds()).toBe(38);
    expect(date.getUTCMilliseconds()).toBe(20);
  });

  it("from +264399-01-03T02:23:58.670Z", () => {
    date = new JsDate(8281459535038670);
    expect(date.getUTCFullYear()).toBe(264399);
    expect(date.getUTCMonth()).toBe(0);
    expect(date.getUTCDate()).toBe(3);
    expect(date.getUTCHours()).toBe(2);
    expect(date.getUTCMinutes()).toBe(23);
    expect(date.getUTCSeconds()).toBe(58);
    expect(date.getUTCMilliseconds()).toBe(670);
  });

  it("from +040150-04-25T10:58:13.072Z", () => {
    date = new JsDate(1204854346693072);
    expect(date.getUTCFullYear()).toBe(40150);
    expect(date.getUTCMonth()).toBe(3);
    expect(date.getUTCDate()).toBe(25);
    expect(date.getUTCHours()).toBe(10);
    expect(date.getUTCMinutes()).toBe(58);
    expect(date.getUTCSeconds()).toBe(13);
    expect(date.getUTCMilliseconds()).toBe(72);
  });

  it("from +147357-02-15T13:49:06.454Z", () => {
    date = new JsDate(4587974574546454);
    expect(date.getUTCFullYear()).toBe(147357);
    expect(date.getUTCMonth()).toBe(1);
    expect(date.getUTCDate()).toBe(15);
    expect(date.getUTCHours()).toBe(13);
    expect(date.getUTCMinutes()).toBe(49);
    expect(date.getUTCSeconds()).toBe(6);
    expect(date.getUTCMilliseconds()).toBe(454);
  });

  it("from +248424-10-24T10:31:15.870Z", () => {
    date = new JsDate(7777362738675870);
    expect(date.getUTCFullYear()).toBe(248424);
    expect(date.getUTCMonth()).toBe(9);
    expect(date.getUTCDate()).toBe(24);
    expect(date.getUTCHours()).toBe(10);
    expect(date.getUTCMinutes()).toBe(31);
    expect(date.getUTCSeconds()).toBe(15);
    expect(date.getUTCMilliseconds()).toBe(870);
  });

  it("from +014628-07-11T23:46:03.984Z", () => {
    date = new JsDate(399464523963984);
    expect(date.getUTCFullYear()).toBe(14628);
    expect(date.getUTCMonth()).toBe(6);
    expect(date.getUTCDate()).toBe(11);
    expect(date.getUTCHours()).toBe(23);
    expect(date.getUTCMinutes()).toBe(46);
    expect(date.getUTCSeconds()).toBe(3);
    expect(date.getUTCMilliseconds()).toBe(984);
  });

  it("from +039615-11-03T04:05:23.748Z", () => {
    date = new JsDate(1187987918723748);
    expect(date.getUTCFullYear()).toBe(39615);
    expect(date.getUTCMonth()).toBe(10);
    expect(date.getUTCDate()).toBe(3);
    expect(date.getUTCHours()).toBe(4);
    expect(date.getUTCMinutes()).toBe(5);
    expect(date.getUTCSeconds()).toBe(23);
    expect(date.getUTCMilliseconds()).toBe(748);
  });
});

describe("setter functions", () => {
  it("setUTCSeconds", () => {
    date = new JsDate(399464523963984);
    expect(date.getUTCMilliseconds()).toBe(984);
    date.setUTCMilliseconds(12);
    expect(date.getUTCMilliseconds()).toBe(12);
    date.setUTCMilliseconds(568);
    expect(date.getUTCMilliseconds()).toBe(568);
  });

  it("setUTCSeconds", () => {
    date = new JsDate(372027318331986);
    expect(date.getUTCSeconds()).toBe(31);
    date.setUTCSeconds(12);
    expect(date.getUTCSeconds()).toBe(12);
    date.setUTCSeconds(50);
    expect(date.getUTCSeconds()).toBe(50);
  });

  it("setUTCMinutes", () => {
    date = new JsDate(372027318331986);
    expect(date.getUTCMinutes()).toBe(45);
    date.setUTCMinutes(12);
    expect(date.getUTCMinutes()).toBe(12);
    date.setUTCMinutes(50);
    expect(date.getUTCMinutes()).toBe(50);
  });

  it("setUTCHours", () => {
    date = new JsDate(372027318331986);
    expect(date.getUTCHours()).toBe(17);
    date.setUTCHours(12);
    expect(date.getUTCHours()).toBe(12);
    date.setUTCHours(2);
    expect(date.getUTCHours()).toBe(2);
  });

  it("setUTCDate", () => {
    date = new JsDate(372027318331986);
    expect(date.getUTCDate()).toBe(28);
    date.setUTCDate(12);
    expect(date.getUTCDate()).toBe(12);
    date.setUTCDate(2);
    expect(date.getUTCDate()).toBe(2);
  });

  it("setUTCMonth", () => {
    date = new JsDate(7899943856218720);
    expect(date.getUTCMonth()).toBe(3);
    date.setUTCMonth(10);
    expect(date.getUTCMonth()).toBe(10);
    date.setUTCMonth(2);
    expect(date.getUTCMonth()).toBe(2);
  });

  it("setUTCYear", () => {
    date = new JsDate(7941202527925698);
    expect(date.getUTCFullYear()).toBe(253616);
    date.setUTCFullYear(1976);
    expect(date.getUTCFullYear()).toBe(1976);
    date.setUTCFullYear(20212);
    expect(date.getUTCFullYear()).toBe(20212);
  });
});

describe("toString", () => {
  it("toISOString", () => {
    date = new JsDate(1231231231020);
    expect(date.toISOString()).toBe("2009-01-06T08:40:31.020Z");
  });
});

describe("Date.UTC", () => {
  it("epoch", () => {
    expect(JsDate.UTC(1970)).toBe(0);
  });

  describe("two digit years", () => {
    it("0", () => {
      expect(JsDate.UTC(0)).toBe(JsDate.UTC(1900));
    });

    it("99", () => {
      expect(JsDate.UTC(99)).toBe(JsDate.UTC(1999));
    });
  });

  it("defaults to month=0", () => {
    expect(JsDate.UTC(2001)).toBe(JsDate.UTC(2001, 0));
  });

  it("defaults to date=1", () => {
    expect(JsDate.UTC(2001, 0)).toBe(JsDate.UTC(2001, 0, 1));
  });

  it("defaults to hours=0", () => {
    expect(JsDate.UTC(2001, 0, 1)).toBe(JsDate.UTC(2001, 0, 1, 0));
  });

  it("defaults to minutes=0", () => {
    expect(JsDate.UTC(2001, 0, 1, 0)).toBe(JsDate.UTC(2001, 0, 1, 0, 0));
  });

  it("defaults to seconds=0", () => {
    expect(JsDate.UTC(2001, 0, 1, 0, 0)).toBe(JsDate.UTC(2001, 0, 1, 0, 0, 0));
  });

  it("defaults to milliseconds=0", () => {
    expect(JsDate.UTC(2001, 0, 1, 0, 0, 0)).toBe(
      JsDate.UTC(2001, 0, 1, 0, 0, 0, 0)
    );
  });

  // Taken from https://github.com/v8/v8/blob/master/test/mjsunit/date.js

  it("8639999999999999", () => {
    expect(JsDate.UTC(275760, 8, 12, 23, 59, 59, 999)).toBe(8639999999999999);
  });

  it("8640000000000000", () => {
    expect(JsDate.UTC(275760, 8, 13)).toBe(8640000000000000);
  });

  it("-8639999999999999", () => {
    expect(JsDate.UTC(-271821, 3, 20, 0, 0, 0, 1)).toBe(-8639999999999999);
  });

  it("-8640000000000000", () => {
    expect(JsDate.UTC(-271821, 3, 20)).toBe(-8640000000000000);
  });

  it("obscure date values", () => {
    expect(JsDate.UTC(1970, 0, 1 + 100000001, -24)).toBe(8640000000000000);
  });

  it("obscure date values", () => {
    expect(JsDate.UTC(1970, 0, 1 - 100000001, 24)).toBe(-8640000000000000);
  });
});
