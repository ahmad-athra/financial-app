import { User } from 'src/users/domain/user';

export abstract class UserRepository {
  // Define methods for user repository operations
  abstract findById(id: string): Promise<User | null> | User | null;
  abstract findByEmail(email: string): Promise<User | null> | User | null;
  abstract findAll(): Promise<User[]> | User[];
  abstract create(user: User): Promise<User> | User;
  // Add other necessary methods
}
