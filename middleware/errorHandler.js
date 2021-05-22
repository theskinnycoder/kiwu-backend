import { __is_prod__ } from "../utils/constants.js";

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.stack = null;
  res.status(404);
  next(error);
};

export const errorHandler = (err, _req, res, _next) => {
  let error,
    statusCode = 400;
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(val => val.message);
    error = messages;
  } else if (err.name === "CastError") {
    error = `Invalid ${err.path}: ${err.value}`;
  } else if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    error = `Duplicate field value: ${value}. Please use another value!`;
  } else {
    statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    error = err.message;
  }
  res.status(statusCode).json({
    error,
    stack: __is_prod__ ? null : err.stack,
  });
};
