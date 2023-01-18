import { User } from '@/src/models/user';
import { ok, serverError } from '../helpers';
import { HttpResponse, IController } from '../protocols';
import { IGetUsersRepository } from './protocols';

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok(users);
    } catch (err) {
      return serverError();
    }
  }
}
