import { __is_prod__ } from "../utils/constants.js"

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  error.stack = null
  res.status(404)
  next(error)
}

export const errorHandler = (err, _req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: __is_prod__ ? null : err.stack
  })
}
