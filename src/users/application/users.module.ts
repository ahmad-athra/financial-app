import { DynamicModule, Module, Type } from '@nestjs/common';
import { UsersController } from '../presenters/http/users.controller';
import { UserFactory } from '../domain/factories/user-factory';
import { UsersService } from './users.service';
import { CreateUserCommandHandler } from './commands/create-user.command-handler';
import { GetUserQueryHandler } from './queries/get-user.query-handler';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserFactory,
    CreateUserCommandHandler,
    GetUserQueryHandler,
  ],
})
export class UsersModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: UsersModule,
      imports: [infrastructureModule],
    };
  }
}
