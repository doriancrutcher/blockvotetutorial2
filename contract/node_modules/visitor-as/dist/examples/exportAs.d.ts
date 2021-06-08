import { Program, Transform } from "../../as";
declare class Transformer extends Transform {
    afterInitialize(program: Program): void;
}
export = Transformer;
