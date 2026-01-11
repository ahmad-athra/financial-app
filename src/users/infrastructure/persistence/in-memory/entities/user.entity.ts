export class UserEntity {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  walletId: string;
  walletType: string;
  createdAt: Date;
  updatedAt: Date;
}
