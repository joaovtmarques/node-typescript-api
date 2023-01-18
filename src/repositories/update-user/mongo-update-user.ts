import { ObjectId } from 'mongodb';
import {
  IUpdateUserParams,
  IUpdateUserRepository,
} from '@/src/controllers/update-user/protocols';
import { MongoClient } from '@/src/database/mongo';
import { User } from '@/src/models/user';

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: IUpdateUserParams): Promise<User> {
    await MongoClient.db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const user = await MongoClient.db
      .collection<Omit<User, 'id'>>('users')
      .findOne({ _Id: new ObjectId(id) });

    if (!user) {
      throw new Error('User not updated');
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
