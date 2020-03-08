// gets location by id or returns 404. duh

const Router = require('express').Router

module.exports = Router({ mergeParams: true })
  .get('/v1/locations/:locid', (req, res, next) => {
    try {
      req.db.location.findById(req.params.locid, (err, data) => {
        if (err) { 
          req.logger.warning(`Unable to find location: ${req.params.locid}`);
          res.status(404)
        }
        else {
          res.status(200).send(data);
        }
      });
    } catch (error) {
      next(error)
    }
  })