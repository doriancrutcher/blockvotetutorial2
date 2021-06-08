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
exports.PackageJsonFile = exports.getPmCommands = exports.getPm = void 0;
var interfaces_1 = require("../interfaces");
var lib_1 = require("@as-pect/cli/lib");
var asc_1 = require("assemblyscript/cli/asc");
// as-pect need ^0.18.7
var compilerVersion = asc_1.version >= "0.18.7" ? asc_1.version : "0.18.7";
var npmDefaultTest = 'echo "Error: no test specified" && exit 1';
var PackageManager;
(function (PackageManager) {
    PackageManager["NPM"] = "npm";
    PackageManager["Yarn"] = "yarn";
    PackageManager["PNPM"] = "pnpm";
})(PackageManager || (PackageManager = {}));
function getPm() {
    var pm = "npm";
    if (typeof process.env.npm_config_user_agent === "string") {
        if (/\byarn\//.test(process.env.npm_config_user_agent)) {
            pm = "yarn";
        }
        else if (/\bpnpm\//.test(process.env.npm_config_user_agent)) {
            pm = "pnpm";
        }
    }
    return pm;
}
exports.getPm = getPm;
function getPmCommands() {
    switch (getPm()) {
        case PackageManager.PNPM:
            return {
                install: "pnpm install",
                pkgInstall: "pnpm add",
                run: "pnpm run",
                test: "pnpm test",
            };
        case PackageManager.Yarn:
            return {
                install: "yarn install",
                pkgInstall: "yarn add",
                run: "yarn",
                test: "yarn test",
            };
        default:
            return {
                install: "npm install",
                pkgInstall: "npm install",
                run: "npm run",
                test: "npm test",
            };
    }
}
exports.getPmCommands = getPmCommands;
var PackageJsonFile = /** @class */ (function (_super) {
    __extends(PackageJsonFile, _super);
    function PackageJsonFile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = "package.json";
        _this.description = "Package info containing the necessary commands to compile to WebAssembly";
        _this.pm = "npm";
        _this.pkgObj = {
            scripts: {
                "lint:fix": 'asb fmt "assembly/**/*.ts"',
                lint: 'asb fmt "assembly/**/*.ts" --lint',
                test: "asb test -- --verbose",
                "test:ci": "asb test -- --summary",
                "build:untouched": "asb assembly/index.ts --target debug",
                "build:optimized": "asb assembly/index.ts --target release",
                build: getPmCommands().run + " build:untouched && " + getPmCommands().run + " build:optimized",
            },
            devDependencies: {
                "@as-pect/cli": "^" + lib_1.version,
                "@typescript-eslint/eslint-plugin": "^4.22.0",
                "@typescript-eslint/parser": "^4.22.0",
                assemblyscript: "^" + compilerVersion,
                asbuild: "latest",
                eslint: "^7.17.0",
                typescript: "^4.2.4",
            },
            dependencies: {
                "@assemblyscript/loader": "^" + compilerVersion,
            },
        };
        _this.updateOldContent = function (old) {
            var pkgOldObj = JSON.parse(old);
            var scripts = pkgOldObj.scripts || {};
            if (!scripts["build"]) {
                scripts["build:untouched"] = _this.pkgObj.scripts["build:untouched"];
                scripts["build:optimized"] = _this.pkgObj.scripts["build:optimized"];
                scripts["build"] = _this.pkgObj.scripts.build;
                pkgOldObj["scripts"] = scripts;
            }
            if (!scripts["test"] || scripts["test"] == npmDefaultTest) {
                scripts["test"] = _this.pkgObj.scripts.test;
                scripts["test:ci"] = _this.pkgObj.scripts["test:ci"];
                pkgOldObj["scripts"] = scripts;
            }
            if (!scripts["lint"] || scripts["lint"] == npmDefaultTest) {
                scripts["lint"] = _this.pkgObj.scripts.lint;
                scripts["lint:fix"] = _this.pkgObj.scripts["lint:fix"];
                pkgOldObj["scripts"] = scripts;
            }
            var dependencies = pkgOldObj["dependencies"] || {};
            for (var _i = 0, _a = Object.entries(_this.pkgObj.dependencies); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                if (!dependencies[key])
                    dependencies[key] = value;
            }
            pkgOldObj["dependencies"] = dependencies;
            var devDependencies = pkgOldObj["devDependencies"] || {};
            for (var _c = 0, _d = Object.entries(_this.pkgObj.devDependencies); _c < _d.length; _c++) {
                var _e = _d[_c], key = _e[0], value = _e[1];
                if (!devDependencies[key])
                    devDependencies[key] = value;
            }
            pkgOldObj["devDependencies"] = devDependencies;
            return JSON.stringify(pkgOldObj, null, 2);
        };
        return _this;
    }
    PackageJsonFile.prototype.getContent = function () {
        return JSON.stringify(this.pkgObj, null, 2);
    };
    return PackageJsonFile;
}(interfaces_1.InitFile));
exports.PackageJsonFile = PackageJsonFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tbWFuZHMvaW5pdC9maWxlcy9wYWNrYWdlSnNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXlDO0FBQ3pDLHdDQUE0RDtBQUM1RCw4Q0FBOEQ7QUFFOUQsdUJBQXVCO0FBQ3ZCLElBQU0sZUFBZSxHQUFHLGFBQVMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0FBRXJFLElBQU0sY0FBYyxHQUFHLDJDQUEyQyxDQUFDO0FBRW5FLElBQUssY0FJSjtBQUpELFdBQUssY0FBYztJQUNqQiw2QkFBVyxDQUFBO0lBQ1gsK0JBQWEsQ0FBQTtJQUNiLCtCQUFhLENBQUE7QUFDZixDQUFDLEVBSkksY0FBYyxLQUFkLGNBQWMsUUFJbEI7QUFTRCxTQUFnQixLQUFLO0lBQ25CLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNmLElBQUksT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixLQUFLLFFBQVEsRUFBRTtRQUN6RCxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1lBQ3RELEVBQUUsR0FBRyxNQUFNLENBQUM7U0FDYjthQUFNLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7WUFDN0QsRUFBRSxHQUFHLE1BQU0sQ0FBQztTQUNiO0tBQ0Y7SUFDRCxPQUFPLEVBQW9CLENBQUM7QUFDOUIsQ0FBQztBQVZELHNCQVVDO0FBRUQsU0FBZ0IsYUFBYTtJQUMzQixRQUFRLEtBQUssRUFBRSxFQUFFO1FBQ2YsS0FBSyxjQUFjLENBQUMsSUFBSTtZQUN0QixPQUFPO2dCQUNMLE9BQU8sRUFBRSxjQUFjO2dCQUN2QixVQUFVLEVB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LENBQUM7UUFDNUMsQ0FBQyxDQUFDOztJQUNKLENBQUM7SUF0Q0Msb0NBQVUsR0FBVjtRQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBb0NILHNCQUFDO0FBQUQsQ0FBQyxBQXBFRCxDQUFxQyxxQkFBUSxHQW9FNUM7QUFwRVksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbml0RmlsZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyB2ZXJzaW9uIGFzIGFzcGVjdFZlcnNpb24gfSBmcm9tIFwiQGFzLXBlY3QvY2xpL2xpYlwiO1xuaW1wb3J0IHsgdmVyc2lvbiBhcyBhc1ZlcnNpb24gfSBmcm9tIFwiYXNzZW1ibHlzY3JpcHQvY2xpL2FzY1wiO1xuXG4vLyBhcy1wZWN0IG5lZWQgXjAuMTguN1xuY29uc3QgY29tcGlsZXJWZXJzaW9uID0gYXNWZXJzaW9uID49IFwiMC4xOC43XCIgPyBhc1ZlcnNpb24gOiBcIjAuMTguN1wiO1xuXG5jb25zdCBucG1EZWZhdWx0VGVzdCA9ICdlY2hvIFwiRXJyb3I6IG5vIHRlc3Qgc3BlY2lmaWVkXCIgJiYgZXhpdCAxJztcblxuZW51bSBQYWNrYWdlTWFuYWdlciB7XG4gIE5QTSA9IFwibnBtXCIsXG4gIFlhcm4gPSBcInlhcm5cIixcbiAgUE5QTSA9IFwicG5wbVwiLFxufVxuXG5pbnRlcmZhY2UgUE1Db21tYW5kIHtcbiAgdGVzdDogc3RyaW5nO1xuICBpbnN0YWxsOiBzdHJpbmc7XG4gIHBrZ0luc3RhbGw6IHN0cmluZztcbiAgcnVuOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQbSgpOiBQYWNrYWdlTWFuYWdlciB7XG4gIGxldCBwbSA9IFwibnBtXCI7XG4gIGlmICh0eXBlb2YgcHJvY2Vzcy5lbnYubnBtX2NvbmZpZ191c2VyX2FnZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgaWYgKC9cXGJ5YXJuXFwvLy50ZXN0KHByb2Nlc3MuZW52Lm5wbV9jb25maWdfdXNlcl9hZ2VudCkpIHtcbiAgICAgIHBtID0gXCJ5YXJuXCI7XG4gICAgfSBlbHNlIGlmICgvXFxicG5wbVxcLy8udGVzdChwcm9jZXNzLmVudi5ucG1fY29uZmlnX3VzZXJfYWdlbnQpKSB7XG4gICAgICBwbSA9IFwicG5wbVwiO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcG0gYXMgUGFja2FnZU1hbmFnZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQbUNvbW1hbmRzKCk6IFBNQ29tbWFuZCB7XG4gIHN3aXRjaCAoZ2V0UG0oKSkge1xuICAgIGNhc2UgUGFja2FnZU1hbmFnZXIuUE5QTTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluc3RhbGw6IFwicG5wbSBpbnN0YWxsXCIsXG4gICAgICAgIHBrZ0luc3RhbGw6IFwicG5wbSBhZGRcIixcbiAgICAgICAgcnVuOiBcInBucG0gcnVuXCIsXG4gICAgICAgIHRlc3Q6IFwicG5wbSB0ZXN0XCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBQYWNrYWdlTWFuYWdlci5ZYXJuOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5zdGFsbDogXCJ5YXJuIGluc3RhbGxcIixcbiAgICAgICAgcGtnSW5zdGFsbDogXCJ5YXJuIGFkZFwiLFxuICAgICAgICBydW46IFwieWFyblwiLFxuICAgICAgICB0ZXN0OiBcInlhcm4gdGVzdFwiLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbnN0YWxsOiBcIm5wbSBpbnN0YWxsXCIsXG4gICAgICAgIHBrZ0luc3RhbGw6IFwibnBtIGluc3RhbGxcIixcbiAgICAgICAgcnVuOiBcIm5wbSBydW5cIixcbiAgICAgICAgdGVzdDogXCJucG0gdGVzdFwiLFxuICAgICAgfTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGFja2FnZUpzb25GaWxlIGV4dGVuZHMgSW5pdEZpbGUge1xuICBwYXRoID0gXCJwYWNrYWdlLmpzb25cIjtcbiAgZGVzY3JpcHRpb24gPVxuICAgIFwiUGFja2FnZSBpbmZvIGNvbnRhaW5pbmcgdGhlIG5lY2Vzc2FyeSBjb21tYW5kcyB0byBjb21waWxlIHRvIFdlYkFzc2VtYmx5XCI7XG4gIHBtID0gXCJucG1cIjtcbiAgcGtnT2JqID0ge1xuICAgIHNjcmlwdHM6IHtcbiAgICAgIFwibGludDpmaXhcIjogJ2FzYiBmbXQgXCJhc3NlbWJseS8qKi8qLnRzXCInLFxuICAgICAgbGludDogJ2FzYiBmbXQgXCJhc3NlbWJseS8qKi8qLnRzXCIgLS1saW50JyxcbiAgICAgIHRlc3Q6IFwiYXNiIHRlc3QgLS0gLS12ZXJib3NlXCIsXG4gICAgICBcInRlc3Q6Y2lcIjogXCJhc2IgdGVzdCAtLSAtLXN1bW1hcnlcIixcbiAgICAgIFwiYnVpbGQ6dW50b3VjaGVkXCI6IFwiYXNiIGFzc2VtYmx5L2luZGV4LnRzIC0tdGFyZ2V0IGRlYnVnXCIsXG4gICAgICBcImJ1aWxkOm9wdGltaXplZFwiOiBcImFzYiBhc3NlbWJseS9pbmRleC50cyAtLXRhcmdldCByZWxlYXNlXCIsXG4gICAgICBidWlsZDogYCR7Z2V0UG1Db21tYW5kcygpLnJ1bn0gYnVpbGQ6dW50b3VjaGVkICYmICR7XG4gICAgICAgIGdldFBtQ29tbWFuZHMoKS5ydW5cbiAgICAgIH0gYnVpbGQ6b3B0aW1pemVkYCxcbiAgICB9LFxuICAgIGRldkRlcGVuZGVuY2llczoge1xuICAgICAgXCJAYXMtcGVjdC9jbGlcIjogXCJeXCIgKyBhc3BlY3RWZXJzaW9uLFxuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl40LjIyLjBcIixcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl40LjIyLjBcIixcbiAgICAgIGFzc2VtYmx5c2NyaXB0OiBcIl5cIiArIGNvbXBpbGVyVmVyc2lvbixcbiAgICAgIGFzYnVpbGQ6IFwibGF0ZXN0XCIsXG4gICAgICBlc2xpbnQ6IFwiXjcuMTcuMFwiLFxuICAgICAgdHlwZXNjcmlwdDogXCJeNC4yLjRcIixcbiAgICB9LFxuICAgIGRlcGVuZGVuY2llczoge1xuICAgICAgXCJAYXNzZW1ibHlzY3JpcHQvbG9hZGVyXCI6IFwiXlwiICsgY29tcGlsZXJWZXJzaW9uLFxuICAgIH0sXG4gIH07XG4gIGdldENvbnRlbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5wa2dPYmosIG51bGwsIDIpO1xuICB9XG4gIHVwZGF0ZU9sZENvbnRlbnQgPSAob2xkOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGxldCBwa2dPbGRPYmogPSBKU09OLnBhcnNlKG9sZCk7XG4gICAgbGV0IHNjcmlwdHMgPSBwa2dPbGRPYmouc2NyaXB0cyB8fCB7fTtcbiAgICBpZiAoIXNjcmlwdHNbXCJidWlsZFwiXSkge1xuICAgICAgc2NyaXB0c1tcImJ1aWxkOnVudG91Y2hlZFwiXSA9IHRoaXMucGtnT2JqLnNjcmlwdHNbXCJidWlsZDp1bnRvdWNoZWRcIl07XG4gICAgICBzY3JpcHRzW1wiYnVpbGQ6b3B0aW1pemVkXCJdID0gdGhpcy5wa2dPYmouc2NyaXB0c1tcImJ1aWxkOm9wdGltaXplZFwiXTtcbiAgICAgIHNjcmlwdHNbXCJidWlsZFwiXSA9IHRoaXMucGtnT2JqLnNjcmlwdHMuYnVpbGQ7XG4gICAgICBwa2dPbGRPYmpbXCJzY3JpcHRzXCJdID0gc2NyaXB0cztcbiAgICB9XG4gICAgaWYgKCFzY3JpcHRzW1widGVzdFwiXSB8fCBzY3JpcHRzW1widGVzdFwiXSA9PSBucG1EZWZhdWx0VGVzdCkge1xuICAgICAgc2NyaXB0c1tcInRlc3RcIl0gPSB0aGlzLnBrZ09iai5zY3JpcHRzLnRlc3Q7XG4gICAgICBzY3JpcHRzW1widGVzdDpjaVwiXSA9IHRoaXMucGtnT2JqLnNjcmlwdHNbXCJ0ZXN0OmNpXCJdO1xuICAgICAgcGtnT2xkT2JqW1wic2NyaXB0c1wiXSA9IHNjcmlwdHM7XG4gICAgfVxuXG4gICAgaWYgKCFzY3JpcHRzW1wibGludFwiXSB8fCBzY3JpcHRzW1wibGludFwiXSA9PSBucG1EZWZhdWx0VGVzdCkge1xuICAgICAgc2NyaXB0c1tcImxpbnRcIl0gPSB0aGlzLnBrZ09iai5zY3JpcHRzLmxpbnQ7XG4gICAgICBzY3JpcHRzW1wibGludDpmaXhcIl0gPSB0aGlzLnBrZ09iai5zY3JpcHRzW1wibGludDpmaXhcIl07XG4gICAgICBwa2dPbGRPYmpbXCJzY3JpcHRzXCJdID0gc2NyaXB0cztcbiAgICB9XG5cbiAgICBsZXQgZGVwZW5kZW5jaWVzID0gcGtnT2xkT2JqW1wiZGVwZW5kZW5jaWVzXCJdIHx8IHt9O1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMucGtnT2JqLmRlcGVuZGVuY2llcykpIHtcbiAgICAgIGlmICghZGVwZW5kZW5jaWVzW2tleV0pIGRlcGVuZGVuY2llc1trZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHBrZ09sZE9ialtcImRlcGVuZGVuY2llc1wiXSA9IGRlcGVuZGVuY2llcztcblxuICAgIGxldCBkZXZEZXBlbmRlbmNpZXMgPSBwa2dPbGRPYmpbXCJkZXZEZXBlbmRlbmNpZXNcIl0gfHwge307XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5wa2dPYmouZGV2RGVwZW5kZW5jaWVzKSkge1xuICAgICAgaWYgKCFkZXZEZXBlbmRlbmNpZXNba2V5XSkgZGV2RGVwZW5kZW5jaWVzW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcGtnT2xkT2JqW1wiZGV2RGVwZW5kZW5jaWVzXCJdID0gZGV2RGVwZW5kZW5jaWVzO1xuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHBrZ09sZE9iaiwgbnVsbCwgMik7XG4gIH07XG59XG4iXX0=