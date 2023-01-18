import { User } from '@/src/models/user';

export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
