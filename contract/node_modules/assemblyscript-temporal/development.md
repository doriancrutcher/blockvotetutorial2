## Development and roadmap

This is a very large library, therefore a prioritised roadmap is important. The following is the rough priority order:

 1. Non-timezone aware classes, i.e. `PlainDate`, `PlainDateTime`, etc with a hard-coded Gregorian calendar.
 2. Ancillary classes, i.e. `Instant`, `Duration` and `now`
 3. Time-zone aware classes, `TimeZone`, `ZonedDateTime`, etc
 4. Non gregorian calendar systems

So far much of (1) has been implemented. Also a 'spike' implementation of (3) has been added to determine a suitable approach for implementing timezone offsets.


### Implementation approach

The current approach is as follows:

1. Use the temporal polyfill test cases as a means to ensure implementation correctness. Currently these test cases are cut / paste with a few tweaks. Ideally this would be automated to ensure parity going forwards
2. Use the polyfill implementation as a starting point. However, it is riddled with JS-specific code that doesn't make sense to port. However, most of the algorithmic code is [within a single file](https://github.com/tc39/proposal-temporal/blob/main/polyfill/lib/ecmascript.mjs), which can be ported relatively easily.
3. Don't bother refactoring heavily, being able to map between the polyfill implementation and this codebase will help ensure correctness

### Implementation progress

#### PlainDate

PlainDate is currently being implemented based on the ISO 8601 calendar.

Constructor

- [x] new Temporal.PlainDate

Static methods

- [x] from
- [x] compare

Properties

- [x] year
- [x] month
- [x] monthCode
- [x] day
- [ ] calendar
- [ ] era
- [ ] eraYear
- [x] dayOfWeek
- [x] dayOfYear
- [x] weekOfYear
- [x] daysInWeek
- [x] daysInMonth
- [x] daysInYear
- [x] monthsInYear
- [x] inLeapYear

Methods

- [x] with
- [ ] withCalendar
- [x] add
- [x] subtract
- [x] until
- [x] since
- [x] equals
- [x] toString
- [ ] toLocaleString
- [ ] toJSON
- [ ] valueOf
- [x] toZonedDateTime
- [x] toPlainDateTime
- [x] toPlainYearMonth
- [x] toPlainMonthDay
- [ ] getISOFields

General features

- [x] overflow modes (current implementation defaults to constrain)
- [ ] non ISO 8601 calendars

#### PlainTime

PlainTime is currently being implemented based on the ISO 8601 calendar.

Constructor

- [x] new PlainTime

Static methods

- [x] from
- [x] compare

Properties

- [x] hour
- [x] minute
- [x] second
- [x] millisecond
- [x] microsecond
- [x] nanosecond
- [ ] calendar

Methods

- [x] with
- [x] add
- [x] subtract
- [x] until
- [x] since
- [ ] round
- [x] equals
- [x] toString
- [ ] toLocaleString
- [ ] toJSON
- [ ] valueOf
- [x] toZonedDateTime
- [x] toPlainDateTime
- [ ] getISOFields

General features

- [x] overflow modes (current implementation defaults to constrain)
- [ ] non ISO 8601 calendars

#### PlainMonthDay

PlainMonthDay is currently being implemented based on the ISO 8601 calendar.

Constructor

- [x] new PlainMonthDay

Static methods

- [x] from

Properties

- [x] monthCode
- [x] day
- [ ] calendar

Methods

- [x] with
- [x] equals
- [x] toString
- [ ] toLocaleString
- [ ] toJSON
- [ ] valueOf
- [x] toPlainDate
- [ ] getISOFields

#### PlainYearMonth

PlainYearMonth is currently being implemented based on the ISO 8601 calendar.

Constructor

- [x] new Temporal.PlainYearMonth

Static methods

- [x] from
- [x] compare

Properties

- [x] year
- [x] month
- [x] monthCode
- [ ] calendar
- [ ] era
- [ ] eraYear
- [x] daysInMonth
- [x] daysInYear
- [x] monthsInYear
- [x] inLeapYear

Methods

- [x] with
- [x] add
- [x] subtract
- [x] until
- [x] since
- [x] equals
- [x] toString
- [ ] toLocaleString
- [ ] toJSON
- [ ] valueOf
- [x] toPlainDate
- [ ] getISOFields

General features

- [x] overflow modes (current implementation defaults to constrain)
- [ ] non ISO 8601 calendars

#### PlainDateTime

PlainDateTime is currently being implemented based on the ISO 8601 calendar.

Constructor

- [x] new Temporal.PlainDateTime

Static methods

- [x] from
- [x] compare

Properties

- [x] year
- [x] month
- [ ] monthCode
- [x] day
- [x] hour
- [x] minute
- [x] second
- [x] millisecond
- [x] microsecond
- [x] nanosecond
- [ ] calendar
- [ ] era
- [ ] eraYear
- [x] dayOfWeek
- [x] dayOfYear
- [x] weekOfYear
- [x] daysInWeek
- [x] daysInMonth
- [x] daysInYear
- [x] monthsInYear
- [x] inLeapYear

Methods

- [x] with
- [ ] withCalendar
- [x] add
- [x] subtract
- [x] until
- [x] since
- [x] equals
- [x] toString
- [ ] toLocaleString
- [ ] toJSON
- [ ] valueOf
- [x] toZonedDateTime
- [x] toPlainDate
- [x] toPlainTime
- [x] toPlainYearMonth
- [x] toPlainMonthDay
- [ ] getISOFields

General features

- [x] overflow modes (current implementation defaults to constrain)
- [ ] non ISO 8601 calendars

#### Duration

Constructor

- [x] new Duration

static methods

- [x] from
- [ ] compare

Properties

- [x] years
- [x] months
- [x] weeks
- [x] days
- [x] hours
- [x] minutes
- [x] seconds
- [x] milliseconds
- [x] microseconds
- [x] nanoseconds
- [x] sign
- [x] blank

Methods

- [x] with
- [x] add
- [x] subtract
- [x] negated
- [x] abs
- [ ] round
- [ ] total
- [x] toString
- [ ] toJSON
- [ ] toLocaleString
- [ ] valueOf

General features

- [ ] precision - need to determine what type to use for the properties


#### ZonedDateTime

Constructor
 - [x] new Temporal.ZonedDateTime

Static methods
- [ ] from
- [ ] compare

Properties
- [x] year
- [x] month
- [x] day
- [x] hour
- [x] minute
- [x] second
- [x] millisecond
- [x] microsecond
- [x] nanosecond
- [x] epochSeconds
- [x] epochMilliseconds
- [x] epochMicroseconds
- [x] epochNanoseconds
- [ ] calendar
- [x] timeZone
- [ ] era
- [ ] eraYear
- [x] dayOfWeek
- [x] dayOfYear
- [x] weekOfYear
- [x] daysInWeek
- [x] daysInMonth
- [x] daysInYear
- [x] monthsInYear
- [x] inLeapYear
- [x] hoursInDay
- [ ] startOfDay
- [x] offsetNanoseconds
- [x] offset

Methods
- [ ] with
- [ ] withPlainTime
- [ ] withPlainDate
- [ ] withTimeZone
- [ ] withCalendar
- [ ] add
- [ ] subtract
- [ ] until
- [ ] since
- [ ] round
- [ ] equals
- [ ] toString
- [ ] toLocaleString
- [ ] toJSON
- [ ] valueOf
- [ ] toInstant
- [ ] toPlainDate
- [ ] toPlainTime
- [ ] toPlainDateTime
- [ ] toPlainYearMonth
- [ ] toPlainMonthDay
- [ ] getISOFields

#### Instant

Constructor
- [x] new Temporal.Instant

Static methods
- [ ] from
- [ ] fromEpochSeconds
- [ ] fromEpochMilliseconds
- [ ] fromEpochMicroseconds
- [ ] fromEpochNanoseconds
- [ ] compare

Properties
- [x] epochSeconds
- [x] epochMilliseconds
- [x] epochMicroseconds
- [x] epochNanoseconds

Methods
- [ ] toZonedDateTimeISO
- [ ] toZonedDateTime
- [ ] add
- [ ] subtract
- [ ] until
- [ ] since
- [ ] round
- [ ] equals
- [ ] toString
- [ ] toLocaleString
- [ ] toJSON
- [ ] valueOf

#### TimeZone

Constructor
- [x] new Temporal.TimeZone

Static methods
- [ ] from

Properties
- [x] id

Methods
- [x] getOffsetNanosecondsFor
- [x] getOffsetStringFor
- [x] getPlainDateTimeFor
- [ ] getInstantFor
- [x] getPossibleInstantsFor
- [ ] getNextTransition
- [ ] getPreviousTransition
- [ ] toString
- [ ] toJSON