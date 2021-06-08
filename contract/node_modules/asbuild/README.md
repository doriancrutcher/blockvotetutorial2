# `asbuild` [![Stars](https://img.shields.io/github/stars/AssemblyScript/asbuild.svg?style=social&maxAge=3600&label=Star)](https://github.com/AssemblyScript/asbuild/stargazers)
*A simple build tool for [AssemblyScript](https://assemblyscript.org) projects, similar to `cargo`, etc.*

## 🚩 Table of Contents

- [Installing](#-installing)
- [Usage](#-usage)
  - [`asb init`](#asb-init---create-an-empty-project)
  - [`asb test`](#asb-test---run-as-pect-tests)
  - [`asb fmt`](#asb-fmt---format-as-files-using-eslint)
  - [`asb run`](#asb-run---run-a-wasi-binary)
  - [`asb build`](#asb-build---compile-the-project-using-asc)
- [Background](#-background)

## 🔧 Installing

Install it globally
```
npm install -g asbuild
```

Or, locally as dev dependencies

```
npm install --save-dev asbuild
```

## 💡 Usage 
```
Build tool for AssemblyScript projects.

Usage:
  asb [command] [options]

Commands:
  asb                 Alias of build command, to maintain back-ward
                      compatibility                                    [default]
  asb build           Compile a local package and all of its dependencies
                                                        [aliases: compile, make]
  asb init [baseDir]  Create a new AS package in an given directory
  asb test            Run as-pect tests
  asb fmt [paths..]   This utility formats current module using eslint.
                                                         [aliases: format, lint]

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

### `asb init` - Create an empty project
```
asb init [baseDir]

Create a new AS package in an given directory

Positionals:
  baseDir  Create a sample AS project in this directory  [string] [default: "."]

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
  --yes      Skip the interactive prompt              [boolean] [default: false]
```

### `asb test` - Run as-pect tests
```
asb test
Run as-pect tests

USAGE:
    asb test [options] -- [aspect_options]

Options:
  --version        Show version number                                 [boolean]
  --help           Show help                                           [boolean]
  --verbose, --vv  Print out arguments passed to as-pect
                                                      [boolean] [default: false]
```

### `asb fmt` - Format AS files using ESlint
```
asb fmt [paths..]

This utility formats current module using eslint.

Positionals:
  paths  Paths to format                                [array] [default: ["."]]

Initialisation:
  --init  Generates recommended eslint config for AS Projects          [boolean]

Miscellaneous
  --lint, --dry-run  Tries to fix problems without saving the changes to the
                     file system                      [boolean] [default: false]

Options:
  --version  Show version number                                       [boolean]
  --help     Show help 
```

### `asb run` - Run a WASI binary
```
asb run
Run a WASI binary

USAGE:
    asb run [options] [binary path] -- [binary options]

Positionals:
  binary  path to Wasm binary                                [string] [required]

Options:
  --version      Show version number                                   [boolean]
  --help         Show help                                             [boolean]
  --preopen, -p  comma separated list of directories to open.
                                   [default: "."]
```

### `asb build` - Compile the project using asc
```
asb build
Compile a local package and all of its dependencies

USAGE:
    asb build [entry_file] [options] -- [asc_options]

Options:
  --version      Show version number                                   [boolean]
  --help         Show help                                             [boolean]
  --baseDir, -d  Base directory of project.              [string] [default: "."]
  --config, -c   Path to asconfig file     [string] [default: "./asconfig.json"]
  --wat          Output wat file to outDir            [boolean] [default: false]
  --outDir       Directory to place built binaries. Default "./build/<target>/"
                                                                        [string]
  --target       Target for compilation            [string] [default: "release"]
  --verbose      Print out arguments passed to asc    [boolean] [default: false]

Examples:
  asb build                   Build release of 'assembly/index.ts to
                              build/release/packageName.wasm
  asb build --target release  Build a release binary
  asb build -- --measure      Pass argument to 'asc'
```

#### Defaults

##### Project structure

```
project/
  package.json   
  asconfig.json
  assembly/
    index.ts
  build/
    release/
      project.wasm
    debug/
      project.wasm
```
 - If no entry file passed and no `entry` field is in `asconfig.json`, `project/assembly/index.ts` is assumed.
 - `asconfig.json` allows for options for different compile targets, e.g. release, debug, etc.  `asc` defaults to the release target.
 - The default build directory is `./build`, and artifacts are placed at `./build/<target>/packageName.wasm`.

##### Workspaces

If a `workspace` field is added to a top level `asconfig.json` file, then each path in the array is built and placed into the top level `outDir`.

For example,

`asconfig.json`:
```json
{
  "workspaces": ["a", "b"]
}
```

Running `asb` in the directory below will use the top level build directory to place all the binaries.

```
project/
  package.json
  asconfig.json
  a/
    asconfig.json
    assembly/
      index.ts
  b/
    asconfig.json
    assembly/
      index.ts
  build/
    release/
      a.wasm
      b.wasm
    debug/
      a.wasm
      b.wasm
```

To see an example in action check out the [test workspace](./tests/build_test)




## 📖 Background

Asbuild started as wrapper around `asc` to provide an easier CLI interface and now has been extened to support other commands
like `init`, `test` and `fmt` just like `cargo` to become a one stop build tool for AS Projects. 

## 📜 License

This library is provided under the open-source
[MIT license](https://choosealicense.com/licenses/mit/).
