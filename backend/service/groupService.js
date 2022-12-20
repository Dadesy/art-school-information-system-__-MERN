import userModel from '../models/userModels.js';
import groupModel from '../models/groupModel.js';
import applicationModel from '../models/applicationModel.js';

import subjectModel from '../models/subjectModel.js';
import ApiError from '../exceptions/apiErrors.js';

class groupService {
  async create(studentsId, teacherId, nameGroup, subject) {
    try {
      const group = await groupModel.create({
        name: nameGroup,
        students: studentsId,
        teacher: teacherId,
        subject,
      });
      if (!group) {
        throw ApiError.badRequest('Не удалось сформировать группу');
      }
      await userModel.findByIdAndUpdate(teacherId, {
        group: group._id,
      });
      for (const studentId of studentsId) {
        await userModel.findByIdAndUpdate(studentId, {
          group: group._id,
        });
      }

      return {
        group,
        message: 'Группа успешно сформирована',
      };
    } catch (e) {
      console.log(e);
    }
  }
  async getAbiturient() {
    const users = await applicationModel.find().populate('status user');
    return users;
  }
  async getAll() {
    try {
      const groups = await groupModel.find().populate('students teacher subject');

      return {
        groups,
        message: 'группы успешно получены',
      };
    } catch (error) {
      console.log(error);
    }
  }
  async getTeach() {
    try {
      const user = await userModel.find({ roles: 'ADMIN' });
      return {
        user,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSubject() {
    try {
      const subject = await subjectModel.find();
      return subject;
    } catch (error) {
      console.log(error);
    }
  }
  // async getById(productId) {
  //   try {
  //     const group = await groupModel.findById(productId).populate('user status');

  //     if (!group) {
  //       throw ApiError.badRequest('Заявка не найден');
  //     }
  //     return {
  //       group,
  //       message: 'Заявка успешно получена',
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async removegroup(groupId) {
  //   try {
  //     const group = await groupModel.findByIdAndDelete(groupId);

  //     if (!group) {
  //       throw ApiError.badRequest('Заявка не найден');
  //     }
  //     return {
  //       message: 'Заявка успешно удалена',
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async updategroup(groupId, groupStatus) {
  //   try {
  //     const Status = await statusStudentsModel.findOne({ value: groupStatus });
  //     if (!Status) {
  //       throw ApiError.badRequest('Статус не найден');
  //     }

  //     const group = await groupModel.findByIdAndUpdate(
  //       groupId,
  //       {
  //         status: Status._id,
  //       },
  //       { returnDocument: 'after' },
  //     );

  //     if (!group) {
  //       throw ApiError.badRequest('Товар не найден');
  //     }
  //     return {
  //       group,
  //       message: 'Заявка успешно изменена',
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

export default new groupService();
