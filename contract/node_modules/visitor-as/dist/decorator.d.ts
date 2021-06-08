/// <reference types="assemblyscript/std/portable" />
import { PathTransformVisitor } from "./transformer";
import { ClassDeclaration, FieldDeclaration, MethodDeclaration, Parser, VariableDeclaration, FunctionDeclaration, Source, DecoratorNode, DeclarationStatement } from "../as";
export declare function registerDecorator(decorator: DecoratorVisitor): typeof TopLevelDecorator;
interface DecoratorVisitor extends PathTransformVisitor {
    name: string;
    sourceFilter: (s: Source) => bool;
}
export declare class TopLevelDecorator extends PathTransformVisitor {
    private static _visitor;
    static registerVisitor(visitor: DecoratorVisitor): void;
    private get visitor();
    visitDecoratorNode(node: DecoratorNode): void;
    afterParse(_: Parser): void;
}
export declare abstract class Decorator extends PathTransformVisitor {
    /**
     * Default filter that removes library files
     */
    get sourceFilter(): (s: Source) => bool;
    abstract get name(): string;
    getDecorator(node: DeclarationStatement): DecoratorNode;
}
export declare abstract class ClassDecorator extends Decorator {
    abstract visitFieldDeclaration(node: FieldDeclaration): void;
    abstract visitMethodDeclaration(node: MethodDeclaration): void;
    abstract visitClassDeclaration(node: ClassDeclaration): void;
}
export declare abstract class FunctionDecorator extends Decorator {
    abstract visitFunctionDeclaration(node: FunctionDeclaration): void;
}
export declare abstract class VariableDecorator extends Decorator {
    abstract visitVariableDeclaration(node: VariableDeclaration): void;
}
export {};
