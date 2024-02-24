import { prisma } from '@/utils/Prisma';
import { Prisma } from '@prisma/client';
import { IUsersRepository } from '@/interfaces/Irepositories/Iusers-repository';

export class UsersRepository implements IUsersRepository {
  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async findByEmail(email: string) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return userWithSameEmail;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
}
