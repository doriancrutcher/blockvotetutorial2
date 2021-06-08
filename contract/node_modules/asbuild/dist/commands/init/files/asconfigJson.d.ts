import { InitFile } from "../interfaces";
export declare class AsconfigJsonFile extends InitFile {
    path: string;
    description: string;
    configObj: {
        targets: {
            debug: {
                binaryFile: string;
                textFile: string;
                sourceMap: boolean;
                debug: boolean;
            };
            release: {
                binaryFile: string;
                textFile: string;
                sourceMap: boolean;
                optimizeLevel: number;
                shrinkLevel: number;
                converge: boolean;
                noAssert: boolean;
            };
        };
        options: {};
    };
    getContent(): string;
    updateOldContent: null;
}
