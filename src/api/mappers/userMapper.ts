import { type User } from 'src/models/user';

import { type UserDto } from '../dtos/userDto';

/** User mapper. */
export namespace UserMapper {
  export function fromDto(dto: UserDto): User {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
    };
  }
}
