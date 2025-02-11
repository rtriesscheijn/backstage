/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Extension } from './createExtension';
import { FeatureFlagConfig } from './types';

/** @public */
export interface ExtensionOverridesOptions {
  extensions: Extension<unknown>[];
  featureFlags?: FeatureFlagConfig[];
}

/** @public */
export interface ExtensionOverrides {
  readonly $$type: '@backstage/ExtensionOverrides';
}

/** @internal */
export interface InternalExtensionOverrides extends ExtensionOverrides {
  readonly version: 'v1';
  readonly extensions: Extension<unknown>[];
  readonly featureFlags: FeatureFlagConfig[];
}

/** @public */
export function createExtensionOverrides(
  options: ExtensionOverridesOptions,
): ExtensionOverrides {
  return {
    $$type: '@backstage/ExtensionOverrides',
    version: 'v1',
    extensions: options.extensions,
    featureFlags: options.featureFlags ?? [],
  } as InternalExtensionOverrides;
}

/** @internal */
export function toInternalExtensionOverrides(
  overrides: ExtensionOverrides,
): InternalExtensionOverrides {
  const internal = overrides as InternalExtensionOverrides;
  if (internal.$$type !== '@backstage/ExtensionOverrides') {
    throw new Error(
      `Invalid extension overrides instance, bad type '${internal.$$type}'`,
    );
  }
  if (internal.version !== 'v1') {
    throw new Error(
      `Invalid extension overrides instance, bad version '${internal.version}'`,
    );
  }
  return internal;
}
