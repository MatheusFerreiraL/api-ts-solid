import { Gym } from '@prisma/client';

export interface ICreateGymUseCaseReply {
  gym: Gym;
}
