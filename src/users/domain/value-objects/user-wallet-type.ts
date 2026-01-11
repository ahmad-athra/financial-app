export class WalletType {
  static readonly BITCOIN = 'BITCOIN';
  static readonly ETHEREUM = 'ETHEREUM';
  static readonly LITECOIN = 'LITECOIN';
  static readonly VISA = 'VISA';
  static readonly MASTERCARD = 'MASTERCARD';
  static readonly AMEX = 'AMEX';

  constructor(private readonly value: string) {
    if (!WalletType.values().includes(value)) {
      throw new Error(`Invalid wallet type: ${value}`);
    }
    this.value = value;
  }
  getValue(): string {
    return this.value;
  }
  static values(): string[] {
    return [
      WalletType.BITCOIN,
      WalletType.ETHEREUM,
      WalletType.LITECOIN,
      WalletType.VISA,
      WalletType.MASTERCARD,
      WalletType.AMEX,
    ];
  }
}
