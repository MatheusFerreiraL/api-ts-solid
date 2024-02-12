import { prisma } from '@/Utils/Prisma';
import { Prisma } from '@prisma/client';
import { IUsersRepository } from '@/Interfaces/IUsersRepository';

export class UsersRepository implements IUsersRepository {
  async findById(userId: string) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return userWithSameEmail;
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
