const { HTTP_STATUS } = require('../constants/api.constants')
const { errorResponse } = require('../utils/api.utils')
const logger = require('../utils/logger.utils')

const errorMiddleware = (err, req, res, next) => {
  const status = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR
  const message = err.message || 'An unexpected error ocurred'

  logger.error(message)
  return res.status(status).json(errorResponse(message))
}

module.exports = errorMiddleware
