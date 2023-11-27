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

/**
 *
 * @export
 * @interface CreateBodyActionsInner
 */
export interface CreateBodyActionsInner {
  /**
   *
   * @type {string}
   * @memberof CreateBodyActionsInner
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof CreateBodyActionsInner
   */
  url: string;
}

/**
 * Check if a given object implements the CreateBodyActionsInner interface.
 */
export function instanceOfCreateBodyActionsInner(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'title' in value;
  isInstance = isInstance && 'url' in value;

  return isInstance;
}

export function CreateBodyActionsInnerFromJSON(
  json: any,
): CreateBodyActionsInner {
  return CreateBodyActionsInnerFromJSONTyped(json, false);
}

export function CreateBodyActionsInnerFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CreateBodyActionsInner {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    title: json['title'],
    url: json['url'],
  };
}

export function CreateBodyActionsInnerToJSON(
  value?: CreateBodyActionsInner | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    title: value.title,
    url: value.url,
  };
}
