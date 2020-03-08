const mongoose = require('mongoose')
const glob = require('glob')
const path = require('path')

const DBUSER = process.env.DBUSER || null;
const DBPASS = process.env.DBPASS || null;
const DBENDPOINT = process.env.DBENDPOINT || 'mongodb://127.0.0.1:27017';
const DBTABLE = process.env.DBTABLE || "panopticon";

module.exports = ({ logger }) => {
  const url = process.env.MONGODB_URL
  mongoose.connect(`${DBENDPOINT}/${DBTABLE}`, 
    { useNewUrlParser: true, useUnifiedTopology: true, user: DBUSER, pass: DBPASS })
  const db = glob.sync('./schema/**/*.js', { cwd: __dirname })
    .map(filename => {
      return {
        schema: require(filename),
        name: path
          .basename(filename)
          .replace(path.extname(filename), ''),
      }
    })
    .map(({ name, schema }) => mongoose.model(name, schema))
    .reduce((db, model) => {
      return {
        ...db,
        [model.modelName]: model,
      }
    }, {})
  mongoose
    .connection
    .on('error', error => {
      throw error
    })
    .once('open', () => logger.info(`MongoDB connected at ${url}`))
  return db
}