import { InvalidCredentialsError } from '@/Errors/InvalidCredentialsError';
import { IAuthenticateServiceReply } from '@/Interfaces/IAuthenticateServiceReply';
import { IAuthenticateServiceRequest } from '@/Interfaces/IAuthenticateServiceRequest';
import { UsersRepository } from '@/Repositories/UsersRepository';
import { compare } from 'bcryptjs';

export class AuthenticateService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ email, password }: IAuthenticateServiceRequest): Promise<IAuthenticateServiceReply> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new InvalidCredentialsError();

    const doesPasswordMatch: boolean = await compare(password, user.password_hash);

    if (!doesPasswordMatch) throw new InvalidCredentialsError();

    return { user };
  }
}
