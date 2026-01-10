import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'node:crypto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const isExist = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });
    if (isExist) {
      throw new ConflictException('User with this email already exists');
    }
    const { password, ...rest } = createUserDto;
    const passwordHash = bcrypt.hash('sha1', password);
    // const passwordHash = password; // In real application, hash the password
    const user = { ...rest, passwordHash };
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log(user);

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { password, ...rest } = updateUserDto;
    const passwordHash = password; // In real application, hash the password
    const user = { ...rest, passwordHash };
    return this.usersRepository.preload({ id, ...user });
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
