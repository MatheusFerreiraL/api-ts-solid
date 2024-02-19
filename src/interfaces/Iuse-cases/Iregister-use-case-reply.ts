import { User } from '@prisma/client';

export interface IRegisterUseCaseReply {
  user: User;
}
