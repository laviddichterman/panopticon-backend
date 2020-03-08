const PORT = process.env.PORT || 3002;

const nodemailer = require('nodemailer');
const express = require('express');
const http = require("http");
//const socketIo = require("socket.io");
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require("./logging");
const database = require('./database/create_database.js')({ logger })
const app = require('./app/create_express_app')({logger, database})

const server = http.createServer(app);
//const io = socketIo(server);

const GOOGLE_AUTH = require("./google_auth.json");
const { data } = require('./logging');

app.use(cors());
app.use(bodyParser.json());

server.listen(PORT, function () {
  logger.info("Server is running on Port: " + PORT);
});

module.exports = server;