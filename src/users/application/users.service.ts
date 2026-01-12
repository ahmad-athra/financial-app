import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.command';
import { UserRepository } from './ports/user.repository';
import { GetUserQuery } from './queries/get-user.query';
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    // private readonly userFactory: UserFactory,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  create(createUserCommand: CreateUserCommand) {
    return this.commandBus.execute(createUserCommand);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(getUserQuery: GetUserQuery) {
    return this.queryBus.execute(getUserQuery);
  }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   const { password, ...rest } = updateUserDto;
  //   const passwordHash = password; // In real application, hash the password
  //   const user = { ...rest, passwordHash };
  //   return this.usersRepository.preload({ id, ...user });
  // }

  // remove(id: string) {
  //   return this.usersRepository.delete(id);
  // }
}
