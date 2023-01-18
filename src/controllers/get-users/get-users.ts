import { injectable } from 'tsyringe';
import { Example, Get, Response, Route, SuccessResponse } from 'tsoa';

import { User } from '../../models/user';
import { ok, serverError } from '../helpers';
import { HttpResponse, IController } from '../protocols';
import { IGetUsersRepository } from './protocols';

@injectable()
@Route('users')
export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  @Example<User[]>([
    {
      id: '63c7555450a8fb5cc31b58a5',
      firstName: 'Joao Vitor',
      lastName: 'Marques',
      email: 'jvsilvam@outlook.com',
      password: '12345678',
    },
  ])
  @SuccessResponse('200', 'Ok')
  @Response(500, 'Something went wrong')
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
