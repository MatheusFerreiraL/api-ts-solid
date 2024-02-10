import { User } from '@prisma/client';

export interface IUserProfileServiceReply {
  user: User;
}
