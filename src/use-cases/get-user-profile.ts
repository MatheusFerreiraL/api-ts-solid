import { IUserProfileUseCaseReply } from '@/interfaces/Iuse-cases/Iget-user-profile-use-case-reply';
import { IUserProfileUseCaseRequest } from '@/interfaces/Iuse-cases/Iget-user-profile-use-case-request';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { UsersRepository } from '@/repositories/prisma/prisma-users-repository';

export class GetUserProfileUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepo: UsersRepository) {
    this.usersRepository = usersRepo;
  }

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
