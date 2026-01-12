import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { UserRepository } from '../ports/user.repository';
import { ConflictException } from '@nestjs/common';
import { User } from 'src/users/domain/user';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserQuery): Promise<User> {
    const user = await this.userRepository.findById(query.id);
    if (!user) {
      throw new ConflictException('User not found');
    }
    return user;
  }
}
