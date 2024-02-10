import { ResourceNotFoundError } from '@/Errors/ResourceNotFoundError';
import { IUserProfileServiceRequest } from '@/Interfaces/IUserProfileServiceRequest';
import { UsersRepository } from '@/Repositories/UsersRepository';

export class UserProfileService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ userId }: IUserProfileServiceRequest) {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new ResourceNotFoundError();

    return { user };
  }
}
