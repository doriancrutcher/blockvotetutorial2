import { PlainDateTime } from "./plaindatetime";
import { JsDate } from "./date";
import { PlainDate } from "./plaindate";

export class now {
  static plainDateTimeISO(): PlainDateTime {
    const epochMillis = Date.now();
    const date = new JsDate(epochMillis);
    return new PlainDateTime(
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds()
    );
  }

  static plainDateISO(): PlainDate {
    const epochMillis = Date.now();
    const date = new JsDate(epochMillis);
    return new PlainDate(
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate()
    );
  }
}
