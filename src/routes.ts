import { FastifyInstance } from 'fastify';
import { register } from './Controllers/RegisterController';
import { authenticate } from './Controllers/AuthenticateController';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);
}
