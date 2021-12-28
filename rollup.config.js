import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript";
import clear from "rollup-plugin-clear";

export default {
  input: "src/main.js",
  output: {
    name: "pagingPdf.js",
    dir: "./dist",
    format: "es"
  },
  plugins: [
    clear({
      targets: ["./dist"],
      watch: true
    }),
    resolve(),
    commonjs(),
    typescript()
  ]
};
