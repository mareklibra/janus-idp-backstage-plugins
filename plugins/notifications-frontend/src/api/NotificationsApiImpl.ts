import { ConfigApi, IdentityApi } from '@backstage/core-plugin-api';

import {
  Notification,
  NotificationsApi,
  NotificationsCountQuery,
  NotificationsFilter,
  NotificationsQuery,
} from './notificationsApi';

export type NotificationsApiOptions = {
  configApi: ConfigApi;
  identityApi: IdentityApi;
};

export class NotificationsApiImpl implements NotificationsApi {
  private readonly backendUrl: string;

  constructor(options: NotificationsApiOptions) {
    this.backendUrl = options.configApi.getString('backend.baseUrl');
  }

  private addFilter(url: URL, filter: NotificationsFilter) {
    if (filter.containsText) {
      url.searchParams.append('containsText', filter.containsText);
    }
    if (filter.createdAfter) {
      url.searchParams.append(
        'createdAfter',
        filter.createdAfter.toISOString(),
      );
    }
  }

  post(notification: Notification): Promise<string> {
    // eslint-disable-next-line no-console
    console.log('TODO: implement post notification: ', notification);
    return Promise.resolve('id-todo');
  }

  async getNotifications(query: NotificationsQuery): Promise<Notification[]> {
    const url = new URL(`${this.backendUrl}/api/notifications/notifications`);

    url.searchParams.append('pageSize', `${query.pageSize}`);
    url.searchParams.append('pageNumber', `${query.pageNumber}`);

    this.addFilter(url, query);

    const response = await fetch(url.href);
    const data = await response.json();
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(data.message);
    }

    if (!Array.isArray(data)) {
      throw new Error('Unexpected format of notifications received');
    }

    return data;
  }

  async getNotificationsCount(query: NotificationsCountQuery): Promise<number> {
    const url = new URL(
      `${this.backendUrl}/api/notifications/notifications/count`,
    );

    // TODO: add similar parameter to the BE
    url.searchParams.append('unreadOnly', query.unreadOnly ? 'true' : 'false');

    this.addFilter(url, query);

    const response = await fetch(url.href);
    const data = await response.json();
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(data.message);
    }

    const count = parseInt(data.count, 10);
    if (Number.isNaN(count)) {
      throw new Error('Unexpected format of notifications count received');
    }

    return count;
  }

  markAsRead(notificationId: string): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('TODO: markAsRead: ', notificationId);
    return Promise.resolve();
  }
}
