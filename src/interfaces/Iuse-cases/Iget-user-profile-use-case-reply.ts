import { User } from '@prisma/client';

export interface IUserProfileUseCaseReply {
  user: User;
}
