import subjectModel from '../models/subjectModel.js';

import ApiError from '../exceptions/apiErrors.js';

class subjectService {
  async create(name, numberHours, coastEducation, teacher) {
    try {
      const subject = await subjectModel.create({
        name,
        numberHours,
        coastEducation,
        teacher,
      });
      if (!subject) {
        throw ApiError.badRequest('Не удалось создать предмет');
      }

      return {
        subject,
        message: 'Предмет успешно сформирован',
      };
    } catch (e) {
      console.log(e);
    }
  }

  // async getAll() {
  //   try {
  //     const subjects = await subjectModel.find().sort('-createdAt').populate('user status');

  //     return {
  //       subjects,
  //       message: 'Заявки успешно получены',
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async getById(productId) {
  //   try {
  //     const subject = await subjectModel.findById(productId).populate('user status');

  //     if (!subject) {
  //       throw ApiError.badRequest('Заявка не найден');
  //     }
  //     return {
  //       subject,
  //       message: 'Заявка успешно получена',
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async removesubject(subjectId) {
  //   try {
  //     const subject = await subjectModel.findByIdAndDelete(subjectId);

  //     if (!subject) {
  //       throw ApiError.badRequest('Заявка не найден');
  //     }
  //     return {
  //       message: 'Заявка успешно удалена',
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async updatesubject(subjectId, subjectStatus) {
  //   try {
  //     const Status = await statusStudentsModel.findOne({ value: subjectStatus });
  //     if (!Status) {
  //       throw ApiError.badRequest('Статус не найден');
  //     }

  //     const subject = await subjectModel.findByIdAndUpdate(
  //       subjectId,
  //       {
  //         status: Status._id,
  //       },
  //       { returnDocument: 'after' },
  //     );

  //     if (!subject) {
  //       throw ApiError.badRequest('Товар не найден');
  //     }
  //     return {
  //       subject,
  //       message: 'Заявка успешно изменена',
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

export default new subjectService();
