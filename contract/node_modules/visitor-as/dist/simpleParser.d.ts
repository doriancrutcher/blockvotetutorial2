import { Expression, Statement } from "../as";
export declare class SimpleParser {
    private static parser;
    private static getTokenizer;
    static parseExpression(s: string): Expression;
    static parseStatement(s: string, topLevel?: boolean): Statement;
}
