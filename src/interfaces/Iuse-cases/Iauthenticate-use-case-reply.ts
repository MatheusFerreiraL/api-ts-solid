import { User } from '@prisma/client';

export interface IAuthenticateUseCaseReply {
  user: User;
}
