// deletes a location by its ID

const Router = require('express').Router

module.exports = Router({ mergeParams: true })
  .delete('/v1/locations/:locid', (req, res, next) => {
    try {
      req.db.location.findByIdAndDelete(req.params.locid, (err, data) => {
        if (err) { 
          req.logger.warning(`Unable to delete location: ${req.params.locid}`);
          res.status(404);
          throw err;
        }
        else {
          req.logger.info(`Deleted ${data}`);
          res.status(200);
        }
      });
    } catch (error) {
      next(error)
    }
  })