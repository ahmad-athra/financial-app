import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/application/ports/user.repository';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/domain/user';
import { ORMUserMapper } from '../mappers/user.mapper';

export class ORMUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}
  // Implementation of user repository methods
  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.usersRepository.findOneBy({ email });
    if (!userEntity) {
      return null;
    }
    return ORMUserMapper.toDomain(userEntity);
  }
  async findById(id: string): Promise<User | null> {
    const userEntity = await this.usersRepository.findOneBy({ id });
    if (!userEntity) {
      return null;
    }
    return ORMUserMapper.toDomain(userEntity);
  }
  async findAll(): Promise<User[]> {
    const userEntities = await this.usersRepository.find();
    return userEntities.map((entity) => ORMUserMapper.toDomain(entity));
  }
  async create(user: User): Promise<User> {
    const userEntity = ORMUserMapper.toPersistence(user);
    const savedEntity = await this.usersRepository.save(userEntity);
    return ORMUserMapper.toDomain(savedEntity);
  }
}
