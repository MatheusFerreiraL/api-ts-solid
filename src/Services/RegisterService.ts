import { UserAlredyExistError } from '@/Errors/UserAlredyExistError';
import { IRegister } from '@/Interfaces/IRegister';
import { IRegisterServiceResponse } from '@/Interfaces/IRegisterServiceResponse';
import { IUsersRepository } from '@/Interfaces/IUsersRepository';
import { hash } from 'bcryptjs';

export class RegisterService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password }: IRegister): Promise<IRegisterServiceResponse> {
    const passwordHash: string = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) throw new UserAlredyExistError();

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });

    return { user };
  }
}
