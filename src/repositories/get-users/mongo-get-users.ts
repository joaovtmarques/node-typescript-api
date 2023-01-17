import { IGetUsersRepository } from '@/src/controllers/get-users/protocols';
import { User } from '@/src/models/user';

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: 'Joao Vitor',
        lastName: 'Marques',
        email: 'joao@email.com',
        password: '1234',
      },
    ];
  }
}
