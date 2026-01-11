import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports =
      options.driver === 'orm'
        ? [
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              username: 'postgres',
              password: 'postgres',
              database: 'financial_app',
              autoLoadEntities: true,
              synchronize: false, // IMPORTANT: disable in production
              migrationsRun: false, // controlled manually
            }),
          ]
        : [];
    return {
      module: CoreModule,
      imports,
    };
  }
}
