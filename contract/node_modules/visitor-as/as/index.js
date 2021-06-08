//@ts-ignore
const path = require("path");

let ascPath = Object.getOwnPropertyNames(require.cache).filter((s) =>
  s.endsWith("asc.js")
)[0];

//@ts-ignore
let assemblyscriptPath = Object.getOwnPropertyNames(require.cache).filter((s) =>
  s.endsWith("assemblyscript.js")
)[0];

let transformerPath;
if (assemblyscriptPath) {
  let splitPath = assemblyscriptPath.split(path.sep).slice(0, -2);
  transformerPath = splitPath.concat(["cli", "transform"]).join(path.sep);
} else {
  assemblyscriptPath = require.resolve("assemblyscript");
  ascPath = require.resolve("assemblyscript/cli/asc");
  transformerPath = require.resolve("assemblyscript/cli/transform");
}
const assemblyscript = require(assemblyscriptPath);

//@ts-ignore
module.exports.Transform = require(transformerPath).Transform;
module.exports = {
  ...require(ascPath),
  ...module.exports,
  ...assemblyscript,
  ...assemblyscript.util, // Need to add because newer version adds namespace
};
