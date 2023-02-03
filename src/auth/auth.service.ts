import { Injectable } from '@nestjs/common';
import {
  AuthUser,
  IUserService,
  LoginDTO,
  RegisterDTO,
} from './interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/auth.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService implements IUserService {
  constructor(
    @InjectModel(User.name) private userDocumentModel: Model<UserDocument>,
  ) {}

  async loginUser(payload: LoginDTO): Promise<AuthUser> {
    const user = await this.userDocumentModel.findOne({
      email: payload.email,
    });
    if (!user) {
      return {
        status: 'error',
        message: 'Invalid credentials',
      };
    }

    if (!bcrypt.compareSync(payload.password, user.password)) {
      return {
        status: 'error',
        message: 'Invalid credentials',
      };
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      's',
      { expiresIn: '24hr' },
    );
    return {
      message: 'Authentication successful',
      token: token,
      status: 'success',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
      },
    };
  }

  async registerUser(payload: RegisterDTO): Promise<AuthUser> {
    const account = await this.userDocumentModel.findOne({
      email: payload.email,
    });
    if (account) {
      return {
        status: 'error',
        message: 'Cannot sign up at the moment',
      };
    }

    const user = await this.userDocumentModel.create({
      name: payload.name,
      age: payload.age,
      email: payload.email,
      password: bcrypt.hashSync(payload.password, 8),
    });
    const token = jwt.sign(
      {
        id: user.id,
      },
      's',
      { expiresIn: '24hr' },
    );
    return {
      message: 'Authentication successful',
      token: token,
      status: 'success',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
      },
    };
  }
}
