import * as yargs from "yargs";
export declare function buildCmdBuilder(y: yargs.Argv): yargs.Argv<{
    baseDir: string;
} & {
    config: string;
} & {
    wat: boolean;
} & {
    outDir: string | undefined;
} & {
    target: string;
} & {
    verbose: boolean;
}>;
export declare const BuildCmd: yargs.CommandModule;
