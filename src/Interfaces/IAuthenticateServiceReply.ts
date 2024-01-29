import { User } from '@prisma/client';

export interface IAuthenticateServiceReply {
  user: User;
}
