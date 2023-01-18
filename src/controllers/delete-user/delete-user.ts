import { injectable } from 'tsyringe';
import {
  Body,
  Delete,
  Example,
  Path,
  Response,
  Route,
  SuccessResponse,
} from 'tsoa';

import { User } from '../../models/user';
import { badRequest, ok, serverError } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { IDeleteUserRepository } from './protocols';

@injectable()
@Route('users')
export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}

  @Example<User>({
    id: '63c7555450a8fb5cc31b58a5',
    firstName: 'Joao Vitor',
    lastName: 'Marques',
    email: 'jvsilvam@outlook.com',
    password: '12345678',
  })
  @SuccessResponse('200', 'Ok')
  @Response(400, 'Missing user id')
  @Response(500, 'Something went wrong')
  @Delete('{id}')
  async handle(
    @Body() httpRequest: HttpRequest<any>,
    @Path() id?: string
  ): Promise<HttpResponse<User | string>> {
    try {
      id = httpRequest?.params.id;

      if (!id) {
        return badRequest('Missing user id');
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return ok(user);
    } catch (error) {
      return serverError();
    }
  }
}
