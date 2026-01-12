import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/application/users.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './users/entities/user.entity';
import { CoreModule } from './core/core.module';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';
import { UsersInfrastructureModule } from './users/infrastructure/persistence/users-infrastructure.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        UsersModule.withInfrastructure(UsersInfrastructureModule.use(options)),
        CoreModule.forRoot(options),
      ],
    };
  }
}
