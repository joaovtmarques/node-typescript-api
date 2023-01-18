import { User } from '@/src/models/user';

/**
 * @example
 * {
 *	"firstName": "Joao",
 *  "lastName": "Marques",
 *	"email": "joao@email.com",
 *	"password": "1234"
 * }
 */

export interface ICreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: ICreateUserParams): Promise<User>;
}
