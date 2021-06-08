(module
 (type $none_=>_none (func))
 (memory $0 0)
 (table $0 1 funcref)
 (export "memory" (memory $0))
 (export "new" (func $assembly/__tests__/exportAs/new))
 (func $assembly/__tests__/exportAs/new
  (local $0 i32)
  (local $1 i32)
  i32.const 1
  local.set $0
  local.get $0
  local.get $0
  i32.add
  local.set $1
 )
)
