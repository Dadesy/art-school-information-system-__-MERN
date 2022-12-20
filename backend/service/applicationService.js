import applicationModel from '../models/applicationModel.js';
import statusStudentsModel from '../models/statusStudentsModel.js';

import userModel from '../models/userModels.js';
import ApiError from '../exceptions/apiErrors.js';

class applicationService {
  async create(userId) {
    try {
      const candidate = await applicationModel.findOne({ user: userId });
      console.log(candidate);
      if (candidate) {
        return { message: 'Вы уже оставили заявку' };
      }
      const applicationStatus = await statusStudentsModel.findOne({ value: 'CANDIDATE' });
      const application = await applicationModel.create({
        user: userId,
        status: applicationStatus._id,
      });

      return {
        application,
        message: 'Заявка успешно оставлена',
      };
    } catch (e) {
      console.log(e);
    }
  }

  async getAll() {
    try {
      const applications = await applicationModel.find().populate('user status');

      return {
        applications,
        message: 'Заявки успешно получены',
      };
    } catch (error) {
      console.log(error);
    }
  }
  async getMyApplication(userId) {
    try {
      const application = await applicationModel
        .findOne({
          user: userId,
        })
        .populate('status', 'message');

      if (!application) {
        throw ApiError.badRequest('Заявка не найден');
      }
      return {
        application,
        message: 'Заявка успешно получена',
      };
    } catch (error) {
      console.log(error);
    }
  }
  async getById(productId) {
    try {
      const application = await applicationModel.findById(productId).populate('user status');

      if (!application) {
        throw ApiError.badRequest('Заявка не найден');
      }
      return {
        application,
        message: 'Заявка успешно получена',
      };
    } catch (error) {
      console.log(error);
    }
  }

  async removeApplication(applicationId) {
    try {
      const application = await applicationModel.findByIdAndDelete(applicationId);

      if (!application) {
        throw ApiError.badRequest('Заявка не найден');
      }
      return {
        message: 'Заявка успешно удалена',
      };
    } catch (error) {
      console.log(error);
    }
  }

  async updateApplication(applicationId, applicationStatus) {
    try {
      const Status = await statusStudentsModel.findById(applicationStatus);
      if (!Status) {
        throw ApiError.badRequest('Статус не найден');
      }

      const application = await applicationModel.findByIdAndUpdate(
        applicationId,
        {
          status: Status._id,
        },
        { returnDocument: 'after' },
      );

      if (!application) {
        throw ApiError.badRequest('Товар не найден');
      }
      return {
        application,
        message: 'Заявка успешно изменена',
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getStatus() {
    try {
      const status = await statusStudentsModel.find();

      if (!status) {
        throw ApiError.badRequest('Заявка не найден');
      }
      return {
        status,
        message: 'Статусы успешно получены',
      };
    } catch (error) {
      console.log(error);
    }
  }
}

export default new applicationService();
