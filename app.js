'use strict';

var express = require('express');
var app = express();
var badges = require ('./controllers/badges')

app.use(express.json());


app.post('/', badges.save, badges.send, function (req, res) {
    res.send(` done!!!!!!!!!! `)
});

app.get('/badges', badges.get);

// app.post('/', function (req, res) {
//     res.send('hello world');
// });

app.listen(8000, function(){
    console.log(`Server is Listening on port 8000`);
});
