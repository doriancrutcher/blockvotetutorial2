import { AspectConfigFile } from "./aspecConfig";
import { AsconfigJsonFile } from "./asconfigJson";
import { AssemblyIndexFile, TsConfigFile } from "./assembly_files";
import { BuildGitignoreFile, RootGitignoreFile } from "./gitignores";
import { IndexJsFile } from "./indexJs";
import { PackageJsonFile } from "./packageJson";
import { AsPectTypesFile, ExampleTestFile } from "./test_files";
import { EslintConfigFile } from "./eslintConfig";
export declare const initFiles: (EslintConfigFile | PackageJsonFile | AspectConfigFile | AsconfigJsonFile | AssemblyIndexFile | TsConfigFile | RootGitignoreFile | BuildGitignoreFile | IndexJsFile | AsPectTypesFile | ExampleTestFile)[];
