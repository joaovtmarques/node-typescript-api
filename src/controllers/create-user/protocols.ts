import { User } from '@/src/models/user';
import { HttpRequest, HttpResponse } from '../protocols';

export interface ICreateUserController {
  handle(
    httpRequest: HttpRequest<ICreateUserParams>
  ): Promise<HttpResponse<User>>;
}

export interface ICreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: ICreateUserParams): Promise<User>;
}
