import { UserAlredyExistError } from '@/Errors/UserAlredyExistError';
import { IRegister } from '@/Interfaces/IRegister';
import { IUsersRepository } from '@/Interfaces/IUsersRepository';
import { hash } from 'bcryptjs';

export class RegisterService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async executeRegister({ name, email, password }: IRegister) {
    const passwordHash: string = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) throw new UserAlredyExistError();

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });
  }
}
