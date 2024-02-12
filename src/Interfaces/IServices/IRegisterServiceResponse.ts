import { User } from '@prisma/client';

export interface IRegisterServiceResponse {
  user: User;
}
