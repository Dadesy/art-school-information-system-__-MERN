import subjectService from '../service/subjectService.js';
import ApiError from '../exceptions/apiErrors.js';

class subjectController {
  async create(req, res, next) {
    try {
      const { name, numberHours, coastEducation, teacher } = req.body;
      console.log(name, numberHours, coastEducation, teacher);
      const subjectData = await subjectService.create(name, numberHours, coastEducation, teacher);
      if (!subjectData) {
        return next(ApiError.badRequest('Не удалось создать предмет'));
      }

      return res.json(subjectData);
    } catch (e) {
      next(e);
    }
  }
  // async getAll(req, res, next) {
  //   try {
  //     const subjectData = await subjectService.getAll();
  //     if (!subjectData) {
  //       return next(ApiError.badRequest('Не удалось получить Заявки'));
  //     }
  //     return res.json(subjectData);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // async getById(req, res, next) {
  //   try {
  //     const subjectId = req.params.id;
  //     const subjectData = await subjectService.getById(subjectId);
  //     if (!subjectData) {
  //       return next(ApiError.badRequest('Заявка не найдена', errors.array()));
  //     }
  //     return res.json(subjectData);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // async removesubject(req, res, next) {
  //   try {
  //     const subjectId = req.params.id;
  //     const subjectData = await subjectService.removesubject(subjectId);
  //     if (!subjectData) {
  //       return next(ApiError.badRequest('Не удалось удалить заявку', errors.array()));
  //     }
  //     return res.json(subjectData);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // async updatesubject(req, res, next) {
  //   try {
  //     const subjectId = req.params.id;
  //     const { subjectStatus } = req.body;

  //     const subjectData = await subjectService.updatesubject(
  //       subjectId,
  //       subjectStatus,
  //     );

  //     return res.json(subjectData);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

export default new subjectController();
