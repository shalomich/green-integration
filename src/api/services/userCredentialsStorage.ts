import { type UserCredentials } from 'src/models/userCredentials';

import { LocalStorageService } from './localStorage';

export namespace UserCredentialsStorageService {
  const USER_CREDENTIALS_KEY = 'USER_CREDENTIALS_KEY';

  /**
   * Saves a secret.
   * @param secret Secret to save.
   */
  export async function save(secret: UserCredentials): Promise<void> {
    await LocalStorageService.save(USER_CREDENTIALS_KEY, secret);
  }

  /** Remove current secret. */
  export async function remove(): Promise<void> {
    await LocalStorageService.remove(USER_CREDENTIALS_KEY);
  }

  /** Get user secret. */
  export function get(): Promise<UserCredentials | null> {
    return LocalStorageService.get<UserCredentials>(USER_CREDENTIALS_KEY);
  }

  /** Clear user secret. */
  export async function clear(): Promise<void> {
    await LocalStorageService.clear();
    return undefined;
  }

  /** Is user secret saved. */
  export async function isValid(): Promise<boolean> {
    const secret = await get();
    return secret !== null;
  }
}
