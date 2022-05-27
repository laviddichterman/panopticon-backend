const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressWinston = require('express-winston');
const idempotency = require('express-idempotency');
const router = require('./routes/')()
const DatabaseManager = require("../config/database_manager");
module.exports = (async ({ database, logger }) => {
    // needs to run first
    await DatabaseManager({ dbconn: database }).Bootstrap();

    return express()
        .use(expressWinston.logger({
            winstonInstance: logger,
            msg: '{{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms',
            meta: false,
        }))
        .use(idempotency.idempotency())
        .use(cors())
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: false }))
        .use((req, res, next) => {
            req.base = `${req.protocol}://${req.get('host')}`
            req.logger = logger
            req.db = database
            return next()
        })
        .use('/api', router)
        .use((error, req, res, next) => {
            logger.error(error, error)
            res.status(error.status || 500).json({ error })
        });
})