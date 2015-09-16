"use strict";

var vimeoData = require("./oldData");
var VimeoMigrator = require("./converterScript");

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  var list = VimeoMigrator.convert(vimeoData);
  res.send(list);
});

var server = app.listen(3010, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Converter app listening at http://%s:%s', host, port);
});