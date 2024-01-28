import fastify from 'fastify';
import { appRoutes } from './Http/Routes';

export const app = fastify();

// eslint-disable-next-line @typescript-eslint/no-floating-promises
app.register(appRoutes);
