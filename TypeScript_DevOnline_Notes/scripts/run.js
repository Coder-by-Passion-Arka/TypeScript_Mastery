#!/usr/bin/env node
const path = require("path");
const cp = require("child_process");

const ts_file = process.argv[2];
if (!ts_file) {
  console.error("Missing file name");
  process.exit(1);
}

const distPath = path.join(
    __dirname, 
    "..", "dist", 
    ts_file + ".js"
);

const res = cp.spawnSync(
    process.execPath, 
    [distPath], 
    { stdio: "inherit" }
);
process.exit(res.status || 0);
