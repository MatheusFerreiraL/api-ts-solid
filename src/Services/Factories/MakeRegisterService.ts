import { UsersRepository } from '@/Repositories/UsersRepository';
import { RegisterService } from '../RegisterService';

export function makeRegisterService() {
  const usersRepository = new UsersRepository();
  const registerService = new RegisterService(usersRepository);

  return registerService;
}
