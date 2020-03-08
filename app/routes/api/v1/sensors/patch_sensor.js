// allow us to set the temperature threshold settings and
// algorithm for the sensor

const Router = require('express').Router

module.exports = Router({ mergeParams: true })
  .patch('/v1/sensors/:sensor', async (req, res, next) => {
    try {
      req.db.sensor.findOneAndUpdate(
        { address: req.params.sensor },
        { min: req.body.min, max: req.body.max, algorithm: req.body.algorithm },
        { new: true },
        (err, doc) => {
          if (err) {
            req.logger.warning(`Unable to update sensor: ${req.params.sensor}`);
            res.status(404);
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