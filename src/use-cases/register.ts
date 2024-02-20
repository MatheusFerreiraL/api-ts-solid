import { IRegisterUseCaseReply } from '@/interfaces/Iuse-cases/Iregister-use-case-reply';
import { IRegisterUseCaseRequest } from '@/interfaces/Iuse-cases/Iregister-use-case-request';
import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { hash } from 'bcryptjs';

export class RegisterUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepo: UsersRepository) {
    this.usersRepository = usersRepo;
  }

  async execute({ name, email, password }: IRegisterUseCaseRequest): Promise<IRegisterUseCaseReply> {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });

    return {
      user,
    };
  }
}
