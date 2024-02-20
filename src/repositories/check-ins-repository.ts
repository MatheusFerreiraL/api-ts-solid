import { prisma } from '@/utils/Prisma';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { ICheckInsRepository } from '@/interfaces/Irepositories/Icheck-ins-repository';

export class CheckInsRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number) {
    const checkInsHistory = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: page * 20,
    });
    return checkInsHistory;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date'); // retorna: 2024-02-11T00:00:00 (o inicio do dia)
    const endOfTheDay = dayjs(date).endOf('date'); // retorna: 2024-02-11T23:59:59 (o fim do dia)

    const checkInOnSameDate = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
      },
    });

    const checkInDate = dayjs(checkInOnSameDate?.created_at);
    const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

    if (!isOnSameDate) return null;

    return checkInOnSameDate;
  }

  async countByUserId(userId: string) {
    const countOfCheckInsByUser = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return countOfCheckInsByUser;
  }
}
