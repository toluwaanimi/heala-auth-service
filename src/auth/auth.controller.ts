import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthUser, LoginDTO, RegisterDTO } from './interface/user.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'loginUser')
  async loginUser(login: LoginDTO): Promise<AuthUser> {
    return await this.authService.loginUser(login);
  }

  @GrpcMethod('AuthService', 'registerUser')
  async registerUser(register: RegisterDTO): Promise<AuthUser> {
    return await this.authService.registerUser(register);
  }
}
