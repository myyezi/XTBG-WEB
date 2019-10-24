"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '"https://dev.xtbg.zdsxc.com/xtbg/"',
    // BASE_API: '"http://localhost:9063/"',
    URL_API: '"https://dev.zdsxc.com/"',
    BASE_IP: '"dev.xtbg.zdsxc.com"',
    BASE_HOST:'443',
    BASE_MQQT:'"/wss/mqtt"',
    BASE_PCIM:'"1@@@"'
});
