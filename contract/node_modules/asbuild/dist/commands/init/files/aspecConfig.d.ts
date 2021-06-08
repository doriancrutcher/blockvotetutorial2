import { InitFile } from "../interfaces";
export declare class AspectConfigFile extends InitFile {
    path: string;
    description: string;
    getContent(): string;
    updateOldContent: null;
}
