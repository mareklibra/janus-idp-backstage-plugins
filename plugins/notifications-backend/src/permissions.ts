/* TODO(mlibra): move following to notifications-common for its easier reuse by frontend and policies */
import { createPermission } from '@backstage/plugin-permission-common';

export const notificationsCreatePermission = createPermission({
  name: 'notifications.create',
  attributes: { action: 'create' },
});

export const notificationsListPermission = createPermission({
  name: 'notifications.list',
  attributes: { action: 'read' },
});

export const notificationsCountPermission = createPermission({
  name: 'notifications.count',
  attributes: { action: 'read' },
});

export const notificationsSetReadPermission = createPermission({
  name: 'notifications.update.read',
  attributes: { action: 'update' },
});

export const notificationsPermissions = [
  notificationsCreatePermission,
  notificationsListPermission,
  notificationsCountPermission,
  notificationsSetReadPermission,
];
