import fastify from 'fastify';
import { appRoutes } from './Http/routes';

export const app = fastify();

// eslint-disable-next-line @typescript-eslint/no-floating-promises
app.register(appRoutes);
