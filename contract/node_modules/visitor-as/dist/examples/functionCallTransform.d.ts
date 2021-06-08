import { TransformVisitor } from "..";
import { Expression, Parser, CallExpression } from "../../as";
declare class FunctionCallTransform extends TransformVisitor {
    visitCallExpression(node: CallExpression): Expression;
    afterParse(_: Parser): void;
}
declare const _default: FunctionCallTransform;
export = _default;
