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
exports.ExampleTestFile = exports.AsPectTypesFile = void 0;
var interfaces_1 = require("../interfaces");
var testContent = "\nimport { add } from \"..\";\n\ndescribe(\"test add\", () => {\n  it(\"19 + 13 should be 42\", () => {\n    expect<i32>(add(19, 23)).toBe(42, \"19 + 23 is 42\");\n  });\n\n  it(\"can log some values to the console\", () => {\n    log<string>(\"Hello world!\"); // strings!\n    log<f64>(3.1415); // floats!\n    log<u8>(244); // integers!\n    log<u64>(0xffffffff); // long values!\n    log<ArrayBuffer>(new ArrayBuffer(50)); // bytes!\n  });\n});\n";
var AsPectTypesFile = /** @class */ (function (_super) {
    __extends(AsPectTypesFile, _super);
    function AsPectTypesFile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = "assembly/__tests__/as-pect.d.ts";
        _this.description = "Typescript types file for tests.";
        _this.updateOldContent = null;
        return _this;
    }
    AsPectTypesFile.prototype.getContent = function () {
        return "/// <reference types=\"@as-pect/assembly/types/as-pect\" />\n";
    };
    return AsPectTypesFile;
}(interfaces_1.InitFile));
exports.AsPectTypesFile = AsPectTypesFile;
var ExampleTestFile = /** @class */ (function (_super) {
    __extends(ExampleTestFile, _super);
    function ExampleTestFile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = "assembly/__tests__/example.spec.ts";
        _this.description = "Example test to check that your module is indeed working.";
        _this.updateOldContent = null;
        return _this;
    }
    ExampleTestFile.prototype.getContent = function () {
        return testContent;
    };
    return ExampleTestFile;
}(interfaces_1.InitFile));
exports.ExampleTestFile = ExampleTestFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9maWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21tYW5kcy9pbml0L2ZpbGVzL3Rlc3RfZmlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF5QztBQUV6QyxJQUFNLFdBQVcsR0FBRyxvY0FnQm5CLENBQUM7QUFFRjtJQUFxQyxtQ0FBUTtJQUE3QztRQUFBLHFFQU9DO1FBTkMsVUFBSSxHQUFHLGlDQUFpQyxDQUFDO1FBQ3pDLGlCQUFXLEdBQUcsa0NBQWtDLENBQUM7UUFJakQsc0JBQWdCLEdBQUcsSUFBSSxDQUFDOztJQUMxQixDQUFDO0lBSkMsb0NBQVUsR0FBVjtRQUNFLE9BQU8sK0RBQTZELENBQUM7SUFDdkUsQ0FBQztJQUVILHNCQUFDO0FBQUQsQ0FBQyxBQVBELENBQXFDLHFCQUFRLEdBTzVDO0FBUFksMENBQWU7QUFTNUI7SUFBcUMsbUNBQVE7SUFBN0M7UUFBQSxxRUFPQztRQU5DLFVBQUksR0FBRyxvQ0FBb0MsQ0FBQztRQUM1QyxpQkFBVyxHQUFHLDJEQUEyRCxDQUFDO1FBSTFFLHNCQUFnQixHQUFHLElBQUksQ0FBQzs7SUFDMUIsQ0FBQztJQUpDLG9DQUFVLEdBQVY7UUFDRSxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRUgsc0JBQUM7QUFBRCxDQUFDLEFBUEQsQ0FBcUMscUJBQVEsR0FPNUM7QUFQWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluaXRGaWxlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXNcIjtcblxuY29uc3QgdGVzdENvbnRlbnQgPSBgXG5pbXBvcnQgeyBhZGQgfSBmcm9tIFwiLi5cIjtcblxuZGVzY3JpYmUoXCJ0ZXN0IGFkZFwiLCAoKSA9PiB7XG4gIGl0KFwiMTkgKyAxMyBzaG91bGQgYmUgNDJcIiwgKCkgPT4ge1xuICAgIGV4cGVjdDxpMzI+KGFkZCgxOSwgMjMpKS50b0JlKDQyLCBcIjE5ICsgMjMgaXMgNDJcIik7XG4gIH0pO1xuXG4gIGl0KFwiY2FuIGxvZyBzb21lIHZhbHVlcyB0byB0aGUgY29uc29sZVwiLCAoKSA9PiB7XG4gICAgbG9nPHN0cmluZz4oXCJIZWxsbyB3b3JsZCFcIik7IC8vIHN0cmluZ3MhXG4gICAgbG9nPGY2ND4oMy4xNDE1KTsgLy8gZmxvYXRzIVxuICAgIGxvZzx1OD4oMjQ0KTsgLy8gaW50ZWdlcnMhXG4gICAgbG9nPHU2ND4oMHhmZmZmZmZmZik7IC8vIGxvbmcgdmFsdWVzIVxuICAgIGxvZzxBcnJheUJ1ZmZlcj4obmV3IEFycmF5QnVmZmVyKDUwKSk7IC8vIGJ5dGVzIVxuICB9KTtcbn0pO1xuYDtcblxuZXhwb3J0IGNsYXNzIEFzUGVjdFR5cGVzRmlsZSBleHRlbmRzIEluaXRGaWxlIHtcbiAgcGF0aCA9IFwiYXNzZW1ibHkvX190ZXN0c19fL2FzLXBlY3QuZC50c1wiO1xuICBkZXNjcmlwdGlvbiA9IFwiVHlwZXNjcmlwdCB0eXBlcyBmaWxlIGZvciB0ZXN0cy5cIjtcbiAgZ2V0Q29udGVudCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJAYXMtcGVjdC9hc3NlbWJseS90eXBlcy9hcy1wZWN0XCIgLz5cXG5gO1xuICB9XG4gIHVwZGF0ZU9sZENvbnRlbnQgPSBudWxsO1xufVxuXG5leHBvcnQgY2xhc3MgRXhhbXBsZVRlc3RGaWxlIGV4dGVuZHMgSW5pdEZpbGUge1xuICBwYXRoID0gXCJhc3NlbWJseS9fX3Rlc3RzX18vZXhhbXBsZS5zcGVjLnRzXCI7XG4gIGRlc2NyaXB0aW9uID0gXCJFeGFtcGxlIHRlc3QgdG8gY2hlY2sgdGhhdCB5b3VyIG1vZHVsZSBpcyBpbmRlZWQgd29ya2luZy5cIjtcbiAgZ2V0Q29udGVudCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0ZXN0Q29udGVudDtcbiAgfVxuICB1cGRhdGVPbGRDb250ZW50ID0gbnVsbDtcbn1cbiJdfQ==