// getter for all locations

const Router = require('express').Router

module.exports = Router({ mergeParams: true })
  .get('/v1/locations', (req, res, next) => {
    try {
      req.db.location.find((err, data) => {
        if (err) { 
          req.logger.warn('Unable to find locations');
          res.status(500).send(err);
          throw err;
        }
        else {
          res.status(200).send(data);
        }
      });
    } catch (error) {
      next(error)
    }
  })