import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from 'src/users/application/ports/user.repository';
import { ORMUserRepository } from './repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [
    {
      provide: UserRepository,
      useClass: ORMUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class OrmPersistenceModule {}
