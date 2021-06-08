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
exports.IndexJsFile = void 0;
var interfaces_1 = require("../interfaces");
var IndexJsFile = /** @class */ (function (_super) {
    __extends(IndexJsFile, _super);
    function IndexJsFile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = "index.js";
        _this.description = "Example test to check that your module is indeed working.";
        _this.updateOldContent = function (old) {
            var commentOut = old
                .split("\n")
                .map(function (v) { return "// " + v; })
                .join("\n");
            return commentOut + "\n\n" + _this.getContent();
        };
        return _this;
    }
    IndexJsFile.prototype.getContent = function () {
        return [
            "const fs = require(\"fs\");",
            "const loader = require(\"@assemblyscript/loader\");",
            "const imports = { /* imports go here */ };",
            "const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + \"/build/optimized.wasm\"), imports);",
            "module.exports = wasmModule.exports;",
        ].join("\n");
    };
    return IndexJsFile;
}(interfaces_1.InitFile));
exports.IndexJsFile = IndexJsFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhKcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21tYW5kcy9pbml0L2ZpbGVzL2luZGV4SnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF5QztBQUV6QztJQUFpQywrQkFBUTtJQUF6QztRQUFBLHFFQW9CQztRQW5CQyxVQUFJLEdBQUcsVUFBVSxDQUFDO1FBQ2xCLGlCQUFXLEdBQUcsMkRBQTJELENBQUM7UUFXMUUsc0JBQWdCLEdBQUcsVUFBQyxHQUFXO1lBQzdCLElBQUksVUFBVSxHQUFHLEdBQUc7aUJBQ2pCLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQ1gsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSyxHQUFHLENBQUMsRUFBVCxDQUFTLENBQUM7aUJBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNkLE9BQU8sVUFBVSxHQUFHLE1BQU0sR0FBRyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDakQsQ0FBQyxDQUFDOztJQUNKLENBQUM7SUFqQkMsZ0NBQVUsR0FBVjtRQUNFLE9BQU87WUFDTCw2QkFBMkI7WUFDM0IscURBQW1EO1lBQ25ELDRDQUE0QztZQUM1Qyw2R0FBMkc7WUFDM0csc0NBQXNDO1NBQ3ZDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQVNILGtCQUFDO0FBQUQsQ0FBQyxBQXBCRCxDQUFpQyxxQkFBUSxHQW9CeEM7QUFwQlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbml0RmlsZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBjbGFzcyBJbmRleEpzRmlsZSBleHRlbmRzIEluaXRGaWxlIHtcbiAgcGF0aCA9IFwiaW5kZXguanNcIjtcbiAgZGVzY3JpcHRpb24gPSBcIkV4YW1wbGUgdGVzdCB0byBjaGVjayB0aGF0IHlvdXIgbW9kdWxlIGlzIGluZGVlZCB3b3JraW5nLlwiO1xuICBnZXRDb250ZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFtcbiAgICAgIGBjb25zdCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtgLFxuICAgICAgYGNvbnN0IGxvYWRlciA9IHJlcXVpcmUoXCJAYXNzZW1ibHlzY3JpcHQvbG9hZGVyXCIpO2AsXG4gICAgICBgY29uc3QgaW1wb3J0cyA9IHsgLyogaW1wb3J0cyBnbyBoZXJlICovIH07YCxcbiAgICAgIGBjb25zdCB3YXNtTW9kdWxlID0gbG9hZGVyLmluc3RhbnRpYXRlU3luYyhmcy5yZWFkRmlsZVN5bmMoX19kaXJuYW1lICsgXCIvYnVpbGQvb3B0aW1pemVkLndhc21cIiksIGltcG9ydHMpO2AsXG4gICAgICBgbW9kdWxlLmV4cG9ydHMgPSB3YXNtTW9kdWxlLmV4cG9ydHM7YCxcbiAgICBdLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICB1cGRhdGVPbGRDb250ZW50ID0gKG9sZDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICB2YXIgY29tbWVudE91dCA9IG9sZFxuICAgICAgLnNwbGl0KFwiXFxuXCIpXG4gICAgICAubWFwKCh2KSA9PiBcIi8vIFwiICsgdilcbiAgICAgIC5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiBjb21tZW50T3V0ICsgXCJcXG5cXG5cIiArIHRoaXMuZ2V0Q29udGVudCgpO1xuICB9O1xufVxuIl19