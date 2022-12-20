import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

import roleModel from '../models/roleModel.js';
import applicationModel from '../models/applicationModel.js';
import userModel from '../models/userModels.js';
import mailService from './mailService.js';
import tokenService from './tokenService.js';
import userDto from '../dtos/userDto.js';
import ApiError from '../exceptions/apiErrors.js';

class userService {
  async registration(email, password, userName, avatarUrl, birthDate) {
    try {
      const candidate = await userModel.findOne({ email });
      if (candidate) {
        throw ApiError.badRequest(`Пользователь с почтовым адресом  ${email}  уже существует`);
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const activationLink = v4();
      const userRole = await roleModel.findOne({ value: 'USER' });

      const user = await userModel.create({
        email,
        userName,
        password: hashPassword,
        avatarUrl: '',
        birthDate,
        roles: [userRole.value],
        activationLink,
      });

      // await mailService.senActivationMail(
      //   email,
      //   `${process.env.API_URL}/auth/activate/${activationLink}`,
      // );

      const UserDto = new userDto(user); // id email isActivated

      const tokens = tokenService.generateTokens({ ...UserDto });

      await tokenService.saveToken(UserDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: UserDto,
        message: 'Пользователь успешно зарегистрирован',
      };
    } catch (error) {
      console.log(error);
    }
  }

  async activate(activationLink) {
    const user = await userModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.badRequest('Некорректная ссылка активации');
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw ApiError.badRequest('Пользователь с таким Email не найден');
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.badRequest('Не корректный пароль');
    }
    const UserDto = new userDto(user);
    const tokens = tokenService.generateTokens({ ...UserDto });

    await tokenService.saveToken(UserDto.id, tokens.refreshToken);
    return { ...tokens, user: UserDto, message: 'Пользователь успешно авторизирован.' };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError();
    }
    const user = await userModel.findById(userData.id);
    const UserDto = new userDto(user);
    const tokens = tokenService.generateTokens({ ...UserDto });

    await tokenService.saveToken(UserDto.id, tokens.refreshToken);
    return { ...tokens, user: UserDto };
  }

  async getAllUsers() {
    const users = await userModel.find();
    return users;
  }
}

export default new userService();
