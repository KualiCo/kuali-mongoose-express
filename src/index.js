'use strict'

/**
 * @function mongooseExpress
 * @description Express middleware that adds your mongoose models to the request
 * @param {mongoose.Connection} connection
 * @param {Object[]} schemas
 * @param {string} schemas[].name
 * @param {mongoose.Schema} schemas[].schema
 * @return {Function} The express middleware that adds `req.models` to the
 *   request object.
 */
const mongooseExpress = (connection, schemas = []) => {
  const models = schemas.reduce((allModels, { name, schema }) => {
    allModels[name] = connection.model(name, schema)
    return allModels
  }, {})

  return (req, res, next) => {
    req.models = models
    next()
  }
}

module.exports = mongooseExpress
