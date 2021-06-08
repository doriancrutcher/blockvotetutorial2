"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsConfigFile = exports.AssemblyIndexFile = void 0;
var interfaces_1 = require("../interfaces");
var indexContent = "// The entry file of your WebAssembly module.\n\nexport function add(a: i32, b: i32): i32 {\n  return a + b;\n}\n";
var tsconfigContent = "{\n    \"extends\": \"assemblyscript/std/assembly.json\",\n    \"include\": [\n      \"./**/*.ts\"\n    ]\n}\n";
var AssemblyIndexFile = /** @class */ (function (_super) {
    __extends(AssemblyIndexFile, _super);
    function AssemblyIndexFile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = "assembly/index.ts";
        _this.description = "Example entry file being compiled to WebAssembly to get you started.";
        _this.updateOldContent = null;
        return _this;
    }
    AssemblyIndexFile.prototype.getContent = function () {
        return indexContent;
    };
    return AssemblyIndexFile;
}(interfaces_1.InitFile));
exports.AssemblyIndexFile = AssemblyIndexFile;
var TsConfigFile = /** @class */ (function (_super) {
    __extends(TsConfigFile, _super);
    function TsConfigFile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = "assembly/tsconfig.json";
        _this.description = "TypeScript configuration inheriting recommended AssemblyScript settings.";
        _this.updateOldContent = null;
        return _this;
    }
    TsConfigFile.prototype.getContent = function () {
        return tsconfigContent;
    };
    return TsConfigFile;
}(interfaces_1.InitFile));
exports.TsConfigFile = TsConfigFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZW1ibHlfZmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tbWFuZHMvaW5pdC9maWxlcy9hc3NlbWJseV9maWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXlDO0FBRXpDLElBQU0sWUFBWSxHQUFHLG1IQUtwQixDQUFDO0FBRUYsSUFBTSxlQUFlLEdBQUcsZ0hBTXZCLENBQUM7QUFFRjtJQUF1QyxxQ0FBUTtJQUEvQztRQUFBLHFFQVFDO1FBUEMsVUFBSSxHQUFHLG1CQUFtQixDQUFDO1FBQzNCLGlCQUFXLEdBQ1Qsc0VBQXNFLENBQUM7UUFJekUsc0JBQWdCLEdBQUcsSUFBSSxDQUFDOztJQUMxQixDQUFDO0lBSkMsc0NBQVUsR0FBVjtRQUNFLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFSCx3QkFBQztBQUFELENBQUMsQUFSRCxDQUF1QyxxQkFBUSxHQVE5QztBQVJZLDhDQUFpQjtBQVU5QjtJQUFrQyxnQ0FBUTtJQUExQztRQUFBLHFFQVFDO1FBUEMsVUFBSSxHQUFHLHdCQUF3QixDQUFDO1FBQ2hDLGlCQUFXLEdBQ1QsMEVBQTBFLENBQUM7UUFJN0Usc0JBQWdCLEdBQUcsSUFBSSxDQUFDOztJQUMxQixDQUFDO0lBSkMsaUNBQVUsR0FBVjtRQUNFLE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFFSCxtQkFBQztBQUFELENBQUMsQUFSRCxDQUFrQyxxQkFBUSxHQVF6QztBQVJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5pdEZpbGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlc1wiO1xuXG5jb25zdCBpbmRleENvbnRlbnQgPSBgLy8gVGhlIGVudHJ5IGZpbGUgb2YgeW91ciBXZWJBc3NlbWJseSBtb2R1bGUuXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGQoYTogaTMyLCBiOiBpMzIpOiBpMzIge1xuICByZXR1cm4gYSArIGI7XG59XG5gO1xuXG5jb25zdCB0c2NvbmZpZ0NvbnRlbnQgPSBge1xuICAgIFwiZXh0ZW5kc1wiOiBcImFzc2VtYmx5c2NyaXB0L3N0ZC9hc3NlbWJseS5qc29uXCIsXG4gICAgXCJpbmNsdWRlXCI6IFtcbiAgICAgIFwiLi8qKi8qLnRzXCJcbiAgICBdXG59XG5gO1xuXG5leHBvcnQgY2xhc3MgQXNzZW1ibHlJbmRleEZpbGUgZXh0ZW5kcyBJbml0RmlsZSB7XG4gIHBhdGggPSBcImFzc2VtYmx5L2luZGV4LnRzXCI7XG4gIGRlc2NyaXB0aW9uID1cbiAgICBcIkV4YW1wbGUgZW50cnkgZmlsZSBiZWluZyBjb21waWxlZCB0byBXZWJBc3NlbWJseSB0byBnZXQgeW91IHN0YXJ0ZWQuXCI7XG4gIGdldENvbnRlbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaW5kZXhDb250ZW50O1xuICB9XG4gIHVwZGF0ZU9sZENvbnRlbnQgPSBudWxsO1xufVxuXG5leHBvcnQgY2xhc3MgVHNDb25maWdGaWxlIGV4dGVuZHMgSW5pdEZpbGUge1xuICBwYXRoID0gXCJhc3NlbWJseS90c2NvbmZpZy5qc29uXCI7XG4gIGRlc2NyaXB0aW9uID1cbiAgICBcIlR5cGVTY3JpcHQgY29uZmlndXJhdGlvbiBpbmhlcml0aW5nIHJlY29tbWVuZGVkIEFzc2VtYmx5U2NyaXB0IHNldHRpbmdzLlwiO1xuICBnZXRDb250ZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRzY29uZmlnQ29udGVudDtcbiAgfVxuICB1cGRhdGVPbGRDb250ZW50ID0gbnVsbDtcbn1cbiJdfQ==