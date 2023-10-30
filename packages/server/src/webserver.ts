import Fastify from 'fastify';
import fastifyHttpProxy from '@fastify/http-proxy';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { config } from '@rotom/config';
import { log } from './logger';

export const fastify = Fastify({
  logger: false,
});

// either reverse proxy the frontend dev server or serve the built files
if (process.env.NODE_ENV === 'development') {
  fastify.register(fastifyHttpProxy, {
    upstream: 'http://localhost:4199',
  });
} else {
  fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), 'dist/packages/client'),
  });
  fastify.get('/jobs', (_request, reply) => {
    return reply.sendFile('index.html');
  });
}

export const startWebserver = async () => {
  try {
    await fastify.listen({ port: config.client.port, host: config.client.host });
    log.info(`Webserver running on http://localhost:${config.client.port} listening on ${config.client.host}`);
  } catch (error) {
    log.error(error);
    process.exit(1);
  }
};
