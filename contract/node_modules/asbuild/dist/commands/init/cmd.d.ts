import * as yargs from "yargs";
export declare const initCmdBuilder: (y: yargs.Argv) => yargs.Argv<{
    baseDir: string;
} & {
    yes: boolean;
}>;
export declare const InitCmd: yargs.CommandModule;
export declare function writeFiles(baseDir: string): void;
