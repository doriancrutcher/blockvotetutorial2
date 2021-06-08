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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildCmd = exports.buildCmdBuilder = void 0;
var path = __importStar(require("path"));
var asc = __importStar(require("assemblyscript/cli/asc"));
var ascOptions = __importStar(require("assemblyscript/cli/util/options"));
var fs = __importStar(require("fs"));
var utils_1 = require("../utils");
var buildCmdUsage = "$0 build\nCompile a local package and all of its dependencies\n\nUSAGE:\n    $0 build [entry_file] [options] -- [asc_options]";
function buildCmdBuilder(y) {
    return y
        .option("baseDir", {
        alias: "d",
        type: "string",
        description: "Base directory of project.",
        default: ".",
    })
        .option("config", {
        alias: "c",
        type: "string",
        description: "Path to asconfig file",
        default: "./asconfig.json",
    })
        .option("wat", {
        description: "Output wat file to outDir",
        default: false,
        boolean: true,
    })
        .option("outDir", {
        type: "string",
        description: 'Directory to place built binaries. Default "./build/<target>/"',
    })
        .option("target", {
        type: "string",
        description: "Target for compilation",
        default: "release",
    })
        .option("verbose", {
        boolean: true,
        default: false,
        description: "Print out arguments passed to asc",
    });
}
exports.buildCmdBuilder = buildCmdBuilder;
exports.BuildCmd = {
    command: "build",
    describe: "Compile a local package and all of its dependencies",
    aliases: ["compile", "make"],
    builder: function (y) {
        return buildCmdBuilder(y)
            .usage(buildCmdUsage)
            .example("asb build", "Build release of 'assembly/index.ts to build/release/packageName.wasm")
            .example("asb build --target release", "Build a release binary")
            .example("asb build -- --measure", "Pass argument to 'asc'");
    },
    handler: function (args) {
        if (["build", "make", "compile"].includes(args["_"][0])) {
            args["_"] = args["_"].slice(1);
        }
        var options = utils_1.getGlobalAscOptions();
        var callback = utils_1.getGlobalCliCallback();
        var buildArgs = args;
        var ascArgv = args["_"];
        var _a = getSetup(buildArgs), baseDir = _a[0], configPath = _a[1];
        var config = getConfig(configPath);
        var outDir = args.outDir || config.outDir || path.join(process.cwd(), "./build");
        if (config.workspaces) {
            if (!(config.workspaces instanceof Array)) {
                utils_1.log("Invalid workspace configuration. Should be an array.", true);
                process.exit(1);
            }
            var workspaces = config.workspaces;
            for (var _i = 0, workspaces_1 = workspaces; _i < workspaces_1.length; _i++) {
                var workspace = workspaces_1[_i];
                args.baseDir = path.join(baseDir, workspace);
                args.outDir = path.relative(baseDir, outDir);
                compileProject(buildArgs, ascArgv.slice(0), options, callback);
            }
        }
        else {
            compileProject(buildArgs, ascArgv, options, callback);
        }
    },
};
function getSetup(args) {
    var baseDir = args.baseDir;
    baseDir = baseDir == "." ? process.cwd() : baseDir;
    var configPath = path.resolve(path.join(baseDir, args.config));
    return [baseDir, configPath];
}
var DEFAULT_CONFIG = {};
function getConfig(configPath) {
    try {
        return require(configPath);
    }
    catch (error) {
        return DEFAULT_CONFIG;
    }
}
function safeRequire(path) {
    try {
        return require(path);
    }
    catch (error) {
        return {};
    }
}
function hasTarget(config, target) {
    return config.targets && config.targets[target];
}
// @ts-ignore
function compileProject(args, ascArgv, options, cb) {
    var _a, _b;
    var _c = getSetup(args), baseDir = _c[0], configPath = _c[1];
    var config = getConfig(configPath);
    if (config !== DEFAULT_CONFIG) {
        ascArgv.push("--config", configPath);
    }
    var packageJson = safeRequire(path.join(baseDir, "package.json"));
    var ascArgs = ascOptions.parse(ascArgv, asc.options, false);
    var entryFile;
    switch (ascArgs.arguments.length) {
        case 0: {
            entryFile = path.join(baseDir, config.entry || path.join("assembly", "index.ts"));
            ascArgv.unshift(entryFile);
            break;
        }
        case 1: {
            entryFile = ascArgs.arguments[0];
            break;
        }
        default: {
            utils_1.log("Cannot compile two entry files at once.", true);
            process.exit(1);
        }
    }
    if (!fs.existsSync(entryFile)) {
        utils_1.log(args);
        throw new Error("Entry file " + entryFile + " doesn't exist");
    }
    var name;
    if (entryFile.endsWith("index.ts")) {
        if (packageJson.name) {
            name = packageJson.name;
        }
        else {
            name = path.basename(path.basename(baseDir));
        }
    }
    else {
        name = path.basename(entryFile).replace(".ts", "");
    }
    var target = args.target;
    if (target === "debug" && !hasTarget(config, "debug")) {
        ascArgv.push("--debug");
    }
    else if (target === "release" && !hasTarget(config, "release")) {
        ascArgv.push("--optimizeLevel", "3");
        ascArgv.push("--shrinkLevel", "3");
    }
    if (!((_a = ascArgs.options) === null || _a === void 0 ? void 0 : _a.target)) {
        ascArgv.push("--target", target);
    }
    else {
        target = ascArgs.options.target;
    }
    var outDir = args.outDir ? args.outDir : config.outDir || "./build";
    outDir = path.join(baseDir, outDir, target);
    var watFile = path.relative(baseDir, path.join(outDir, name + ".wat"));
    var wasmFile = path.relative(baseDir, path.join(outDir, name + ".wasm"));
    if (args.wat && !(hasOutput(ascArgv, ".wat") || ((_b = config.options) === null || _b === void 0 ? void 0 : _b.textFile))) {
        ascArgv.push("--textFile", watFile);
    }
    if (args.outDir || !containsOutput(config, target, ascArgv)) {
        ascArgv.push("--binaryFile", wasmFile);
    }
    if (args.verbose) {
        utils_1.log(__spreadArrays(["asc"], ascArgv).join(" "));
    }
    asc.main(ascArgv, options, cb);
}
function hasOutput(ascArgv, suffix) {
    return ascArgv.some(function (s) { return s.endsWith(suffix); });
}
function containsOutput(config, target, ascArgv) {
    var _a, _b;
    if (hasOutput(ascArgv, ".wasm"))
        return true;
    if ((_a = config.options) === null || _a === void 0 ? void 0 : _a.binaryFile)
        return true;
    if (config.targets && ((_b = config.targets[target]) === null || _b === void 0 ? void 0 : _b.binaryFile))
        return true;
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvYnVpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBNkI7QUFDN0IsMERBQThDO0FBQzlDLDBFQUE4RDtBQUM5RCxxQ0FBeUI7QUFDekIsa0NBQTBFO0FBVzFFLElBQU0sYUFBYSxHQUFHLCtIQUkrQixDQUFDO0FBRXRELFNBQWdCLGVBQWUsQ0FBQyxDQUFhO0lBQzNDLE9BQU8sQ0FBQztTQUNMLE1BQU0sQ0FBQyxTQUFTLEVBQUU7UUFDakIsS0FBSyxFQUFFLEdBQUc7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSw0QkFBNEI7UUFDekMsT0FBTyxFQUFFLEdBQUc7S0FDYixDQUFDO1NBQ0QsTUFBTSxDQUFDLFFBQVEsRUFBRTtRQUNoQixLQUFLLEVBQUUsR0FBRztRQUNWLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLHVCQUF1QjtRQUNwQyxPQUFPLEVBQUUsaUJBQWlCO0tBQzNCLENBQUM7U0FDRCxNQUFNLENBQUMsS0FBSyxFQUFFO1FBQ2IsV0FBVyxFQUFFLDJCQUEyQjtRQUN4QyxPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRSxJQUFJO0tBQ2QsQ0FBQztTQUNELE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFDaEIsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQ1QsZ0VBQWdFO0tBQ25FLENBQUM7U0FDRCxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQ2hCLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLHdCQUF3QjtRQUNyQyxPQUFPLEVBQUUsU0FBUztLQUNuQixDQUFDO1NBQ0QsTUFBTSxDQUFDLFNBQVMsRUFBRTtRQUNqQixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxLQUFLO1FBQ2QsV0FBVyxFQUFFLG1DQUFtQztLQUNqRCxDQUFDLENBQUM7QUFDUCxDQUFDO0FBbENELDBDQWtDQztBQUVZLFFBQUEsUUFBUSxHQUF3QjtJQUMzQyxPQUFPLEVBQUUsT0FBTztJQUNoQixRQUFRLEVBQUUscURBQXFEO0lBQy9ELE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUM7SUFDNUIsT0FBTyxFQUFFLFVBQUMsQ0FBQztRQUNULE9BQUEsZUFBZSxDQUFDLENBQUMsQ0FBQzthQUNmLEtBQUssQ0FBQyxhQUFhLENBQUM7YUFDcEIsT0FBTyxDQUNOLFdBQVcsRUFDWCx1RUFBdUUsQ0FDeEU7YUFDQSxPQUFPLENBQUMsNEJBQTRCLEVBQUUsd0JBQXdCLENBQUM7YUFDL0QsT0FBTyxDQUFDLHdCQUF3QixFQUFFLHdCQUF3QixDQUFDO0lBUDlELENBTzhEO0lBQ2hFLE9BQU8sRUFBRSxVQUFDLElBQUk7UUFDWixJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBVyxDQUFDLEVBQUU7WUFDakUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEM7UUFDRCxJQUFNLE9BQU8sR0FBRywyQkFBbUIsRUFBRSxDQUFDO1FBQ3RDLElBQU0sUUFBUSxHQUFHLDRCQUFvQixFQUFFLENBQUM7UUFDeEMsSUFBTSxTQUFTLEdBQUksSUFBNkIsQ0FBQztRQUNqRCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFhLENBQUM7UUFDaEMsSUFBQSxLQUF3QixRQUFRLENBQUMsU0FBUyxDQUFDLEVBQTFDLE9BQU8sUUFBQSxFQUFFLFVBQVUsUUFBdUIsQ0FBQztRQUNsRCxJQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckMsSUFBTSxNQUFNLEdBQ1YsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUNyQixJQUFJLENBQUMsQ0FBTSxNQUFNLENBQUMsVUFBVSxZQUFZLEtBQUssQ0FBQyxFQUFFO2dCQUM5QyxXQUFHLENBQUMsc0RBQXNELEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2xFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakI7WUFDRCxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBc0IsQ0FBQztZQUNqRCxLQUFzQixVQUFVLEVBQVYseUJBQVUsRUFBVix3QkFBVSxFQUFWLElBQVUsRUFBRTtnQkFBN0IsSUFBSSxTQUFTLG1CQUFBO2dCQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUM3QyxjQUFjLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ2hFO1NBQ0Y7YUFBTTtZQUNMLGNBQWMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN2RDtJQUNILENBQUM7Q0FDRixDQUFDO0FBRUYsU0FBUyxRQUFRLENBQUMsSUFBZTtJQUMvQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzNCLE9BQU8sR0FBRyxPQUFPLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNuRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQy9ELE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVELElBQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUUxQixTQUFTLFNBQVMsQ0FBQyxVQUFrQjtJQUNuQyxJQUFJO1FBQ0YsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDNUI7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sY0FBYyxDQUFDO0tBQ3ZCO0FBQ0gsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLElBQVk7SUFDL0IsSUFBSTtRQUNGLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RCO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0FBQ0gsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLE1BQVcsRUFBRSxNQUFjO0lBQzVDLE9BQU8sTUFBTSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRCxhQUFhO0FBQ2IsU0FBUyxjQUFjLENBQ3JCLElBQWUsRUFDZixPQUFpQixFQUNqQixPQUF1QixFQUN2QixFQUF1Qjs7SUFFakIsSUFBQSxLQUF3QixRQUFRLENBQUMsSUFBSSxDQUFDLEVBQXJDLE9BQU8sUUFBQSxFQUFFLFVBQVUsUUFBa0IsQ0FBQztJQUM3QyxJQUFJLE1BQU0sR0FBUSxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFeEMsSUFBSSxNQUFNLEtBQUssY0FBYyxFQUFFO1FBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsSUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsSUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5RCxJQUFJLFNBQWlCLENBQUM7SUFDdEIsUUFBUSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtRQUNoQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ04sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQ25CLE9BQU8sRUFDUCxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUNsRCxDQUFDO1lBQ0YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzQixNQUFNO1NBQ1A7UUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ04sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTTtTQUNQO1FBQ0QsT0FBTyxDQUFDLENBQUM7WUFDUCxXQUFHLENBQUMseUNBQXlDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqQjtLQUNGO0lBRUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDN0IsV0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBYyxTQUFTLG1CQUFnQixDQUFDLENBQUM7S0FDMUQ7SUFFRCxJQUFJLElBQVksQ0FBQztJQUNqQixJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDbEMsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQ3BCLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1NBQ3pCO2FBQU07WUFDTCxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDOUM7S0FDRjtTQUFNO1FBQ0wsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztLQUNwRDtJQUVELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDekIsSUFBSSxNQUFNLEtBQUssT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRTtRQUNyRCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3pCO1NBQU0sSUFBSSxNQUFNLEtBQUssU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsRUFBRTtRQUNoRSxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsSUFBSSxRQUFDLE9BQU8sQ0FBQyxPQUFPLDBDQUFFLE1BQU0sQ0FBQSxFQUFFO1FBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2xDO1NBQU07UUFDTCxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFnQixDQUFDO0tBQzNDO0lBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUM7SUFDcEUsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM1QyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN6RSxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUUzRSxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFdBQUksTUFBTSxDQUFDLE9BQU8sMENBQUUsUUFBUSxDQUFBLENBQUMsRUFBRTtRQUN6RSxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNyQztJQUNELElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1FBQzNELE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ3hDO0lBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ2hCLFdBQUcsQ0FBQyxnQkFBQyxLQUFLLEdBQUssT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3BDO0lBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxPQUFpQixFQUFFLE1BQWM7SUFDbEQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxTQUFTLGNBQWMsQ0FDckIsTUFBVyxFQUNYLE1BQWMsRUFDZCxPQUFpQjs7SUFFakIsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQzdDLFVBQUksTUFBTSxDQUFDLE9BQU8sMENBQUUsVUFBVTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQzVDLElBQUksTUFBTSxDQUFDLE9BQU8sV0FBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxVQUFVLENBQUE7UUFBRSxPQUFPLElBQUksQ0FBQztJQUN0RSxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB5YXJncyBmcm9tIFwieWFyZ3NcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIGFzYyBmcm9tIFwiYXNzZW1ibHlzY3JpcHQvY2xpL2FzY1wiO1xuaW1wb3J0ICogYXMgYXNjT3B0aW9ucyBmcm9tIFwiYXNzZW1ibHlzY3JpcHQvY2xpL3V0aWwvb3B0aW9uc1wiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBnZXRHbG9iYWxBc2NPcHRpb25zLCBnZXRHbG9iYWxDbGlDYWxsYmFjaywgbG9nIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmludGVyZmFjZSBCdWlsZEFyZ3Mge1xuICBiYXNlRGlyOiBzdHJpbmc7XG4gIGNvbmZpZzogc3RyaW5nO1xuICB3YXQ6IGJvb2xlYW47XG4gIG91dERpcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICB0YXJnZXQ6IHN0cmluZztcbiAgdmVyYm9zZTogYm9vbGVhbjtcbn1cblxuY29uc3QgYnVpbGRDbWRVc2FnZSA9IGAkMCBidWlsZFxuQ29tcGlsZSBhIGxvY2FsIHBhY2thZ2UgYW5kIGFsbCBvZiBpdHMgZGVwZW5kZW5jaWVzXG5cblVTQUdFOlxuICAgICQwIGJ1aWxkIFtlbnRyeV9maWxlXSBbb3B0aW9uc10gLS0gW2FzY19vcHRpb25zXWA7XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZENtZEJ1aWxkZXIoeTogeWFyZ3MuQXJndikge1xuICByZXR1cm4geVxuICAgIC5vcHRpb24oXCJiYXNlRGlyXCIsIHtcbiAgICAgIGFsaWFzOiBcImRcIixcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJCYXNlIGRpcmVjdG9yeSBvZiBwcm9qZWN0LlwiLFxuICAgICAgZGVmYXVsdDogXCIuXCIsXG4gICAgfSlcbiAgICAub3B0aW9uKFwiY29uZmlnXCIsIHtcbiAgICAgIGFsaWFzOiBcImNcIixcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIGFzY29uZmlnIGZpbGVcIixcbiAgICAgIGRlZmF1bHQ6IFwiLi9hc2NvbmZpZy5qc29uXCIsXG4gICAgfSlcbiAgICAub3B0aW9uKFwid2F0XCIsIHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIk91dHB1dCB3YXQgZmlsZSB0byBvdXREaXJcIixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgYm9vbGVhbjogdHJ1ZSxcbiAgICB9KVxuICAgIC5vcHRpb24oXCJvdXREaXJcIiwge1xuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAnRGlyZWN0b3J5IHRvIHBsYWNlIGJ1aWx0IGJpbmFyaWVzLiBEZWZhdWx0IFwiLi9idWlsZC88dGFyZ2V0Pi9cIicsXG4gICAgfSlcbiAgICAub3B0aW9uKFwidGFyZ2V0XCIsIHtcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJUYXJnZXQgZm9yIGNvbXBpbGF0aW9uXCIsXG4gICAgICBkZWZhdWx0OiBcInJlbGVhc2VcIixcbiAgICB9KVxuICAgIC5vcHRpb24oXCJ2ZXJib3NlXCIsIHtcbiAgICAgIGJvb2xlYW46IHRydWUsXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlByaW50IG91dCBhcmd1bWVudHMgcGFzc2VkIHRvIGFzY1wiLFxuICAgIH0pO1xufVxuXG5leHBvcnQgY29uc3QgQnVpbGRDbWQ6IHlhcmdzLkNvbW1hbmRNb2R1bGUgPSB7XG4gIGNvbW1hbmQ6IFwiYnVpbGRcIixcbiAgZGVzY3JpYmU6IFwiQ29tcGlsZSBhIGxvY2FsIHBhY2thZ2UgYW5kIGFsbCBvZiBpdHMgZGVwZW5kZW5jaWVzXCIsXG4gIGFsaWFzZXM6IFtcImNvbXBpbGVcIiwgXCJtYWtlXCJdLFxuICBidWlsZGVyOiAoeSkgPT5cbiAgICBidWlsZENtZEJ1aWxkZXIoeSlcbiAgICAgIC51c2FnZShidWlsZENtZFVzYWdlKVxuICAgICAgLmV4YW1wbGUoXG4gICAgICAgIFwiYXNiIGJ1aWxkXCIsXG4gICAgICAgIFwiQnVpbGQgcmVsZWFzZSBvZiAnYXNzZW1ibHkvaW5kZXgudHMgdG8gYnVpbGQvcmVsZWFzZS9wYWNrYWdlTmFtZS53YXNtXCJcbiAgICAgIClcbiAgICAgIC5leGFtcGxlKFwiYXNiIGJ1aWxkIC0tdGFyZ2V0IHJlbGVhc2VcIiwgXCJCdWlsZCBhIHJlbGVhc2UgYmluYXJ5XCIpXG4gICAgICAuZXhhbXBsZShcImFzYiBidWlsZCAtLSAtLW1lYXN1cmVcIiwgXCJQYXNzIGFyZ3VtZW50IHRvICdhc2MnXCIpLFxuICBoYW5kbGVyOiAoYXJncykgPT4ge1xuICAgIGlmIChbXCJidWlsZFwiLCBcIm1ha2VcIiwgXCJjb21waWxlXCJdLmluY2x1ZGVzKGFyZ3NbXCJfXCJdWzBdIGFzIHN0cmluZykpIHtcbiAgICAgIGFyZ3NbXCJfXCJdID0gYXJnc1tcIl9cIl0uc2xpY2UoMSk7XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbnMgPSBnZXRHbG9iYWxBc2NPcHRpb25zKCk7XG4gICAgY29uc3QgY2FsbGJhY2sgPSBnZXRHbG9iYWxDbGlDYWxsYmFjaygpO1xuICAgIGNvbnN0IGJ1aWxkQXJncyA9IChhcmdzIGFzIHVua25vd24pIGFzIEJ1aWxkQXJncztcbiAgICBjb25zdCBhc2NBcmd2ID0gYXJnc1tcIl9cIl0gYXMgc3RyaW5nW107XG4gICAgY29uc3QgW2Jhc2VEaXIsIGNvbmZpZ1BhdGhdID0gZ2V0U2V0dXAoYnVpbGRBcmdzKTtcbiAgICBjb25zdCBjb25maWcgPSBnZXRDb25maWcoY29uZmlnUGF0aCk7XG4gICAgY29uc3Qgb3V0RGlyID1cbiAgICAgIGFyZ3Mub3V0RGlyIHx8IGNvbmZpZy5vdXREaXIgfHwgcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwiLi9idWlsZFwiKTtcbiAgICBpZiAoY29uZmlnLndvcmtzcGFjZXMpIHtcbiAgICAgIGlmICghKDxhbnk+Y29uZmlnLndvcmtzcGFjZXMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgbG9nKFwiSW52YWxpZCB3b3Jrc3BhY2UgY29uZmlndXJhdGlvbi4gU2hvdWxkIGJlIGFuIGFycmF5LlwiLCB0cnVlKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgfVxuICAgICAgY29uc3Qgd29ya3NwYWNlcyA9IGNvbmZpZy53b3Jrc3BhY2VzIGFzIHN0cmluZ1tdO1xuICAgICAgZm9yIChsZXQgd29ya3NwYWNlIG9mIHdvcmtzcGFjZXMpIHtcbiAgICAgICAgYXJncy5iYXNlRGlyID0gcGF0aC5qb2luKGJhc2VEaXIsIHdvcmtzcGFjZSk7XG4gICAgICAgIGFyZ3Mub3V0RGlyID0gcGF0aC5yZWxhdGl2ZShiYXNlRGlyLCBvdXREaXIpO1xuICAgICAgICBjb21waWxlUHJvamVjdChidWlsZEFyZ3MsIGFzY0FyZ3Yuc2xpY2UoMCksIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29tcGlsZVByb2plY3QoYnVpbGRBcmdzLCBhc2NBcmd2LCBvcHRpb25zLCBjYWxsYmFjayk7XG4gICAgfVxuICB9LFxufTtcblxuZnVuY3Rpb24gZ2V0U2V0dXAoYXJnczogQnVpbGRBcmdzKTogW3N0cmluZywgc3RyaW5nXSB7XG4gIGxldCBiYXNlRGlyID0gYXJncy5iYXNlRGlyO1xuICBiYXNlRGlyID0gYmFzZURpciA9PSBcIi5cIiA/IHByb2Nlc3MuY3dkKCkgOiBiYXNlRGlyO1xuICBsZXQgY29uZmlnUGF0aCA9IHBhdGgucmVzb2x2ZShwYXRoLmpvaW4oYmFzZURpciwgYXJncy5jb25maWcpKTtcbiAgcmV0dXJuIFtiYXNlRGlyLCBjb25maWdQYXRoXTtcbn1cblxuY29uc3QgREVGQVVMVF9DT05GSUcgPSB7fTtcblxuZnVuY3Rpb24gZ2V0Q29uZmlnKGNvbmZpZ1BhdGg6IHN0cmluZyk6IGFueSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoY29uZmlnUGF0aCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIERFRkFVTFRfQ09ORklHO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNhZmVSZXF1aXJlKHBhdGg6IHN0cmluZyk6IGFueSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHJlcXVpcmUocGF0aCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhc1RhcmdldChjb25maWc6IGFueSwgdGFyZ2V0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGNvbmZpZy50YXJnZXRzICYmIGNvbmZpZy50YXJnZXRzW3RhcmdldF07XG59XG5cbi8vIEB0cy1pZ25vcmVcbmZ1bmN0aW9uIGNvbXBpbGVQcm9qZWN0KFxuICBhcmdzOiBCdWlsZEFyZ3MsXG4gIGFzY0FyZ3Y6IHN0cmluZ1tdLFxuICBvcHRpb25zOiBhc2MuQVBJT3B0aW9ucyxcbiAgY2I/OiAoYTogYW55KSA9PiBudW1iZXJcbik6IHZvaWQge1xuICBjb25zdCBbYmFzZURpciwgY29uZmlnUGF0aF0gPSBnZXRTZXR1cChhcmdzKTtcbiAgbGV0IGNvbmZpZzogYW55ID0gZ2V0Q29uZmlnKGNvbmZpZ1BhdGgpO1xuXG4gIGlmIChjb25maWcgIT09IERFRkFVTFRfQ09ORklHKSB7XG4gICAgYXNjQXJndi5wdXNoKFwiLS1jb25maWdcIiwgY29uZmlnUGF0aCk7XG4gIH1cblxuICBjb25zdCBwYWNrYWdlSnNvbiA9IHNhZmVSZXF1aXJlKHBhdGguam9pbihiYXNlRGlyLCBcInBhY2thZ2UuanNvblwiKSk7XG4gIGNvbnN0IGFzY0FyZ3MgPSBhc2NPcHRpb25zLnBhcnNlKGFzY0FyZ3YsIGFzYy5vcHRpb25zLCBmYWxzZSk7XG4gIGxldCBlbnRyeUZpbGU6IHN0cmluZztcbiAgc3dpdGNoIChhc2NBcmdzLmFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHtcbiAgICAgIGVudHJ5RmlsZSA9IHBhdGguam9pbihcbiAgICAgICAgYmFzZURpcixcbiAgICAgICAgY29uZmlnLmVudHJ5IHx8IHBhdGguam9pbihcImFzc2VtYmx5XCIsIFwiaW5kZXgudHNcIilcbiAgICAgICk7XG4gICAgICBhc2NBcmd2LnVuc2hpZnQoZW50cnlGaWxlKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIDE6IHtcbiAgICAgIGVudHJ5RmlsZSA9IGFzY0FyZ3MuYXJndW1lbnRzWzBdO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIGxvZyhcIkNhbm5vdCBjb21waWxlIHR3byBlbnRyeSBmaWxlcyBhdCBvbmNlLlwiLCB0cnVlKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWZzLmV4aXN0c1N5bmMoZW50cnlGaWxlKSkge1xuICAgIGxvZyhhcmdzKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEVudHJ5IGZpbGUgJHtlbnRyeUZpbGV9IGRvZXNuJ3QgZXhpc3RgKTtcbiAgfVxuXG4gIGxldCBuYW1lOiBzdHJpbmc7XG4gIGlmIChlbnRyeUZpbGUuZW5kc1dpdGgoXCJpbmRleC50c1wiKSkge1xuICAgIGlmIChwYWNrYWdlSnNvbi5uYW1lKSB7XG4gICAgICBuYW1lID0gcGFja2FnZUpzb24ubmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmFtZSA9IHBhdGguYmFzZW5hbWUocGF0aC5iYXNlbmFtZShiYXNlRGlyKSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG5hbWUgPSBwYXRoLmJhc2VuYW1lKGVudHJ5RmlsZSkucmVwbGFjZShcIi50c1wiLCBcIlwiKTtcbiAgfVxuXG4gIGxldCB0YXJnZXQgPSBhcmdzLnRhcmdldDtcbiAgaWYgKHRhcmdldCA9PT0gXCJkZWJ1Z1wiICYmICFoYXNUYXJnZXQoY29uZmlnLCBcImRlYnVnXCIpKSB7XG4gICAgYXNjQXJndi5wdXNoKFwiLS1kZWJ1Z1wiKTtcbiAgfSBlbHNlIGlmICh0YXJnZXQgPT09IFwicmVsZWFzZVwiICYmICFoYXNUYXJnZXQoY29uZmlnLCBcInJlbGVhc2VcIikpIHtcbiAgICBhc2NBcmd2LnB1c2goXCItLW9wdGltaXplTGV2ZWxcIiwgXCIzXCIpO1xuICAgIGFzY0FyZ3YucHVzaChcIi0tc2hyaW5rTGV2ZWxcIiwgXCIzXCIpO1xuICB9XG5cbiAgaWYgKCFhc2NBcmdzLm9wdGlvbnM/LnRhcmdldCkge1xuICAgIGFzY0FyZ3YucHVzaChcIi0tdGFyZ2V0XCIsIHRhcmdldCk7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0ID0gYXNjQXJncy5vcHRpb25zLnRhcmdldCBhcyBzdHJpbmc7XG4gIH1cblxuICBsZXQgb3V0RGlyID0gYXJncy5vdXREaXIgPyBhcmdzLm91dERpciA6IGNvbmZpZy5vdXREaXIgfHwgXCIuL2J1aWxkXCI7XG4gIG91dERpciA9IHBhdGguam9pbihiYXNlRGlyLCBvdXREaXIsIHRhcmdldCk7XG4gIGNvbnN0IHdhdEZpbGUgPSBwYXRoLnJlbGF0aXZlKGJhc2VEaXIsIHBhdGguam9pbihvdXREaXIsIG5hbWUgKyBcIi53YXRcIikpO1xuICBjb25zdCB3YXNtRmlsZSA9IHBhdGgucmVsYXRpdmUoYmFzZURpciwgcGF0aC5qb2luKG91dERpciwgbmFtZSArIFwiLndhc21cIikpO1xuXG4gIGlmIChhcmdzLndhdCAmJiAhKGhhc091dHB1dChhc2NBcmd2LCBcIi53YXRcIikgfHwgY29uZmlnLm9wdGlvbnM/LnRleHRGaWxlKSkge1xuICAgIGFzY0FyZ3YucHVzaChcIi0tdGV4dEZpbGVcIiwgd2F0RmlsZSk7XG4gIH1cbiAgaWYgKGFyZ3Mub3V0RGlyIHx8ICFjb250YWluc091dHB1dChjb25maWcsIHRhcmdldCwgYXNjQXJndikpIHtcbiAgICBhc2NBcmd2LnB1c2goXCItLWJpbmFyeUZpbGVcIiwgd2FzbUZpbGUpO1xuICB9XG5cbiAgaWYgKGFyZ3MudmVyYm9zZSkge1xuICAgIGxvZyhbXCJhc2NcIiwgLi4uYXNjQXJndl0uam9pbihcIiBcIikpO1xuICB9XG4gIGFzYy5tYWluKGFzY0FyZ3YsIG9wdGlvbnMsIGNiKTtcbn1cblxuZnVuY3Rpb24gaGFzT3V0cHV0KGFzY0FyZ3Y6IHN0cmluZ1tdLCBzdWZmaXg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gYXNjQXJndi5zb21lKChzKSA9PiBzLmVuZHNXaXRoKHN1ZmZpeCkpO1xufVxuXG5mdW5jdGlvbiBjb250YWluc091dHB1dChcbiAgY29uZmlnOiBhbnksXG4gIHRhcmdldDogc3RyaW5nLFxuICBhc2NBcmd2OiBzdHJpbmdbXVxuKTogYm9vbGVhbiB7XG4gIGlmIChoYXNPdXRwdXQoYXNjQXJndiwgXCIud2FzbVwiKSkgcmV0dXJuIHRydWU7XG4gIGlmIChjb25maWcub3B0aW9ucz8uYmluYXJ5RmlsZSkgcmV0dXJuIHRydWU7XG4gIGlmIChjb25maWcudGFyZ2V0cyAmJiBjb25maWcudGFyZ2V0c1t0YXJnZXRdPy5iaW5hcnlGaWxlKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufVxuIl19