import { FastifyInstance } from 'fastify';
import { register } from './Controllers/RegisterController';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
}
