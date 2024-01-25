import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';

export const app = fastify();

const prisma = new PrismaClient();

await prisma.user.create({
  data: {
    name: 'Marcela Ferraz',
    email: 'mferraz@email.com',
  },
});
