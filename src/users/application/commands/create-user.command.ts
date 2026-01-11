export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly isActive: boolean,
    public readonly walletId: string,
    public readonly walletType: string,
  ) {}
}
