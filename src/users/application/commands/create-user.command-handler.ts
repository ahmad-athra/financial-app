import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { ConflictException, Logger } from '@nestjs/common';
import { UserFactory } from 'src/users/domain/factories/user-factory';
import { UserRepository } from '../ports/user.repository';
import { QueryFailedError } from 'typeorm';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
  ) {}
  private logger = new Logger(CreateUserCommandHandler.name);

  async execute(command: CreateUserCommand) {
    this.logger.debug(`Creating user with email: ${command.email}`);
    const isExist = await this.userRepository.findByEmail(command.email);
    if (isExist) {
      throw new ConflictException('User already exists');
    }
    try {
      const user = this.userFactory.create(
        command.email,
        command.password,
        command.firstName,
        command.lastName,
        command.isActive,
        command.walletId,
        command.walletType,
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
}
