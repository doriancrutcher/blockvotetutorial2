"use strict";
const decorator_1 = require("../decorator");
const utils_1 = require("../utils");
class ListMembers extends decorator_1.ClassDecorator {
    visitFieldDeclaration(node) {
        if (!node.name)
            console.log(utils_1.toString(node) + "\n");
        const name = utils_1.toString(node.name);
        const _type = utils_1.toString(node.type);
        this.stdout.write(name + ": " + _type + "\n");
    }
    visitMethodDeclaration(node) {
        const name = utils_1.toString(node.name);
        if (name == "constructor") {
            return;
        }
        const sig = utils_1.toString(node.signature);
        this.stdout.write(name + ": " + sig + "\n");
    }
    visitClassDeclaration(node) {
        this.visit(node.members);
    }
    get name() {
        return "list";
    }
}
module.exports = decorator_1.registerDecorator(new ListMembers());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlcy9saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFLQSw0Q0FBaUU7QUFDakUsb0NBQW9DO0FBRXBDLE1BQU0sV0FBWSxTQUFRLDBCQUFjO0lBQ3RDLHFCQUFxQixDQUFDLElBQXNCO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNuRCxNQUFNLElBQUksR0FBRyxnQkFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxNQUFNLEtBQUssR0FBRyxnQkFBUSxDQUFDLElBQUksQ0FBQyxJQUFLLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsc0JBQXNCLENBQUMsSUFBdUI7UUFDNUMsTUFBTSxJQUFJLEdBQUcsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxJQUFJLElBQUksYUFBYSxFQUFFO1lBQ3pCLE9BQU87U0FDUjtRQUNELE1BQU0sR0FBRyxHQUFHLGdCQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxJQUFzQjtRQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGO0FBRUQsaUJBQVMsNkJBQWlCLENBQUMsSUFBSSxXQUFXLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2xhc3NEZWNsYXJhdGlvbixcbiAgRmllbGREZWNsYXJhdGlvbixcbiAgTWV0aG9kRGVjbGFyYXRpb24sXG59IGZyb20gXCIuLi8uLi9hc1wiO1xuaW1wb3J0IHsgQ2xhc3NEZWNvcmF0b3IsIHJlZ2lzdGVyRGVjb3JhdG9yIH0gZnJvbSBcIi4uL2RlY29yYXRvclwiO1xuaW1wb3J0IHsgdG9TdHJpbmcgfSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuY2xhc3MgTGlzdE1lbWJlcnMgZXh0ZW5kcyBDbGFzc0RlY29yYXRvciB7XG4gIHZpc2l0RmllbGREZWNsYXJhdGlvbihub2RlOiBGaWVsZERlY2xhcmF0aW9uKTogdm9pZCB7XG4gICAgaWYgKCFub2RlLm5hbWUpIGNvbnNvbGUubG9nKHRvU3RyaW5nKG5vZGUpICsgXCJcXG5cIik7XG4gICAgY29uc3QgbmFtZSA9IHRvU3RyaW5nKG5vZGUubmFtZSk7XG4gICAgY29uc3QgX3R5cGUgPSB0b1N0cmluZyhub2RlLnR5cGUhKTtcbiAgICB0aGlzLnN0ZG91dC53cml0ZShuYW1lICsgXCI6IFwiICsgX3R5cGUgKyBcIlxcblwiKTtcbiAgfVxuXG4gIHZpc2l0TWV0aG9kRGVjbGFyYXRpb24obm9kZTogTWV0aG9kRGVjbGFyYXRpb24pOiB2b2lkIHtcbiAgICBjb25zdCBuYW1lID0gdG9TdHJpbmcobm9kZS5uYW1lKTtcbiAgICBpZiAobmFtZSA9PSBcImNvbnN0cnVjdG9yXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc2lnID0gdG9TdHJpbmcobm9kZS5zaWduYXR1cmUpO1xuICAgIHRoaXMuc3Rkb3V0LndyaXRlKG5hbWUgKyBcIjogXCIgKyBzaWcgKyBcIlxcblwiKTtcbiAgfVxuXG4gIHZpc2l0Q2xhc3NEZWNsYXJhdGlvbihub2RlOiBDbGFzc0RlY2xhcmF0aW9uKTogdm9pZCB7XG4gICAgdGhpcy52aXNpdChub2RlLm1lbWJlcnMpO1xuICB9XG5cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCJsaXN0XCI7XG4gIH1cbn1cblxuZXhwb3J0ID0gcmVnaXN0ZXJEZWNvcmF0b3IobmV3IExpc3RNZW1iZXJzKCkpO1xuIl19