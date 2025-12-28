import { Hono } from 'hono';
import type { Handler } from 'hono/types';
import updatedFetch from '../src/__create/fetch';

const API_BASENAME = '/api';
const api = new Hono();

if (globalThis.fetch) {
  globalThis.fetch = updatedFetch;
}

// Static route imports for production
async function registerRoutes() {
  // Import all API routes statically
  const routes = [
    { path: '/chat', module: () => import('../src/app/api/chat/route.js') },
    { path: '/conversations', module: () => import('../src/app/api/conversations/route.js') },
    { path: '/messages', module: () => import('../src/app/api/messages/route.js') },
    { path: '/generate-form', module: () => import('../src/app/api/generate-form/route.js') },
    { path: '/auth/token', module: () => import('../src/app/api/auth/token/route.js') },
    { path: '/auth/expo-web-success', module: () => import('../src/app/api/auth/expo-web-success/route.js') },
  ];

  for (const { path, module } of routes) {
    try {
      const route = await module();
      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

      for (const method of methods) {
        if (route[method]) {
          const handler: Handler = async (c) => {
            const params = c.req.param();
            return await route[method](c.req.raw, { params });
          };

          const methodLowercase = method.toLowerCase();
          switch (methodLowercase) {
            case 'get':
              api.get(path, handler);
              break;
            case 'post':
              api.post(path, handler);
              break;
            case 'put':
              api.put(path, handler);
              break;
            case 'delete':
              api.delete(path, handler);
              break;
            case 'patch':
              api.patch(path, handler);
              break;
          }
        }
      }
    } catch (error) {
      console.error(`Error loading route ${path}:`, error);
    }
  }
}

// Register routes immediately
await registerRoutes();

export { api, API_BASENAME };
