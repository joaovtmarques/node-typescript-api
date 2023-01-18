import validator from 'validator';
import { User } from '@/src/models/user';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { ICreateUserParams, ICreateUserRepository } from './protocols';
import { badRequest, created, serverError } from '../helpers';

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<ICreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ['firstName', 'lastName', 'email', 'password'];

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field as keyof ICreateUserParams]?.length) {
          return badRequest(`Field ${field} is required`);
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
