import { IsBoolean, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { WalletType } from '../entities/user.entity';

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
