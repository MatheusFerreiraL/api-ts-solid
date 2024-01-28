import { FastifyInstance } from 'fastify';
import { register } from './Controllers/RegisterController';

// eslint-disable-next-line @typescript-eslint/require-await
export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
}
