import {
  logging,
  PersistentSet,
  Context,
  persist
} from "near-sdk-as"
@nearBindgen
class Singleton {
  private visitors: PersistentSet<string> = new PersistentSet("v");
  private _owner: string = "";
  private last_visited: string = "NULL";
  @mutateState()
  setOwner(owner: string): void {
    if (this._owner != "") {
      throw new Error("contract is already initialized");
    }
    this._owner = owner;
  }
  owner(): string {
    if (this._owner == "") {
      throw new Error("contract is not initialized");
    }
    return this._owner;
  }
  @mutateState()
  visit(): void {
    if (!this.visitors.has(Context.sender)) {
      logging.log("Visited the first time by " + Context.sender);
      this.visitors.add(Context.sender);
    }
    this.last_visited = Context.sender;
  }
  visit_without_updated_decorator(): void {
    this.visit();
    persist(this);
  }
  visit_without_change(): void {
    this.visit();
  }
  hasVisited(visitor: string): bool {
    return this.visitors.has(visitor);
  }
  lastVisited(): string {
    return this.last_visited || "";
  }
  private hasNotVisited(visitor: string): boolean {
    return !this.hasNotVisited(visitor);
  }

  decode<_V = Uint8Array>(buf: _V): Singleton {
    let json: JSON.Obj;
    if (buf instanceof Uint8Array) {
      json = JSON.parse(buf);
    } else {
      assert(buf instanceof JSON.Obj, "argument must be Uint8Array or Json Object");
      json = <JSON.Obj> buf;
    }
    return this._decode(json);
  }

  static decode(buf: Uint8Array): Singleton {
    return decode<Singleton>(buf);
  }

  private _decode(obj: JSON.Obj): Singleton {
    this.visitors = obj.has("visitors") ? decode<PersistentSet<string>, JSON.Obj>(obj, "visitors"): new PersistentSet("v");
    this._owner = obj.has("_owner") ? decode<string, JSON.Obj>(obj, "_owner"): "";
    this.last_visited = obj.has("last_visited") ? decode<string, JSON.Obj>(obj, "last_visited"): "NULL";
    return this;
  }

  _encode(name: string | null = "", _encoder: JSONEncoder | null = null): JSONEncoder {
    let encoder = _encoder == null ? new JSONEncoder() : _encoder;
    encoder.pushObject(name);
    encode<PersistentSet<string>, JSONEncoder>(this.visitors, "visitors", encoder);
    encode<string, JSONEncoder>(this._owner, "_owner", encoder);
    encode<string, JSONEncoder>(this.last_visited, "last_visited", encoder);
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
let __contract: Singleton
if (__checkState()) {
  __contract = __getState<Singleton>();
} else {
  __contract = new Singleton();
}
@mutateState()
function setOwner(owner: string): void {
  __contract.setOwner(owner);
  __setState(__contract);
}
function owner(): string {
  let res = __contract.owner();
  return res;
}
@mutateState()
export function visit(): void {
  __contract.visit();
  __setState(__contract);
}
export function visit_without_updated_decorator(): void {
  __contract.visit_without_updated_decorator();
}
export function visit_without_change(): void {
  __contract.visit_without_change();
}
function hasVisited(visitor: string): bool {
  let res = __contract.hasVisited(visitor);
  return res;
}
function lastVisited(): string {
  let res = __contract.lastVisited();
  return res;
}
@mutateState()

function __wrapper_setOwner(): void {
  const obj = getInput();
  setOwner(obj.has('owner') ? 
             decode<string, JSON.Obj>(obj, "owner") : requireParameter<string>("owner"));
}
export { __wrapper_setOwner as setOwner }
function __wrapper_owner(): void {
  let result: string = owner();
  const val = encode<string>(result);
  value_return(val.byteLength, val.dataStart);
}
export { __wrapper_owner as owner }
function __wrapper_hasVisited(): void {
  const obj = getInput();
  let result: bool = hasVisited(obj.has('visitor') ? 
             decode<string, JSON.Obj>(obj, "visitor") : requireParameter<string>("visitor"));
  const val = encode<bool>(result);
  value_return(val.byteLength, val.dataStart);
}
export { __wrapper_hasVisited as hasVisited }
function __wrapper_lastVisited(): void {
  let result: string = lastVisited();
  const val = encode<string>(result);
  value_return(val.byteLength, val.dataStart);
}
export { __wrapper_lastVisited as lastVisited }