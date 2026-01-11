import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user.entity';

export class ORMUserMapper {
  // Add mapping methods if necessary
  static toDomain(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.email,
      // entity.password, // Exclude password for security reasons
      entity.passwordHash,
      entity.firstName,
      entity.lastName,
      entity.isActive,
      entity.walletId,
      entity.walletType as any, // Cast to appropriate enum if necessary
    );
  }
  static toPersistence(domain: User): UserEntity {
    const entity = new UserEntity();
    entity.id = domain.id;
    entity.email = domain.email;
    entity.passwordHash = domain.password; // Hash the password before saving
    entity.firstName = domain.firstName;
    entity.lastName = domain.lastName;
    entity.isActive = domain.isActive;
    entity.walletId = domain.walletId;
    entity.walletType = domain.walletType.getValue(); // Cast to appropriate type if necessary
    return entity;
  }
}
