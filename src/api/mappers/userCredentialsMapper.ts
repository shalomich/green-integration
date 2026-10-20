import { type UserCredentials } from 'src/models/userCredentials';

import { type UserCredentialsDto } from '../dtos/userCredentialsDto';

/** User credentials mapper. */
export namespace UserCredentialsMapper {

  export function toDto(data: UserCredentials): UserCredentialsDto {
    return {
      idInstance: data.idInstance,
      apiTokenInstance: data.apiTokenInstance,
    };
  }

  export function fromDto(dto: UserCredentialsDto): UserCredentials {
    return {
      idInstance: dto.idInstance,
      apiTokenInstance: dto.apiTokenInstance,
    };
  }
}
