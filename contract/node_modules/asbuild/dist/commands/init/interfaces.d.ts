export declare enum InitResult {
    CREATED = 0,
    UPDATED = 1,
    EXISTS = 2
}
export declare abstract class InitFile {
    constructor();
    abstract path: string;
    abstract description: string;
    abstract updateOldContent: ((old: string) => string) | null;
    abstract getContent(): string;
    getRelativePath(baseDir: string): string;
    /**
     * Write the InitFile to given baseDir
     * @param baseDir Base directory where file will created in relative to
     */
    write(baseDir: string): InitResult;
}
