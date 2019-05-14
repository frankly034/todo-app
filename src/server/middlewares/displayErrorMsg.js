const displayErrorMsg = (err, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: 'false',
    message: err.message,
  });
};
export default displayErrorMsg;
