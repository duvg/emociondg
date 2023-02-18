import { UserCreateDto } from '../dtos/user.dto';
import { User } from './repositories/domain/user';
import { UserRepository } from './repositories/user.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async find(document: number): Promise<User | null> {
    return await this.userRepository.find(document);
  }

  public async all(): Promise<User[]> {
    return await this.userRepository.all();
  }

  public async store(params: UserCreateDto): Promise<void> {
    await this.userRepository.store(params as unknown as User);
  }

  public async remove(id: number): Promise<void> {
    return await this.userRepository.remove(id);
  }
}
