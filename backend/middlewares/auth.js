import ApiError from '../exceptions/apiErrors.js';
import tokenService from '../service/tokenService.js';

export default function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    // const accessToken = authorizationHeader.split(' ')[1];
    const accessToken = authorizationHeader;

    if (!authorizationHeader || !accessToken) {
      return next(ApiError.unauthorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.unauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.unauthorizedError());
  }
}
