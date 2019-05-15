const displayAuthError = (err, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: err.message,
  });
};
export default displayAuthError;
