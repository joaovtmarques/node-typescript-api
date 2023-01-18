import validator from 'validator';
import { injectable } from 'tsyringe';
import { Body, Example, Post, Route, Response, SuccessResponse } from 'tsoa';

import { User } from '../../models/user';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { ICreateUserParams, ICreateUserRepository } from './protocols';
import { badRequest, created, serverError, unprocessable } from '../helpers';

@injectable()
@Route('users')
export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  @Example<User>({
    id: '63c7555450a8fb5cc31b58a5',
    firstName: 'Joao Vitor',
    lastName: 'Marques',
    email: 'jvsilvam@outlook.com',
    password: '12345678',
  })
  @SuccessResponse('201', 'Created')
  @Response(400, 'E-mail is invalid')
  @Response(422, 'Field {field} is required')
  @Response(500, 'Something went wrong')
  @Post('/')
  async handle(
    @Body()
    httpRequest: HttpRequest<ICreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ['firstName', 'lastName', 'email', 'password'];

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field as keyof ICreateUserParams]?.length) {
          return unprocessable(`Field {${field}} is required`);
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest('E-mail is invalid');
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return created(user);
    } catch (err) {
      return serverError();
    }
  }
}
