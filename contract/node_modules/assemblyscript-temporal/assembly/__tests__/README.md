## Test Strategy

- tests are copied from the [polyfill implementation](https://github.com/tc39/proposal-temporal/tree/main/polyfill/test)
- tests should be removed if they relate to features that do not make sense for TS/AS, i.e. tests that validate the shape of an object do not make sense in a language with compile-time type checking
- tests that fail because a feature has not been implemented yet should be left as failures.
