import { User } from './domain/user';

export interface UserRepository {
  find: (id: number) => Promise<User | null>;
  all: () => Promise<User[]>;
  store: (entry: User) => Promise<void>;
  remove: (id: number) => Promise<void>;
}
