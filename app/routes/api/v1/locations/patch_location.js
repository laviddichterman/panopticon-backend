// assigns listed sensors to a location
// also can be used to update name or description

const Router = require('express').Router

module.exports = Router({ mergeParams: true })
  .patch('/v1/locations/:locid', (req, res, next) => {
    try {
      req.db.location.findByIdAndUpdate(
        req.params.locid,
        { 
          sensors: req.body.sensors,
          name: req.body.name,
          description: req.body.description
        },
        { new: true },
        (err, doc) => {
          if (err) {
            req.logger.info(`Unable to update sensor: ${req.params.sensor}`);
            res.status(404).send(`Unable to update sensor: ${req.params.sensor}`);;
          }
          else {
            req.logger.info(`Successfully updated ${doc}`);
            res.status(200).send(doc);
          }
         });
    } catch (error) {
      next(error)
    }
  })