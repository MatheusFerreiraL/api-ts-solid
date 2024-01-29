import { InvalidCredentialsError } from '@/Errors/InvalidCredentialsError';
import { AuthenticateUser } from '@/Middlewares/AuthenticateUser';
import { UsersRepository } from '@/Repositories/UsersRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const usersRepository = new UsersRepository();
    const authenticateUser = new AuthenticateUser(usersRepository);

    await authenticateUser.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) return reply.status(409).send({ message: err.message });

    throw err;
  }

  return reply.status(200).send();
}
