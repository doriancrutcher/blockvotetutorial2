import { Node } from "../as";
import { BaseVisitor } from "./base";
export declare class PathVisitor extends BaseVisitor {
    currentPath: Node[];
    _visit(node: Node): void;
    get currentNode(): Node;
    get currentParent(): Node;
    get currentParentPath(): Node[];
    get currentGrandParentPath(): Node[];
    cloneCurrentNode(): Node;
    replaceCurrentNode(node: Node): void;
}
