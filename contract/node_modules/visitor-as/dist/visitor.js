"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractTransformVisitor = exports.AbstractVisitor = void 0;
function isIterable(object) {
    //@ts-ignore
    return object != null && typeof object[Symbol.iterator] === "function";
}
/**
 * Top level visitor that will expect an implemented _visit function to visit
 * a single node and then provides a generic function for collections of nodes
 * and will visit each member of the collection.
 */
class AbstractVisitor {
    visit(node) {
        if (node == null)
            return;
        if (node instanceof Array) {
            node.map((node) => this.visit(node));
        }
        else if (node instanceof Map) {
            for (let _node of node.values()) {
                this.visit(_node);
            }
        }
        else if (isIterable(node)) {
            //TODO: Find better way to test if iterable
            // @ts-ignore is iterable
            for (let _node of node) {
                this.visit(_node);
            }
        }
        else {
            ///@ts-ignore Node is not iterable.
            this._visit(node);
        }
    }
}
exports.AbstractVisitor = AbstractVisitor;
class AbstractTransformVisitor {
    visit(node) {
        if (node == null)
            return null;
        if (node instanceof Array) {
            return node.map((node) => this.visit(node));
        }
        else if (node instanceof Map) {
            let res = new Map();
            for (let [key, _node] of node.entries()) {
                res.set(key, this.visit(_node));
            }
            return res;
        }
        else if (isIterable(node)) {
            let res = [];
            //TODO: Find better way to test if iterable
            // @ts-ignore is iterable
            for (let _node of node) {
                res.push(this.visit(_node));
            }
            return res;
        }
        else {
            ///@ts-ignore Node is not iterable.
            return this._visit(node);
        }
    }
}
exports.AbstractTransformVisitor = AbstractTransformVisitor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy92aXNpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLFNBQVMsVUFBVSxDQUFJLE1BQVM7SUFDOUIsWUFBWTtJQUNaLE9BQU8sTUFBTSxJQUFJLElBQUksSUFBSSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssVUFBVSxDQUFDO0FBQ3pFLENBQUM7QUFDRDs7OztHQUlHO0FBQ0gsTUFBc0IsZUFBZTtJQUNuQyxLQUFLLENBQUMsSUFBMEI7UUFDOUIsSUFBSSxJQUFJLElBQUksSUFBSTtZQUFFLE9BQU87UUFDekIsSUFBSSxJQUFJLFlBQVksS0FBSyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN0QzthQUFNLElBQUksSUFBSSxZQUFZLEdBQUcsRUFBRTtZQUM5QixLQUFLLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNuQjtTQUNGO2FBQU0sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0IsMkNBQTJDO1lBQzNDLHlCQUF5QjtZQUN6QixLQUFLLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtnQkFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNuQjtTQUNGO2FBQU07WUFDTCxtQ0FBbUM7WUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQjtJQUNILENBQUM7Q0FHRjtBQXRCRCwwQ0FzQkM7QUFFRCxNQUFzQix3QkFBd0I7SUFDNUMsS0FBSyxDQUFDLElBQTBCO1FBQzlCLElBQUksSUFBSSxJQUFJLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQztRQUM5QixJQUFJLElBQUksWUFBWSxLQUFLLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBTSxDQUFDLENBQUM7U0FDbEQ7YUFBTSxJQUFJLElBQUksWUFBWSxHQUFHLEVBQUU7WUFDOUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUN0QyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDbEM7WUFDRCxPQUFPLEdBQUcsQ0FBQztTQUNaO2FBQU0sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0IsSUFBSSxHQUFHLEdBQVEsRUFBRSxDQUFDO1lBQ2xCLDJDQUEyQztZQUMzQyx5QkFBeUI7WUFDekIsS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7Z0JBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQU0sQ0FBQyxDQUFDO2FBQ2xDO1lBQ0QsT0FBTyxHQUFHLENBQUM7U0FDWjthQUFNO1lBQ0wsbUNBQW1DO1lBQ25DLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUM7Q0FHRjtBQTFCRCw0REEwQkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdHlwZSBDb2xsZWN0aW9uPFQgZXh0ZW5kcyBvYmplY3Q+ID1cbiAgfCBUXG4gIHwgVFtdXG4gIHwgTWFwPHN0cmluZywgVCB8IFRbXSB8IEl0ZXJhYmxlPFQ+PlxuICB8IEl0ZXJhYmxlPFQ+O1xuXG5mdW5jdGlvbiBpc0l0ZXJhYmxlPFQ+KG9iamVjdDogVCk6IGJvb2xlYW4ge1xuICAvL0B0cy1pZ25vcmVcbiAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIHR5cGVvZiBvYmplY3RbU3ltYm9sLml0ZXJhdG9yXSA9PT0gXCJmdW5jdGlvblwiO1xufVxuLyoqXG4gKiBUb3AgbGV2ZWwgdmlzaXRvciB0aGF0IHdpbGwgZXhwZWN0IGFuIGltcGxlbWVudGVkIF92aXNpdCBmdW5jdGlvbiB0byB2aXNpdFxuICogYSBzaW5nbGUgbm9kZSBhbmQgdGhlbiBwcm92aWRlcyBhIGdlbmVyaWMgZnVuY3Rpb24gZm9yIGNvbGxlY3Rpb25zIG9mIG5vZGVzXG4gKiBhbmQgd2lsbCB2aXNpdCBlYWNoIG1lbWJlciBvZiB0aGUgY29sbGVjdGlvbi5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0VmlzaXRvcjxUIGV4dGVuZHMgb2JqZWN0PiB7XG4gIHZpc2l0KG5vZGU6IENvbGxlY3Rpb248VD4gfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKG5vZGUgPT0gbnVsbCkgcmV0dXJuO1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIG5vZGUubWFwKChub2RlKSA9PiB0aGlzLnZpc2l0KG5vZGUpKTtcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgIGZvciAobGV0IF9ub2RlIG9mIG5vZGUudmFsdWVzKCkpIHtcbiAgICAgICAgdGhpcy52aXNpdChfbm9kZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0l0ZXJhYmxlKG5vZGUpKSB7XG4gICAgICAvL1RPRE86IEZpbmQgYmV0dGVyIHdheSB0byB0ZXN0IGlmIGl0ZXJhYmxlXG4gICAgICAvLyBAdHMtaWdub3JlIGlzIGl0ZXJhYmxlXG4gICAgICBmb3IgKGxldCBfbm9kZSBvZiBub2RlKSB7XG4gICAgICAgIHRoaXMudmlzaXQoX25vZGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLy9AdHMtaWdub3JlIE5vZGUgaXMgbm90IGl0ZXJhYmxlLlxuICAgICAgdGhpcy5fdmlzaXQobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IF92aXNpdChub2RlOiBUKTogdm9pZDtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0VHJhbnNmb3JtVmlzaXRvcjxUIGV4dGVuZHMgb2JqZWN0PiB7XG4gIHZpc2l0KG5vZGU6IENvbGxlY3Rpb248VD4gfCBudWxsKTogQ29sbGVjdGlvbjxUPiB8IG51bGwge1xuICAgIGlmIChub2RlID09IG51bGwpIHJldHVybiBudWxsO1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHJldHVybiBub2RlLm1hcCgobm9kZSkgPT4gdGhpcy52aXNpdChub2RlKSBhcyBUKTtcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgIGxldCByZXMgPSBuZXcgTWFwKCk7XG4gICAgICBmb3IgKGxldCBba2V5LCBfbm9kZV0gb2Ygbm9kZS5lbnRyaWVzKCkpIHtcbiAgICAgICAgIHJlcy5zZXQoa2V5LCB0aGlzLnZpc2l0KF9ub2RlKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZWxzZSBpZiAoaXNJdGVyYWJsZShub2RlKSkge1xuICAgICAgbGV0IHJlczogVFtdID0gW107XG4gICAgICAvL1RPRE86IEZpbmQgYmV0dGVyIHdheSB0byB0ZXN0IGlmIGl0ZXJhYmxlXG4gICAgICAvLyBAdHMtaWdub3JlIGlzIGl0ZXJhYmxlXG4gICAgICBmb3IgKGxldCBfbm9kZSBvZiBub2RlKSB7XG4gICAgICAgIHJlcy5wdXNoKHRoaXMudmlzaXQoX25vZGUpIGFzIFQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8vQHRzLWlnbm9yZSBOb2RlIGlzIG5vdCBpdGVyYWJsZS5cbiAgICAgIHJldHVybiB0aGlzLl92aXNpdChub2RlKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX3Zpc2l0KG5vZGU6IFQpOiBUO1xufSJdfQ==