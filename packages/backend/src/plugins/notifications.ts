import { Router } from 'express';

import { createRouter } from '@janus-idp/plugin-notifications-backend';

import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  // Here is where you will add all of the required initialization code that
  // your backend plugin needs to be able to start!

  return await createRouter({
    identity: env.identity,
    logger: env.logger,
    permissions: env.permissions,
    tokenManager: env.tokenManager,
    database: env.database,
    discovery: env.discovery,
    config: env.config,
  });
}
