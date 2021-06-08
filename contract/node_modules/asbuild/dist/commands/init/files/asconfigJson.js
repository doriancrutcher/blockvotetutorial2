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
exports.AsconfigJsonFile = void 0;
var interfaces_1 = require("../interfaces");
var AsconfigJsonFile = /** @class */ (function (_super) {
    __extends(AsconfigJsonFile, _super);
    function AsconfigJsonFile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = "asconfig.json";
        _this.description = "Configuration file defining both a 'debug' and a 'release' target.";
        _this.configObj = {
            targets: {
                debug: {
                    binaryFile: "build/untouched.wasm",
                    textFile: "build/untouched.wat",
                    sourceMap: true,
                    debug: true,
                },
                release: {
                    binaryFile: "build/optimized.wasm",
                    textFile: "build/optimized.wat",
                    sourceMap: true,
                    optimizeLevel: 3,
                    shrinkLevel: 1,
                    converge: false,
                    noAssert: false,
                },
            },
            options: {},
        };
        _this.updateOldContent = null;
        return _this;
    }
    AsconfigJsonFile.prototype.getContent = function () {
        return JSON.stringify(this.configObj, null, 2);
    };
    return AsconfigJsonFile;
}(interfaces_1.InitFile));
exports.AsconfigJsonFile = AsconfigJsonFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNjb25maWdKc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2luaXQvZmlsZXMvYXNjb25maWdKc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBeUM7QUFFekM7SUFBc0Msb0NBQVE7SUFBOUM7UUFBQSxxRUE0QkM7UUEzQkMsVUFBSSxHQUFHLGVBQWUsQ0FBQztRQUN2QixpQkFBVyxHQUNULG9FQUFvRSxDQUFDO1FBQ3ZFLGVBQVMsR0FBRztZQUNWLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUU7b0JBQ0wsVUFBVSxFQUFFLHNCQUFzQjtvQkFDbEMsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsU0FBUyxFQUFFLElBQUk7b0JBQ2YsS0FBSyxFQUFFLElBQUk7aUJBQ1o7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFVBQVUsRUFBRSxzQkFBc0I7b0JBQ2xDLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFNBQVMsRUFBRSxJQUFJO29CQUNmLGFBQWEsRUFBRSxDQUFDO29CQUNoQixXQUFXLEVBQUUsQ0FBQztvQkFDZCxRQUFRLEVBQUUsS0FBSztvQkFDZixRQUFRLEVBQUUsS0FBSztpQkFDaEI7YUFDRjtZQUNELE9BQU8sRUFBRSxFQUFFO1NBQ1osQ0FBQztRQUlGLHNCQUFnQixHQUFHLElBQUksQ0FBQzs7SUFDMUIsQ0FBQztJQUpDLHFDQUFVLEdBQVY7UUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVILHVCQUFDO0FBQUQsQ0FBQyxBQTVCRCxDQUFzQyxxQkFBUSxHQTRCN0M7QUE1QlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5pdEZpbGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY2xhc3MgQXNjb25maWdKc29uRmlsZSBleHRlbmRzIEluaXRGaWxlIHtcbiAgcGF0aCA9IFwiYXNjb25maWcuanNvblwiO1xuICBkZXNjcmlwdGlvbiA9XG4gICAgXCJDb25maWd1cmF0aW9uIGZpbGUgZGVmaW5pbmcgYm90aCBhICdkZWJ1ZycgYW5kIGEgJ3JlbGVhc2UnIHRhcmdldC5cIjtcbiAgY29uZmlnT2JqID0ge1xuICAgIHRhcmdldHM6IHtcbiAgICAgIGRlYnVnOiB7XG4gICAgICAgIGJpbmFyeUZpbGU6IFwiYnVpbGQvdW50b3VjaGVkLndhc21cIixcbiAgICAgICAgdGV4dEZpbGU6IFwiYnVpbGQvdW50b3VjaGVkLndhdFwiLFxuICAgICAgICBzb3VyY2VNYXA6IHRydWUsXG4gICAgICAgIGRlYnVnOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHJlbGVhc2U6IHtcbiAgICAgICAgYmluYXJ5RmlsZTogXCJidWlsZC9vcHRpbWl6ZWQud2FzbVwiLFxuICAgICAgICB0ZXh0RmlsZTogXCJidWlsZC9vcHRpbWl6ZWQud2F0XCIsXG4gICAgICAgIHNvdXJjZU1hcDogdHJ1ZSxcbiAgICAgICAgb3B0aW1pemVMZXZlbDogMyxcbiAgICAgICAgc2hyaW5rTGV2ZWw6IDEsXG4gICAgICAgIGNvbnZlcmdlOiBmYWxzZSxcbiAgICAgICAgbm9Bc3NlcnQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIG9wdGlvbnM6IHt9LFxuICB9O1xuICBnZXRDb250ZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuY29uZmlnT2JqLCBudWxsLCAyKTtcbiAgfVxuICB1cGRhdGVPbGRDb250ZW50ID0gbnVsbDtcbn1cbiJdfQ==