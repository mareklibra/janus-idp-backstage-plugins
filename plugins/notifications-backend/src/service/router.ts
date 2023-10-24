import { errorHandler } from '@backstage/backend-common';
import { CatalogClient } from '@backstage/catalog-client';

import express from 'express';
import Router from 'express-promise-router';
import knex from 'knex';
import { Logger } from 'winston';
import { Config } from '@backstage/config';

export interface RouterOptions {
  logger: Logger;
  dbConfig: Config;
  catalogClient: CatalogClient;
}

export type CreateRequest = {
  subject: string;
  body?: string;
  targetUsers?: string[];
  targetGroups?: string[];
}



export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, dbConfig, catalogClient } = options;

  const router = Router();
  router.use(express.json());

  if (!dbConfig) {
    logger.error('Missing dbConfig');
    return router;
  }

  const dbClient = knex({
    client: dbConfig.getString('client'),
    connection: {
      host: dbConfig.getString('connection.host'),
      port: dbConfig.getNumber('connection.port'),
      user: dbConfig.getString('connection.user'),
      password: dbConfig.getString('connection.password'),
      database: 'backstage_plugin_notifications'
    }
  });

  if (! await dbClient.schema.hasTable('messages')) {
    await dbClient.schema.createTable('messages', function (table) {
      table.uuid("id", {primaryKey: true}).defaultTo(dbClient.fn.uuid());
      table.string('subject');
      table.string('body');
    })

  }

  router.get('/health', async (_, response) => {
    var myRes = 'ok';

    const userRef = await catalogClient.getEntityByRef("user:jdoe");

    if (!userRef) {
      myRes = 'fail'
    } else {
      if (userRef.relations && userRef.relations.length > 0) {
        userRef.relations.forEach((relation)=>{
          const parts = relation.targetRef.split(':');
          if (parts.length == 0 || parts[0] != 'group') {
            return;
          }
          myRes = `${myRes}:${parts[1]}`;
        });
      }
    }
    //logger.info(await identityApiRef.T.getBackstageIdentity())
    //var myToken = await tokenManager.getToken();
    //logger.info(myToken.token);
    //await tokenManager.authenticate("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").catch(()=>{myRes = 'fail'});
    response.json({ status: myRes });
  });

  router.get('/notifications/count/:text?', async ({params: {text}}, response) => {
    let msgcount = -1;
    
    var query = dbClient('messages').count('* as CNT');
    
    if ( text && text.length > 0 ) {
      query.whereILike('subject', `%${text}%`).orWhereILike('body', `%${text}%`)
    }
    
    await query.then(count => {
        msgcount = (count[0]?.CNT as unknown as number) || -1;
      });

    response.json({ status: 'ok', count: msgcount });
  });

  router.post('/notifications', async (request, response) => {
    let msgid = -1;

    var createRequest = request.body as CreateRequest;
    
    if (createRequest.targetGroups) {
      createRequest.targetGroups.forEach(async group => {
        const groupRef = await catalogClient.getEntityByRef("group:"+group);
        if ( !groupRef ) {
          response.json({ status: 'fail', error: 'group does not exist: '+group });
        }
      });
    }

    if (createRequest.targetUsers) {
      createRequest.targetUsers.forEach(async user => {
        const userRef = await catalogClient.getEntityByRef("user:"+user);
        if ( !userRef ) {
          response.json({ status: 'fail', error: 'user does not exist: '+user });
        }
      });
    }

    const dbObj = {subject: createRequest.subject, body: createRequest.body};

    await dbClient('messages')
      .insert(dbObj)
      .returning('id')
      .then(id => {
        // We should harden the type
        msgid = id as unknown as number;
      });
    response.json({ status: 'ok', msgid: msgid });
  });
  
  router.get('/notifications/:text?/:pageSize?/:pageNumber?', async ({params: {text, pageSize, pageNumber}}, response) => {
    let messages = '{}';
    
    var pageSizeNum = 0
    var pageNumberNum = 0
    var offset = 0

    if ( pageSize && pageNumber ) {
      pageSizeNum = Number.parseInt(pageSize)
      pageNumberNum = Number.parseInt(pageNumber)
      offset = pageSizeNum * (pageNumberNum - 1)
    }
    
    var query = dbClient('messages').select('*');

    if ( text && text.length > 0 ) {
      query.whereILike('subject', `%${text}%`).orWhereILike('body', `%${text}%`)
    }

    if ( pageNumberNum != 0 ) {
      query.limit(pageNumberNum).offset(offset);
    }
    
    await query.then(body => {
        messages = body as unknown as string;
      });

    response.json(messages);
  });

  router.use(errorHandler());
  return router;
}
