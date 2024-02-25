import { IAuthenticateUseCaseReply } from '@/interfaces/Iuse-cases/Iauthenticate-use-case-reply';
import { IAuthenticateUseCaseRequest } from '@/interfaces/Iuse-cases/Iauthenticate-use-case-request';
import { UsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { compare } from 'bcryptjs';

export class AuthenticateUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepo: UsersRepository) {
    this.usersRepository = usersRepo;
  }

  async execute({ email, password }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseReply> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doestPasswordMatches = await compare(password, user.password_hash);

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
