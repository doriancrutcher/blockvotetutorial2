import { DecoratorNode, DeclarationStatement, Source, Node } from "../as";
export declare function decorates(node: DecoratorNode, name: string): boolean;
export declare function isDecorator(name: string): (node: DecoratorNode) => boolean;
export declare function hasDecorator(node: DeclarationStatement | {
    declaration: DeclarationStatement;
}, name: string): boolean;
export declare function getDecorator(node: DeclarationStatement, name: string): DecoratorNode;
export declare function isLibrary(node: Source): boolean;
export declare function not<T>(fn: (t: T) => boolean): (t: T) => boolean;
export declare function toString(node: Node): string;
export declare function cloneNode<T extends Node>(node: T): T;
export declare function isUserEntry(source: Source): boolean;
