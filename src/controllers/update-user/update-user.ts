import {
  Body,
  Example,
  Patch,
  Path,
  Response,
  Route,
  SuccessResponse,
} from 'tsoa';
import { injectable } from 'tsyringe';

import { User } from '../../models/user';

import { badRequest, ok, serverError } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { IUpdateUserParams, IUpdateUserRepository } from './protocols';

@injectable()
@Route('users')
export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  @Example<User>({
    id: '63c7555450a8fb5cc31b58a5',
    firstName: 'Joao Vitor',
    lastName: 'Marques',
    email: 'jvsilvam@outlook.com',
    password: '12345678',
  })
  @SuccessResponse('200', 'Ok')
  @Response(
    400,
    'Missing user id / Missing fields / Some received field is not allowed'
  )
  @Response(500, 'Something went wrong')
  @Patch('{id}')
  async handle(
    @Body() httpRequest: HttpRequest<IUpdateUserParams>,
    @Path() id?: string
  ): Promise<HttpResponse<User | string>> {
    try {
      id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return badRequest('Missing user id');
      }

      if (!body) {
        return badRequest('Missing fields');
      }

      const allowedFieldsToUpdate: (keyof IUpdateUserParams)[] = [
        'firstName',
        'lastName',
        'password',
      ];

      const someFieldNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof IUpdateUserParams)
      );

      if (someFieldNotAllowedToUpdate) {
        return badRequest('Some received field is not allowed');
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return ok(user);
    } catch (err) {
      return serverError();
    }
  }
}
