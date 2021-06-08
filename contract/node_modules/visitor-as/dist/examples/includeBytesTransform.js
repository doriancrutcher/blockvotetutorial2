"use strict";
const __1 = require("..");
const as_1 = require("../../as");
const utils_1 = require("../utils");
const path = require("path");
const fs = require("fs");
class IncludeBytesTransform extends __1.TransformVisitor {
    visitCallExpression(node) {
        if (node.expression instanceof as_1.IdentifierExpression) {
            if (node.expression.text == "includeBytes") {
                if (!node.args[0].isLiteralKind(as_1.LiteralKind.STRING))
                    throw "[Error] includeBytes requires a constant literal filename";
                let arg0 = node.args[0];
                let filename = path.join(path.dirname(node.range.source.normalizedPath), arg0.value);
                var data;
                try {
                    data = fs.readFileSync(filename);
                }
                catch (e) {
                    throw `[Error] includeBytes '${filename}', ${e}`;
                }
                let asJSONString = JSON.stringify(data); // use stringify to convert bytes to text
                let arrayStart = asJSONString.indexOf("["); //find the u8 array inside the JSON string
                let arrayEnd = asJSONString.lastIndexOf("]");
                let newCode = "StaticArray.fromArray<u8>(" +
                    asJSONString.substring(arrayStart, arrayEnd + 1) +
                    ")";
                let res = __1.SimpleParser.parseExpression(newCode); //parse StaticArray.fromArray expression
                res.range = node.range; //same range
                return res; //replace node
            }
        }
        return super.visitCallExpression(node);
    }
    afterParse(_) {
        let sources = _.sources.filter(utils_1.not(utils_1.isLibrary));
        this.visit(sources);
    }
}
module.exports = IncludeBytesTransform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZUJ5dGVzVHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V4YW1wbGVzL2luY2x1ZGVCeXRlc1RyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQW9EO0FBQ3BELGlDQU9rQjtBQUNsQixvQ0FBMEM7QUFDMUMsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUV6QixNQUFNLHFCQUFzQixTQUFRLG9CQUFnQjtJQUNsRCxtQkFBbUIsQ0FBQyxJQUFvQjtRQUN0QyxJQUFJLElBQUksQ0FBQyxVQUFVLFlBQVkseUJBQW9CLEVBQUU7WUFDbkQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxjQUFjLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxnQkFBVyxDQUFDLE1BQU0sQ0FBQztvQkFDakQsTUFBTSwyREFBMkQsQ0FBQztnQkFDcEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQTRCLENBQUM7Z0JBQ25ELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQzlDLElBQUksQ0FBQyxLQUFLLENBQ1gsQ0FBQztnQkFDRixJQUFJLElBQUksQ0FBQztnQkFDVCxJQUFJO29CQUNGLElBQUksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUNsQztnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFDVixNQUFNLHlCQUF5QixRQUFRLE1BQU0sQ0FBQyxFQUFFLENBQUM7aUJBQ2xEO2dCQUNELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyx5Q0FBeUM7Z0JBQ2xGLElBQUksVUFBVSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQywwQ0FBMEM7Z0JBQ3RGLElBQUksUUFBUSxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzdDLElBQUksT0FBTyxHQUNULDRCQUE0QjtvQkFDNUIsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQztvQkFDaEQsR0FBRyxDQUFDO2dCQUNOLElBQUksR0FBRyxHQUFHLGdCQUFZLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsd0NBQXdDO2dCQUN6RixHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZO2dCQUNwQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLGNBQWM7YUFDM0I7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxVQUFVLENBQUMsQ0FBUztRQUNsQixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFHLENBQUMsaUJBQVMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QixDQUFDO0NBQ0Y7QUFFRCxpQkFBUyxxQkFBcUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zZm9ybVZpc2l0b3IsIFNpbXBsZVBhcnNlciB9IGZyb20gXCIuLlwiO1xuaW1wb3J0IHtcbiAgRXhwcmVzc2lvbixcbiAgUGFyc2VyLFxuICBDYWxsRXhwcmVzc2lvbixcbiAgSWRlbnRpZmllckV4cHJlc3Npb24sXG4gIExpdGVyYWxLaW5kLFxuICBTdHJpbmdMaXRlcmFsRXhwcmVzc2lvbixcbn0gZnJvbSBcIi4uLy4uL2FzXCI7XG5pbXBvcnQgeyBub3QsIGlzTGlicmFyeSB9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5cbmNsYXNzIEluY2x1ZGVCeXRlc1RyYW5zZm9ybSBleHRlbmRzIFRyYW5zZm9ybVZpc2l0b3Ige1xuICB2aXNpdENhbGxFeHByZXNzaW9uKG5vZGU6IENhbGxFeHByZXNzaW9uKTogRXhwcmVzc2lvbiB7XG4gICAgaWYgKG5vZGUuZXhwcmVzc2lvbiBpbnN0YW5jZW9mIElkZW50aWZpZXJFeHByZXNzaW9uKSB7XG4gICAgICBpZiAobm9kZS5leHByZXNzaW9uLnRleHQgPT0gXCJpbmNsdWRlQnl0ZXNcIikge1xuICAgICAgICBpZiAoIW5vZGUuYXJnc1swXS5pc0xpdGVyYWxLaW5kKExpdGVyYWxLaW5kLlNUUklORykpXG4gICAgICAgICAgdGhyb3cgXCJbRXJyb3JdIGluY2x1ZGVCeXRlcyByZXF1aXJlcyBhIGNvbnN0YW50IGxpdGVyYWwgZmlsZW5hbWVcIjtcbiAgICAgICAgbGV0IGFyZzAgPSBub2RlLmFyZ3NbMF0gYXMgU3RyaW5nTGl0ZXJhbEV4cHJlc3Npb247XG4gICAgICAgIGxldCBmaWxlbmFtZSA9IHBhdGguam9pbihcbiAgICAgICAgICBwYXRoLmRpcm5hbWUobm9kZS5yYW5nZS5zb3VyY2Uubm9ybWFsaXplZFBhdGgpLFxuICAgICAgICAgIGFyZzAudmFsdWVcbiAgICAgICAgKTtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyhmaWxlbmFtZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aHJvdyBgW0Vycm9yXSBpbmNsdWRlQnl0ZXMgJyR7ZmlsZW5hbWV9JywgJHtlfWA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFzSlNPTlN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGRhdGEpOyAvLyB1c2Ugc3RyaW5naWZ5IHRvIGNvbnZlcnQgYnl0ZXMgdG8gdGV4dFxuICAgICAgICBsZXQgYXJyYXlTdGFydCA9IGFzSlNPTlN0cmluZy5pbmRleE9mKFwiW1wiKTsgLy9maW5kIHRoZSB1OCBhcnJheSBpbnNpZGUgdGhlIEpTT04gc3RyaW5nXG4gICAgICAgIGxldCBhcnJheUVuZCA9IGFzSlNPTlN0cmluZy5sYXN0SW5kZXhPZihcIl1cIik7XG4gICAgICAgIGxldCBuZXdDb2RlID1cbiAgICAgICAgICBcIlN0YXRpY0FycmF5LmZyb21BcnJheTx1OD4oXCIgK1xuICAgICAgICAgIGFzSlNPTlN0cmluZy5zdWJzdHJpbmcoYXJyYXlTdGFydCwgYXJyYXlFbmQgKyAxKSArXG4gICAgICAgICAgXCIpXCI7XG4gICAgICAgIGxldCByZXMgPSBTaW1wbGVQYXJzZXIucGFyc2VFeHByZXNzaW9uKG5ld0NvZGUpOyAvL3BhcnNlIFN0YXRpY0FycmF5LmZyb21BcnJheSBleHByZXNzaW9uXG4gICAgICAgIHJlcy5yYW5nZSA9IG5vZGUucmFuZ2U7IC8vc2FtZSByYW5nZVxuICAgICAgICByZXR1cm4gcmVzOyAvL3JlcGxhY2Ugbm9kZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3VwZXIudmlzaXRDYWxsRXhwcmVzc2lvbihub2RlKTtcbiAgfVxuXG4gIGFmdGVyUGFyc2UoXzogUGFyc2VyKTogdm9pZCB7XG4gICAgbGV0IHNvdXJjZXMgPSBfLnNvdXJjZXMuZmlsdGVyKG5vdChpc0xpYnJhcnkpKTtcbiAgICB0aGlzLnZpc2l0KHNvdXJjZXMpO1xuICB9XG59XG5cbmV4cG9ydCA9IEluY2x1ZGVCeXRlc1RyYW5zZm9ybTtcbiJdfQ==