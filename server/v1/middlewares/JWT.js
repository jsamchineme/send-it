import jwt from 'jsonwebtoken';

/**
 * Secure routes with JWT
 *
 * @class
 */
class JWT {
  /**
   *
   *
   * @static
   * @param {Object} req - the request received
   * @param {Object} res = the response to be returned
   * @param {Object} next - the next function to be called after authentication
   * @return {Object} - error message on authentication failure
   */
  static async authenticate(req, res, next) {
    const token = req.headers['x-access-token'] || req.query.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401);
          res.json({
            status: 'Failed',
            message: 'Authentication failed. Token could be expired or invalid',
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403);
      res.json({
        status: 'Failed',
        message: 'missing token',
      });
    }
  }
}

export default JWT;
