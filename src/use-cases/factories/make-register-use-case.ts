import { UsersRepository } from '@/repositories/users-repository';
import { RegisterUseCase } from '../register';

export function makeRegisterUseCase() {
  const usersRepository = new UsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
