"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTransformVisitor = void 0;
const as_1 = require("../as");
const visitor_1 = require("./visitor");
class BaseTransformVisitor extends visitor_1.AbstractTransformVisitor {
    constructor() {
        super(...arguments);
        this.depth = 0;
    }
    _visit(node) {
        switch (node.kind) {
            case as_1.NodeKind.SOURCE: {
                return this.visitSource(node);
            }
            // types
            case as_1.NodeKind.NAMEDTYPE: {
                return this.visitNamedTypeNode(node);
            }
            case as_1.NodeKind.FUNCTIONTYPE: {
                return this.visitFunctionTypeNode(node);
            }
            case as_1.NodeKind.TYPENAME: {
                return this.visitTypeName(node);
            }
            case as_1.NodeKind.TYPEPARAMETER: {
                return this.visitTypeParameter(node);
            }
            // expressions
            case as_1.NodeKind.FALSE:
            case as_1.NodeKind.NULL:
            case as_1.NodeKind.SUPER:
            case as_1.NodeKind.THIS:
            case as_1.NodeKind.TRUE:
            case as_1.NodeKind.CONSTRUCTOR:
            case as_1.NodeKind.IDENTIFIER: {
                return this.visitIdentifierExpression(node);
            }
            case as_1.NodeKind.ASSERTION: {
                return this.visitAssertionExpression(node);
            }
            case as_1.NodeKind.BINARY: {
                return this.visitBinaryExpression(node);
            }
            case as_1.NodeKind.CALL: {
                return this.visitCallExpression(node);
            }
            case as_1.NodeKind.CLASS: {
                return this.visitClassExpression(node);
            }
            case as_1.NodeKind.COMMA: {
                return this.visitCommaExpression(node);
            }
            case as_1.NodeKind.ELEMENTACCESS: {
                return this.visitElementAccessExpression(node);
            }
            case as_1.NodeKind.FUNCTION: {
                return this.visitFunctionExpression(node);
            }
            case as_1.NodeKind.INSTANCEOF: {
                return this.visitInstanceOfExpression(node);
            }
            case as_1.NodeKind.LITERAL: {
                return this.visitLiteralExpression(node);
            }
            case as_1.NodeKind.NEW: {
                return this.visitNewExpression(node);
            }
            case as_1.NodeKind.PARENTHESIZED: {
                return this.visitParenthesizedExpression(node);
            }
            case as_1.NodeKind.PROPERTYACCESS: {
                return this.visitPropertyAccessExpression(node);
            }
            case as_1.NodeKind.TERNARY: {
                return this.visitTernaryExpression(node);
            }
            case as_1.NodeKind.UNARYPOSTFIX: {
                return this.visitUnaryPostfixExpression(node);
            }
            case as_1.NodeKind.UNARYPREFIX: {
                return this.visitUnaryPrefixExpression(node);
            }
            // statements
            case as_1.NodeKind.BLOCK: {
                return this.visitBlockStatement(node);
            }
            case as_1.NodeKind.BREAK: {
                return this.visitBreakStatement(node);
            }
            case as_1.NodeKind.CONTINUE: {
                return this.visitContinueStatement(node);
            }
            case as_1.NodeKind.DO: {
                return this.visitDoStatement(node);
            }
            case as_1.NodeKind.EMPTY: {
                return this.visitEmptyStatement(node);
            }
            case as_1.NodeKind.EXPORT: {
                return this.visitExportStatement(node);
            }
            case as_1.NodeKind.EXPORTDEFAULT: {
                return this.visitExportDefaultStatement(node);
            }
            case as_1.NodeKind.EXPORTIMPORT: {
                return this.visitExportImportStatement(node);
            }
            case as_1.NodeKind.EXPRESSION: {
                return this.visitExpressionStatement(node);
            }
            case as_1.NodeKind.FOR: {
                return this.visitForStatement(node);
            }
            case as_1.NodeKind.IF: {
                return this.visitIfStatement(node);
            }
            case as_1.NodeKind.IMPORT: {
                return this.visitImportStatement(node);
            }
            case as_1.NodeKind.RETURN: {
                return this.visitReturnStatement(node);
            }
            case as_1.NodeKind.SWITCH: {
                return this.visitSwitchStatement(node);
            }
            case as_1.NodeKind.THROW: {
                return this.visitThrowStatement(node);
            }
            case as_1.NodeKind.TRY: {
                return this.visitTryStatement(node);
            }
            case as_1.NodeKind.VARIABLE: {
                return this.visitVariableStatement(node);
            }
            case as_1.NodeKind.WHILE: {
                return this.visitWhileStatement(node);
            }
            // declaration statements
            case as_1.NodeKind.CLASSDECLARATION: {
                return this.visitClassDeclaration(node);
            }
            case as_1.NodeKind.ENUMDECLARATION: {
                return this.visitEnumDeclaration(node);
            }
            case as_1.NodeKind.ENUMVALUEDECLARATION: {
                return this.visitEnumValueDeclaration(node);
            }
            case as_1.NodeKind.FIELDDECLARATION: {
                return this.visitFieldDeclaration(node);
            }
            case as_1.NodeKind.FUNCTIONDECLARATION: {
                return this.visitFunctionDeclaration(node);
            }
            case as_1.NodeKind.IMPORTDECLARATION: {
                return this.visitImportDeclaration(node);
            }
            case as_1.NodeKind.INTERFACEDECLARATION: {
                return this.visitInterfaceDeclaration(node);
            }
            case as_1.NodeKind.METHODDECLARATION: {
                return this.visitMethodDeclaration(node);
            }
            case as_1.NodeKind.NAMESPACEDECLARATION: {
                return this.visitNamespaceDeclaration(node);
            }
            case as_1.NodeKind.TYPEDECLARATION: {
                return this.visitTypeDeclaration(node);
            }
            case as_1.NodeKind.VARIABLEDECLARATION: {
                return this.visitVariableDeclaration(node);
            }
            // other
            case as_1.NodeKind.DECORATOR: {
                return this.visitDecoratorNode(node);
            }
            case as_1.NodeKind.EXPORTMEMBER: {
                return this.visitExportMember(node);
            }
            case as_1.NodeKind.PARAMETER: {
                return this.visitParameter(node);
            }
            case as_1.NodeKind.SWITCHCASE: {
                return this.visitSwitchCase(node);
            }
            case as_1.NodeKind.INDEXSIGNATURE: {
                return this.visitIndexSignature(node);
            }
            default:
                assert(false);
        }
        return node;
    }
    visitStatement(node) {
        return node = this.visit(node);
    }
    visitSource(node) {
        let statements = [];
        for (const stmt of node.statements) {
            this.depth++;
            statements.push(this.visitStatement(stmt));
            this.depth--;
        }
        node.statements = statements;
        return node;
    }
    visitTypeNode(node) {
        return node;
    }
    visitTypeName(node) {
        node.identifier = this.visitIdentifierExpression(node.identifier);
        if (node.next) {
            node.next = this.visit(node.next);
        }
        return node;
    }
    visitNamedTypeNode(node) {
        node.name = this.visit(node.name);
        node.typeArguments = this.visit(node.typeArguments);
        return node;
    }
    visitFunctionTypeNode(node) {
        let params = [];
        for (let param of node.parameters) {
            params.push(this.visitParameter(param));
        }
        node.parameters = params;
        node.returnType = this.visit(node.returnType);
        return node;
    }
    visitTypeParameter(node) {
        node.name = this.visit(node.name);
        if (node.extendsType)
            node.extendsType = this.visit(node.extendsType);
        if (node.defaultType)
            node.defaultType = this.visit(node.defaultType);
        return node;
    }
    visitIdentifierExpression(node) {
        return node;
    }
    visitArrayLiteralExpression(node) {
        node.elementExpressions = node.elementExpressions.map(e => this.visit(e));
        return node;
    }
    visitObjectLiteralExpression(node) {
        if (node.values && node.names) {
            assert(node.values.length == node.names.length);
            for (let i = 0; i < node.values.length; i++) {
                node.names[i] = this.visit(node.names[i]);
                node.values[i] = this.visit(node.values[i]);
            }
        }
        return node;
    }
    visitAssertionExpression(node) {
        if (node.toType)
            node.toType = this.visit(node.toType);
        node.expression = this.visit(node.expression);
        return node;
    }
    visitBinaryExpression(node) {
        node.left = this.visit(node.left);
        node.right = this.visit(node.right);
        return node;
    }
    visitCallExpression(node) {
        node.expression = this.visit(node.expression);
        node.typeArguments = this.visit(node.typeArguments);
        node.args = this.visit(node.args);
        this.visitArguments(node.typeArguments, node.args);
        return node;
    }
    visitArguments(typeArguments, args) {
    }
    visitClassExpression(node) {
        node.declaration = this.visit(node.declaration);
        return node;
    }
    visitCommaExpression(node) {
        node.expressions = this.visit(node.expressions);
        return node;
    }
    visitElementAccessExpression(node) {
        node.elementExpression = this.visit(node.elementExpression);
        node.expression = this.visit(node.expression);
        return node;
    }
    visitFunctionExpression(node) {
        node.declaration = this.visit(node.declaration);
        return node;
    }
    visitLiteralExpression(node) {
        switch (node.literalKind) {
            case as_1.LiteralKind.ARRAY: {
                return this.visitArrayLiteralExpression(node);
            }
            case as_1.LiteralKind.FLOAT: {
                return this.visitFloatLiteralExpression(node);
            }
            case as_1.LiteralKind.INTEGER: {
                return this.visitIntegerLiteralExpression(node);
            }
            case as_1.LiteralKind.OBJECT: {
                return this.visitObjectLiteralExpression(node);
            }
            case as_1.LiteralKind.REGEXP: {
                return this.visitRegexpLiteralExpression(node);
            }
            case as_1.LiteralKind.STRING: {
                return this.visitStringLiteralExpression(node);
            }
            case as_1.LiteralKind.TEMPLATE: {
                return this.visitTemplateLiteralExpression(node);
            }
            default:
                throw new Error("Invalid LiteralKind: " + node.literalKind);
        }
    }
    visitFloatLiteralExpression(node) { return node; }
    visitInstanceOfExpression(node) {
        node.expression = this.visit(node.expression);
        node.isType = this.visit(node.isType);
        return node;
    }
    visitIntegerLiteralExpression(node) { return node; }
    visitStringLiteral(str, singleQuoted) { return str; }
    visitStringLiteralExpression(node) {
        node.value = this.visitStringLiteral(node.value);
        return node;
    }
    visitTemplateLiteralExpression(node) { return node; }
    visitRegexpLiteralExpression(node) { return node; }
    visitNewExpression(node) {
        node.typeArguments = this.visit(node.typeArguments);
        this.visitArguments(node.typeArguments, node.args);
        return node;
    }
    visitParenthesizedExpression(node) {
        node.expression = this.visit(node.expression);
        return node;
    }
    visitPropertyAccessExpression(node) {
        node.property = this.visit(node.property);
        node.expression = this.visit(node.expression);
        return node;
    }
    visitTernaryExpression(node) {
        node.condition = this.visit(node.condition);
        node.ifThen = this.visit(node.ifThen);
        node.ifElse = this.visit(node.ifElse);
        return node;
    }
    visitUnaryExpression(node) {
        node.operand = this.visit(node.operand);
        return node;
    }
    visitUnaryPostfixExpression(node) {
        node.operand = this.visit(node.operand);
        return node;
    }
    visitUnaryPrefixExpression(node) {
        node.operand = this.visit(node.operand);
        return node;
    }
    visitSuperExpression(node) { return node; }
    visitFalseExpression(node) { return node; }
    visitTrueExpression(node) { return node; }
    visitThisExpression(node) { return node; }
    visitNullExperssion(node) { return node; }
    visitConstructorExpression(node) { return node; }
    visitNodeAndTerminate(node) { return node; }
    visitBlockStatement(node) {
        this.depth++;
        node.statements = this.visit(node.statements);
        this.depth--;
        return node;
    }
    visitBreakStatement(node) {
        if (node.label) {
            node.label = this.visit(node.label);
        }
        return node;
    }
    visitContinueStatement(node) {
        if (node.label) {
            node.label = this.visit(node.label);
        }
        return node;
    }
    visitClassDeclaration(node, isDefault) {
        node.name = this.visit(node.name);
        this.depth++;
        node.decorators = this.visit(node.decorators);
        assert(node.isGeneric ? node.typeParameters != null : node.typeParameters == null);
        if (node.isGeneric) {
            node.typeParameters = this.visit(node.typeParameters);
        }
        if (node.extendsType) {
            node.extendsType = this.visit(node.extendsType);
        }
        node.implementsTypes = this.visit(node.implementsTypes);
        node.members = this.visit(node.members);
        this.depth--;
        return node;
    }
    visitDoStatement(node) {
        node.condition = this.visit(node.condition);
        node.statement = this.visit(node.statement);
        return node;
    }
    visitEmptyStatement(node) { return node; }
    visitEnumDeclaration(node, isDefault) {
        node.name = this.visit(node.name);
        node.decorators = this.visit(node.decorators);
        node.values = this.visit(node.values);
        return node;
    }
    visitEnumValueDeclaration(node) {
        node.name = this.visit(node.name);
        if (node.initializer) {
            node.initializer = this.visit(node.initializer);
        }
        return node;
    }
    visitExportImportStatement(node) {
        node.name = this.visit(node.name);
        node.externalName = this.visit(node.externalName);
        return node;
    }
    visitExportMember(node) {
        node.localName = this.visit(node.localName);
        node.exportedName = this.visit(node.exportedName);
        return node;
    }
    visitExportStatement(node) {
        if (node.path) {
            node.path = this.visit(node.path);
        }
        node.members = this.visit(node.members);
        return node;
    }
    visitExportDefaultStatement(node) {
        node.declaration = this.visit(node.declaration);
        return node;
    }
    visitExpressionStatement(node) {
        node.expression = this.visit(node.expression);
        return node;
    }
    visitFieldDeclaration(node) {
        node.name = this.visit(node.name);
        if (node.type) {
            node.type = this.visit(node.type);
        }
        if (node.initializer) {
            node.initializer = this.visit(node.initializer);
        }
        node.decorators = this.visit(node.decorators);
        return node;
    }
    visitForStatement(node) {
        if (node.initializer)
            node.initializer = this.visit(node.initializer);
        if (node.condition)
            node.condition = this.visit(node.condition);
        if (node.incrementor)
            node.incrementor = this.visit(node.incrementor);
        node.statement = this.visit(node.statement);
        return node;
    }
    visitFunctionDeclaration(node, isDefault) {
        node.name = this.visit(node.name);
        node.decorators = this.visit(node.decorators);
        if (node.isGeneric) {
            node.typeParameters = this.visit(node.typeParameters);
        }
        node.signature = this.visit(node.signature);
        this.depth++;
        if (node.body)
            node.body = this.visit(node.body);
        this.depth--;
        return node;
    }
    visitFunctionCommon(node) {
        return node;
    }
    visitIfStatement(node) {
        node.condition = this.visit(node.condition);
        node.ifTrue = this.visit(node.ifTrue);
        if (node.ifFalse)
            node.ifFalse = this.visit(node.ifFalse);
        return node;
    }
    visitImportDeclaration(node) {
        node.foreignName = this.visit(node.foreignName);
        node.name = this.visit(node.name);
        node.decorators = this.visit(node.decorators);
        return node;
    }
    visitImportStatement(node) {
        if (node.namespaceName)
            node.namespaceName = this.visit(node.namespaceName);
        node.declarations = this.visit(node.declarations);
        return node;
    }
    visitIndexSignature(node) {
        return node;
    }
    visitInterfaceDeclaration(node, isDefault) {
        node.name = this.visit(node.name);
        if (node.isGeneric) {
            node.typeParameters = this.visit(node.typeParameters);
        }
        node.implementsTypes = this.visit(node.implementsTypes);
        if (node.extendsType)
            node.extendsType = this.visit(node.extendsType);
        this.depth++;
        node.members = this.visit(node.members);
        this.depth--;
        return node;
    }
    visitMethodDeclaration(node) {
        node.name = this.visit(node.name);
        if (node.isGeneric) {
            node.typeParameters = this.visit(node.typeParameters);
        }
        node.signature = this.visit(node.signature);
        node.decorators = this.visit(node.decorators);
        this.depth++;
        if (node.body)
            node.body = this.visit(node.body);
        this.depth--;
        return node;
    }
    visitNamespaceDeclaration(node, isDefault) {
        node.name = this.visit(node.name);
        node.decorators = this.visit(node.decorators);
        node.members = this.visit(node.members);
        return node;
    }
    visitReturnStatement(node) {
        if (node.value)
            node.value = this.visit(node.value);
        return node;
    }
    visitSwitchCase(node) {
        if (node.label)
            node.label = this.visit(node.label);
        node.statements = this.visit(node.statements);
        return node;
    }
    visitSwitchStatement(node) {
        node.condition = this.visit(node.condition);
        this.depth++;
        node.cases = this.visit(node.cases);
        this.depth--;
        return node;
    }
    visitThrowStatement(node) {
        node.value = this.visit(node.value);
        return node;
    }
    visitTryStatement(node) {
        node.statements = this.visit(node.statements);
        if (node.catchVariable)
            node.catchVariable = this.visit(node.catchVariable);
        node.catchStatements = this.visit(node.catchStatements);
        node.finallyStatements = this.visit(node.finallyStatements);
        return node;
    }
    visitTypeDeclaration(node) {
        node.name = this.visit(node.name);
        node.decorators = this.visit(node.decorators);
        node.type = this.visit(node.type);
        node.typeParameters = this.visit(node.typeParameters);
        return node;
    }
    visitVariableDeclaration(node) {
        node.name = this.visit(node.name);
        if (node.type)
            node.type = this.visit(node.type);
        if (node.initializer)
            node.initializer = this.visit(node.initializer);
        return node;
    }
    visitVariableStatement(node) {
        node.decorators = this.visit(node.decorators);
        node.declarations = this.visit(node.declarations);
        return node;
    }
    visitWhileStatement(node) {
        node.condition = this.visit(node.condition);
        this.depth++;
        node.statement = this.visit(node.statement);
        this.depth--;
        return node;
    }
    visitVoidStatement(node) { return node; }
    visitComment(node) { return node; }
    visitDecoratorNode(node) {
        node.name = this.visit(node.name);
        node.args = this.visit(node.args);
        return node;
    }
    visitParameter(node) {
        node.name = this.visit(node.name);
        if (node.implicitFieldDeclaration) {
            node.implicitFieldDeclaration = this.visit(node.implicitFieldDeclaration);
        }
        if (node.initializer)
            node.initializer = this.visit(node.initializer);
        node.type = this.visit(node.type);
        return node;
    }
}
exports.BaseTransformVisitor = BaseTransformVisitor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVRyYW5zZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9iYXNlVHJhbnNmb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhCQStFZTtBQUVmLHVDQUFxRDtBQUVyRCxNQUFhLG9CQUFxQixTQUFRLGtDQUE4QjtJQUF4RTs7UUFDRSxVQUFLLEdBQVcsQ0FBQyxDQUFDO0lBa3JCcEIsQ0FBQztJQWhyQkMsTUFBTSxDQUFDLElBQVU7UUFDZixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDakIsS0FBSyxhQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBUyxJQUFJLENBQUMsQ0FBQzthQUV2QztZQUVELFFBQVE7WUFFUixLQUFLLGFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQWdCLElBQUksQ0FBQyxDQUFDO2FBQ3JEO1lBQ0QsS0FBSyxhQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFtQixJQUFJLENBQUMsQ0FBQzthQUMzRDtZQUNELEtBQUssYUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQVcsSUFBSSxDQUFDLENBQUM7YUFDM0M7WUFDRCxLQUFLLGFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDM0IsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQW9CLElBQUksQ0FBQyxDQUFDO2FBQ3pEO1lBRUQsY0FBYztZQUVkLEtBQUssYUFBUSxDQUFDLEtBQUssQ0FBQztZQUNwQixLQUFLLGFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDbkIsS0FBSyxhQUFRLENBQUMsS0FBSyxDQUFDO1lBQ3BCLEtBQUssYUFBUSxDQUFDLElBQUksQ0FBQztZQUNuQixLQUFLLGFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDbkIs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QkQsb0RBbXJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIE5vZGUsXG4gIE5vZGVLaW5kLFxuICBTb3VyY2UsXG4gIE5hbWVkVHlwZU5vZGUsXG4gIEZ1bmN0aW9uVHlwZU5vZGUsXG4gIFR5cGVOYW1lLFxuICBUeXBlUGFyYW1ldGVyTm9kZSxcbiAgSWRlbnRpZmllckV4cHJlc3Npb24sXG4gIEFzc2VydGlvbkV4cHJlc3Npb24sXG4gIEJpbmFyeUV4cHJlc3Npb24sXG4gIENhbGxFeHByZXNzaW9uLFxuICBDbGFzc0V4cHJlc3Npb24sXG4gIENvbW1hRXhwcmVzc2lvbixcbiAgRWxlbWVudEFjY2Vzc0V4cHJlc3Npb24sXG4gIEZ1bmN0aW9uRXhwcmVzc2lvbixcbiAgSW5zdGFuY2VPZkV4cHJlc3Npb24sXG4gIExpdGVyYWxFeHByZXNzaW9uLFxuICBOZXdFeHByZXNzaW9uLFxuICBQYXJlbnRoZXNpemVkRXhwcmVzc2lvbixcbiAgUHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uLFxuICBUZXJuYXJ5RXhwcmVzc2lvbixcbiAgVW5hcnlQb3N0Zml4RXhwcmVzc2lvbixcbiAgVW5hcnlQcmVmaXhFeHByZXNzaW9uLFxuICBCbG9ja1N0YXRlbWVudCxcbiAgQnJlYWtTdGF0ZW1lbnQsXG4gIENvbnRpbnVlU3RhdGVtZW50LFxuICBEb1N0YXRlbWVudCxcbiAgRW1wdHlTdGF0ZW1lbnQsXG4gIEV4cG9ydFN0YXRlbWVudCxcbiAgRXhwb3J0RGVmYXVsdFN0YXRlbWVudCxcbiAgRXhwb3J0SW1wb3J0U3RhdGVtZW50LFxuICBFeHByZXNzaW9uU3RhdGVtZW50LFxuICBGb3JTdGF0ZW1lbnQsXG4gIElmU3RhdGVtZW50LFxuICBJbXBvcnRTdGF0ZW1lbnQsXG4gIFJldHVyblN0YXRlbWVudCxcbiAgU3dpdGNoU3RhdGVtZW50LFxuICBUaHJvd1N0YXRlbWVudCxcbiAgVHJ5U3RhdGVtZW50LFxuICBWYXJpYWJsZVN0YXRlbWVudCxcbiAgV2hpbGVTdGF0ZW1lbnQsXG4gIENsYXNzRGVjbGFyYXRpb24sXG4gIEVudW1EZWNsYXJhdGlvbixcbiAgRW51bVZhbHVlRGVjbGFyYXRpb24sXG4gIEZpZWxkRGVjbGFyYXRpb24sXG4gIEZ1bmN0aW9uRGVjbGFyYXRpb24sXG4gIEltcG9ydERlY2xhcmF0aW9uLFxuICBJbnRlcmZhY2VEZWNsYXJhdGlvbixcbiAgTWV0aG9kRGVjbGFyYXRpb24sXG4gIE5hbWVzcGFjZURlY2xhcmF0aW9uLFxuICBUeXBlRGVjbGFyYXRpb24sXG4gIFZhcmlhYmxlRGVjbGFyYXRpb24sXG4gIERlY29yYXRvck5vZGUsXG4gIEluZGV4U2lnbmF0dXJlTm9kZSxcbiAgUGFyYW1ldGVyTm9kZSxcbiAgRXhwb3J0TWVtYmVyLFxuICBTd2l0Y2hDYXNlLFxuICBUeXBlTm9kZSxcbiAgQXJyYXlMaXRlcmFsRXhwcmVzc2lvbixcbiAgRXhwcmVzc2lvbixcbiAgT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24sXG4gIEZsb2F0TGl0ZXJhbEV4cHJlc3Npb24sXG4gIEludGVnZXJMaXRlcmFsRXhwcmVzc2lvbixcbiAgU3RyaW5nTGl0ZXJhbEV4cHJlc3Npb24sXG4gIFJlZ2V4cExpdGVyYWxFeHByZXNzaW9uLFxuICBVbmFyeUV4cHJlc3Npb24sXG4gIFN1cGVyRXhwcmVzc2lvbixcbiAgRmFsc2VFeHByZXNzaW9uLFxuICBUcnVlRXhwcmVzc2lvbixcbiAgVGhpc0V4cHJlc3Npb24sXG4gIE51bGxFeHByZXNzaW9uLFxuICBDb25zdHJ1Y3RvckV4cHJlc3Npb24sXG4gIFN0YXRlbWVudCxcbiAgVm9pZFN0YXRlbWVudCxcbiAgTGl0ZXJhbEtpbmQsXG4gIENvbW1lbnROb2RlLFxuICBEZWNsYXJhdGlvblN0YXRlbWVudCxcbiAgVGVtcGxhdGVMaXRlcmFsRXhwcmVzc2lvbixcbn0gZnJvbSBcIi4uL2FzXCI7XG5cbmltcG9ydCB7IEFic3RyYWN0VHJhbnNmb3JtVmlzaXRvciB9IGZyb20gXCIuL3Zpc2l0b3JcIjtcblxuZXhwb3J0IGNsYXNzIEJhc2VUcmFuc2Zvcm1WaXNpdG9yIGV4dGVuZHMgQWJzdHJhY3RUcmFuc2Zvcm1WaXNpdG9yPE5vZGU+IHtcbiAgZGVwdGg6IG51bWJlciA9IDA7XG5cbiAgX3Zpc2l0KG5vZGU6IE5vZGUpOiBOb2RlIHtcbiAgICBzd2l0Y2ggKG5vZGUua2luZCkge1xuICAgICAgY2FzZSBOb2RlS2luZC5TT1VSQ0U6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRTb3VyY2UoPFNvdXJjZT5ub2RlKTtcblxuICAgICAgfVxuXG4gICAgICAvLyB0eXBlc1xuXG4gICAgICBjYXNlIE5vZGVLaW5kLk5BTUVEVFlQRToge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdE5hbWVkVHlwZU5vZGUoPE5hbWVkVHlwZU5vZGU+bm9kZSk7XG4gICAgICB9XG4gICAgICBjYXNlIE5vZGVLaW5kLkZVTkNUSU9OVFlQRToge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdEZ1bmN0aW9uVHlwZU5vZGUoPEZ1bmN0aW9uVHlwZU5vZGU+bm9kZSk7XG4gICAgICB9XG4gICAgICBjYXNlIE5vZGVLaW5kLlRZUEVOQU1FOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0VHlwZU5hbWUoPFR5cGVOYW1lPm5vZGUpO1xuICAgICAgfVxuICAgICAgY2FzZSBOb2RlS2luZC5UWVBFUEFSQU1FVEVSOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0VHlwZVBhcmFtZXRlcig8VHlwZVBhcmFtZXRlck5vZGU+bm9kZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGV4cHJlc3Npb25zXG5cbiAgICAgIGNhc2UgTm9kZUtpbmQuRkFMU0U6XG4gICAgICBjYXNlIE5vZGVLaW5kLk5VTEw6XG4gICAgICBjYXNlIE5vZGVLaW5kLlNVUEVSOlxuICAgICAgY2FzZSBOb2RlS2luZC5USElTOlxuICAgICAgY2FzZSBOb2RlS2luZC5UUlVFOlxuICAgICAgY2FzZSBOb2RlS2luZC5DT05TVFJVQ1RPUjpcbiAgICAgIGNhc2UgTm9kZUtpbmQuSURFTlRJRklFUjoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdElkZW50aWZpZXJFeHByZXNzaW9uKDxJZGVudGlmaWVyRXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuQVNTRVJUSU9OOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0QXNzZXJ0aW9uRXhwcmVzc2lvbig8QXNzZXJ0aW9uRXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuQklOQVJZOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0QmluYXJ5RXhwcmVzc2lvbig8QmluYXJ5RXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuQ0FMTDoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdENhbGxFeHByZXNzaW9uKDxDYWxsRXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuQ0xBU1M6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRDbGFzc0V4cHJlc3Npb24oPENsYXNzRXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuQ09NTUE6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRDb21tYUV4cHJlc3Npb24oPENvbW1hRXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuRUxFTUVOVEFDQ0VTUzoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdEVsZW1lbnRBY2Nlc3NFeHByZXNzaW9uKDxFbGVtZW50QWNjZXNzRXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuRlVOQ1RJT046IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRGdW5jdGlvbkV4cHJlc3Npb24oPEZ1bmN0aW9uRXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuSU5TVEFOQ0VPRjoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdEluc3RhbmNlT2ZFeHByZXNzaW9uKDxJbnN0YW5jZU9mRXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuTElURVJBTDoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdExpdGVyYWxFeHByZXNzaW9uKDxMaXRlcmFsRXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuTkVXOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0TmV3RXhwcmVzc2lvbig8TmV3RXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuUEFSRU5USEVTSVpFRDoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdFBhcmVudGhlc2l6ZWRFeHByZXNzaW9uKDxQYXJlbnRoZXNpemVkRXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuUFJPUEVSVFlBQ0NFU1M6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRQcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb24oPFByb3BlcnR5QWNjZXNzRXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuVEVSTkFSWToge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdFRlcm5hcnlFeHByZXNzaW9uKDxUZXJuYXJ5RXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuVU5BUllQT1NURklYOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0VW5hcnlQb3N0Zml4RXhwcmVzc2lvbig8VW5hcnlQb3N0Zml4RXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuVU5BUllQUkVGSVg6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRVbmFyeVByZWZpeEV4cHJlc3Npb24oPFVuYXJ5UHJlZml4RXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cblxuICAgICAgLy8gc3RhdGVtZW50c1xuXG4gICAgICBjYXNlIE5vZGVLaW5kLkJMT0NLOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0QmxvY2tTdGF0ZW1lbnQoPEJsb2NrU3RhdGVtZW50Pm5vZGUpO1xuICAgICAgfVxuICAgICAgY2FzZSBOb2RlS2luZC5CUkVBSzoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdEJyZWFrU3RhdGVtZW50KDxCcmVha1N0YXRlbWVudD5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuQ09OVElOVUU6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRDb250aW51ZVN0YXRlbWVudCg8Q29udGludWVTdGF0ZW1lbnQ+bm9kZSk7XG4gICAgICB9XG4gICAgICBjYXNlIE5vZGVLaW5kLkRPOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0RG9TdGF0ZW1lbnQoPERvU3RhdGVtZW50Pm5vZGUpO1xuICAgICAgfVxuICAgICAgY2FzZSBOb2RlS2luZC5FTVBUWToge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdEVtcHR5U3RhdGVtZW50KDxFbXB0eVN0YXRlbWVudD5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuRVhQT1JUOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0RXhwb3J0U3RhdGVtZW50KDxFeHBvcnRTdGF0ZW1lbnQ+bm9kZSk7XG4gICAgICB9XG4gICAgICBjYXNlIE5vZGVLaW5kLkVYUE9SVERFRkFVTFQ6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRFeHBvcnREZWZhdWx0U3RhdGVtZW50KDxFeHBvcnREZWZhdWx0U3RhdGVtZW50Pm5vZGUpO1xuICAgICAgfVxuICAgICAgY2FzZSBOb2RlS2luZC5FWFBPUlRJTVBPUlQ6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRFeHBvcnRJbXBvcnRTdGF0ZW1lbnQoPEV4cG9ydEltcG9ydFN0YXRlbWVudD5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuRVhQUkVTU0lPTjoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdEV4cHJlc3Npb25TdGF0ZW1lbnQoPEV4cHJlc3Npb25TdGF0ZW1lbnQ+bm9kZSk7XG4gICAgICB9XG4gICAgICBjYXNlIE5vZGVLaW5kLkZPUjoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdEZvclN0YXRlbWVudCg8Rm9yU3RhdGVtZW50Pm5vZGUpO1xuICAgICAgfVxuICAgICAgY2FzZSBOb2RlS2luZC5JRjoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdElmU3RhdGVtZW50KDxJZlN0YXRlbWVudD5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuSU1QT1JUOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0SW1wb3J0U3RhdGVtZW50KDxJbXBvcnRTdGF0ZW1lbnQ+bm9kZSk7XG4gICAgICB9XG4gICAgICBjYXNlIE5vZGVLaW5kLlJFVFVSTjoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdFJldHVyblN0YXRlbWVudCg8UmV0dXJuU3RhdGVtZW50Pm5vZGUpO1xuICAgICAgfVxuICAgICAgY2FzZSBOb2RlS2luZC5TV0lUQ0g6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRTd2l0Y2hTdGF0ZW1lbnQoPFN3aXRjaFN0YXRlbWVudD5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuVEhST1c6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRUaHJvd1N0YXRlbWVudCg8VGhyb3dTdGF0ZW1lbnQ+bm9kZSk7XG4gICAgICB9XG4gICAgICBjYXNlIE5vZGVLaW5kLlRSWToge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdFRyeVN0YXRlbWVudCg8VHJ5U3RhdGVtZW50Pm5vZGUpO1xuICAgICAgfVxuICAgICAgY2FzZSBOb2RlS2luZC5WQVJJQUJMRToge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdFZhcmlhYmxlU3RhdGVtZW50KDxWYXJpYWJsZVN0YXRlbWVudD5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuV0hJTEU6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRXaGlsZVN0YXRlbWVudCg8V2hpbGVTdGF0ZW1lbnQ+bm9kZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGRlY2xhcmF0aW9uIHN0YXRlbWVudHNcblxuICAgICAgY2FzZSBOb2RlS2luZC5DTEFTU0RFQ0xBUkFUSU9OOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0Q2xhc3NEZWNsYXJhdGlvbig8Q2xhc3NEZWNsYXJhdGlvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuRU5VTURFQ0xBUkFUSU9OOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0RW51bURlY2xhcmF0aW9uKDxFbnVtRGVjbGFyYXRpb24+bm9kZSk7XG4gICAgICB9XG4gICAgICBjYXNlIE5vZGVLaW5kLkVOVU1WQUxVRURFQ0xBUkFUSU9OOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0RW51bVZhbHVlRGVjbGFyYXRpb24oPEVudW1WYWx1ZURlY2xhcmF0aW9uPm5vZGUpO1xuICAgICAgfVxuICAgICAgY2FzZSBOb2RlS2luZC5GSUVMRERFQ0xBUkFUSU9OOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0RmllbGREZWNsYXJhdGlvbig8RmllbGREZWNsYXJhdGlvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuRlVOQ1RJT05ERUNMQVJBVElPTjoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdEZ1bmN0aW9uRGVjbGFyYXRpb24oPEZ1bmN0aW9uRGVjbGFyYXRpb24+bm9kZSk7XG4gICAgICB9XG4gICAgICBjYXNlIE5vZGVLaW5kLklNUE9SVERFQ0xBUkFUSU9OOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0SW1wb3J0RGVjbGFyYXRpb24oPEltcG9ydERlY2xhcmF0aW9uPm5vZGUpO1xuICAgICAgfVxuICAgICAgY2FzZSBOb2RlS2luZC5JTlRFUkZBQ0VERUNMQVJBVElPTjoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdEludGVyZmFjZURlY2xhcmF0aW9uKDxJbnRlcmZhY2VEZWNsYXJhdGlvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuTUVUSE9EREVDTEFSQVRJT046IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRNZXRob2REZWNsYXJhdGlvbig8TWV0aG9kRGVjbGFyYXRpb24+bm9kZSk7XG4gICAgICB9XG4gICAgICBjYXNlIE5vZGVLaW5kLk5BTUVTUEFDRURFQ0xBUkFUSU9OOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0TmFtZXNwYWNlRGVjbGFyYXRpb24oPE5hbWVzcGFjZURlY2xhcmF0aW9uPm5vZGUpO1xuICAgICAgfVxuICAgICAgY2FzZSBOb2RlS2luZC5UWVBFREVDTEFSQVRJT046IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRUeXBlRGVjbGFyYXRpb24oPFR5cGVEZWNsYXJhdGlvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuVkFSSUFCTEVERUNMQVJBVElPTjoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdFZhcmlhYmxlRGVjbGFyYXRpb24oPFZhcmlhYmxlRGVjbGFyYXRpb24+bm9kZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIG90aGVyXG5cbiAgICAgIGNhc2UgTm9kZUtpbmQuREVDT1JBVE9SOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0RGVjb3JhdG9yTm9kZSg8RGVjb3JhdG9yTm9kZT5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuRVhQT1JUTUVNQkVSOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0RXhwb3J0TWVtYmVyKDxFeHBvcnRNZW1iZXI+bm9kZSk7XG4gICAgICB9XG4gICAgICBjYXNlIE5vZGVLaW5kLlBBUkFNRVRFUjoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdFBhcmFtZXRlcig8UGFyYW1ldGVyTm9kZT5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUtpbmQuU1dJVENIQ0FTRToge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdFN3aXRjaENhc2UoPFN3aXRjaENhc2U+bm9kZSk7XG4gICAgICB9XG4gICAgICBjYXNlIE5vZGVLaW5kLklOREVYU0lHTkFUVVJFOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0SW5kZXhTaWduYXR1cmUoPEluZGV4U2lnbmF0dXJlTm9kZT5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFzc2VydChmYWxzZSk7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRTdGF0ZW1lbnQobm9kZTogU3RhdGVtZW50KTogU3RhdGVtZW50IHtcbiAgICByZXR1cm4gbm9kZSA9IHRoaXMudmlzaXQobm9kZSkgYXMgU3RhdGVtZW50O1xuICB9XG5cbiAgdmlzaXRTb3VyY2Uobm9kZTogU291cmNlKTogU291cmNlIHtcbiAgICBsZXQgc3RhdGVtZW50czogU3RhdGVtZW50W10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IHN0bXQgb2Ygbm9kZS5zdGF0ZW1lbnRzKSB7XG4gICAgICB0aGlzLmRlcHRoKys7XG4gICAgICBzdGF0ZW1lbnRzLnB1c2godGhpcy52aXNpdFN0YXRlbWVudChzdG10KSk7XG4gICAgICB0aGlzLmRlcHRoLS07XG4gICAgfVxuICAgIG5vZGUuc3RhdGVtZW50cyA9IHN0YXRlbWVudHM7XG4gICAgcmV0dXJuIG5vZGVcbiAgfVxuXG4gIHZpc2l0VHlwZU5vZGUobm9kZTogVHlwZU5vZGUpOiBUeXBlTm9kZSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdFR5cGVOYW1lKG5vZGU6IFR5cGVOYW1lKTogVHlwZU5hbWUge1xuICAgIG5vZGUuaWRlbnRpZmllciA9IHRoaXMudmlzaXRJZGVudGlmaWVyRXhwcmVzc2lvbihub2RlLmlkZW50aWZpZXIpO1xuICAgIGlmIChub2RlLm5leHQpIHtcbiAgICAgIG5vZGUubmV4dCA9IHRoaXMudmlzaXQobm9kZS5uZXh0KSBhcyBUeXBlTmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdE5hbWVkVHlwZU5vZGUobm9kZTogTmFtZWRUeXBlTm9kZSk6IE5hbWVkVHlwZU5vZGUge1xuICAgIG5vZGUubmFtZSA9IHRoaXMudmlzaXQobm9kZS5uYW1lKSBhcyBUeXBlTmFtZTtcbiAgICBub2RlLnR5cGVBcmd1bWVudHMgPSB0aGlzLnZpc2l0KG5vZGUudHlwZUFyZ3VtZW50cykgYXMgVHlwZU5vZGVbXSB8IG51bGw7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdEZ1bmN0aW9uVHlwZU5vZGUobm9kZTogRnVuY3Rpb25UeXBlTm9kZSk6IEZ1bmN0aW9uVHlwZU5vZGUge1xuICAgIGxldCBwYXJhbXM6IFBhcmFtZXRlck5vZGVbXSA9IFtdO1xuICAgIGZvciAobGV0IHBhcmFtIG9mIG5vZGUucGFyYW1ldGVycykge1xuICAgICAgcGFyYW1zLnB1c2godGhpcy52aXNpdFBhcmFtZXRlcihwYXJhbSkpO1xuICAgIH1cbiAgICBub2RlLnBhcmFtZXRlcnMgPSBwYXJhbXM7XG4gICAgbm9kZS5yZXR1cm5UeXBlID0gdGhpcy52aXNpdChub2RlLnJldHVyblR5cGUpIGFzIFR5cGVOb2RlO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRUeXBlUGFyYW1ldGVyKG5vZGU6IFR5cGVQYXJhbWV0ZXJOb2RlKTogVHlwZVBhcmFtZXRlck5vZGUge1xuICAgIG5vZGUubmFtZSA9IHRoaXMudmlzaXQobm9kZS5uYW1lKSBhcyBJZGVudGlmaWVyRXhwcmVzc2lvbjtcbiAgICBpZiAobm9kZS5leHRlbmRzVHlwZSkgbm9kZS5leHRlbmRzVHlwZSA9IHRoaXMudmlzaXQobm9kZS5leHRlbmRzVHlwZSkgYXMgTmFtZWRUeXBlTm9kZTtcbiAgICBpZiAobm9kZS5kZWZhdWx0VHlwZSkgbm9kZS5kZWZhdWx0VHlwZSA9IHRoaXMudmlzaXQobm9kZS5kZWZhdWx0VHlwZSkgYXMgTmFtZWRUeXBlTm9kZTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0SWRlbnRpZmllckV4cHJlc3Npb24obm9kZTogSWRlbnRpZmllckV4cHJlc3Npb24pOiBJZGVudGlmaWVyRXhwcmVzc2lvbiB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdEFycmF5TGl0ZXJhbEV4cHJlc3Npb24obm9kZTogQXJyYXlMaXRlcmFsRXhwcmVzc2lvbik6IEFycmF5TGl0ZXJhbEV4cHJlc3Npb24ge1xuICAgIG5vZGUuZWxlbWVudEV4cHJlc3Npb25zID0gbm9kZS5lbGVtZW50RXhwcmVzc2lvbnMubWFwKGUgPT4gdGhpcy52aXNpdChlKSBhcyBFeHByZXNzaW9uKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0T2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24obm9kZTogT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24pOiBPYmplY3RMaXRlcmFsRXhwcmVzc2lvbiB7XG4gICAgaWYgKG5vZGUudmFsdWVzICYmIG5vZGUubmFtZXMpIHtcbiAgICAgIGFzc2VydChub2RlLnZhbHVlcy5sZW5ndGggPT0gbm9kZS5uYW1lcy5sZW5ndGgpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLnZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBub2RlLm5hbWVzW2ldID0gdGhpcy52aXNpdChub2RlLm5hbWVzW2ldKSBhcyBJZGVudGlmaWVyRXhwcmVzc2lvbjtcbiAgICAgICAgbm9kZS52YWx1ZXNbaV0gPSB0aGlzLnZpc2l0KG5vZGUudmFsdWVzW2ldKSBhcyBFeHByZXNzaW9uO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0QXNzZXJ0aW9uRXhwcmVzc2lvbihub2RlOiBBc3NlcnRpb25FeHByZXNzaW9uKTogQXNzZXJ0aW9uRXhwcmVzc2lvbiB7XG4gICAgaWYgKG5vZGUudG9UeXBlKSBub2RlLnRvVHlwZSA9IHRoaXMudmlzaXQobm9kZS50b1R5cGUpIGFzIFR5cGVOb2RlO1xuICAgIG5vZGUuZXhwcmVzc2lvbiA9IHRoaXMudmlzaXQobm9kZS5leHByZXNzaW9uKSBhcyBFeHByZXNzaW9uO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRCaW5hcnlFeHByZXNzaW9uKG5vZGU6IEJpbmFyeUV4cHJlc3Npb24pOiBCaW5hcnlFeHByZXNzaW9uIHtcbiAgICBub2RlLmxlZnQgPSB0aGlzLnZpc2l0KG5vZGUubGVmdCkgYXMgRXhwcmVzc2lvbjtcbiAgICBub2RlLnJpZ2h0ID0gdGhpcy52aXNpdChub2RlLnJpZ2h0KSBhcyBFeHByZXNzaW9uO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRDYWxsRXhwcmVzc2lvbihub2RlOiBDYWxsRXhwcmVzc2lvbik6IEV4cHJlc3Npb24ge1xuICAgIG5vZGUuZXhwcmVzc2lvbiA9IHRoaXMudmlzaXQobm9kZS5leHByZXNzaW9uKSBhcyBFeHByZXNzaW9uO1xuICAgIG5vZGUudHlwZUFyZ3VtZW50cyA9IHRoaXMudmlzaXQobm9kZS50eXBlQXJndW1lbnRzKSBhcyBUeXBlTm9kZVtdIHwgbnVsbDtcbiAgICBub2RlLmFyZ3MgPSB0aGlzLnZpc2l0KG5vZGUuYXJncykgYXMgRXhwcmVzc2lvbltdO1xuICAgIHRoaXMudmlzaXRBcmd1bWVudHMobm9kZS50eXBlQXJndW1lbnRzLCBub2RlLmFyZ3MpO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRBcmd1bWVudHModHlwZUFyZ3VtZW50czogVHlwZU5vZGVbXSB8IG51bGwsIGFyZ3M6IEV4cHJlc3Npb25bXSk6IHZvaWQge1xuXG4gIH1cblxuICB2aXNpdENsYXNzRXhwcmVzc2lvbihub2RlOiBDbGFzc0V4cHJlc3Npb24pOiBDbGFzc0V4cHJlc3Npb24ge1xuICAgIG5vZGUuZGVjbGFyYXRpb24gPSB0aGlzLnZpc2l0KG5vZGUuZGVjbGFyYXRpb24pIGFzIENsYXNzRGVjbGFyYXRpb247XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdENvbW1hRXhwcmVzc2lvbihub2RlOiBDb21tYUV4cHJlc3Npb24pOiBDb21tYUV4cHJlc3Npb24ge1xuICAgIG5vZGUuZXhwcmVzc2lvbnMgPSB0aGlzLnZpc2l0KG5vZGUuZXhwcmVzc2lvbnMpIGFzIEV4cHJlc3Npb25bXTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0RWxlbWVudEFjY2Vzc0V4cHJlc3Npb24obm9kZTogRWxlbWVudEFjY2Vzc0V4cHJlc3Npb24pOiBFbGVtZW50QWNjZXNzRXhwcmVzc2lvbiB7XG4gICAgbm9kZS5lbGVtZW50RXhwcmVzc2lvbiA9IHRoaXMudmlzaXQobm9kZS5lbGVtZW50RXhwcmVzc2lvbikgYXMgRXhwcmVzc2lvbjtcbiAgICBub2RlLmV4cHJlc3Npb24gPSB0aGlzLnZpc2l0KG5vZGUuZXhwcmVzc2lvbikgYXMgRXhwcmVzc2lvbjtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0RnVuY3Rpb25FeHByZXNzaW9uKG5vZGU6IEZ1bmN0aW9uRXhwcmVzc2lvbik6IE5vZGUge1xuICAgIG5vZGUuZGVjbGFyYXRpb24gPSB0aGlzLnZpc2l0KG5vZGUuZGVjbGFyYXRpb24pIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdExpdGVyYWxFeHByZXNzaW9uKG5vZGU6IExpdGVyYWxFeHByZXNzaW9uKTogTGl0ZXJhbEV4cHJlc3Npb24ge1xuICAgIHN3aXRjaCAobm9kZS5saXRlcmFsS2luZCkge1xuICAgICAgY2FzZSBMaXRlcmFsS2luZC5BUlJBWToge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdEFycmF5TGl0ZXJhbEV4cHJlc3Npb24oPEFycmF5TGl0ZXJhbEV4cHJlc3Npb24+bm9kZSk7XG4gICAgICB9XG4gICAgICBjYXNlIExpdGVyYWxLaW5kLkZMT0FUOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0RmxvYXRMaXRlcmFsRXhwcmVzc2lvbig8RmxvYXRMaXRlcmFsRXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTGl0ZXJhbEtpbmQuSU5URUdFUjoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdEludGVnZXJMaXRlcmFsRXhwcmVzc2lvbig8SW50ZWdlckxpdGVyYWxFeHByZXNzaW9uPm5vZGUpO1xuICAgICAgfVxuICAgICAgY2FzZSBMaXRlcmFsS2luZC5PQkpFQ1Q6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRPYmplY3RMaXRlcmFsRXhwcmVzc2lvbig8T2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24+bm9kZSk7XG4gICAgICB9XG4gICAgICBjYXNlIExpdGVyYWxLaW5kLlJFR0VYUDoge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdFJlZ2V4cExpdGVyYWxFeHByZXNzaW9uKDxSZWdleHBMaXRlcmFsRXhwcmVzc2lvbj5ub2RlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgTGl0ZXJhbEtpbmQuU1RSSU5HOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0U3RyaW5nTGl0ZXJhbEV4cHJlc3Npb24oPFN0cmluZ0xpdGVyYWxFeHByZXNzaW9uPm5vZGUpO1xuICAgICAgfVxuICAgICAgY2FzZSBMaXRlcmFsS2luZC5URU1QTEFURToge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdFRlbXBsYXRlTGl0ZXJhbEV4cHJlc3Npb24oPFRlbXBsYXRlTGl0ZXJhbEV4cHJlc3Npb24+bm9kZSk7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIExpdGVyYWxLaW5kOiBcIiArIG5vZGUubGl0ZXJhbEtpbmQpO1xuICAgIH1cbiAgfVxuXG4gIHZpc2l0RmxvYXRMaXRlcmFsRXhwcmVzc2lvbihub2RlOiBGbG9hdExpdGVyYWxFeHByZXNzaW9uKTogRmxvYXRMaXRlcmFsRXhwcmVzc2lvbiB7IHJldHVybiBub2RlOyB9XG5cbiAgdmlzaXRJbnN0YW5jZU9mRXhwcmVzc2lvbihub2RlOiBJbnN0YW5jZU9mRXhwcmVzc2lvbik6IEluc3RhbmNlT2ZFeHByZXNzaW9uIHtcbiAgICBub2RlLmV4cHJlc3Npb24gPSB0aGlzLnZpc2l0KG5vZGUuZXhwcmVzc2lvbikgYXMgRXhwcmVzc2lvbjtcbiAgICBub2RlLmlzVHlwZSA9IHRoaXMudmlzaXQobm9kZS5pc1R5cGUpIGFzIFR5cGVOb2RlO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRJbnRlZ2VyTGl0ZXJhbEV4cHJlc3Npb24obm9kZTogSW50ZWdlckxpdGVyYWxFeHByZXNzaW9uKTogSW50ZWdlckxpdGVyYWxFeHByZXNzaW9uIHsgcmV0dXJuIG5vZGU7IH1cblxuICB2aXNpdFN0cmluZ0xpdGVyYWwoc3RyOiBzdHJpbmcsIHNpbmdsZVF1b3RlZD86IGJvb2xlYW4pOiBzdHJpbmcgeyByZXR1cm4gc3RyOyB9XG5cbiAgdmlzaXRTdHJpbmdMaXRlcmFsRXhwcmVzc2lvbihub2RlOiBTdHJpbmdMaXRlcmFsRXhwcmVzc2lvbik6IFN0cmluZ0xpdGVyYWxFeHByZXNzaW9uIHsgXG4gICAgbm9kZS52YWx1ZSA9IHRoaXMudmlzaXRTdHJpbmdMaXRlcmFsKG5vZGUudmFsdWUpO1xuICAgIHJldHVybiBub2RlOyBcbiAgfVxuXG4gIHZpc2l0VGVtcGxhdGVMaXRlcmFsRXhwcmVzc2lvbihub2RlOiBUZW1wbGF0ZUxpdGVyYWxFeHByZXNzaW9uKTogVGVtcGxhdGVMaXRlcmFsRXhwcmVzc2lvbiB7IHJldHVybiBub2RlOyB9XG5cbiAgdmlzaXRSZWdleHBMaXRlcmFsRXhwcmVzc2lvbihub2RlOiBSZWdleHBMaXRlcmFsRXhwcmVzc2lvbik6IFJlZ2V4cExpdGVyYWxFeHByZXNzaW9uIHsgcmV0dXJuIG5vZGU7IH1cblxuICB2aXNpdE5ld0V4cHJlc3Npb24obm9kZTogTmV3RXhwcmVzc2lvbik6IE5ld0V4cHJlc3Npb24ge1xuICAgIG5vZGUudHlwZUFyZ3VtZW50cyA9IHRoaXMudmlzaXQobm9kZS50eXBlQXJndW1lbnRzKSBhcyBUeXBlTm9kZVtdIHwgbnVsbDtcbiAgICB0aGlzLnZpc2l0QXJndW1lbnRzKG5vZGUudHlwZUFyZ3VtZW50cywgbm9kZS5hcmdzKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0UGFyZW50aGVzaXplZEV4cHJlc3Npb24obm9kZTogUGFyZW50aGVzaXplZEV4cHJlc3Npb24pOiBQYXJlbnRoZXNpemVkRXhwcmVzc2lvbiB7XG4gICAgbm9kZS5leHByZXNzaW9uID0gdGhpcy52aXNpdChub2RlLmV4cHJlc3Npb24pIGFzIEV4cHJlc3Npb247XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdFByb3BlcnR5QWNjZXNzRXhwcmVzc2lvbihub2RlOiBQcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb24pOiBQcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb24ge1xuICAgIG5vZGUucHJvcGVydHkgPSB0aGlzLnZpc2l0KG5vZGUucHJvcGVydHkpIGFzIElkZW50aWZpZXJFeHByZXNzaW9uO1xuICAgIG5vZGUuZXhwcmVzc2lvbiA9IHRoaXMudmlzaXQobm9kZS5leHByZXNzaW9uKSBhcyBFeHByZXNzaW9uO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRUZXJuYXJ5RXhwcmVzc2lvbihub2RlOiBUZXJuYXJ5RXhwcmVzc2lvbik6IFRlcm5hcnlFeHByZXNzaW9uIHtcbiAgICBub2RlLmNvbmRpdGlvbiA9IHRoaXMudmlzaXQobm9kZS5jb25kaXRpb24pIGFzIEV4cHJlc3Npb247XG4gICAgbm9kZS5pZlRoZW4gPSB0aGlzLnZpc2l0KG5vZGUuaWZUaGVuKSBhcyBTdGF0ZW1lbnQ7XG4gICAgbm9kZS5pZkVsc2UgPSB0aGlzLnZpc2l0KG5vZGUuaWZFbHNlKSBhcyBTdGF0ZW1lbnQ7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdFVuYXJ5RXhwcmVzc2lvbihub2RlOiBVbmFyeUV4cHJlc3Npb24pOiBVbmFyeUV4cHJlc3Npb24ge1xuICAgIG5vZGUub3BlcmFuZCA9IHRoaXMudmlzaXQobm9kZS5vcGVyYW5kKSBhcyBFeHByZXNzaW9uO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRVbmFyeVBvc3RmaXhFeHByZXNzaW9uKG5vZGU6IFVuYXJ5UG9zdGZpeEV4cHJlc3Npb24pOiBVbmFyeVBvc3RmaXhFeHByZXNzaW9uIHtcbiAgICBub2RlLm9wZXJhbmQgPSB0aGlzLnZpc2l0KG5vZGUub3BlcmFuZCkgYXMgRXhwcmVzc2lvbjtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0VW5hcnlQcmVmaXhFeHByZXNzaW9uKG5vZGU6IFVuYXJ5UHJlZml4RXhwcmVzc2lvbik6IFVuYXJ5UHJlZml4RXhwcmVzc2lvbiB7XG4gICAgbm9kZS5vcGVyYW5kID0gdGhpcy52aXNpdChub2RlLm9wZXJhbmQpIGFzIEV4cHJlc3Npb247XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdFN1cGVyRXhwcmVzc2lvbihub2RlOiBTdXBlckV4cHJlc3Npb24pOiBTdXBlckV4cHJlc3Npb24geyByZXR1cm4gbm9kZTsgfVxuXG4gIHZpc2l0RmFsc2VFeHByZXNzaW9uKG5vZGU6IEZhbHNlRXhwcmVzc2lvbik6IEZhbHNlRXhwcmVzc2lvbiB7IHJldHVybiBub2RlOyB9XG5cbiAgdmlzaXRUcnVlRXhwcmVzc2lvbihub2RlOiBUcnVlRXhwcmVzc2lvbik6IFRydWVFeHByZXNzaW9uIHsgcmV0dXJuIG5vZGU7IH1cblxuICB2aXNpdFRoaXNFeHByZXNzaW9uKG5vZGU6IFRoaXNFeHByZXNzaW9uKTogVGhpc0V4cHJlc3Npb24geyByZXR1cm4gbm9kZTsgfVxuXG4gIHZpc2l0TnVsbEV4cGVyc3Npb24obm9kZTogTnVsbEV4cHJlc3Npb24pOiBOdWxsRXhwcmVzc2lvbiB7IHJldHVybiBub2RlOyB9XG5cbiAgdmlzaXRDb25zdHJ1Y3RvckV4cHJlc3Npb24obm9kZTogQ29uc3RydWN0b3JFeHByZXNzaW9uKTogQ29uc3RydWN0b3JFeHByZXNzaW9uIHsgcmV0dXJuIG5vZGU7IH1cblxuICB2aXNpdE5vZGVBbmRUZXJtaW5hdGUobm9kZTogU3RhdGVtZW50KTogU3RhdGVtZW50IHsgcmV0dXJuIG5vZGU7IH1cblxuICB2aXNpdEJsb2NrU3RhdGVtZW50KG5vZGU6IEJsb2NrU3RhdGVtZW50KTogQmxvY2tTdGF0ZW1lbnQge1xuICAgIHRoaXMuZGVwdGgrKztcbiAgICBub2RlLnN0YXRlbWVudHMgPSB0aGlzLnZpc2l0KG5vZGUuc3RhdGVtZW50cykgYXMgU3RhdGVtZW50W107XG4gICAgdGhpcy5kZXB0aC0tO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRCcmVha1N0YXRlbWVudChub2RlOiBCcmVha1N0YXRlbWVudCk6IEJyZWFrU3RhdGVtZW50IHtcbiAgICBpZiAobm9kZS5sYWJlbCkge1xuICAgICAgbm9kZS5sYWJlbCA9IHRoaXMudmlzaXQobm9kZS5sYWJlbCkgYXMgSWRlbnRpZmllckV4cHJlc3Npb247XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRDb250aW51ZVN0YXRlbWVudChub2RlOiBDb250aW51ZVN0YXRlbWVudCk6IENvbnRpbnVlU3RhdGVtZW50IHtcbiAgICBpZiAobm9kZS5sYWJlbCkge1xuICAgICAgbm9kZS5sYWJlbCA9IHRoaXMudmlzaXQobm9kZS5sYWJlbCkgYXMgSWRlbnRpZmllckV4cHJlc3Npb247XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRDbGFzc0RlY2xhcmF0aW9uKG5vZGU6IENsYXNzRGVjbGFyYXRpb24sIGlzRGVmYXVsdD86IGJvb2xlYW4pOiBDbGFzc0RlY2xhcmF0aW9uIHtcbiAgICBub2RlLm5hbWUgPSB0aGlzLnZpc2l0KG5vZGUubmFtZSkgYXMgSWRlbnRpZmllckV4cHJlc3Npb247XG4gICAgdGhpcy5kZXB0aCsrO1xuICAgIG5vZGUuZGVjb3JhdG9ycyA9IHRoaXMudmlzaXQobm9kZS5kZWNvcmF0b3JzKSBhcyBEZWNvcmF0b3JOb2RlW10gfCBudWxsO1xuICAgIGFzc2VydChcbiAgICAgIG5vZGUuaXNHZW5lcmljID8gbm9kZS50eXBlUGFyYW1ldGVycyAhPSBudWxsIDogbm9kZS50eXBlUGFyYW1ldGVycyA9PSBudWxsXG4gICAgKTtcbiAgICBpZiAobm9kZS5pc0dlbmVyaWMpIHtcbiAgICAgIG5vZGUudHlwZVBhcmFtZXRlcnMgPSB0aGlzLnZpc2l0KG5vZGUudHlwZVBhcmFtZXRlcnMpIGFzIFR5cGVQYXJhbWV0ZXJOb2RlW107XG4gICAgfVxuICAgIGlmIChub2RlLmV4dGVuZHNUeXBlKSB7XG4gICAgICBub2RlLmV4dGVuZHNUeXBlID0gdGhpcy52aXNpdChub2RlLmV4dGVuZHNUeXBlKSBhcyBOYW1lZFR5cGVOb2RlO1xuICAgIH1cbiAgICBub2RlLmltcGxlbWVudHNUeXBlcyA9IHRoaXMudmlzaXQobm9kZS5pbXBsZW1lbnRzVHlwZXMpIGFzIE5hbWVkVHlwZU5vZGVbXSB8IG51bGw7XG4gICAgbm9kZS5tZW1iZXJzID0gdGhpcy52aXNpdChub2RlLm1lbWJlcnMpIGFzIERlY2xhcmF0aW9uU3RhdGVtZW50W107XG4gICAgdGhpcy5kZXB0aC0tO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXREb1N0YXRlbWVudChub2RlOiBEb1N0YXRlbWVudCk6IERvU3RhdGVtZW50IHtcbiAgICBub2RlLmNvbmRpdGlvbiA9IHRoaXMudmlzaXQobm9kZS5jb25kaXRpb24pIGFzIEV4cHJlc3Npb247XG4gICAgbm9kZS5zdGF0ZW1lbnQgPSB0aGlzLnZpc2l0KG5vZGUuc3RhdGVtZW50KSBhcyBTdGF0ZW1lbnQ7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdEVtcHR5U3RhdGVtZW50KG5vZGU6IEVtcHR5U3RhdGVtZW50KTogRW1wdHlTdGF0ZW1lbnQgeyByZXR1cm4gbm9kZTsgfVxuXG4gIHZpc2l0RW51bURlY2xhcmF0aW9uKG5vZGU6IEVudW1EZWNsYXJhdGlvbiwgaXNEZWZhdWx0PzogYm9vbGVhbik6IEVudW1EZWNsYXJhdGlvbiB7XG4gICAgbm9kZS5uYW1lID0gdGhpcy52aXNpdChub2RlLm5hbWUpIGFzIElkZW50aWZpZXJFeHByZXNzaW9uO1xuICAgIG5vZGUuZGVjb3JhdG9ycyA9IHRoaXMudmlzaXQobm9kZS5kZWNvcmF0b3JzKSBhcyBEZWNvcmF0b3JOb2RlW10gfCBudWxsO1xuICAgIG5vZGUudmFsdWVzID0gdGhpcy52aXNpdChub2RlLnZhbHVlcykgYXMgRW51bVZhbHVlRGVjbGFyYXRpb25bXTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0RW51bVZhbHVlRGVjbGFyYXRpb24obm9kZTogRW51bVZhbHVlRGVjbGFyYXRpb24pOiBFbnVtVmFsdWVEZWNsYXJhdGlvbiB7XG4gICAgbm9kZS5uYW1lID0gdGhpcy52aXNpdChub2RlLm5hbWUpIGFzIElkZW50aWZpZXJFeHByZXNzaW9uO1xuICAgIGlmIChub2RlLmluaXRpYWxpemVyKSB7XG4gICAgICBub2RlLmluaXRpYWxpemVyID0gdGhpcy52aXNpdChub2RlLmluaXRpYWxpemVyKSBhcyBFeHByZXNzaW9uO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0RXhwb3J0SW1wb3J0U3RhdGVtZW50KG5vZGU6IEV4cG9ydEltcG9ydFN0YXRlbWVudCk6IEV4cG9ydEltcG9ydFN0YXRlbWVudCB7XG4gICAgbm9kZS5uYW1lID0gdGhpcy52aXNpdChub2RlLm5hbWUpIGFzIElkZW50aWZpZXJFeHByZXNzaW9uO1xuICAgIG5vZGUuZXh0ZXJuYWxOYW1lID0gdGhpcy52aXNpdChub2RlLmV4dGVybmFsTmFtZSkgYXMgSWRlbnRpZmllckV4cHJlc3Npb247XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdEV4cG9ydE1lbWJlcihub2RlOiBFeHBvcnRNZW1iZXIpOiBFeHBvcnRNZW1iZXIge1xuICAgIG5vZGUubG9jYWxOYW1lID0gdGhpcy52aXNpdChub2RlLmxvY2FsTmFtZSkgYXMgSWRlbnRpZmllckV4cHJlc3Npb247XG4gICAgbm9kZS5leHBvcnRlZE5hbWUgPSB0aGlzLnZpc2l0KG5vZGUuZXhwb3J0ZWROYW1lKSBhcyBJZGVudGlmaWVyRXhwcmVzc2lvbjtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0RXhwb3J0U3RhdGVtZW50KG5vZGU6IEV4cG9ydFN0YXRlbWVudCk6IEV4cG9ydFN0YXRlbWVudCB7XG4gICAgaWYgKG5vZGUucGF0aCkge1xuICAgICAgbm9kZS5wYXRoID0gdGhpcy52aXNpdChub2RlLnBhdGgpIGFzIFN0cmluZ0xpdGVyYWxFeHByZXNzaW9uO1xuICAgIH1cbiAgICBub2RlLm1lbWJlcnMgPSB0aGlzLnZpc2l0KG5vZGUubWVtYmVycykgYXMgRXhwb3J0TWVtYmVyW107XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdEV4cG9ydERlZmF1bHRTdGF0ZW1lbnQobm9kZTogRXhwb3J0RGVmYXVsdFN0YXRlbWVudCk6IEV4cG9ydERlZmF1bHRTdGF0ZW1lbnQge1xuICAgIG5vZGUuZGVjbGFyYXRpb24gPSB0aGlzLnZpc2l0KG5vZGUuZGVjbGFyYXRpb24pIGFzIERlY2xhcmF0aW9uU3RhdGVtZW50O1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRFeHByZXNzaW9uU3RhdGVtZW50KG5vZGU6IEV4cHJlc3Npb25TdGF0ZW1lbnQpOiBFeHByZXNzaW9uU3RhdGVtZW50IHtcbiAgICBub2RlLmV4cHJlc3Npb24gPSB0aGlzLnZpc2l0KG5vZGUuZXhwcmVzc2lvbikgYXMgRXhwcmVzc2lvbjtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0RmllbGREZWNsYXJhdGlvbihub2RlOiBGaWVsZERlY2xhcmF0aW9uKTogRmllbGREZWNsYXJhdGlvbiB7XG4gICAgbm9kZS5uYW1lID0gdGhpcy52aXNpdChub2RlLm5hbWUpIGFzIElkZW50aWZpZXJFeHByZXNzaW9uO1xuICAgIGlmIChub2RlLnR5cGUpIHtcbiAgICAgIG5vZGUudHlwZSA9IHRoaXMudmlzaXQobm9kZS50eXBlKSBhcyBUeXBlTm9kZTtcbiAgICB9XG4gICAgaWYgKG5vZGUuaW5pdGlhbGl6ZXIpIHtcbiAgICAgIG5vZGUuaW5pdGlhbGl6ZXIgPSB0aGlzLnZpc2l0KG5vZGUuaW5pdGlhbGl6ZXIpIGFzIEV4cHJlc3Npb247XG4gICAgfVxuICAgIG5vZGUuZGVjb3JhdG9ycyA9IHRoaXMudmlzaXQobm9kZS5kZWNvcmF0b3JzKSBhcyBEZWNvcmF0b3JOb2RlW10gfCBudWxsO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRGb3JTdGF0ZW1lbnQobm9kZTogRm9yU3RhdGVtZW50KTogRm9yU3RhdGVtZW50IHtcbiAgICBpZiAobm9kZS5pbml0aWFsaXplcikgbm9kZS5pbml0aWFsaXplciA9IHRoaXMudmlzaXQobm9kZS5pbml0aWFsaXplcikgYXMgU3RhdGVtZW50O1xuICAgIGlmIChub2RlLmNvbmRpdGlvbikgbm9kZS5jb25kaXRpb24gPSB0aGlzLnZpc2l0KG5vZGUuY29uZGl0aW9uKSBhcyBFeHByZXNzaW9uO1xuICAgIGlmIChub2RlLmluY3JlbWVudG9yKSBub2RlLmluY3JlbWVudG9yID0gdGhpcy52aXNpdChub2RlLmluY3JlbWVudG9yKSBhcyBFeHByZXNzaW9uO1xuICAgIG5vZGUuc3RhdGVtZW50ID0gdGhpcy52aXNpdChub2RlLnN0YXRlbWVudCkgYXMgU3RhdGVtZW50O1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRGdW5jdGlvbkRlY2xhcmF0aW9uKFxuICAgIG5vZGU6IEZ1bmN0aW9uRGVjbGFyYXRpb24sXG4gICAgaXNEZWZhdWx0PzogYm9vbGVhblxuICApOiBGdW5jdGlvbkRlY2xhcmF0aW9uIHtcbiAgICBub2RlLm5hbWUgPSB0aGlzLnZpc2l0KG5vZGUubmFtZSkgYXMgSWRlbnRpZmllckV4cHJlc3Npb247XG4gICAgbm9kZS5kZWNvcmF0b3JzID0gdGhpcy52aXNpdChub2RlLmRlY29yYXRvcnMpIGFzIERlY29yYXRvck5vZGVbXSB8IG51bGw7XG4gICAgaWYgKG5vZGUuaXNHZW5lcmljKSB7XG4gICAgICBub2RlLnR5cGVQYXJhbWV0ZXJzID0gdGhpcy52aXNpdChub2RlLnR5cGVQYXJhbWV0ZXJzKSBhcyBUeXBlUGFyYW1ldGVyTm9kZVtdO1xuICAgIH1cbiAgICBub2RlLnNpZ25hdHVyZSA9IHRoaXMudmlzaXQobm9kZS5zaWduYXR1cmUpIGFzIEZ1bmN0aW9uVHlwZU5vZGU7XG4gICAgdGhpcy5kZXB0aCsrO1xuICAgIGlmIChub2RlLmJvZHkpIG5vZGUuYm9keSA9IHRoaXMudmlzaXQobm9kZS5ib2R5KSBhcyBTdGF0ZW1lbnQ7XG4gICAgdGhpcy5kZXB0aC0tO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRGdW5jdGlvbkNvbW1vbihub2RlOiBGdW5jdGlvbkRlY2xhcmF0aW9uKTogRnVuY3Rpb25EZWNsYXJhdGlvbiB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdElmU3RhdGVtZW50KG5vZGU6IElmU3RhdGVtZW50KTogSWZTdGF0ZW1lbnQge1xuICAgIG5vZGUuY29uZGl0aW9uID0gdGhpcy52aXNpdChub2RlLmNvbmRpdGlvbikgYXMgRXhwcmVzc2lvbjtcbiAgICBub2RlLmlmVHJ1ZSA9IHRoaXMudmlzaXQobm9kZS5pZlRydWUpIGFzIFN0YXRlbWVudDtcbiAgICBpZiAobm9kZS5pZkZhbHNlKSBub2RlLmlmRmFsc2UgPSB0aGlzLnZpc2l0KG5vZGUuaWZGYWxzZSkgYXMgU3RhdGVtZW50O1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRJbXBvcnREZWNsYXJhdGlvbihub2RlOiBJbXBvcnREZWNsYXJhdGlvbik6IEltcG9ydERlY2xhcmF0aW9uIHtcbiAgICBub2RlLmZvcmVpZ25OYW1lID0gdGhpcy52aXNpdChub2RlLmZvcmVpZ25OYW1lKSBhcyBJZGVudGlmaWVyRXhwcmVzc2lvbjtcbiAgICBub2RlLm5hbWUgPSB0aGlzLnZpc2l0KG5vZGUubmFtZSkgYXMgSWRlbnRpZmllckV4cHJlc3Npb247XG4gICAgbm9kZS5kZWNvcmF0b3JzID0gdGhpcy52aXNpdChub2RlLmRlY29yYXRvcnMpIGFzIERlY29yYXRvck5vZGVbXSB8IG51bGw7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdEltcG9ydFN0YXRlbWVudChub2RlOiBJbXBvcnRTdGF0ZW1lbnQpOiBJbXBvcnRTdGF0ZW1lbnQge1xuICAgIGlmIChub2RlLm5hbWVzcGFjZU5hbWUpIG5vZGUubmFtZXNwYWNlTmFtZSA9IDxJZGVudGlmaWVyRXhwcmVzc2lvbj4gdGhpcy52aXNpdChub2RlLm5hbWVzcGFjZU5hbWUpO1xuICAgIG5vZGUuZGVjbGFyYXRpb25zID0gdGhpcy52aXNpdChub2RlLmRlY2xhcmF0aW9ucykgYXMgSW1wb3J0RGVjbGFyYXRpb25bXSB8IG51bGw7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdEluZGV4U2lnbmF0dXJlKG5vZGU6IEluZGV4U2lnbmF0dXJlTm9kZSk6IEluZGV4U2lnbmF0dXJlTm9kZSB7XG4gICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0SW50ZXJmYWNlRGVjbGFyYXRpb24oXG4gICAgbm9kZTogSW50ZXJmYWNlRGVjbGFyYXRpb24sXG4gICAgaXNEZWZhdWx0PzogYm9vbGVhblxuICApOiBJbnRlcmZhY2VEZWNsYXJhdGlvbiB7XG4gICAgbm9kZS5uYW1lID0gdGhpcy52aXNpdChub2RlLm5hbWUpIGFzIElkZW50aWZpZXJFeHByZXNzaW9uO1xuICAgIGlmIChub2RlLmlzR2VuZXJpYykge1xuICAgICAgbm9kZS50eXBlUGFyYW1ldGVycyA9IHRoaXMudmlzaXQobm9kZS50eXBlUGFyYW1ldGVycykgYXMgVHlwZVBhcmFtZXRlck5vZGVbXSB8IG51bGw7XG4gICAgfVxuICAgIG5vZGUuaW1wbGVtZW50c1R5cGVzID0gdGhpcy52aXNpdChub2RlLmltcGxlbWVudHNUeXBlcykgYXMgTmFtZWRUeXBlTm9kZVtdIHwgbnVsbDtcbiAgICBpZiAobm9kZS5leHRlbmRzVHlwZSkgbm9kZS5leHRlbmRzVHlwZSA9IHRoaXMudmlzaXQobm9kZS5leHRlbmRzVHlwZSkgYXMgTmFtZWRUeXBlTm9kZTtcbiAgICB0aGlzLmRlcHRoKys7XG4gICAgbm9kZS5tZW1iZXJzID0gdGhpcy52aXNpdChub2RlLm1lbWJlcnMpIGFzIERlY2xhcmF0aW9uU3RhdGVtZW50W107XG4gICAgdGhpcy5kZXB0aC0tO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRNZXRob2REZWNsYXJhdGlvbihub2RlOiBNZXRob2REZWNsYXJhdGlvbik6IE1ldGhvZERlY2xhcmF0aW9uIHtcbiAgICBub2RlLm5hbWUgPSB0aGlzLnZpc2l0KG5vZGUubmFtZSkgYXMgSWRlbnRpZmllckV4cHJlc3Npb247XG4gICAgaWYgKG5vZGUuaXNHZW5lcmljKSB7XG4gICAgICBub2RlLnR5cGVQYXJhbWV0ZXJzID0gdGhpcy52aXNpdChub2RlLnR5cGVQYXJhbWV0ZXJzKSBhcyBUeXBlUGFyYW1ldGVyTm9kZVtdO1xuICAgIH1cbiAgICBub2RlLnNpZ25hdHVyZSA9IHRoaXMudmlzaXQobm9kZS5zaWduYXR1cmUpIGFzIEZ1bmN0aW9uVHlwZU5vZGU7XG4gICAgbm9kZS5kZWNvcmF0b3JzID0gdGhpcy52aXNpdChub2RlLmRlY29yYXRvcnMpIGFzIERlY29yYXRvck5vZGVbXSB8IG51bGw7XG4gICAgdGhpcy5kZXB0aCsrO1xuICAgIGlmIChub2RlLmJvZHkpIG5vZGUuYm9keSA9IHRoaXMudmlzaXQobm9kZS5ib2R5KSBhcyBTdGF0ZW1lbnQ7XG4gICAgdGhpcy5kZXB0aC0tO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXROYW1lc3BhY2VEZWNsYXJhdGlvbihcbiAgICBub2RlOiBOYW1lc3BhY2VEZWNsYXJhdGlvbixcbiAgICBpc0RlZmF1bHQ/OiBib29sZWFuXG4gICk6IE5hbWVzcGFjZURlY2xhcmF0aW9uIHtcbiAgICBub2RlLm5hbWUgPSB0aGlzLnZpc2l0KG5vZGUubmFtZSkgYXMgSWRlbnRpZmllckV4cHJlc3Npb247XG4gICAgbm9kZS5kZWNvcmF0b3JzID0gdGhpcy52aXNpdChub2RlLmRlY29yYXRvcnMpIGFzIERlY29yYXRvck5vZGVbXSB8IG51bGw7XG4gICAgbm9kZS5tZW1iZXJzID0gdGhpcy52aXNpdChub2RlLm1lbWJlcnMpIGFzIERlY2xhcmF0aW9uU3RhdGVtZW50W107XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdFJldHVyblN0YXRlbWVudChub2RlOiBSZXR1cm5TdGF0ZW1lbnQpOiBSZXR1cm5TdGF0ZW1lbnQge1xuICAgIGlmIChub2RlLnZhbHVlKSBub2RlLnZhbHVlID0gdGhpcy52aXNpdChub2RlLnZhbHVlKSBhcyBFeHByZXNzaW9uO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRTd2l0Y2hDYXNlKG5vZGU6IFN3aXRjaENhc2UpOiBTd2l0Y2hDYXNlIHtcbiAgICBpZiAobm9kZS5sYWJlbCkgbm9kZS5sYWJlbCA9IHRoaXMudmlzaXQobm9kZS5sYWJlbCkgYXMgRXhwcmVzc2lvbjtcbiAgICBub2RlLnN0YXRlbWVudHMgPSB0aGlzLnZpc2l0KG5vZGUuc3RhdGVtZW50cykgYXMgU3RhdGVtZW50W107XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdFN3aXRjaFN0YXRlbWVudChub2RlOiBTd2l0Y2hTdGF0ZW1lbnQpOiBTd2l0Y2hTdGF0ZW1lbnQge1xuICAgIG5vZGUuY29uZGl0aW9uID0gdGhpcy52aXNpdChub2RlLmNvbmRpdGlvbikgYXMgRXhwcmVzc2lvbjtcbiAgICB0aGlzLmRlcHRoKys7XG4gICAgbm9kZS5jYXNlcyA9IHRoaXMudmlzaXQobm9kZS5jYXNlcykgYXMgU3dpdGNoQ2FzZVtdO1xuICAgIHRoaXMuZGVwdGgtLTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0VGhyb3dTdGF0ZW1lbnQobm9kZTogVGhyb3dTdGF0ZW1lbnQpOiBUaHJvd1N0YXRlbWVudCB7XG4gICAgbm9kZS52YWx1ZSA9IHRoaXMudmlzaXQobm9kZS52YWx1ZSkgYXMgU3RhdGVtZW50O1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRUcnlTdGF0ZW1lbnQobm9kZTogVHJ5U3RhdGVtZW50KTogVHJ5U3RhdGVtZW50IHtcbiAgICBub2RlLnN0YXRlbWVudHMgPSB0aGlzLnZpc2l0KG5vZGUuc3RhdGVtZW50cykgYXMgU3RhdGVtZW50W107XG4gICAgaWYgKG5vZGUuY2F0Y2hWYXJpYWJsZSkgbm9kZS5jYXRjaFZhcmlhYmxlID0gdGhpcy52aXNpdChub2RlLmNhdGNoVmFyaWFibGUpIGFzIElkZW50aWZpZXJFeHByZXNzaW9uO1xuICAgIG5vZGUuY2F0Y2hTdGF0ZW1lbnRzID0gdGhpcy52aXNpdChub2RlLmNhdGNoU3RhdGVtZW50cykgYXMgU3RhdGVtZW50W107XG4gICAgbm9kZS5maW5hbGx5U3RhdGVtZW50cyA9IHRoaXMudmlzaXQobm9kZS5maW5hbGx5U3RhdGVtZW50cykgYXMgU3RhdGVtZW50W107XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdFR5cGVEZWNsYXJhdGlvbihub2RlOiBUeXBlRGVjbGFyYXRpb24pOiBUeXBlRGVjbGFyYXRpb24ge1xuICAgIG5vZGUubmFtZSA9IHRoaXMudmlzaXQobm9kZS5uYW1lKSBhcyBJZGVudGlmaWVyRXhwcmVzc2lvbjtcbiAgICBub2RlLmRlY29yYXRvcnMgPSB0aGlzLnZpc2l0KG5vZGUuZGVjb3JhdG9ycykgYXMgRGVjb3JhdG9yTm9kZVtdIHwgbnVsbDtcbiAgICBub2RlLnR5cGUgPSB0aGlzLnZpc2l0KG5vZGUudHlwZSkgYXMgVHlwZU5vZGU7XG4gICAgbm9kZS50eXBlUGFyYW1ldGVycyA9IHRoaXMudmlzaXQobm9kZS50eXBlUGFyYW1ldGVycykgYXMgVHlwZVBhcmFtZXRlck5vZGVbXTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0VmFyaWFibGVEZWNsYXJhdGlvbihub2RlOiBWYXJpYWJsZURlY2xhcmF0aW9uKTogVmFyaWFibGVEZWNsYXJhdGlvbiB7XG4gICAgbm9kZS5uYW1lID0gdGhpcy52aXNpdChub2RlLm5hbWUpIGFzIElkZW50aWZpZXJFeHByZXNzaW9uO1xuICAgIGlmIChub2RlLnR5cGUpIG5vZGUudHlwZSA9IHRoaXMudmlzaXQobm9kZS50eXBlKSBhcyBUeXBlTm9kZTtcbiAgICBpZiAobm9kZS5pbml0aWFsaXplcikgbm9kZS5pbml0aWFsaXplciA9IHRoaXMudmlzaXQobm9kZS5pbml0aWFsaXplcikgYXMgRXhwcmVzc2lvbjtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0VmFyaWFibGVTdGF0ZW1lbnQobm9kZTogVmFyaWFibGVTdGF0ZW1lbnQpOiBWYXJpYWJsZVN0YXRlbWVudCB7XG4gICAgbm9kZS5kZWNvcmF0b3JzID0gdGhpcy52aXNpdChub2RlLmRlY29yYXRvcnMpIGFzIERlY29yYXRvck5vZGVbXSB8IG51bGw7XG4gICAgbm9kZS5kZWNsYXJhdGlvbnMgPSB0aGlzLnZpc2l0KG5vZGUuZGVjbGFyYXRpb25zKSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uW107XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2aXNpdFdoaWxlU3RhdGVtZW50KG5vZGU6IFdoaWxlU3RhdGVtZW50KTogV2hpbGVTdGF0ZW1lbnQge1xuICAgIG5vZGUuY29uZGl0aW9uID0gdGhpcy52aXNpdChub2RlLmNvbmRpdGlvbikgYXMgRXhwcmVzc2lvbjtcbiAgICB0aGlzLmRlcHRoKys7XG4gICAgbm9kZS5zdGF0ZW1lbnQgPSB0aGlzLnZpc2l0KG5vZGUuc3RhdGVtZW50KSBhcyBTdGF0ZW1lbnQ7XG4gICAgdGhpcy5kZXB0aC0tO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmlzaXRWb2lkU3RhdGVtZW50KG5vZGU6IFZvaWRTdGF0ZW1lbnQpOiBWb2lkU3RhdGVtZW50IHsgcmV0dXJuIG5vZGU7IH1cblxuICB2aXNpdENvbW1lbnQobm9kZTogQ29tbWVudE5vZGUpOiBDb21tZW50Tm9kZSB7IHJldHVybiBub2RlOyB9XG5cbiAgdmlzaXREZWNvcmF0b3JOb2RlKG5vZGU6IERlY29yYXRvck5vZGUpOiBEZWNvcmF0b3JOb2RlIHtcbiAgICBub2RlLm5hbWUgPSB0aGlzLnZpc2l0KG5vZGUubmFtZSkgYXMgSWRlbnRpZmllckV4cHJlc3Npb247XG4gICAgbm9kZS5hcmdzID0gdGhpcy52aXNpdChub2RlLmFyZ3MpIGFzIEV4cHJlc3Npb25bXTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0UGFyYW1ldGVyKG5vZGU6IFBhcmFtZXRlck5vZGUpOiBQYXJhbWV0ZXJOb2RlIHtcbiAgICBub2RlLm5hbWUgPSB0aGlzLnZpc2l0KG5vZGUubmFtZSkgYXMgSWRlbnRpZmllckV4cHJlc3Npb247XG4gICAgaWYgKG5vZGUuaW1wbGljaXRGaWVsZERlY2xhcmF0aW9uKSB7XG4gICAgICBub2RlLmltcGxpY2l0RmllbGREZWNsYXJhdGlvbiA9IHRoaXMudmlzaXQobm9kZS5pbXBsaWNpdEZpZWxkRGVjbGFyYXRpb24pIGFzIEZpZWxkRGVjbGFyYXRpb247XG4gICAgfVxuICAgIGlmIChub2RlLmluaXRpYWxpemVyKSBub2RlLmluaXRpYWxpemVyID0gdGhpcy52aXNpdChub2RlLmluaXRpYWxpemVyKSBhcyBFeHByZXNzaW9uO1xuICAgIG5vZGUudHlwZSA9IHRoaXMudmlzaXQobm9kZS50eXBlKSBhcyBUeXBlTm9kZTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxufVxuIl19