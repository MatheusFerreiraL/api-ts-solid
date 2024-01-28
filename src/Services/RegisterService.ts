import { hash } from 'bcryptjs';
import { prisma } from '@/Utils/Prisma';
import { IRegister } from '@/Interfaces/IRegister';

export async function registerService({ name, email, password }: IRegister) {
  const passwordHash: string = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) throw new Error('E-mail alredy in use!');

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash,
    },
  });
}
