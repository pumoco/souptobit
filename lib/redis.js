'use strict'

var redis = require('redis');
var client = redis.createClient();

client.on('error', function(err){
console.log("Error " + err);
});

client.on('connect', function () {
    console.log('connected');
});

module.exports = client;
