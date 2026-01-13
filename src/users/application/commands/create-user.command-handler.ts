import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { ConflictException, Logger } from '@nestjs/common';
import { UserFactory } from 'src/users/domain/factories/user-factory';
import { UserRepository } from '../ports/user.repository';
import { QueryFailedError } from 'typeorm';
import { UserCreatedEvent } from 'src/users/domain/events/user-created.event';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
    private readonly eventBus: EventBus,
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
      const newUser = await this.userRepository.create(user);

      this.eventBus.publish(new UserCreatedEvent(user));

      return newUser;
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
