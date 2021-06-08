import { BaseVisitor } from "./base";
import { Transform as _Transform } from "../as";
import { ASTBuilder } from "./astBuilder";
import { PathVisitor } from "./path";
import { BaseTransformVisitor } from "./baseTransform";
declare class Transform extends _Transform {
}
declare const ASTTransformVisitor_base: import("ts-mixer/dist/types").Class<[], BaseVisitor & Transform, {
    prototype: BaseVisitor;
} & {
    prototype: Transform;
}>;
export declare class ASTTransformVisitor extends ASTTransformVisitor_base {
}
declare const ASTBuilderVisitor_base: import("ts-mixer/dist/types").Class<[], ASTBuilder & Transform, {
    prototype: ASTBuilder;
    build: typeof ASTBuilder.build;
} & {
    prototype: Transform;
}>;
export declare class ASTBuilderVisitor extends ASTBuilderVisitor_base {
}
declare const PathTransformVisitor_base: import("ts-mixer/dist/types").Class<[], PathVisitor & Transform, {
    prototype: PathVisitor;
} & {
    prototype: Transform;
}>;
export declare class PathTransformVisitor extends PathTransformVisitor_base {
}
export declare function mergeTransformer(from: Transform, to: Transform): void;
declare const TransformVisitor_base: import("ts-mixer/dist/types").Class<[], BaseTransformVisitor & Transform, {
    prototype: BaseTransformVisitor;
} & {
    prototype: Transform;
}>;
export declare class TransformVisitor extends TransformVisitor_base {
}
export {};
