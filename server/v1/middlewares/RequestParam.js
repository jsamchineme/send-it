import Response from '../utils/Response';

/** Validate the request Params
 * For example wherever we have /:someResourceId
 * @export
 * @class
 */
class RequestParam {
  /**
   * @static
   * @param {Object} req - request received
   * @param {Object} res - response to be returned
   * @param {Object} next - next middleware
   * @return {Object} - response with error messages
   */
  static validateParams(req, res, next) {
    for (const param in req.params) {
      /* istanbul ignore else  */
      if (param) {
        const paramHasId = param.search(/id/i) !== -1;
        const paramValue = req.params[param];
        if (paramHasId && isNaN(paramValue)) {
          return Response.wrongParamType(res);
        }
      }
    }
    next();
  }
}
export default RequestParam;
