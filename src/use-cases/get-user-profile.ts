import { IUserProfileUseCaseReply } from '@/interfaces/Iuse-cases/Iget-user-profile-use-case-reply';
import { IUserProfileUseCaseRequest } from '@/interfaces/Iuse-cases/Iget-user-profile-use-case-request';
import { UsersRepository } from '@/repositories/users-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: IUserProfileUseCaseRequest): Promise<IUserProfileUseCaseReply> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
