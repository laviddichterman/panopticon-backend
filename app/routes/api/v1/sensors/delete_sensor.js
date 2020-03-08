// deletes a sensor by its sensor address
// deletes all associated sensor data

const Router = require('express').Router

module.exports = Router({ mergeParams: true })
  .delete('/v1/sensors/:sid', (req, res, next) => {
    try {
      req.db.temp.deleteMany(
        { sensor: req.params.sid },
        (err, data) => { }
        );
      req.db.sensor.findByIdAndDelete(
        req.params.sid,
        (err, data) => {
          if (err) {
            req.logger.error(`Unable to delete sensor: ${req.params.sid}`);
            res.status(500).send(`Unable to delete sensor: ${req.params.sid}`);
            throw err;
          }
          else {
            if (!data) {
              req.logger.info(`Unable to delete sensor: ${req.params.sid}`);
              res.status(404).send(`Unable to delete sensor: ${req.params.sid}`);
            }
            else {
              req.logger.info(`Deleted ${data}`);
              res.status(200).send(`Deleted ${data}`);
            }
          }
        });
    } catch (error) {
      next(error)
    }
  })