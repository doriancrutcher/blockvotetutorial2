import * as yargs from "yargs";
import { InitResult } from "./init/interfaces";
export declare const fmtCmdBuilder: (y: yargs.Argv) => yargs.Argv<{
    paths: string[];
} & {
    init: boolean | undefined;
} & {
    lint: boolean;
}>;
export declare const FmtCmd: yargs.CommandModule;
export declare function initConfig(baseDir: string): InitResult;
