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
 * @interface GetNotificationsCount200Response
 */
export interface GetNotificationsCount200Response {
  /**
   *
   * @type {number}
   * @memberof GetNotificationsCount200Response
   */
  count: number;
}

/**
 * Check if a given object implements the GetNotificationsCount200Response interface.
 */
export function instanceOfGetNotificationsCount200Response(
  value: object,
): boolean {
  let isInstance = true;
  isInstance = isInstance && 'count' in value;

  return isInstance;
}

export function GetNotificationsCount200ResponseFromJSON(
  json: any,
): GetNotificationsCount200Response {
  return GetNotificationsCount200ResponseFromJSONTyped(json, false);
}

export function GetNotificationsCount200ResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): GetNotificationsCount200Response {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    count: json['count'],
  };
}

export function GetNotificationsCount200ResponseToJSON(
  value?: GetNotificationsCount200Response | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    count: value.count,
  };
}
