import { IsBoolean, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
// import { WalletType } from '../../../entities/user.entity';

// [TODO] Move WalletType enum to a shared location, if need to extends
enum WalletType {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  AMEX = 'AMEX',
}
export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsBoolean()
  isActive: boolean;
  @IsNotEmpty()
  walletId: string;
  @IsEnum(WalletType)
  walletType: WalletType;
}
