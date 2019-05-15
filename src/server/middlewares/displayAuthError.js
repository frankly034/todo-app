/**
 *
 * @constant
 *
 * @param {Object} err error object
 * @param {Object} res response object
 *
 * @returns {Object}
 *
 * @exports displayAuthError
 */
const displayAuthError = (err, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: 'false',
    message: err.message,
  });
};
export default displayAuthError;
