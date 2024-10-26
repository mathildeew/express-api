import colors from "colors";

/**
 * Middleware function that logs the HTTP method and request URL in a color-coded format.
 * Applies different colors based on the HTTP method (e.g., GET, POST, PUT, DELETE).
 *
 * @param {Object} req - The request object.
 * @param {string} req.method - HTTP method of the request.
 * @param {string} req.protocol - Protocol used for the request.
 * @param {Function} req.get - Function to retrieve request headers.
 * @param {string} req.originalUrl - Original URL of the request.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const logger = (req, res, next) => {
  const methodColors = {
    GET: "green",
    POST: "blue",
    PUT: "yellow",
    DELETE: "red",
  };

  const color = methodColors[req.method] || white;

  console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`[color]);
  next();
};

export default logger;
