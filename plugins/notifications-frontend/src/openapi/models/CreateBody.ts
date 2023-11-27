/* tslint:disable */
/* eslint-disable */
/**
 * Notifications Plugin - OpenAPI Specs
 * Notifications Plugin - OpenAPI Specs
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { CreateBodyActionsInner } from './CreateBodyActionsInner';
import {
  CreateBodyActionsInnerFromJSON,
  CreateBodyActionsInnerFromJSONTyped,
  CreateBodyActionsInnerToJSON,
} from './CreateBodyActionsInner';

/**
 *
 * @export
 * @interface CreateBody
 */
export interface CreateBody {
  /**
   *
   * @type {string}
   * @memberof CreateBody
   */
  origin: string;
  /**
   *
   * @type {string}
   * @memberof CreateBody
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof CreateBody
   */
  message?: string;
  /**
   *
   * @type {Array<CreateBodyActionsInner>}
   * @memberof CreateBody
   */
  actions?: Array<CreateBodyActionsInner>;
  /**
   *
   * @type {string}
   * @memberof CreateBody
   */
  topic?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof CreateBody
   */
  targetUsers?: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof CreateBody
   */
  targetGroups?: Array<string>;
}

/**
 * Check if a given object implements the CreateBody interface.
 */
export function instanceOfCreateBody(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'origin' in value;
  isInstance = isInstance && 'title' in value;

  return isInstance;
}

export function CreateBodyFromJSON(json: any): CreateBody {
  return CreateBodyFromJSONTyped(json, false);
}

export function CreateBodyFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CreateBody {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    origin: json['origin'],
    title: json['title'],
    message: !exists(json, 'message') ? undefined : json['message'],
    actions: !exists(json, 'actions')
      ? undefined
      : (json['actions'] as Array<any>).map(CreateBodyActionsInnerFromJSON),
    topic: !exists(json, 'topic') ? undefined : json['topic'],
    targetUsers: !exists(json, 'targetUsers') ? undefined : json['targetUsers'],
    targetGroups: !exists(json, 'targetGroups')
      ? undefined
      : json['targetGroups'],
  };
}

export function CreateBodyToJSON(value?: CreateBody | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    origin: value.origin,
    title: value.title,
    message: value.message,
    actions:
      value.actions === undefined
        ? undefined
        : (value.actions as Array<any>).map(CreateBodyActionsInnerToJSON),
    topic: value.topic,
    targetUsers: value.targetUsers,
    targetGroups: value.targetGroups,
  };
}
