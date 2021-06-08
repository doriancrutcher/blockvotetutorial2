(module
 (type $none_=>_i32 (func (result i32)))
 (memory $0 1)
 (data (i32.const 12) "\1c\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\n\00\00\00w\00o\00r\00l\00d\00\00\00")
 (table $0 1 funcref)
 (export "hello" (func $assembly/__tests__/hello/hello))
 (export "memory" (memory $0))
 (func $assembly/__tests__/hello/hello (result i32)
  i32.const 32
 )
)
