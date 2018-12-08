const responses = {
  unprocessable: (res, err) => res.status(422).json({
    message: err.details[0].message,
  }),
  wrongParamType: res => res.status(400).json({
    message: 'Incorrectly formed request',
  }),
  success: (res, data) => res.status(200).json({
    data,
  }),
  unauthorised: res => res.status(401).json({
    message: 'You lack privileges to access resource',
  }),
  wrongCredentials: res => res.status(401).json({
    message: 'Provide correct login credentials',
  }),
  unauthenticated: res => res.status(401).json({
    message: 'Invalid or expired token',
  }),
  missingToken: res => res.status(400).json({
    message: 'missing token',
  }),
  notFound: res => res.status(404).json({
    message: 'The requested resource could not be found',
  }),
  conflict: (res, err) => res.status(409).json({
    message: err.details[0].message,
  }),
  noContent: res => res.status(204).json({
    message: 'The reource has been deleted',
  }),
};

export default responses;
