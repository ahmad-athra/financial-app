import { UserRepository } from 'src/users/application/ports/user.repository';
import { UserEntity } from '../entities/user.entity';
import { User } from 'src/users/domain/user';
import { InMemoryUserMapper } from '../mappers/user.mapper';

export class InMemoryUserRepository implements UserRepository {
  private readonly users = new Map<string, UserEntity>();

  constructor() {}
  // Implementation of user repository methods
  findById(id: string): User | null {
    const userEntity = this.users.get(id);
    if (!userEntity) {
      return null;
    }
    return InMemoryUserMapper.toDomain(userEntity);
  }
  findByEmail(email: string): User | null {
    const userEntity = Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
    if (!userEntity) {
      return null;
    }
    return InMemoryUserMapper.toDomain(userEntity);
  }
  findAll(): User[] {
    const userEntities = Array.from(this.users.values());
    return userEntities.map((entity) => InMemoryUserMapper.toDomain(entity));
  }
  create(user: User): User {
    const userEntity = InMemoryUserMapper.toPersistence(user);
    this.users.set(userEntity.id, userEntity);
    return InMemoryUserMapper.toDomain(userEntity);
  }
}
