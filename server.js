const PORT = process.env.PORT || 3002;

// const nodemailer = require('nodemailer');
const express = require('express');
const http = require("http");
const logger = require("./logging");
const DatabaseConnection = require('./database/create_database')({ logger });
const app = require('./app/create_express_app')({logger, database: DatabaseConnection})

const server = http.createServer(app);
// const io = socketIo(server);

// const GOOGLE_AUTH = require("./google_auth.json");
const { data } = require('./logging');

server.listen(PORT, function () {
  logger.info("Server is running on Port: " + PORT);
});

module.exports = server;