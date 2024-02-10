import { CheckIn, Prisma } from '@prisma/client';

export interface ICheckInsRepositoy {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
