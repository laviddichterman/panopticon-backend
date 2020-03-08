// allow us to set the temperature threshold settings and
// algorithm for the sensor

const Router = require('express').Router

module.exports = Router({ mergeParams: true })
  .patch('/v1/sensors/:sid', async (req, res, next) => {
    try {
      req.db.sensor.findByIdAndUpdate(
        req.params.sid,
        { min: req.body.min, max: req.body.max, algorithm: req.body.algorithm },
        { new: true },
        (err, doc) => {
          if (err) {
            req.logger.warn(`Unable to update sensor: ${req.params.sid}`);
            res.status(404).send(`Unable to update sensor: ${req.params.sid}`);
            throw err;
          }
          else {
            req.logger.info(`Successfully updated ${doc}`);
            res.status(200).send(doc);
          }
        });
    } catch (error) {
      next(error);
    }
  })