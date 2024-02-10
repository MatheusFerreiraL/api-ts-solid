import { ICheckInsRepositoy } from '@/Interfaces/ICheckInsRepository';
import { prisma } from '@/Utils/Prisma';
import { Prisma } from '@prisma/client';

export class CheckInsRepository implements ICheckInsRepositoy {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }
}
