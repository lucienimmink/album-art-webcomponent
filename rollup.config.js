import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  input: ["src/album-art.js"],
  output: {
    file: "build/album-art.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [resolve(), babel()],
};
