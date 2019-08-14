"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // BASE_API: '"https://dev.xtbg.zdsxc.com/"',
    // BASE_API: '"http://localhost:9053/"'
    BASE_API: '"http://192.168.10.166:9053/"',
    // BASE_API: '"https://dev.sgcc.zdsxc.com/"',
});
