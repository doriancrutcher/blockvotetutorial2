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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockModule = exports.log = exports.askYesNo = exports.ensureDirExists = exports.getGlobalCliCallback = exports.setGlobalCliCallback = exports.getGlobalAscOptions = exports.setGlobalAscOptions = void 0;
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var readline = __importStar(require("readline"));
var DEFAULT_ASC_OPTIONS = {};
var DEFAULT_CLI_CALLBACK = function (err) {
    if (err) {
        throw err;
    }
    return 1;
};
// @ts-ignore
var ASC_OPTIONS = DEFAULT_ASC_OPTIONS;
// @ts-ignore
var CLI_CALLBACK = DEFAULT_CLI_CALLBACK;
/**
 * @note Only for use by testing mechanism
 */
function setGlobalAscOptions(ascOptions) {
    if (ascOptions === void 0) { ascOptions = DEFAULT_ASC_OPTIONS; }
    ASC_OPTIONS = ascOptions;
}
exports.setGlobalAscOptions = setGlobalAscOptions;
function getGlobalAscOptions() {
    return ASC_OPTIONS;
}
exports.getGlobalAscOptions = getGlobalAscOptions;
/**
 * @note Only for use by testing mechanism
 */
function setGlobalCliCallback(callback) {
    if (callback === void 0) { callback = DEFAULT_CLI_CALLBACK; }
    CLI_CALLBACK = callback;
}
exports.setGlobalCliCallback = setGlobalCliCallback;
function getGlobalCliCallback() {
    return CLI_CALLBACK;
}
exports.getGlobalCliCallback = getGlobalCliCallback;
function ensureDirExists(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return;
    }
    ensureDirExists(dirname);
    fs.mkdirSync(dirname);
}
exports.ensureDirExists = ensureDirExists;
function askYesNo(ques) {
    return __awaiter(this, void 0, void 0, function () {
        var rl, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rl = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout,
                        terminal: false,
                    });
                    return [4 /*yield*/, new Promise(function (resolve) {
                            return rl.question(ques + " [Y/n]: ", resolve);
                        })];
                case 1:
                    res = _a.sent();
                    rl.close();
                    return [2 /*return*/, /^$|^y?$/.test(res.toLowerCase().trim())];
            }
        });
    });
}
exports.askYesNo = askYesNo;
function log(message, error) {
    if (error === void 0) { error = false; }
    error ? console.error(message) : console.info(message);
}
exports.log = log;
function mockModule(moduleToMock, defaultMockValuesForMock) {
    return function (sandbox, returnOverrides) {
        var returns = returnOverrides || {};
        var functions = Object.keys(moduleToMock);
        functions.forEach(function (f) {
            var override = returns[f] || defaultMockValuesForMock[f];
            if (override) {
                sandbox.stub(moduleToMock, f).callsFake(override);
            }
        });
    };
}
exports.mockModule = mockModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUE2QjtBQUM3QixxQ0FBeUI7QUFDekIsaURBQXFDO0FBR3JDLElBQU0sbUJBQW1CLEdBQW1CLEVBQUUsQ0FBQztBQUMvQyxJQUFNLG9CQUFvQixHQUF1QixVQUFDLEdBQUc7SUFDbkQsSUFBSSxHQUFHLEVBQUU7UUFDUCxNQUFNLEdBQUcsQ0FBQztLQUNYO0lBQ0QsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDLENBQUM7QUFFRixhQUFhO0FBQ2IsSUFBSSxXQUFXLEdBQUcsbUJBQW1CLENBQUM7QUFDdEMsYUFBYTtBQUNiLElBQUksWUFBWSxHQUFHLG9CQUFvQixDQUFDO0FBRXhDOztHQUVHO0FBQ0gsU0FBZ0IsbUJBQW1CLENBQ2pDLFVBQWdEO0lBQWhELDJCQUFBLEVBQUEsZ0NBQWdEO0lBRWhELFdBQVcsR0FBRyxVQUFVLENBQUM7QUFDM0IsQ0FBQztBQUpELGtEQUlDO0FBRUQsU0FBZ0IsbUJBQW1CO0lBQ2pDLE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFGRCxrREFFQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0Isb0JBQW9CLENBQ2xDLFFBQW1EO0lBQW5ELHlCQUFBLEVBQUEsK0JBQW1EO0lBRW5ELFlBQVksR0FBRyxRQUFRLENBQUM7QUFDMUIsQ0FBQztBQUpELG9EQUlDO0FBRUQsU0FBZ0Isb0JBQW9CO0lBQ2xDLE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7QUFGRCxvREFFQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxRQUFnQjtJQUM5QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMxQixPQUFPO0tBQ1I7SUFDRCxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBUEQsMENBT0M7QUFFRCxTQUFzQixRQUFRLENBQUMsSUFBWTs7Ozs7O29CQUNuQyxFQUFFLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQzt3QkFDbEMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO3dCQUNwQixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07d0JBQ3RCLFFBQVEsRUFBRSxLQUFLO3FCQUNoQixDQUFDLENBQUM7b0JBQ2lCLHFCQUFNLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTzs0QkFDNUMsT0FBQSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxVQUFVLEVBQUUsT0FBTyxDQUFDO3dCQUF2QyxDQUF1QyxDQUN4QyxFQUFBOztvQkFGSyxHQUFHLEdBQVcsU0FFbkI7b0JBQ0QsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNYLHNCQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUM7Ozs7Q0FDakQ7QUFYRCw0QkFXQztBQUVELFNBQWdCLEdBQUcsQ0FBQyxPQUFhLEVBQUUsS0FBYTtJQUFiLHNCQUFBLEVBQUEsYUFBYTtJQUM5QyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUZELGtCQUVDO0FBRUQsU0FBZ0IsVUFBVSxDQUN4QixZQUFlLEVBQ2Ysd0JBQTJEO0lBRTNELE9BQU8sVUFDTCxPQUEyQixFQUMzQixlQUFtRDtRQUVuRCxJQUFNLE9BQU8sR0FBUSxlQUFlLElBQUksRUFBRSxDQUFDO1FBQzNDLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUM7WUFDbEIsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELElBQUksUUFBUSxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNuRDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQWpCRCxnQ0FpQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBhc2MgZnJvbSBcImFzc2VtYmx5c2NyaXB0L2NsaS9hc2NcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcmVhZGxpbmUgZnJvbSBcInJlYWRsaW5lXCI7XG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tIFwic2lub25cIjtcblxuY29uc3QgREVGQVVMVF9BU0NfT1BUSU9OUzogYXNjLkFQSU9wdGlvbnMgPSB7fTtcbmNvbnN0IERFRkFVTFRfQ0xJX0NBTExCQUNLOiAoYTogYW55KSA9PiBudW1iZXIgPSAoZXJyKSA9PiB7XG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgcmV0dXJuIDE7XG59O1xuXG4vLyBAdHMtaWdub3JlXG5sZXQgQVNDX09QVElPTlMgPSBERUZBVUxUX0FTQ19PUFRJT05TO1xuLy8gQHRzLWlnbm9yZVxubGV0IENMSV9DQUxMQkFDSyA9IERFRkFVTFRfQ0xJX0NBTExCQUNLO1xuXG4vKipcbiAqIEBub3RlIE9ubHkgZm9yIHVzZSBieSB0ZXN0aW5nIG1lY2hhbmlzbVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0R2xvYmFsQXNjT3B0aW9ucyhcbiAgYXNjT3B0aW9uczogYXNjLkFQSU9wdGlvbnMgPSBERUZBVUxUX0FTQ19PUFRJT05TXG4pIHtcbiAgQVNDX09QVElPTlMgPSBhc2NPcHRpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2xvYmFsQXNjT3B0aW9ucygpOiBhc2MuQVBJT3B0aW9ucyB7XG4gIHJldHVybiBBU0NfT1BUSU9OUztcbn1cblxuLyoqXG4gKiBAbm90ZSBPbmx5IGZvciB1c2UgYnkgdGVzdGluZyBtZWNoYW5pc21cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEdsb2JhbENsaUNhbGxiYWNrKFxuICBjYWxsYmFjazogKGE6IGFueSkgPT4gbnVtYmVyID0gREVGQVVMVF9DTElfQ0FMTEJBQ0tcbikge1xuICBDTElfQ0FMTEJBQ0sgPSBjYWxsYmFjaztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEdsb2JhbENsaUNhbGxiYWNrKCk6IChhOiBhbnkpID0+IG51bWJlciB7XG4gIHJldHVybiBDTElfQ0FMTEJBQ0s7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVEaXJFeGlzdHMoZmlsZVBhdGg6IHN0cmluZykge1xuICB2YXIgZGlybmFtZSA9IHBhdGguZGlybmFtZShmaWxlUGF0aCk7XG4gIGlmIChmcy5leGlzdHNTeW5jKGRpcm5hbWUpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGVuc3VyZURpckV4aXN0cyhkaXJuYW1lKTtcbiAgZnMubWtkaXJTeW5jKGRpcm5hbWUpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXNrWWVzTm8ocXVlczogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIGNvbnN0IHJsID0gcmVhZGxpbmUuY3JlYXRlSW50ZXJmYWNlKHtcbiAgICBpbnB1dDogcHJvY2Vzcy5zdGRpbixcbiAgICBvdXRwdXQ6IHByb2Nlc3Muc3Rkb3V0LFxuICAgIHRlcm1pbmFsOiBmYWxzZSxcbiAgfSk7XG4gIGNvbnN0IHJlczogc3RyaW5nID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+XG4gICAgcmwucXVlc3Rpb24ocXVlcyArIFwiIFtZL25dOiBcIiwgcmVzb2x2ZSlcbiAgKTtcbiAgcmwuY2xvc2UoKTtcbiAgcmV0dXJuIC9eJHxeeT8kLy50ZXN0KHJlcy50b0xvd2VyQ2FzZSgpLnRyaW0oKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2cobWVzc2FnZT86IGFueSwgZXJyb3IgPSBmYWxzZSkge1xuICBlcnJvciA/IGNvbnNvbGUuZXJyb3IobWVzc2FnZSkgOiBjb25zb2xlLmluZm8obWVzc2FnZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb2NrTW9kdWxlPFQgZXh0ZW5kcyB7IFtLOiBzdHJpbmddOiBhbnkgfT4oXG4gIG1vZHVsZVRvTW9jazogVCxcbiAgZGVmYXVsdE1vY2tWYWx1ZXNGb3JNb2NrOiBQYXJ0aWFsPHsgW0sgaW4ga2V5b2YgVF06IFRbS10gfT5cbikge1xuICByZXR1cm4gKFxuICAgIHNhbmRib3g6IHNpbm9uLlNpbm9uU2FuZGJveCxcbiAgICByZXR1cm5PdmVycmlkZXM/OiBQYXJ0aWFsPHsgW0sgaW4ga2V5b2YgVF06IFRbS10gfT5cbiAgKTogdm9pZCA9PiB7XG4gICAgY29uc3QgcmV0dXJuczogYW55ID0gcmV0dXJuT3ZlcnJpZGVzIHx8IHt9O1xuICAgIGNvbnN0IGZ1bmN0aW9ucyA9IE9iamVjdC5rZXlzKG1vZHVsZVRvTW9jayk7XG4gICAgZnVuY3Rpb25zLmZvckVhY2goKGYpID0+IHtcbiAgICAgIGNvbnN0IG92ZXJyaWRlID0gcmV0dXJuc1tmXSB8fCBkZWZhdWx0TW9ja1ZhbHVlc0Zvck1vY2tbZl07XG4gICAgICBpZiAob3ZlcnJpZGUpIHtcbiAgICAgICAgc2FuZGJveC5zdHViKG1vZHVsZVRvTW9jaywgZikuY2FsbHNGYWtlKG92ZXJyaWRlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn1cbiJdfQ==