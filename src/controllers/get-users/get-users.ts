import { Get, Route } from 'tsoa';
import { injectable } from 'tsyringe';
import { User } from '../../models/user';
import { ok, serverError } from '../helpers';
import { HttpResponse, IController } from '../protocols';
import { IGetUsersRepository } from './protocols';

@injectable()
@Route('users')
export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  @Get('/')
  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok(users);
    } catch (err) {
      return serverError();
    }
  }
}
