const checkAuth = (req, res) => {
  const statusCode = 200;
  res.status(statusCode).json({
    status: statusCode,
    message: 'Auth successful',
  });
};
export default checkAuth;
