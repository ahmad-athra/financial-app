import { DynamicModule, Module, Type } from '@nestjs/common';
import { UsersController } from '../presenters/http/users.controller';
import { UserFactory } from '../domain/factories/user-factory';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UserFactory],
})
export class UsersModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: UsersModule,
      imports: [infrastructureModule],
    };
  }
}
