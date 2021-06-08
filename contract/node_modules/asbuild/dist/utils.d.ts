import * as asc from "assemblyscript/cli/asc";
import * as sinon from "sinon";
/**
 * @note Only for use by testing mechanism
 */
export declare function setGlobalAscOptions(ascOptions?: asc.APIOptions): void;
export declare function getGlobalAscOptions(): asc.APIOptions;
/**
 * @note Only for use by testing mechanism
 */
export declare function setGlobalCliCallback(callback?: (a: any) => number): void;
export declare function getGlobalCliCallback(): (a: any) => number;
export declare function ensureDirExists(filePath: string): void;
export declare function askYesNo(ques: string): Promise<boolean>;
export declare function log(message?: any, error?: boolean): void;
export declare function mockModule<T extends {
    [K: string]: any;
}>(moduleToMock: T, defaultMockValuesForMock: Partial<{
    [K in keyof T]: T[K];
}>): (sandbox: sinon.SinonSandbox, returnOverrides?: Partial<{ [K in keyof T]: T[K]; }> | undefined) => void;
