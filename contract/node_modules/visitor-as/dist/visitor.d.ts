export declare type Collection<T extends object> = T | T[] | Map<string, T | T[] | Iterable<T>> | Iterable<T>;
/**
 * Top level visitor that will expect an implemented _visit function to visit
 * a single node and then provides a generic function for collections of nodes
 * and will visit each member of the collection.
 */
export declare abstract class AbstractVisitor<T extends object> {
    visit(node: Collection<T> | null): void;
    protected abstract _visit(node: T): void;
}
export declare abstract class AbstractTransformVisitor<T extends object> {
    visit(node: Collection<T> | null): Collection<T> | null;
    protected abstract _visit(node: T): T;
}
