import applicationService from '../service/applicationService.js';
import ApiError from '../exceptions/apiErrors.js';

class applicationController {
  async create(req, res, next) {
    try {
      const userId = req.user.id;

      const applicationData = await applicationService.create(userId);
      if (!applicationData) {
        return next(ApiError.badRequest('Не удалось создать заявку'));
      }
      return res.json(applicationData);
    } catch (e) {
      next(e);
    }
  }
  async getAll(req, res, next) {
    try {
      const applicationData = await applicationService.getAll();
      if (!applicationData) {
        return next(ApiError.badRequest('Не удалось получить Заявки'));
      }
      return res.json(applicationData);
    } catch (e) {
      next(e);
    }
  }

  async getMyApplication(req, res, next) {
    try {
      const userId = req.user.id;
      const applicationData = await applicationService.getMyApplication(userId);
      if (!applicationData) {
        return next(ApiError.badRequest('Заявка не найдена'));
      }
      return res.json(applicationData);
    } catch (e) {
      next(e);
    }
  }
  async getById(req, res, next) {
    try {
      const applicationId = req.params.id;
      const applicationData = await applicationService.getById(applicationId);
      if (!applicationData) {
        return next(ApiError.badRequest('Заявка не найдена', errors.array()));
      }
      return res.json(applicationData);
    } catch (e) {
      next(e);
    }
  }

  async removeApplication(req, res, next) {
    try {
      const applicationId = req.params.id;
      const applicationData = await applicationService.removeApplication(applicationId);
      if (!applicationData) {
        return next(ApiError.badRequest('Не удалось удалить заявку', errors.array()));
      }
      return res.json(applicationData);
    } catch (e) {
      next(e);
    }
  }

  async updateApplication(req, res, next) {
    try {
      const applicationId = req.params.id;
      const { applicationStatus } = req.body;

      const applicationData = await applicationService.updateApplication(
        applicationId,
        applicationStatus,
      );

      return res.json(applicationData);
    } catch (e) {
      next(e);
    }
  }

  async getStatus(req, res, next) {
    try {
      const status = await applicationService.getStatus();
      if (!status) {
        return next(ApiError.badRequest('Заявка не найдена', errors.array()));
      }
      return res.json(status);
    } catch (e) {
      next(e);
    }
  }
}

export default new applicationController();
