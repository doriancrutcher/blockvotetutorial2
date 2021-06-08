@exportAs("new")
function main(): u32 {
  return 42;
}
@exportAs("new")
function __wrapper_main(): void {
  let result: u32 = main();
  const val = encode<u32>(result);
  value_return(val.byteLength, val.dataStart);
}
export { __wrapper_main as main };
