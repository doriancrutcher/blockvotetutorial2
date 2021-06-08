import {
  Context,
  logging,
  ContractPromise,
  ContractPromiseBatch,
  u128,
  storage,
  env,
} from "near-sdk-core";
import { Word } from "./model";
function SetWord(word: Word): void {
  storage.set("word", word);
}
function GetWord(): Word {
  return <Word>storage.get<Word>("word", new Word("DEFAULT"));
}
function sample(): string {
  return "hello world";
}
export const DEFAULT_GAS: u64 = 10000000000000;
export function reverseWordThree(): void {
  const word = new Word("sample");
  const contract = "words.examples";
  const method = "reverse";
  let reverseArgs = new ReverseArgs(word);
  let promise = ContractPromise.create(
    contract,
    method,
    reverseArgs,
    DEFAULT_GAS,
    u128.Zero
  );
  let responseArgs = new ReverseArgs(new Word("elpmas"));
  logging.log(responseArgs);
  let args = responseArgs;
  logging.log(Context.contractName);
  let methodName = "_onReverseCalledThree";
  let callbackPromise = promise.then(
    Context.contractName,
    methodName,
    args,
    DEFAULT_GAS
  );
  callbackPromise.returnAsResult();
}
function _onReverseCalledThree(word: Word): bool {
  const drow = word;
  let results = ContractPromise.getResults();
  assert(results.length > 0, "should be contract promise result");
  let reverseResult = results[0];
  if (reverseResult.status == 1) {
    let word = decode<Word>(reverseResult.buffer);
    logging.log(word);
    return word.text == drow.text;
  }
  return false;
}
export function reverseWordTwo(): void {
  const word = new Word("sample");
  const contract = "words.examples";
  const method = "reverse";
  let reverseArgs = new ReverseArgs(word);
  let promise = ContractPromise.create(
    contract,
    method,
    reverseArgs.encode(),
    DEFAULT_GAS,
    u128.Zero
  );
  logging.log(Context.contractName);
  let callbackPromise = promise.then(
    Context.contractName,
    "_onReverseCalledTwo",
    new Uint8Array(0),
    DEFAULT_GAS
  );
  callbackPromise.returnAsResult();
}
function _onReverseCalledTwo(): bool {
  const drow = new Word("elpmas");
  let results = ContractPromise.getResults();
  assert(results.length > 0, "should be contract promise result");
  let reverseResult = results[0];
  if (reverseResult.status == 1) {
    let word = decode<Word>(reverseResult.buffer);
    logging.log(word);
    return word.text == drow.text;
  }
  return false;
}
export function reverseWordOne(): void {
  const word = new Word("sample");
  const contract = "words.examples";
  const method = "reverse";
  let reverseArgs = new ReverseArgs(word);
  let promise = ContractPromise.create(
    contract,
    method,
    reverseArgs,
    DEFAULT_GAS,
    u128.Zero
  );
  promise.returnAsResult();
}
@nearBindgen
class ReverseArgs {
  constructor(public word: Word) {}

  decode<_V = Uint8Array>(buf: _V): ReverseArgs {
    let json: JSON.Obj;
    if (buf instanceof Uint8Array) {
      json = JSON.parse(buf);
    } else {
      assert(
        buf instanceof JSON.Obj,
        "argument must be Uint8Array or Json Object"
      );
      json = <JSON.Obj>buf;
    }
    return this._decode(json);
  }

  static decode(buf: Uint8Array): ReverseArgs {
    return decode<ReverseArgs>(buf);
  }

  private _decode(obj: JSON.Obj): ReverseArgs {
    this.word = obj.has("word")
      ? decode<Word, JSON.Obj>(obj, "word")
      : defaultValue<Word>();
    return this;
  }

  _encode(
    name: string | null = "",
    _encoder: JSONEncoder | null = null
  ): JSONEncoder {
    let encoder = _encoder == null ? new JSONEncoder() : _encoder;
    encoder.pushObject(name);
    encode<Word, JSONEncoder>(this.word, "word", encoder);
    encoder.popObject();
    return encoder;
  }
  encode(): Uint8Array {
    return this._encode().serialize();
  }

  serialize(): Uint8Array {
    return this.encode();
  }

  toJSON(): string {
    return this._encode().toString();
  }
}
function getBlock_timestamp(): u64 {
  return env.block_timestamp();
}
function contractPromiseBatch(): ContractPromiseBatch {
  const word = new Word("sample");
  const contract = "words.examples";
  const method = "reverse";
  let reverseArgs = new ReverseArgs(word);
  return ContractPromiseBatch.create(contract).function_call(
    method,
    reverseArgs.encode(),
    u128.Zero,
    DEFAULT_GAS
  );
}
export function payableFunction(): void {}
export function nonPayableFunction(): void {
  notPayable();
  throw new Error("shouldn't see this " + Context.attachedDeposit.toString());
}
function __wrapper_SetWord(): void {
  const obj = getInput();
  SetWord(
    obj.has("word")
      ? decode<Word, JSON.Obj>(obj, "word")
      : assertNonNull<Word>("word", changetype<Word>(0))
  );
}
export { __wrapper_SetWord as SetWord };
function __wrapper_GetWord(): void {
  let result: Word = GetWord();
  const val = encode<Word>(result);
  value_return(val.byteLength, val.dataStart);
}
export { __wrapper_GetWord as GetWord };
function __wrapper_sample(): void {
  let result: string = sample();
  const val = encode<string>(result);
  value_return(val.byteLength, val.dataStart);
}
export { __wrapper_sample as sample };
function __wrapper__onReverseCalledThree(): void {
  const obj = getInput();
  let result: bool = _onReverseCalledThree(
    obj.has("word")
      ? decode<Word, JSON.Obj>(obj, "word")
      : assertNonNull<Word>("word", changetype<Word>(0))
  );
  const val = encode<bool>(result);
  value_return(val.byteLength, val.dataStart);
}
export { __wrapper__onReverseCalledThree as _onReverseCalledThree };
function __wrapper__onReverseCalledTwo(): void {
  let result: bool = _onReverseCalledTwo();
  const val = encode<bool>(result);
  value_return(val.byteLength, val.dataStart);
}
export { __wrapper__onReverseCalledTwo as _onReverseCalledTwo };
function __wrapper_getBlock_timestamp(): void {
  let result: u64 = getBlock_timestamp();
  const val = encode<u64>(result);
  value_return(val.byteLength, val.dataStart);
}
export { __wrapper_getBlock_timestamp as getBlock_timestamp };
function __wrapper_contractPromiseBatch(): void {
  let result: ContractPromiseBatch = contractPromiseBatch();
  const val = encode<ContractPromiseBatch>(result);
  value_return(val.byteLength, val.dataStart);
}
export { __wrapper_contractPromiseBatch as contractPromiseBatch };
