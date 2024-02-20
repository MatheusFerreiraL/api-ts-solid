import { IGymsRepository } from '@/interfaces/Irepositories/Igyms-repository';
import { prisma } from '@/utils/Prisma';
import { Prisma } from '@prisma/client';

export class GymsRepository implements IGymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findFirst({
      where: {
        id,
      },
    });
    return gym;
  }

  async create(data: Prisma.GymUncheckedCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });
    return gym;
  }

  async searchMany(query: string, page: number) {
    const gym = await prisma.gym.findMany({
      where: {
        title: query,
      },
      take: 10,
      skip: page * 10,
    });
    return gym;
  }
}
