import { User } from '@/src/models/user';

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}
