import { User } from '@/src/models/user';
import { HttpRequest, HttpResponse } from '../protocols';

export interface IUpdateUserParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: IUpdateUserParams): Promise<User>;
}
