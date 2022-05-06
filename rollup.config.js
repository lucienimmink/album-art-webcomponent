import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import dotenv from 'rollup-plugin-dotenv';

export default {
  input: ["out-tsc/src/album-art.js"],
  output: {
    file: "build/album-art.js",
    format: "esm",
    sourcemap: true,
  },
  plugins: [resolve(), dotenv(), babel(), terser()],
};
