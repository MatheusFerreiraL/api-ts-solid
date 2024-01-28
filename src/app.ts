import fastify from 'fastify';
import { ZodError } from 'zod';
import { appRoutes } from './Http/routes';
import { env } from './env';

export const app = fastify();

// eslint-disable-next-line @typescript-eslint/no-floating-promises
app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) return reply.status(400).send({ message: 'Validation Error', issues: error.format() });

  if (env.NODE_ENV !== 'prod') {
    console.error(error);
  } else {
    // TODO: Must use an external tool to provide error logs in production environment <DataDog/NewRelic/Sentry>
  }
  return reply.status(500).send({ message: 'Internal Server Error!' });
});
