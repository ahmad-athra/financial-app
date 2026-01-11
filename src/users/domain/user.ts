import { WalletType } from './value-objects/user-wallet-type';

export class User {
  constructor(
    public readonly id: string, //UUID,
    public readonly email: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly isActive: boolean,
    public readonly walletId: string,
    public readonly walletType: WalletType,
  ) {}
}
