import groupService from '../service/groupService.js';
import ApiError from '../exceptions/apiErrors.js';

class groupController {
  async create(req, res, next) {
    try {
      const { studentsId, teacherId, nameGroup, subject } = req.body;
      const groupData = await groupService.create(studentsId, teacherId, nameGroup, subject);
      if (!groupData) {
        return next(ApiError.badRequest('Не удалось создать группу'));
      }

      return res.json(groupData);
    } catch (e) {
      next(e);
    }
  }
  async getAll(req, res, next) {
    try {
      const groupData = await groupService.getAll();
      if (!groupData) {
        return next(ApiError.badRequest('Не удалось получить Заявки'));
      }
      return res.json(groupData);
    } catch (e) {
      next(e);
    }
  }
  async getAbiturient(req, res, next) {
    try {
      const users = await groupService.getAbiturient();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
  async getTeach(req, res, next) {
    try {
      const user = await groupService.getTeach();
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
  async getAllSubject(req, res, next) {
    try {
      const subject = await groupService.getAllSubject();
      return res.json(subject);
    } catch (e) {
      next(e);
    }
  }
  // async getById(req, res, next) {
  //   try {
  //     const groupId = req.params.id;
  //     const groupData = await groupService.getById(groupId);
  //     if (!groupData) {
  //       return next(ApiError.badRequest('Заявка не найдена', errors.array()));
  //     }
  //     return res.json(groupData);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // async removegroup(req, res, next) {
  //   try {
  //     const groupId = req.params.id;
  //     const groupData = await groupService.removegroup(groupId);
  //     if (!groupData) {
  //       return next(ApiError.badRequest('Не удалось удалить заявку', errors.array()));
  //     }
  //     return res.json(groupData);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // async updategroup(req, res, next) {
  //   try {
  //     const groupId = req.params.id;
  //     const { groupStatus } = req.body;

  //     const groupData = await groupService.updategroup(
  //       groupId,
  //       groupStatus,
  //     );

  //     return res.json(groupData);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

export default new groupController();
