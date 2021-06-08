import fs from "fs";
import { parserDatabase } from "./parser.mjs";
import { emit } from "./emitter.mjs";
import prettier from "prettier";

const databases = ["northamerica", "europe"];

const db = databases
  .map((d) => fs.readFileSync(`tzdb/iana/${d}`, "UTF8"))
  .map(parserDatabase)
  .reduce(
    (prev, curr) => ({
      zones: prev.zones.concat(curr.zones),
      rules: prev.rules.concat(curr.rules),
    }),
    { zones: [], rules: [] }
  );
const as = emit(db);

fs.writeFileSync(
  "assembly/tz/iana.ts",
  prettier.format(as, { parser: "typescript" })
  // as
);
