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
exports.BuildGitignoreFile = exports.RootGitignoreFile = void 0;
var interfaces_1 = require("../interfaces");
var RootGitignoreFile = /** @class */ (function (_super) {
    __extends(RootGitignoreFile, _super);
    function RootGitignoreFile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = ".gitignore";
        _this.description = "Git configuration that excludes tests residue and node_modules.";
        _this.updateOldContent = function (old) { return old + "\n" + _this.getContent(); };
        return _this;
    }
    RootGitignoreFile.prototype.getContent = function () {
        return [
            "node_modules/",
            "assembly/**/__tests__/*.map",
            "assembly/**/__tests__/*.wat",
        ].join("\n");
    };
    return RootGitignoreFile;
}(interfaces_1.InitFile));
exports.RootGitignoreFile = RootGitignoreFile;
var BuildGitignoreFile = /** @class */ (function (_super) {
    __extends(BuildGitignoreFile, _super);
    function BuildGitignoreFile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = "build/.gitignore";
        _this.description = "Git configuration that excludes compiled binaries from source control.";
        _this.updateOldContent = function (old) { return old + "\n" + _this.getContent(); };
        return _this;
    }
    BuildGitignoreFile.prototype.getContent = function () {
        return ["*.wasm", "*.wasm.map", "*.asm.js", "*wat"].join("\n");
    };
    return BuildGitignoreFile;
}(interfaces_1.InitFile));
exports.BuildGitignoreFile = BuildGitignoreFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aWdub3Jlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21tYW5kcy9pbml0L2ZpbGVzL2dpdGlnbm9yZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF5QztBQUV6QztJQUF1QyxxQ0FBUTtJQUEvQztRQUFBLHFFQVlDO1FBWEMsVUFBSSxHQUFHLFlBQVksQ0FBQztRQUNwQixpQkFBVyxHQUNULGlFQUFpRSxDQUFDO1FBQ3BFLHNCQUFnQixHQUFHLFVBQUMsR0FBVyxJQUFLLE9BQUEsR0FBRyxHQUFHLElBQUksR0FBRyxLQUFJLENBQUMsVUFBVSxFQUFFLEVBQTlCLENBQThCLENBQUM7O0lBUXJFLENBQUM7SUFQQyxzQ0FBVSxHQUFWO1FBQ0UsT0FBTztZQUNMLGVBQWU7WUFDZiw2QkFBNkI7WUFDN0IsNkJBQTZCO1NBQzlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQVpELENBQXVDLHFCQUFRLEdBWTlDO0FBWlksOENBQWlCO0FBYzlCO0lBQXdDLHNDQUFRO0lBQWhEO1FBQUEscUVBUUM7UUFQQyxVQUFJLEdBQUcsa0JBQWtCLENBQUM7UUFDMUIsaUJBQVcsR0FDVCx3RUFBd0UsQ0FBQztRQUMzRSxzQkFBZ0IsR0FBRyxVQUFDLEdBQVcsSUFBSyxPQUFBLEdBQUcsR0FBRyxJQUFJLEdBQUcsS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUE5QixDQUE4QixDQUFDOztJQUlyRSxDQUFDO0lBSEMsdUNBQVUsR0FBVjtRQUNFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQVJELENBQXdDLHFCQUFRLEdBUS9DO0FBUlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5pdEZpbGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY2xhc3MgUm9vdEdpdGlnbm9yZUZpbGUgZXh0ZW5kcyBJbml0RmlsZSB7XG4gIHBhdGggPSBcIi5naXRpZ25vcmVcIjtcbiAgZGVzY3JpcHRpb24gPVxuICAgIFwiR2l0IGNvbmZpZ3VyYXRpb24gdGhhdCBleGNsdWRlcyB0ZXN0cyByZXNpZHVlIGFuZCBub2RlX21vZHVsZXMuXCI7XG4gIHVwZGF0ZU9sZENvbnRlbnQgPSAob2xkOiBzdHJpbmcpID0+IG9sZCArIFwiXFxuXCIgKyB0aGlzLmdldENvbnRlbnQoKTtcbiAgZ2V0Q29udGVudCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBbXG4gICAgICBcIm5vZGVfbW9kdWxlcy9cIixcbiAgICAgIFwiYXNzZW1ibHkvKiovX190ZXN0c19fLyoubWFwXCIsXG4gICAgICBcImFzc2VtYmx5LyoqL19fdGVzdHNfXy8qLndhdFwiLFxuICAgIF0uam9pbihcIlxcblwiKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQnVpbGRHaXRpZ25vcmVGaWxlIGV4dGVuZHMgSW5pdEZpbGUge1xuICBwYXRoID0gXCJidWlsZC8uZ2l0aWdub3JlXCI7XG4gIGRlc2NyaXB0aW9uID1cbiAgICBcIkdpdCBjb25maWd1cmF0aW9uIHRoYXQgZXhjbHVkZXMgY29tcGlsZWQgYmluYXJpZXMgZnJvbSBzb3VyY2UgY29udHJvbC5cIjtcbiAgdXBkYXRlT2xkQ29udGVudCA9IChvbGQ6IHN0cmluZykgPT4gb2xkICsgXCJcXG5cIiArIHRoaXMuZ2V0Q29udGVudCgpO1xuICBnZXRDb250ZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFtcIioud2FzbVwiLCBcIioud2FzbS5tYXBcIiwgXCIqLmFzbS5qc1wiLCBcIip3YXRcIl0uam9pbihcIlxcblwiKTtcbiAgfVxufVxuIl19