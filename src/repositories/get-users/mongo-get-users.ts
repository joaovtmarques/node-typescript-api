import { singleton } from 'tsyringe';

import { IGetUsersRepository } from '@/src/controllers/get-users/protocols';
import { MongoClient } from '@/src/database/mongo';
import { User } from '@/src/models/user';
import { MongoUser } from '../mongo-protocols';

@singleton()
export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<MongoUser>('users')
      .find({})
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
