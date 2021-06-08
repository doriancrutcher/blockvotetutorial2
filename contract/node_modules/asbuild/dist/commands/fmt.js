"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initConfig = exports.FmtCmd = exports.fmtCmdBuilder = void 0;
var path = __importStar(require("path"));
var eslintConfig_1 = require("./init/files/eslintConfig");
var interfaces_1 = require("./init/interfaces");
var chalk_1 = __importDefault(require("chalk"));
var packageJson_1 = require("./init/files/packageJson");
var eslint_1 = require("eslint");
var utils_1 = require("../utils");
// TODO:
// - Support more eslint options, like '--max-warnings`,
//   (Much of these can be ported from eslint's `cli.js`)
exports.fmtCmdBuilder = function (y) {
    return y
        .positional("paths", {
        description: "Paths to format",
        default: ["."],
    })
        .option("init", {
        description: "Generates recommended eslint config for AS Projects",
        boolean: true,
        group: "Initialisation:",
    })
        .option("lint", {
        alias: ["dry-run"],
        boolean: true,
        default: false,
        description: "Tries to fix problems without saving the changes to the file system",
        group: "Miscellaneous",
    });
};
exports.FmtCmd = {
    command: "fmt [paths..]",
    describe: "This utility formats current module using eslint.",
    aliases: ["format", "lint"],
    builder: function (y) {
        return exports.fmtCmdBuilder(y).onFinishCommand(function (code) { return process.exit(code); });
    },
    handler: function (args) { return __awaiter(void 0, void 0, void 0, function () {
        var retCode, files, engine, results, formatter, resultText, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (args.init) {
                        return [2 /*return*/, initConfig(process.cwd())];
                    }
                    retCode = 0;
                    files = args.paths;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    engine = new eslint_1.ESLint({
                        extensions: ["ts"],
                        fix: true,
                    });
                    return [4 /*yield*/, engine.lintFiles(files)];
                case 2:
                    results = _a.sent();
                    if (!!args.dryRun) return [3 /*break*/, 4];
                    // fix files in place
                    return [4 /*yield*/, eslint_1.ESLint.outputFixes(results)];
                case 3:
                    // fix files in place
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, engine.loadFormatter("stylish")];
                case 5:
                    formatter = _a.sent();
                    resultText = formatter.format(results);
                    utils_1.log(resultText);
                    utils_1.log(chalk_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["{bold.green Done!}"], ["{bold.green Done!}"]))));
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    utils_1.log(chalk_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["{bold.bgRedBright ERROR:} Unexpected Error while running ESlint on given files."], ["{bold.bgRedBright ERROR:} Unexpected Error while running ESlint on given files."]))), true);
                    utils_1.log(error_1, true);
                    retCode = 1;
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/, retCode];
            }
        });
    }); },
};
function initConfig(baseDir) {
    // write the config file
    var dir = path.resolve(baseDir);
    var eslintFile = new eslintConfig_1.EslintConfigFile();
    var res = interfaces_1.InitResult.CREATED;
    utils_1.log(chalk_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["Writing {cyan ", "} ..."], ["Writing {cyan ", "} ..."])), eslintFile.getRelativePath(dir)));
    switch (eslintFile.write(dir)) {
        case interfaces_1.InitResult.EXISTS:
            res = interfaces_1.InitResult.EXISTS;
            utils_1.log(chalk_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["File {bold.cyan ", "} already exists."], ["File {bold.cyan ",
                "} already exists."])), eslintFile.getRelativePath(dir)));
            break;
        case interfaces_1.InitResult.CREATED:
            utils_1.log([
                chalk_1.default(templateObject_5 || (templateObject_5 = __makeTemplateObject(["{bold.green Created:} ", ""], ["{bold.green Created:} ", ""])), eslintFile.path),
                "",
                chalk_1.default(templateObject_6 || (templateObject_6 = __makeTemplateObject(["{bold.green Done!}"], ["{bold.green Done!}"]))),
                chalk_1.default(templateObject_7 || (templateObject_7 = __makeTemplateObject([""], [""]))),
                chalk_1.default(templateObject_8 || (templateObject_8 = __makeTemplateObject(["Don't forget to install 'eslint' and it's plugins before you start:"], ["Don't forget to install 'eslint' and it's plugins before you start:"]))),
                "",
                chalk_1.default(templateObject_9 || (templateObject_9 = __makeTemplateObject(["  ", " eslint"], ["  ", " eslint"])), packageJson_1.getPmCommands().pkgInstall),
                chalk_1.default(templateObject_10 || (templateObject_10 = __makeTemplateObject(["  ", " @typescript-eslint/parser"], ["  ", " @typescript-eslint/parser"])), packageJson_1.getPmCommands().pkgInstall),
                chalk_1.default(templateObject_11 || (templateObject_11 = __makeTemplateObject(["  ", " @typescript-eslint/eslint-plugin"], ["  ",
                    " @typescript-eslint/eslint-plugin"])), packageJson_1.getPmCommands().pkgInstall),
                "",
                chalk_1.default(templateObject_12 || (templateObject_12 = __makeTemplateObject(["Have a nice day !"], ["Have a nice day !"]))),
            ].join("\n"));
            break;
        default:
            break;
    }
    return res;
}
exports.initConfig = initConfig;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm10LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2ZtdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUE2QjtBQUM3QiwwREFBNkQ7QUFDN0QsZ0RBQStDO0FBQy9DLGdEQUEwQjtBQUMxQix3REFBeUQ7QUFDekQsaUNBQWdDO0FBQ2hDLGtDQUErQjtBQUUvQixRQUFRO0FBQ1Isd0RBQXdEO0FBQ3hELHlEQUF5RDtBQUU1QyxRQUFBLGFBQWEsR0FBRyxVQUFDLENBQWE7SUFDekMsT0FBQSxDQUFDO1NBQ0UsVUFBVSxDQUFDLE9BQU8sRUFBRTtRQUNuQixXQUFXLEVBQUUsaUJBQWlCO1FBQzlCLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQztLQUNmLENBQUM7U0FDRCxNQUFNLENBQUMsTUFBTSxFQUFFO1FBQ2QsV0FBVyxFQUFFLHFEQUFxRDtRQUNsRSxPQUFPLEVBQUUsSUFBSTtRQUNiLEtBQUssRUFBRSxpQkFBaUI7S0FDekIsQ0FBQztTQUNELE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDZCxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDbEIsT0FBTyxFQUFFLElBQUk7UUFDYixPQUFPLEVBQUUsS0FBSztRQUNkLFdBQVcsRUFDVCxxRUFBcUU7UUFDdkUsS0FBSyxFQUFFLGVBQWU7S0FDdkIsQ0FBQztBQWpCSixDQWlCSSxDQUFDO0FBRU0sUUFBQSxNQUFNLEdBQXdCO0lBQ3pDLE9BQU8sRUFBRSxlQUFlO0lBQ3hCLFFBQVEsRUFBRSxtREFBbUQ7SUFDN0QsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztJQUMzQixPQUFPLEVBQUUsVUFBQyxDQUFDO1FBQ1QsT0FBQSxxQkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxVQUFDLElBQVksSUFBSyxPQUFB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Q0YsZUFBSyx3RkFBQSxtQkFBbUI7YUFDekIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2IsQ0FBQztZQUNGLE1BQU07UUFFUjtZQUNFLE1BQU07S0FDVDtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQXhDRCxnQ0F3Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB5YXJncyBmcm9tIFwieWFyZ3NcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IEVzbGludENvbmZpZ0ZpbGUgfSBmcm9tIFwiLi9pbml0L2ZpbGVzL2VzbGludENvbmZpZ1wiO1xuaW1wb3J0IHsgSW5pdFJlc3VsdCB9IGZyb20gXCIuL2luaXQvaW50ZXJmYWNlc1wiO1xuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuaW1wb3J0IHsgZ2V0UG1Db21tYW5kcyB9IGZyb20gXCIuL2luaXQvZmlsZXMvcGFja2FnZUpzb25cIjtcbmltcG9ydCB7IEVTTGludCB9IGZyb20gXCJlc2xpbnRcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi91dGlsc1wiO1xuXG4vLyBUT0RPOlxuLy8gLSBTdXBwb3J0IG1vcmUgZXNsaW50IG9wdGlvbnMsIGxpa2UgJy0tbWF4LXdhcm5pbmdzYCxcbi8vICAgKE11Y2ggb2YgdGhlc2UgY2FuIGJlIHBvcnRlZCBmcm9tIGVzbGludCdzIGBjbGkuanNgKVxuXG5leHBvcnQgY29uc3QgZm10Q21kQnVpbGRlciA9ICh5OiB5YXJncy5Bcmd2KSA9PlxuICB5XG4gICAgLnBvc2l0aW9uYWwoXCJwYXRoc1wiLCB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJQYXRocyB0byBmb3JtYXRcIixcbiAgICAgIGRlZmF1bHQ6IFtcIi5cIl0sXG4gICAgfSlcbiAgICAub3B0aW9uKFwiaW5pdFwiLCB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJHZW5lcmF0ZXMgcmVjb21tZW5kZWQgZXNsaW50IGNvbmZpZyBmb3IgQVMgUHJvamVjdHNcIixcbiAgICAgIGJvb2xlYW46IHRydWUsXG4gICAgICBncm91cDogXCJJbml0aWFsaXNhdGlvbjpcIixcbiAgICB9KVxuICAgIC5vcHRpb24oXCJsaW50XCIsIHtcbiAgICAgIGFsaWFzOiBbXCJkcnktcnVuXCJdLFxuICAgICAgYm9vbGVhbjogdHJ1ZSxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgIFwiVHJpZXMgdG8gZml4IHByb2JsZW1zIHdpdGhvdXQgc2F2aW5nIHRoZSBjaGFuZ2VzIHRvIHRoZSBmaWxlIHN5c3RlbVwiLFxuICAgICAgZ3JvdXA6IFwiTWlzY2VsbGFuZW91c1wiLFxuICAgIH0pO1xuXG5leHBvcnQgY29uc3QgRm10Q21kOiB5YXJncy5Db21tYW5kTW9kdWxlID0ge1xuICBjb21tYW5kOiBcImZtdCBbcGF0aHMuLl1cIixcbiAgZGVzY3JpYmU6IFwiVGhpcyB1dGlsaXR5IGZvcm1hdHMgY3VycmVudCBtb2R1bGUgdXNpbmcgZXNsaW50LlwiLFxuICBhbGlhc2VzOiBbXCJmb3JtYXRcIiwgXCJsaW50XCJdLFxuICBidWlsZGVyOiAoeSkgPT5cbiAgICBmbXRDbWRCdWlsZGVyKHkpLm9uRmluaXNoQ29tbWFuZCgoY29kZTogbnVtYmVyKSA9PiBwcm9jZXNzLmV4aXQoY29kZSkpLFxuICBoYW5kbGVyOiBhc3luYyAoYXJncyk6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gICAgaWYgKGFyZ3MuaW5pdCkge1xuICAgICAgcmV0dXJuIGluaXRDb25maWcocHJvY2Vzcy5jd2QoKSkgYXMgbnVtYmVyO1xuICAgIH1cblxuICAgIGxldCByZXRDb2RlID0gMDtcbiAgICBjb25zdCBmaWxlcyA9IGFyZ3MucGF0aHMgYXMgc3RyaW5nW107XG5cbiAgICB0cnkge1xuICAgICAgLy8gY3JlYXRlIEVTTGludCBlbmdpbmVcbiAgICAgIGNvbnN0IGVuZ2luZSA9IG5ldyBFU0xpbnQoe1xuICAgICAgICBleHRlbnNpb25zOiBbXCJ0c1wiXSxcbiAgICAgICAgZml4OiB0cnVlLFxuICAgICAgfSk7XG4gICAgICAvLyBnZW5lcmF0ZSBsaW50IHJlc3VsdHNcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBlbmdpbmUubGludEZpbGVzKGZpbGVzKTtcbiAgICAgIGlmICghYXJncy5kcnlSdW4pIHtcbiAgICAgICAgLy8gZml4IGZpbGVzIGluIHBsYWNlXG4gICAgICAgIGF3YWl0IEVTTGludC5vdXRwdXRGaXhlcyhyZXN1bHRzKTtcbiAgICAgIH1cbiAgICAgIC8vIGZvcm1hdCB0aGUgcmVzdWx0c1xuICAgICAgY29uc3QgZm9ybWF0dGVyID0gYXdhaXQgZW5naW5lLmxvYWRGb3JtYXR0ZXIoXCJzdHlsaXNoXCIpO1xuICAgICAgY29uc3QgcmVzdWx0VGV4dCA9IGZvcm1hdHRlci5mb3JtYXQocmVzdWx0cyk7XG4gICAgICBsb2cocmVzdWx0VGV4dCk7XG4gICAgICBsb2coY2hhbGtge2JvbGQuZ3JlZW4gRG9uZSF9YCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZyhcbiAgICAgICAgY2hhbGtge2JvbGQuYmdSZWRCcmlnaHQgRVJST1I6fSBVbmV4cGVjdGVkIEVycm9yIHdoaWxlIHJ1bm5pbmcgRVNsaW50IG9uIGdpdmVuIGZpbGVzLmAsXG4gICAgICAgIHRydWVcbiAgICAgICk7XG4gICAgICBsb2coZXJyb3IsIHRydWUpO1xuICAgICAgcmV0Q29kZSA9IDE7XG4gICAgfVxuICAgIHJldHVybiByZXRDb2RlO1xuICB9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRDb25maWcoYmFzZURpcjogc3RyaW5nKTogSW5pdFJlc3VsdCB7XG4gIC8vIHdyaXRlIHRoZSBjb25maWcgZmlsZVxuICBjb25zdCBkaXIgPSBwYXRoLnJlc29sdmUoYmFzZURpcik7XG4gIGNvbnN0IGVzbGludEZpbGUgPSBuZXcgRXNsaW50Q29uZmlnRmlsZSgpO1xuICBsZXQgcmVzID0gSW5pdFJlc3VsdC5DUkVBVEVEO1xuXG4gIGxvZyhjaGFsa2BXcml0aW5nIHtjeWFuICR7ZXNsaW50RmlsZS5nZXRSZWxhdGl2ZVBhdGgoZGlyKX19IC4uLmApO1xuICBzd2l0Y2ggKGVzbGludEZpbGUud3JpdGUoZGlyKSkge1xuICAgIGNhc2UgSW5pdFJlc3VsdC5FWElTVFM6XG4gICAgICByZXMgPSBJbml0UmVzdWx0LkVYSVNUUztcbiAgICAgIGxvZyhcbiAgICAgICAgY2hhbGtgRmlsZSB7Ym9sZC5jeWFuICR7ZXNsaW50RmlsZS5nZXRSZWxhdGl2ZVBhdGgoXG4gICAgICAgICAgZGlyXG4gICAgICAgICl9fSBhbHJlYWR5IGV4aXN0cy5gXG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBJbml0UmVzdWx0LkNSRUFURUQ6XG4gICAgICBsb2coXG4gICAgICAgIFtcbiAgICAgICAgICBjaGFsa2B7Ym9sZC5ncmVlbiBDcmVhdGVkOn0gJHtlc2xpbnRGaWxlLnBhdGh9YCxcbiAgICAgICAgICBgYCxcbiAgICAgICAgICBjaGFsa2B7Ym9sZC5ncmVlbiBEb25lIX1gLFxuICAgICAgICAgIGNoYWxrYGAsXG4gICAgICAgICAgY2hhbGtgRG9uJ3QgZm9yZ2V0IHRvIGluc3RhbGwgJ2VzbGludCcgYW5kIGl0J3MgcGx1Z2lucyBiZWZvcmUgeW91IHN0YXJ0OmAsXG4gICAgICAgICAgYGAsXG4gICAgICAgICAgY2hhbGtgICAke2dldFBtQ29tbWFuZHMoKS5wa2dJbnN0YWxsfSBlc2xpbnRgLFxuICAgICAgICAgIGNoYWxrYCAgJHtnZXRQbUNvbW1hbmRzKCkucGtnSW5zdGFsbH0gQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlcmAsXG4gICAgICAgICAgY2hhbGtgICAke1xuICAgICAgICAgICAgZ2V0UG1Db21tYW5kcygpLnBrZ0luc3RhbGxcbiAgICAgICAgICB9IEB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luYCxcbiAgICAgICAgICBgYCxcbiAgICAgICAgICBjaGFsa2BIYXZlIGEgbmljZSBkYXkgIWAsXG4gICAgICAgIF0uam9pbihcIlxcblwiKVxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4iXX0=