export interface LoginDTO {
  email: string;

  password: string;
}

export interface RegisterDTO {
  email: string;

  password: string;

  name: string;

  age: number;
}

export interface User {
  id: string;
  email: string;

  password?: string;

  name: string;

  age: number;
}

export interface AuthUser {
  user?: User;

  token?: string;

  status: string;

  message: string;
}

export interface IUserService {
  loginUser(payload: LoginDTO): Promise<AuthUser>;
  registerUser(payload: RegisterDTO): Promise<AuthUser>;
}
