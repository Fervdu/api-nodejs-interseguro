import { app } from './app';

import { env } from './config/env';

export function startServer() {
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
}

