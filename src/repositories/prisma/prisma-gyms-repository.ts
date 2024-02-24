import { FindManyNearbyParams } from '@/interfaces/Ifind-many-nearby-params';
import { IGymsRepository } from '@/interfaces/Irepositories/Igyms-repository';
import { prisma } from '@/utils/Prisma';
import { Gym, Prisma } from '@prisma/client';

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

  async findManyNearby(params: FindManyNearbyParams) {
    // nesse caso é necessário informar o tipo para o prisma pois o 'raw' não consegue identificar sozinho
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM GYMS
      WHERE ( 6371 * acos( cos( radians(${params.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.longitude}) ) + sin( radians(${params.latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;
    // '<= 10', unidade de medida é em kms

    return gyms;
  }
}
