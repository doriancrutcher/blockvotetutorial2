"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCmd = void 0;
var cli_1 = require("@as-pect/cli");
var utils_1 = require("../utils");
var testCmdUsage = "$0 test\nRun as-pect tests\n\nUSAGE:\n    $0 test [options] -- [aspect_options]";
exports.TestCmd = {
    command: "test",
    describe: "Run as-pect tests",
    builder: function (y) {
        return y.usage(testCmdUsage).option("verbose", {
            alias: ["vv"],
            default: false,
            boolean: true,
            description: "Print out arguments passed to as-pect",
        });
    },
    handler: function (args) {
        var aspectArgs = args["_"].slice(1);
        aspectArgs.push("--nologo");
        if (args.verbose) {
            utils_1.log(aspectArgs);
        }
        cli_1.asp(aspectArgs);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG9DQUFtQztBQUNuQyxrQ0FBK0I7QUFFL0IsSUFBTSxZQUFZLEdBQUcsaUZBSXFCLENBQUM7QUFFOUIsUUFBQSxPQUFPLEdBQXdCO0lBQzFDLE9BQU8sRUFBRSxNQUFNO0lBQ2YsUUFBUSxFQUFFLG1CQUFtQjtJQUM3QixPQUFPLEVBQUUsVUFBQyxDQUFDO1FBQ1QsT0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDdEMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ2IsT0FBTyxFQUFFLEtBQUs7WUFDZCxPQUFPLEVBQUUsSUFBSTtZQUNiLFdBQVcsRUFBRSx1Q0FBdUM7U0FDckQsQ0FBQztJQUxGLENBS0U7SUFDSixPQUFPLEVBQUUsVUFBQyxJQUFJO1FBQ1osSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixXQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDakI7UUFDRCxTQUFHLENBQUMsVUFBc0IsQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgeWFyZ3MgZnJvbSBcInlhcmdzXCI7XG5pbXBvcnQgeyBhc3AgfSBmcm9tIFwiQGFzLXBlY3QvY2xpXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuY29uc3QgdGVzdENtZFVzYWdlID0gYCQwIHRlc3RcblJ1biBhcy1wZWN0IHRlc3RzXG5cblVTQUdFOlxuICAgICQwIHRlc3QgW29wdGlvbnNdIC0tIFthc3BlY3Rfb3B0aW9uc11gO1xuXG5leHBvcnQgY29uc3QgVGVzdENtZDogeWFyZ3MuQ29tbWFuZE1vZHVsZSA9IHtcbiAgY29tbWFuZDogXCJ0ZXN0XCIsXG4gIGRlc2NyaWJlOiBcIlJ1biBhcy1wZWN0IHRlc3RzXCIsXG4gIGJ1aWxkZXI6ICh5KSA9PlxuICAgIHkudXNhZ2UodGVzdENtZFVzYWdlKS5vcHRpb24oXCJ2ZXJib3NlXCIsIHtcbiAgICAgIGFsaWFzOiBbXCJ2dlwiXSxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgYm9vbGVhbjogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlByaW50IG91dCBhcmd1bWVudHMgcGFzc2VkIHRvIGFzLXBlY3RcIixcbiAgICB9KSxcbiAgaGFuZGxlcjogKGFyZ3MpID0+IHtcbiAgICBjb25zdCBhc3BlY3RBcmdzID0gYXJnc1tcIl9cIl0uc2xpY2UoMSk7XG4gICAgYXNwZWN0QXJncy5wdXNoKFwiLS1ub2xvZ29cIik7XG4gICAgaWYgKGFyZ3MudmVyYm9zZSkge1xuICAgICAgbG9nKGFzcGVjdEFyZ3MpO1xuICAgIH1cbiAgICBhc3AoYXNwZWN0QXJncyBhcyBzdHJpbmdbXSk7XG4gIH0sXG59O1xuIl19