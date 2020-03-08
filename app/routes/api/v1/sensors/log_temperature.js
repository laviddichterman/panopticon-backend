// the bread and butter. log a temperature for a sensor
// creates the sensor if not already found

const Router = require('express').Router

module.exports = Router({ mergeParams: true })
    .post('/v1/sensors/:sensor', async (req, res, next) => {
        try {
            // add sensor if not found
            req.db.sensor.findOneAndUpdate(
                { address: req.params.sensor },
                {},
                { new: true, upsert: true },
                (err, doc) => { });
            // add temperature entry
            const temp_entry = new req.db.temp({
                sensor: req.params.sensor,
                timestamp: req.body.timestamp,
                temperature: req.body.temperature
            });
            await temp_entry.save();
            const location = `${req.base}${req.originalUrl}/${temp_entry.id}`;
            res.setHeader('Location', location);
            res.status(201).send(temp_entry);
        } catch (error) {
            next(error)
        }
    });