import { User } from '@/src/models/user';

/**
 * @example
 * {
 *	"firstName": "Joao",
 *  "lastName": "Marques",
 *	"password": "1234"
 * }
 */

export interface IUpdateUserParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: IUpdateUserParams): Promise<User>;
}
