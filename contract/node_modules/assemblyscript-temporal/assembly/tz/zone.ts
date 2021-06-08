export class Zone {
  constructor(public name: string, public offsets: ZoneOffset[]) {}

  getOffset(epochMillis: i64): ZoneOffset {
    let idx = 0;
    while (
      idx < (this.offsets.length - 1) &&
      this.offsets[idx].untilMillis < epochMillis
    ) {
      idx++;
    }
    return this.offsets[idx];
  }
}

export class ZoneOffset {
  constructor(
    public standardOffsetMillis: i32,
    public ruleRef: string,
    public format: string,
    public untilMillis: i64
  ) {}
}
