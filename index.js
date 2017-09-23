#!/usr/bin/env node

var concat = require("concat-stream");

function bufferToDataUri( buffer ) {
    console.log("data:text/html;base64," + buffer.toString("base64"))
}

process.stdin.pipe( concat( bufferToDataUri ) );
