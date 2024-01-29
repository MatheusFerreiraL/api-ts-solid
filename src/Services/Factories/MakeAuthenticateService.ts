import { UsersRepository } from '@/Repositories/UsersRepository';
import { AuthenticateService } from '../AuthenticateService';

export function makeAuthenticateService() {
  const usersRepository = new UsersRepository();
  const authenticateService = new AuthenticateService(usersRepository);

  return authenticateService;
}
