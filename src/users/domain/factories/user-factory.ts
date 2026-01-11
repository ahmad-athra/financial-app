import { WalletType } from '../value-objects/user-wallet-type';
import { User } from '../user';
import { UserPassword } from '../value-objects/user-password';
import { UserID } from '../value-objects/user-id';

export class UserFactory {
  create(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    isActive: boolean,
    walletId: string,
    walletType: string,
  ): User {
    const userId = new UserID().getValue();
    const userWalletType = new WalletType(walletType);
    const passwordHash = new UserPassword(password).getValue();
    return new User(
      userId,
      email,
      passwordHash,
      firstName,
      lastName,
      isActive,
      walletId,
      userWalletType,
    );
  }
}
