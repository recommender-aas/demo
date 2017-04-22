'use strict';

const path = require('path');
const express = require('express');

const STATIC_DIR = path.join(__dirname, '../../../webapp/build');

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/*', express.static(STATIC_DIR));
  server.use(router);
};
