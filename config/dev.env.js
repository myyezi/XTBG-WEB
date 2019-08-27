"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // BASE_API: '"https://dev.xtbg.zdsxc.com/webapp/"',
    BASE_API: '"http://localhost:9063/"',
    //BASE_API: '"http://192.168.10.134:9053/"',
    // BASE_API: '"https://dev.sgcc.zdsxc.com/"',
    URL_API: '"https://dev.zdsxc.com/"',
    BASE_IP: '"dev.xtbg.zdsxc.com"',
    BASE_HOST:'443',
    BASE_MQQT:'"/wss/mqtt"',
    BASE_PCIM:'"1@@@"'
});
