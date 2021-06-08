export class Instant {
  constructor(public epochNanoseconds: i64) {}

  @inline
  get epochMicroseconds(): i64 {
    return this.epochNanoseconds / 1_000;
  }

  @inline
  get epochMilliseconds(): i64 {
    return this.epochNanoseconds / 1_000_000;
  }

  @inline
  get epochSeconds(): i64 {
    return this.epochNanoseconds / 1_000_000_000;
  }
}
