module.exports = (app) => {
  app.use(async (req, res, next) => {
    try {
      await next();
    } catch (err) {
      err.status = 404;
      next(err);
    }
  });

  const statusMsg = {
    400: 'Entity not found and will not proceed',
    401: 'Not authorized',
    403: 'Forbidden',
    404: 'Resource not found',
    405: 'Method not allowed',
    409: 'Record conflict',
    422: 'Unprocessable entity',
    429: 'Too many requests.',
    500: 'Network Error',
    501: 'Token Expired or Invalid',
  };

  //Error handler funciton
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    const error = process.env.NODE_ENV === 'development' ? err : {};
    const status = err.status || 501;
    //Respond to  client
    res.status(status).json({
      errMessage: statusMsg[status],
      ...error,
    });
  });
};
