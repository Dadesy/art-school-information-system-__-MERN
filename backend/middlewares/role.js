import ApiError from '../exceptions/apiErrors.js';
import tokenService from '../service/tokenService.js';

export default function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const authorizationHeader = req.headers.authorization;

      // const accessToken = authorizationHeader.split(' ')[1];
      const accessToken = authorizationHeader;

      const { roles: userData } = tokenService.validateAccessToken(accessToken);

      let hasRole = false;

      userData.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        throw ApiError.badRequest('Нет доступа');
      }
      next();
    } catch (e) {
      next(e);
    }
  };
}
