"use strict";
const __1 = require("..");
const as_1 = require("../../as");
const utils_1 = require("../utils");
class FunctionCallTransform extends __1.TransformVisitor {
    visitCallExpression(node) {
        if (node.expression instanceof as_1.IdentifierExpression) {
            if (node.expression.text == "foo") {
                let res = __1.SimpleParser.parseExpression('"hello world"');
                res.range = node.range;
                return res;
            }
        }
        return super.visitCallExpression(node);
    }
    afterParse(_) {
        let sources = _.sources.filter(utils_1.not(utils_1.isLibrary));
        this.visit(sources);
    }
}
module.exports = new FunctionCallTransform();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25DYWxsVHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V4YW1wbGVzL2Z1bmN0aW9uQ2FsbFRyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQW9EO0FBQ3BELGlDQUEwRjtBQUMxRixvQ0FBMEM7QUFFMUMsTUFBTSxxQkFBc0IsU0FBUSxvQkFBZ0I7SUFDbEQsbUJBQW1CLENBQUMsSUFBb0I7UUFDdEMsSUFBSSxJQUFJLENBQUMsVUFBVSxZQUFZLHlCQUFvQixFQUFDO1lBQ2xELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksS0FBSyxFQUFFO2dCQUNqQyxJQUFJLEdBQUcsR0FBRyxnQkFBWSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDeEQsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEdBQUcsQ0FBQzthQUNaO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsVUFBVSxDQUFDLENBQVM7UUFDbEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBRyxDQUFDLGlCQUFTLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEIsQ0FBQztDQUNGO0FBRUQsaUJBQVMsSUFBSSxxQkFBcUIsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNmb3JtVmlzaXRvciwgU2ltcGxlUGFyc2VyIH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBOb2RlLCBFeHByZXNzaW9uLCBQYXJzZXIsIENhbGxFeHByZXNzaW9uLCBJZGVudGlmaWVyRXhwcmVzc2lvbiB9IGZyb20gXCIuLi8uLi9hc1wiO1xuaW1wb3J0IHsgbm90LCBpc0xpYnJhcnkgfSBmcm9tICcuLi91dGlscyc7XG5cbmNsYXNzIEZ1bmN0aW9uQ2FsbFRyYW5zZm9ybSBleHRlbmRzIFRyYW5zZm9ybVZpc2l0b3Ige1xuICB2aXNpdENhbGxFeHByZXNzaW9uKG5vZGU6IENhbGxFeHByZXNzaW9uKTogRXhwcmVzc2lvbiB7XG4gICAgaWYgKG5vZGUuZXhwcmVzc2lvbiBpbnN0YW5jZW9mIElkZW50aWZpZXJFeHByZXNzaW9uKXtcbiAgICAgIGlmIChub2RlLmV4cHJlc3Npb24udGV4dCA9PSBcImZvb1wiKSB7XG4gICAgICAgIGxldCByZXMgPSBTaW1wbGVQYXJzZXIucGFyc2VFeHByZXNzaW9uKCdcImhlbGxvIHdvcmxkXCInKTtcbiAgICAgICAgcmVzLnJhbmdlID0gbm9kZS5yYW5nZTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLnZpc2l0Q2FsbEV4cHJlc3Npb24obm9kZSk7XG4gIH1cblxuICBhZnRlclBhcnNlKF86IFBhcnNlcik6IHZvaWQge1xuICAgIGxldCBzb3VyY2VzID0gXy5zb3VyY2VzLmZpbHRlcihub3QoaXNMaWJyYXJ5KSk7XG4gICAgdGhpcy52aXNpdChzb3VyY2VzKTtcbiAgfVxufVxuXG5leHBvcnQgPSBuZXcgRnVuY3Rpb25DYWxsVHJhbnNmb3JtKCk7XG4iXX0=