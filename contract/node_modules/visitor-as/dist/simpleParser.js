"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleParser = void 0;
const as_1 = require("../as");
class SimpleParser {
    static getTokenizer(s) {
        return new as_1.Tokenizer(new as_1.Source(as_1.SourceKind.USER, "index.ts", s));
    }
    static parseExpression(s) {
        let res = this.parser.parseExpression(this.getTokenizer(s));
        if (res == null) {
            throw new Error("Failed to parse the expression: '" + s + "'");
        }
        return res;
    }
    static parseStatement(s, topLevel = false) {
        let res = this.parser.parseStatement(this.getTokenizer(s), topLevel);
        if (res == null) {
            throw new Error("Failed to parse the statement: '" + s + "'");
        }
        return res;
    }
}
exports.SimpleParser = SimpleParser;
SimpleParser.parser = new as_1.Parser();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NpbXBsZVBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4QkFPZTtBQUVmLE1BQWEsWUFBWTtJQUdmLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBUztRQUNuQyxPQUFPLElBQUksY0FBUyxDQUFDLElBQUksV0FBTSxDQUFDLGVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBUztRQUM5QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUQsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDaEU7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLENBQVMsRUFBRSxXQUFvQixLQUFLO1FBQ3hELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDckUsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDL0Q7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7O0FBckJILG9DQXNCQztBQXJCZ0IsbUJBQU0sR0FBRyxJQUFJLFdBQU0sRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUGFyc2VyLFxuICBUb2tlbml6ZXIsXG4gIFNvdXJjZSxcbiAgU291cmNlS2luZCxcbiAgRXhwcmVzc2lvbixcbiAgU3RhdGVtZW50LFxufSBmcm9tIFwiLi4vYXNcIjtcblxuZXhwb3J0IGNsYXNzIFNpbXBsZVBhcnNlciB7XG4gIHByaXZhdGUgc3RhdGljIHBhcnNlciA9IG5ldyBQYXJzZXIoKTtcblxuICBwcml2YXRlIHN0YXRpYyBnZXRUb2tlbml6ZXIoczogc3RyaW5nKTogVG9rZW5pemVyIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcihuZXcgU291cmNlKFNvdXJjZUtpbmQuVVNFUiwgXCJpbmRleC50c1wiLCBzKSk7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VFeHByZXNzaW9uKHM6IHN0cmluZyk6IEV4cHJlc3Npb24ge1xuICAgIGxldCByZXMgPSB0aGlzLnBhcnNlci5wYXJzZUV4cHJlc3Npb24odGhpcy5nZXRUb2tlbml6ZXIocykpO1xuICAgIGlmIChyZXMgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIHRoZSBleHByZXNzaW9uOiAnXCIgKyBzICsgXCInXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlU3RhdGVtZW50KHM6IHN0cmluZywgdG9wTGV2ZWw6IGJvb2xlYW4gPSBmYWxzZSk6IFN0YXRlbWVudCB7XG4gICAgbGV0IHJlcyA9IHRoaXMucGFyc2VyLnBhcnNlU3RhdGVtZW50KHRoaXMuZ2V0VG9rZW5pemVyKHMpLCB0b3BMZXZlbCk7XG4gICAgaWYgKHJlcyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gcGFyc2UgdGhlIHN0YXRlbWVudDogJ1wiICsgcyArIFwiJ1wiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuIl19