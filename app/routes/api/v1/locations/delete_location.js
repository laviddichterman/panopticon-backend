// deletes a location by its ID

const Router = require('express').Router

module.exports = Router({ mergeParams: true })
  .delete('/v1/locations/:locid', (req, res, next) => {
    try {
      req.db.location.findByIdAndDelete(req.params.locid, (err, data) => {
        if (err) { 
          req.logger.error(`Unable to delete location: ${req.params.locid}`);
          res.status(404);
          throw err;
        }
        else {
          if (!data) {
            req.logger.info(`Unable to delete location: ${req.params.locid}`);
            res.status(404).send(`Unable to delete location: ${req.params.locid}`);
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