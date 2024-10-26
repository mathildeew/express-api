/**
 * Middleware function that handles 404 "Not Found" errors for undefined routes.
 * Creates an error with a 404 status and passes it to the next middleware in the error-handling chain.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the error-handling chain.
 */
const notFound = (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
};

export default notFound;
