const responses = {
  unprocessable: (res, err) => res.status(422).send({
    status: 'Unprocessable Entity',
    message: err.details[0].message,
  }),
  success: (res, data) => {
    if (data) {
      res.status(200).send({
        status: 'success',
        data,
      });
    } else {
      res.status(200);
    }
  },
  unauthorised: res => res.status(401).send({
    status: 'Unauthorised',
    message: 'You lack privileges to access resource',
  }),
  wrongCredentials: res => res.status(400).send({
    status: 'Wrong Credentials',
    message: 'Provide correct login credentials',
  }),
  unauthenticated: res => res.status(400).send({
    status: 'Unauthenticated',
    message: 'Invalid or expired token',
  }),
  missingToken: res => res.status(400).send({
    status: 'Failed',
    message: 'missing token',
  }),
  notFound: res => res.status(404).json({
    status: 'NotFound',
    message: 'The requested resource could not be found',
  }),
};

export default responses;
