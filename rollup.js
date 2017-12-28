/*eslint-disable */
import json from "rollup-plugin-json";
import npm from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";
import cjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import rootImport from "rollup-plugin-root-import";

const env = process.env.NODE_ENV == "production" ? true : false;
let plugins = [
  rootImport({
    root: "/client",
    useEntry: "prepend",
    extensions: ".js"
  }),
  cjs({
    include: ["node_modules/**"]
  }),
  npm({
    jsnext: true,
    main: true,
    browser: true
  }),
  json(),
  replace({
    "process.env.NODE_ENV": JSON.stringify("development")
  })
];
if (env)
  plugins.push(
    uglify(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  );

export default {
  input: "client/app.js",
  plugins: plugins,
  output: {
    file: "public/bundle.js",
    format: "iife",
    name: "app"
  }
};
