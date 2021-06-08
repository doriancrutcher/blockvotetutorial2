import { TransformVisitor } from "..";
import { Expression, Parser, CallExpression } from "../../as";
declare class IncludeBytesTransform extends TransformVisitor {
    visitCallExpression(node: CallExpression): Expression;
    afterParse(_: Parser): void;
}
export = IncludeBytesTransform;
