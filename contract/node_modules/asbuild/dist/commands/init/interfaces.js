"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitFile = exports.InitResult = void 0;
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var utils_1 = require("../../utils");
var InitResult;
(function (InitResult) {
    InitResult[InitResult["CREATED"] = 0] = "CREATED";
    InitResult[InitResult["UPDATED"] = 1] = "UPDATED";
    InitResult[InitResult["EXISTS"] = 2] = "EXISTS";
})(InitResult = exports.InitResult || (exports.InitResult = {}));
var InitFile = /** @class */ (function () {
    function InitFile() {
    }
    InitFile.prototype.getRelativePath = function (baseDir) {
        return path.join(baseDir, this.path);
    };
    /**
     * Write the InitFile to given baseDir
     * @param baseDir Base directory where file will created in relative to
     */
    InitFile.prototype.write = function (baseDir) {
        var filePath = this.getRelativePath(baseDir);
        // create the required dirs if not exists
        utils_1.ensureDirExists(filePath);
        // check if file already exists
        var fileExists = fs.existsSync(filePath);
        // check whether file can be updated or not
        var shouldUpdate = this.updateOldContent && fileExists;
        if (fileExists && !shouldUpdate) {
            // if file exists and cannot update return
            return InitResult.EXISTS;
        }
        else {
            var newContent = shouldUpdate && this.updateOldContent
                ? this.updateOldContent(fs.readFileSync(filePath, { encoding: "utf8" }))
                : this.getContent();
            fs.writeFileSync(filePath, newContent);
        }
        return fileExists && shouldUpdate ? InitResult.UPDATED : InitResult.CREATED;
    };
    return InitFile;
}());
exports.InitFile = InitFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9pbml0L2ludGVyZmFjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUE2QjtBQUM3QixxQ0FBeUI7QUFDekIscUNBQThDO0FBRTlDLElBQVksVUFJWDtBQUpELFdBQVksVUFBVTtJQUNwQixpREFBVyxDQUFBO0lBQ1gsaURBQVcsQ0FBQTtJQUNYLCtDQUFVLENBQUE7QUFDWixDQUFDLEVBSlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFJckI7QUFFRDtJQUNFO0lBQWUsQ0FBQztJQU9oQixrQ0FBZSxHQUFmLFVBQWdCLE9BQWU7UUFDN0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNEOzs7T0FHRztJQUNILHdCQUFLLEdBQUwsVUFBTSxPQUFlO1FBQ25CLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFL0MseUNBQXlDO1FBQ3pDLHVCQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFMUIsK0JBQStCO1FBQy9CLElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsMkNBQTJDO1FBQzNDLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxVQUFVLENBQUM7UUFFekQsSUFBSSxVQUFVLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDL0IsMENBQTBDO1lBQzFDLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQztTQUMxQjthQUFNO1lBQ0wsSUFBTSxVQUFVLEdBQ2QsWUFBWSxJQUFJLElBQUksQ0FBQyxnQkFBZ0I7Z0JBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQ25CLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQ2hEO2dCQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDeEIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDeEM7UUFFRCxPQUFPLFVBQVUsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7SUFDOUUsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBekNELElBeUNDO0FBekNxQiw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgZW5zdXJlRGlyRXhpc3RzIH0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XG5cbmV4cG9ydCBlbnVtIEluaXRSZXN1bHQge1xuICBDUkVBVEVEID0gMCxcbiAgVVBEQVRFRCA9IDEsXG4gIEVYSVNUUyA9IDIsXG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbml0RmlsZSB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgYWJzdHJhY3QgcGF0aDogc3RyaW5nO1xuICBhYnN0cmFjdCBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBhYnN0cmFjdCB1cGRhdGVPbGRDb250ZW50OiAoKG9sZDogc3RyaW5nKSA9PiBzdHJpbmcpIHwgbnVsbDtcblxuICBhYnN0cmFjdCBnZXRDb250ZW50KCk6IHN0cmluZztcblxuICBnZXRSZWxhdGl2ZVBhdGgoYmFzZURpcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcGF0aC5qb2luKGJhc2VEaXIsIHRoaXMucGF0aCk7XG4gIH1cbiAgLyoqXG4gICAqIFdyaXRlIHRoZSBJbml0RmlsZSB0byBnaXZlbiBiYXNlRGlyXG4gICAqIEBwYXJhbSBiYXNlRGlyIEJhc2UgZGlyZWN0b3J5IHdoZXJlIGZpbGUgd2lsbCBjcmVhdGVkIGluIHJlbGF0aXZlIHRvXG4gICAqL1xuICB3cml0ZShiYXNlRGlyOiBzdHJpbmcpOiBJbml0UmVzdWx0IHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0UmVsYXRpdmVQYXRoKGJhc2VEaXIpO1xuXG4gICAgLy8gY3JlYXRlIHRoZSByZXF1aXJlZCBkaXJzIGlmIG5vdCBleGlzdHNcbiAgICBlbnN1cmVEaXJFeGlzdHMoZmlsZVBhdGgpO1xuXG4gICAgLy8gY2hlY2sgaWYgZmlsZSBhbHJlYWR5IGV4aXN0c1xuICAgIGNvbnN0IGZpbGVFeGlzdHMgPSBmcy5leGlzdHNTeW5jKGZpbGVQYXRoKTtcbiAgICAvLyBjaGVjayB3aGV0aGVyIGZpbGUgY2FuIGJlIHVwZGF0ZWQgb3Igbm90XG4gICAgY29uc3Qgc2hvdWxkVXBkYXRlID0gdGhpcy51cGRhdGVPbGRDb250ZW50ICYmIGZpbGVFeGlzdHM7XG5cbiAgICBpZiAoZmlsZUV4aXN0cyAmJiAhc2hvdWxkVXBkYXRlKSB7XG4gICAgICAvLyBpZiBmaWxlIGV4aXN0cyBhbmQgY2Fubm90IHVwZGF0ZSByZXR1cm5cbiAgICAgIHJldHVybiBJbml0UmVzdWx0LkVYSVNUUztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3Q29udGVudDogc3RyaW5nID1cbiAgICAgICAgc2hvdWxkVXBkYXRlICYmIHRoaXMudXBkYXRlT2xkQ29udGVudFxuICAgICAgICAgID8gdGhpcy51cGRhdGVPbGRDb250ZW50KFxuICAgICAgICAgICAgICBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiB0aGlzLmdldENvbnRlbnQoKTtcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZVBhdGgsIG5ld0NvbnRlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWxlRXhpc3RzICYmIHNob3VsZFVwZGF0ZSA/IEluaXRSZXN1bHQuVVBEQVRFRCA6IEluaXRSZXN1bHQuQ1JFQVRFRDtcbiAgfVxufVxuIl19