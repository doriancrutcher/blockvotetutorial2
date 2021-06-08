"use strict";
const as_1 = require("../../as");
const utils_1 = require("../utils");
function getName(element) {
    let decorator = utils_1.getDecorator(element.declaration, "exportAs");
    if (decorator.args == null) {
        throw Error("exportAs expects a string argument but got null.");
    }
    if (decorator.args.length != 1) {
        throw Error(`exportAs expects 1 argument but got ${decorator.args.length}`);
    }
    if (!decorator.args[0].isLiteralKind(as_1.LiteralKind.STRING)) {
        throw Error("exportAs expects a string argument");
    }
    return decorator.args[0].value;
}
class Transformer extends as_1.Transform {
    afterInitialize(program) {
        var _a, _b, _c;
        let files = Array.from(program.filesByName.values()).filter((file) => utils_1.isUserEntry(file.source) && !utils_1.isLibrary(file.source));
        for (let file of files) {
            for (let _export of ((_a = file.exports) === null || _a === void 0 ? void 0 : _a.values()) || []) {
                if (_export != null && utils_1.hasDecorator(_export, "exportAs")) {
                    let newName = getName(_export);
                    (_b = file.exports) === null || _b === void 0 ? void 0 : _b.delete(_export.name);
                    (_c = file.exports) === null || _c === void 0 ? void 0 : _c.set(newName, _export);
                }
            }
        }
    }
}
module.exports = Transformer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0QXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXhhbXBsZXMvZXhwb3J0QXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlDQU1rQjtBQUNsQixvQ0FBOEU7QUFFOUUsU0FBUyxPQUFPLENBQUMsT0FBd0I7SUFDdkMsSUFBSSxTQUFTLEdBQUcsb0JBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzlELElBQUksU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7UUFDMUIsTUFBTSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztLQUNqRTtJQUNELElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQzlCLE1BQU0sS0FBSyxDQUFDLHVDQUF1QyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7S0FDN0U7SUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsZ0JBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN4RCxNQUFNLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0tBQ25EO0lBQ0QsT0FBaUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsQ0FBQyxLQUFLLENBQUM7QUFDNUQsQ0FBQztBQUVELE1BQU0sV0FBWSxTQUFRLGNBQVM7SUFDakMsZUFBZSxDQUFDLE9BQWdCOztRQUM5QixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQ3pELENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxtQkFBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUM5RCxDQUFDO1FBQ0YsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUU7WUFDdEIsS0FBSyxJQUFJLE9BQU8sSUFBSSxPQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLE1BQU0sT0FBTSxFQUFFLEVBQUU7Z0JBQ2hELElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxvQkFBWSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBRTtvQkFDeEQsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM3QixNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO29CQUNuQyxNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFO2lCQUN2QzthQUNGO1NBQ0Y7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxpQkFBUyxXQUFXLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBMaXRlcmFsS2luZCxcbiAgU3RyaW5nTGl0ZXJhbEV4cHJlc3Npb24sXG4gIFByb2dyYW0sXG4gIFRyYW5zZm9ybSxcbiAgRGVjbGFyZWRFbGVtZW50LFxufSBmcm9tIFwiLi4vLi4vYXNcIjtcbmltcG9ydCB7IGdldERlY29yYXRvciwgaGFzRGVjb3JhdG9yLCBpc0xpYnJhcnksIGlzVXNlckVudHJ5IH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmZ1bmN0aW9uIGdldE5hbWUoZWxlbWVudDogRGVjbGFyZWRFbGVtZW50KTogc3RyaW5nIHtcbiAgbGV0IGRlY29yYXRvciA9IGdldERlY29yYXRvcihlbGVtZW50LmRlY2xhcmF0aW9uLCBcImV4cG9ydEFzXCIpO1xuICBpZiAoZGVjb3JhdG9yLmFyZ3MgPT0gbnVsbCkge1xuICAgIHRocm93IEVycm9yKFwiZXhwb3J0QXMgZXhwZWN0cyBhIHN0cmluZyBhcmd1bWVudCBidXQgZ290IG51bGwuXCIpO1xuICB9XG4gIGlmIChkZWNvcmF0b3IuYXJncy5sZW5ndGggIT0gMSkge1xuICAgIHRocm93IEVycm9yKGBleHBvcnRBcyBleHBlY3RzIDEgYXJndW1lbnQgYnV0IGdvdCAke2RlY29yYXRvci5hcmdzLmxlbmd0aH1gKTtcbiAgfVxuICBpZiAoIWRlY29yYXRvci5hcmdzWzBdLmlzTGl0ZXJhbEtpbmQoTGl0ZXJhbEtpbmQuU1RSSU5HKSkge1xuICAgIHRocm93IEVycm9yKFwiZXhwb3J0QXMgZXhwZWN0cyBhIHN0cmluZyBhcmd1bWVudFwiKTtcbiAgfVxuICByZXR1cm4gKDxTdHJpbmdMaXRlcmFsRXhwcmVzc2lvbj5kZWNvcmF0b3IuYXJnc1swXSkudmFsdWU7XG59XG5cbmNsYXNzIFRyYW5zZm9ybWVyIGV4dGVuZHMgVHJhbnNmb3JtIHtcbiAgYWZ0ZXJJbml0aWFsaXplKHByb2dyYW06IFByb2dyYW0pOiB2b2lkIHtcbiAgICBsZXQgZmlsZXMgPSBBcnJheS5mcm9tKHByb2dyYW0uZmlsZXNCeU5hbWUudmFsdWVzKCkpLmZpbHRlcihcbiAgICAgIChmaWxlKSA9PiBpc1VzZXJFbnRyeShmaWxlLnNvdXJjZSkgJiYgIWlzTGlicmFyeShmaWxlLnNvdXJjZSlcbiAgICApO1xuICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgIGZvciAobGV0IF9leHBvcnQgb2YgZmlsZS5leHBvcnRzPy52YWx1ZXMoKSB8fCBbXSkge1xuICAgICAgICBpZiAoX2V4cG9ydCAhPSBudWxsICYmIGhhc0RlY29yYXRvcihfZXhwb3J0LCBcImV4cG9ydEFzXCIpKSB7XG4gICAgICAgICAgbGV0IG5ld05hbWUgPSBnZXROYW1lKF9leHBvcnQpO1xuICAgICAgICAgICAgZmlsZS5leHBvcnRzPy5kZWxldGUoX2V4cG9ydC5uYW1lKTtcbiAgICAgICAgICAgIGZpbGUuZXhwb3J0cz8uc2V0KG5ld05hbWUsIF9leHBvcnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCA9IFRyYW5zZm9ybWVyO1xuIl19