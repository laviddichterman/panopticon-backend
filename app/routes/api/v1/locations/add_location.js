// creates a new location with no assigned sensors

const Router = require('express').Router

module.exports = Router({ mergeParams: true })
  .post('/v1/locations', async (req, res, next) => {
    try {
      const newlocation = new req.db.location({
        description: req.body.description,
        name: req.body.name,
        sensors: []
      });
      await newlocation.save();
      const location = `${req.base}${req.originalUrl}/${newlocation.id}`;
      res.setHeader('Location', location);
      res.status(201).send(newlocation);
    } catch (error) {
      next(error)
    }
  })