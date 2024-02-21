import { CheckIn } from '@prisma/client';

export interface IValidateCheckInUseCaseReply {
  checkIn: CheckIn;
}
