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
exports.RunCmd = void 0;
var fs_1 = __importDefault(require("fs"));
var runCmdUsage = "asb run\nRun a WASI binary\n\nUSAGE:\n    $0 run [options] [binary path] -- [binary options]";
exports.RunCmd = {
    command: "run <binary>",
    describe: "Run a WASI binary",
    builder: function (y) {
        return y
            .usage(runCmdUsage)
            .positional("binary", {
            describe: "path to Wasm binary",
            type: "string",
        })
            .option("preopen", {
            alias: ["p"],
            default: process.cwd(),
            boolean: false,
            description: "comma separated list of directories to open.",
        });
    },
    handler: function (args) { return __awaiter(void 0, void 0, void 0, function () {
        var wasiArgs, WASI, wasi, importObject, wasm, instance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wasiArgs = args["_"].slice(1);
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('wasi')); })];
                case 1:
                    WASI = (_a.sent()).WASI;
                    wasi = new WASI({
                        args: wasiArgs,
                        env: process.env,
                        preopens: {
                            "/": args.preopen,
                        },
                    });
                    importObject = { wasi_snapshot_preview1: wasi.wasiImport };
                    return [4 /*yield*/, WebAssembly.compile(fs_1.default.readFileSync(args.binary))];
                case 2:
                    wasm = _a.sent();
                    return [4 /*yield*/, WebAssembly.instantiate(wasm, importObject)];
                case 3:
                    instance = _a.sent();
                    wasi.start(instance);
                    return [2 /*return*/];
            }
        });
    }); },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3J1bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMENBQW9CO0FBRXBCLElBQU0sV0FBVyxHQUFHLDhGQUltQyxDQUFDO0FBRTNDLFFBQUEsTUFBTSxHQUF3QjtJQUN6QyxPQUFPLEVBQUUsY0FBYztJQUN2QixRQUFRLEVBQUUsbUJBQW1CO0lBQzdCLE9BQU8sRUFBRSxVQUFDLENBQUM7UUFDVCxPQUFBLENBQUM7YUFDRSxLQUFLLENBQUMsV0FBVyxDQUFDO2FBQ2xCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDcEIsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixJQUFJLEVBQUUsUUFBUTtTQUNmLENBQUM7YUFDRCxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ2pCLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNaLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ3RCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsV0FBVyxFQUFFLDhDQUE4QztTQUM1RCxDQUFDO0lBWEosQ0FXSTtJQUNOLE9BQU8sRUFBRSxVQUFPLElBQUk7Ozs7O29CQUNaLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVuQixzRkFBYSxNQUFNLFFBQUM7O29CQUE3QixJQUFJLEdBQUssQ0FBQSxTQUFvQixDQUFBLEtBQXpCO29CQUNOLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQzt3QkFDcEIsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO3dCQUNoQixRQUFRLEVBQUU7NEJBQ1IsR0FBRyxFQUFVLElBQUksQ0FBQyxPQUFPO3lCQUMxQjtxQkFDRixDQUFDLENBQUM7b0JBQ0csWUFBWSxHQUFHLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUVwRCxxQkFBTSxXQUFXLENBQUMsT0FBTyxDQUNwQyxZQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFnQixDQUFDLENBQ3ZDLEVBQUE7O29CQUZLLElBQUksR0FBRyxTQUVaO29CQUNnQixxQkFBTSxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsRUFBQTs7b0JBQTVELFFBQVEsR0FBRyxTQUFpRDtvQkFDbEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztTQUN0QjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB5YXJncyBmcm9tIFwieWFyZ3NcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcblxuY29uc3QgcnVuQ21kVXNhZ2UgPSBgYXNiIHJ1blxuUnVuIGEgV0FTSSBiaW5hcnlcblxuVVNBR0U6XG4gICAgJDAgcnVuIFtvcHRpb25zXSBbYmluYXJ5IHBhdGhdIC0tIFtiaW5hcnkgb3B0aW9uc11gO1xuXG5leHBvcnQgY29uc3QgUnVuQ21kOiB5YXJncy5Db21tYW5kTW9kdWxlID0ge1xuICBjb21tYW5kOiBcInJ1biA8YmluYXJ5PlwiLFxuICBkZXNjcmliZTogXCJSdW4gYSBXQVNJIGJpbmFyeVwiLFxuICBidWlsZGVyOiAoeSkgPT5cbiAgICB5XG4gICAgICAudXNhZ2UocnVuQ21kVXNhZ2UpXG4gICAgICAucG9zaXRpb25hbChcImJpbmFyeVwiLCB7XG4gICAgICAgIGRlc2NyaWJlOiBcInBhdGggdG8gV2FzbSBiaW5hcnlcIixcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIH0pXG4gICAgICAub3B0aW9uKFwicHJlb3BlblwiLCB7XG4gICAgICAgIGFsaWFzOiBbXCJwXCJdLFxuICAgICAgICBkZWZhdWx0OiBwcm9jZXNzLmN3ZCgpLFxuICAgICAgICBib29sZWFuOiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiY29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgZGlyZWN0b3JpZXMgdG8gb3Blbi5cIixcbiAgICAgIH0pLFxuICBoYW5kbGVyOiBhc3luYyAoYXJncykgPT4ge1xuICAgIGNvbnN0IHdhc2lBcmdzID0gYXJnc1tcIl9cIl0uc2xpY2UoMSk7XG5cbiAgICBjb25zdCB7IFdBU0kgfSA9IGF3YWl0IGltcG9ydCgnd2FzaScpO1xuICAgIGNvbnN0IHdhc2kgPSBuZXcgV0FTSSh7XG4gICAgICBhcmdzOiB3YXNpQXJncyxcbiAgICAgIGVudjogcHJvY2Vzcy5lbnYsXG4gICAgICBwcmVvcGVuczoge1xuICAgICAgICBcIi9cIjogPHN0cmluZz5hcmdzLnByZW9wZW4sXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGNvbnN0IGltcG9ydE9iamVjdCA9IHsgd2FzaV9zbmFwc2hvdF9wcmV2aWV3MTogd2FzaS53YXNpSW1wb3J0IH07XG5cbiAgICBjb25zdCB3YXNtID0gYXdhaXQgV2ViQXNzZW1ibHkuY29tcGlsZShcbiAgICAgIGZzLnJlYWRGaWxlU3luYyhhcmdzLmJpbmFyeSBhcyBzdHJpbmcpXG4gICAgKTtcbiAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKHdhc20sIGltcG9ydE9iamVjdCk7XG4gICAgd2FzaS5zdGFydChpbnN0YW5jZSk7XG4gIH0sXG59O1xuIl19