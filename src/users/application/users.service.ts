import {
  ConflictException,
  Injectable,
  // NotFoundException,
} from '@nestjs/common';
// import { CreateUserDto } from '../presenters/http/dto/create-user.dto';
// import { UpdateUserDto } from '../presenters/http/dto/update-user.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from '../entities/user.entity';
// import { Repository } from 'typeorm';
// import * as bcrypt from 'node:crypto';
import { CreateUserCommand } from './commands/create-user.command';
import { GetUserQuery } from './queries/get-user.query';
import { UserRepository } from './ports/user.repository';
import { UserFactory } from '../domain/factories/user-factory';
import { QueryFailedError } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
  ) {}
  async create(createUserCommand: CreateUserCommand) {
    const isExist = await this.userRepository.findByEmail(
      createUserCommand.email,
    );
    if (isExist) {
      throw new ConflictException('User already exists');
    }
    try {
      const user = this.userFactory.create(
        createUserCommand.email,
        createUserCommand.password,
        createUserCommand.firstName,
        createUserCommand.lastName,
        createUserCommand.isActive,
        createUserCommand.walletId,
        createUserCommand.walletType,
      );
      return this.userRepository.create(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        // PostgreSQL unique violation
        if ((error as any).code === '23505') {
          throw new ConflictException('WalletID already exists');
        }
      }

      throw error; // IMPORTANT: rethrow unknown errors
    }
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async findOne(getUserQuery: GetUserQuery) {
    // return this.userRepository.findById(getUserQuery.id);
    const user = await this.userRepository.findById(getUserQuery.id);
    if (!user) {
      throw new ConflictException('User not found');
    }
    return user;
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
