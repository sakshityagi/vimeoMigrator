"use strict";
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send("Working");
});

var server = app.listen(3010, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Converter app listening at http://%s:%s', host, port);
});