import { InitFile } from "../interfaces";
export declare class RootGitignoreFile extends InitFile {
    path: string;
    description: string;
    updateOldContent: (old: string) => string;
    getContent(): string;
}
export declare class BuildGitignoreFile extends InitFile {
    path: string;
    description: string;
    updateOldContent: (old: string) => string;
    getContent(): string;
}
