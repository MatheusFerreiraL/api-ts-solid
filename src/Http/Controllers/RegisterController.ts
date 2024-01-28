import { UsersRepository } from '@/Repositories/UsersRepository';
import { RegisterService } from '@/Services/RegisterService';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new UsersRepository();
    const registerService = new RegisterService(usersRepository);

    await registerService.executeRegister({ name, email, password });
  } catch (err) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
