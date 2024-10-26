/**
 * Error-handling middleware that manages errors in the application.
 * Sends a JSON response with the error status and message if a status is provided; otherwise, defaults to a 500 status.
 *
 * @param {Error} err - The error object, which may contain a custom status and message.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the error-handling chain.
 */
const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message });
  }
};

export default errorHandler;
