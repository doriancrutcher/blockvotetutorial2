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
exports.main = void 0;
var yargs = __importStar(require("yargs"));
var commands_1 = require("./commands");
var utils_1 = require("./utils");
function main(cli, options, callback) {
    if (options === void 0) { options = {}; }
    utils_1.setGlobalAscOptions(options);
    utils_1.setGlobalCliCallback(callback);
    yargs
        .usage("Build tool for AssemblyScript projects.\n\nUsage:\n  asb [command] [options]")
        // To ensure backward compatibility, a default command delegating to BuildCmd.handler
        .command("$0", "Alias of build command, to maintain back-ward compatibility", function (y) {
        return commands_1.buildCmdBuilder(y)
            // explicitly hide options help to encourage users to use build cmd
            .hide("config")
            .hide("baseDir")
            .hide("wat")
            .hide("target")
            .hide("outDir")
            .hide("verbose");
    }, commands_1.BuildCmd.handler)
        .command(commands_1.BuildCmd)
        .command(commands_1.InitCmd)
        .command(commands_1.TestCmd)
        .command(commands_1.FmtCmd)
        .command(commands_1.RunCmd)
        .help()
        .scriptName("asb")
        .parse(cli);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQStCO0FBQy9CLHVDQU9vQjtBQUVwQixpQ0FBb0U7QUFFcEUsU0FBZ0IsSUFBSSxDQUNsQixHQUFhLEVBQ2IsT0FBNEIsRUFDNUIsUUFBNkI7SUFEN0Isd0JBQUEsRUFBQSxZQUE0QjtJQUc1QiwyQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3Qiw0QkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUUvQixLQUFLO1NBQ0YsS0FBSyxDQUNKLDhFQUE4RSxDQUMvRTtRQUNELHFGQUFxRjtTQUNwRixPQUFPLENBQ04sSUFBSSxFQUNKLDZEQUE2RCxFQUM3RCxVQUFDLENBQUM7UUFDQSxPQUFBLDBCQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLG1FQUFtRTthQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNmLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUNkLElBQUksQ0FBQyxTQUFTLENBQUM7SUFQbEIsQ0FPa0IsRUFDcEIsbUJBQVEsQ0FBQyxPQUFPLENBQ2pCO1NBQ0EsT0FBTyxDQUFDLG1CQUFRLENBQUM7U0FDakIsT0FBTyxDQUFDLGtCQUFPLENBQUM7U0FDaEIsT0FBTyxDQUFDLGtCQUFPLENBQUM7U0FDaEIsT0FBTyxDQUFDLGlCQUFNLENBQUM7U0FDZixPQUFPLENBQUMsaUJBQU0sQ0FBQztTQUNmLElBQUksRUFBRTtTQUNOLFVBQVUsQ0FBQyxLQUFLLENBQUM7U0FDakIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLENBQUM7QUFuQ0Qsb0JBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgeWFyZ3MgZnJvbSBcInlhcmdzXCI7XG5pbXBvcnQge1xuICBCdWlsZENtZCxcbiAgYnVpbGRDbWRCdWlsZGVyLFxuICBJbml0Q21kLFxuICBUZXN0Q21kLFxuICBGbXRDbWQsXG4gIFJ1bkNtZCxcbn0gZnJvbSBcIi4vY29tbWFuZHNcIjtcbmltcG9ydCAqIGFzIGFzYyBmcm9tIFwiYXNzZW1ibHlzY3JpcHQvY2xpL2FzY1wiO1xuaW1wb3J0IHsgc2V0R2xvYmFsQXNjT3B0aW9ucywgc2V0R2xvYmFsQ2xpQ2FsbGJhY2sgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbihcbiAgY2xpOiBzdHJpbmdbXSxcbiAgb3B0aW9uczogYXNjLkFQSU9wdGlvbnMgPSB7fSxcbiAgY2FsbGJhY2s/OiAoYTogYW55KSA9PiBudW1iZXJcbikge1xuICBzZXRHbG9iYWxBc2NPcHRpb25zKG9wdGlvbnMpO1xuICBzZXRHbG9iYWxDbGlDYWxsYmFjayhjYWxsYmFjayk7XG5cbiAgeWFyZ3NcbiAgICAudXNhZ2UoXG4gICAgICBcIkJ1aWxkIHRvb2wgZm9yIEFzc2VtYmx5U2NyaXB0IHByb2plY3RzLlxcblxcblVzYWdlOlxcbiAgYXNiIFtjb21tYW5kXSBbb3B0aW9uc11cIlxuICAgIClcbiAgICAvLyBUbyBlbnN1cmUgYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgYSBkZWZhdWx0IGNvbW1hbmQgZGVsZWdhdGluZyB0byBCdWlsZENtZC5oYW5kbGVyXG4gICAgLmNvbW1hbmQoXG4gICAgICBcIiQwXCIsXG4gICAgICBcIkFsaWFzIG9mIGJ1aWxkIGNvbW1hbmQsIHRvIG1haW50YWluIGJhY2std2FyZCBjb21wYXRpYmlsaXR5XCIsXG4gICAgICAoeSkgPT5cbiAgICAgICAgYnVpbGRDbWRCdWlsZGVyKHkpXG4gICAgICAgICAgLy8gZXhwbGljaXRseSBoaWRlIG9wdGlvbnMgaGVscCB0byBlbmNvdXJhZ2UgdXNlcnMgdG8gdXNlIGJ1aWxkIGNtZFxuICAgICAgICAgIC5oaWRlKFwiY29uZmlnXCIpXG4gICAgICAgICAgLmhpZGUoXCJiYXNlRGlyXCIpXG4gICAgICAgICAgLmhpZGUoXCJ3YXRcIilcbiAgICAgICAgICAuaGlkZShcInRhcmdldFwiKVxuICAgICAgICAgIC5oaWRlKFwib3V0RGlyXCIpXG4gICAgICAgICAgLmhpZGUoXCJ2ZXJib3NlXCIpLFxuICAgICAgQnVpbGRDbWQuaGFuZGxlclxuICAgIClcbiAgICAuY29tbWFuZChCdWlsZENtZClcbiAgICAuY29tbWFuZChJbml0Q21kKVxuICAgIC5jb21tYW5kKFRlc3RDbWQpXG4gICAgLmNvbW1hbmQoRm10Q21kKVxuICAgIC5jb21tYW5kKFJ1bkNtZClcbiAgICAuaGVscCgpXG4gICAgLnNjcmlwdE5hbWUoXCJhc2JcIilcbiAgICAucGFyc2UoY2xpKTtcbn1cbiJdfQ==