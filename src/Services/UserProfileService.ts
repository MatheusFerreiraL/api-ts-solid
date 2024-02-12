import { ResourceNotFoundError } from '@/Errors/ResourceNotFoundError';
import { UsersRepository } from '@/Repositories/UsersRepository';
import { IUserProfileServiceRequest } from '@/Interfaces/IUserProfileServiceRequest';

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
