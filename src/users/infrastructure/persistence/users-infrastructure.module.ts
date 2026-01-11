import { DynamicModule, Module, Type } from '@nestjs/common';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { OrmPersistenceModule } from './orm/orm-persistence.module';
import { InMemoryPersistenceModule } from './in-memory/in-memory-persistence.module';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class UsersInfrastructureModule {
  static use(options: ApplicationBootstrapOptions): Type | DynamicModule {
    const persistenceModule =
      options.driver === 'orm'
        ? OrmPersistenceModule
        : InMemoryPersistenceModule;
    return {
      module: UsersInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
