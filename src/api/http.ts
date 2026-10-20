import axios, { type AxiosInstance } from 'axios';

import { type UserCredentials } from 'src/models/userCredentials';

/** Number of leading `idInstance` digits that identify the GREEN-API host. */
const HOST_PREFIX_LENGTH = 4;

/**
 * Create Axios instance pointing to the instance of the user.
 * The host is derived from the instance id, e.g. `7103123456` -> `https://7103.api.green-api.com`.
 * @param credentials Credentials.
 */
export function createHttp({ idInstance }: UserCredentials): AxiosInstance {
  const hostPrefix = String(idInstance).slice(0, HOST_PREFIX_LENGTH);
  return axios.create({
    baseURL: `https://${hostPrefix}.api.green-api.com/waInstance${idInstance}`,
  });
}
