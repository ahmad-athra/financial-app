import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from '../../application/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserCommand } from 'src/users/application/commands/create-user.command';
import { GetUserQuery } from 'src/users/application/queries/get-user.query';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(
      new CreateUserCommand(
        createUserDto.email,
        createUserDto.password,
        createUserDto.firstName,
        createUserDto.lastName,
        createUserDto.isActive,
        createUserDto.walletId,
        createUserDto.walletType,
      ),
    );
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(new GetUserQuery(id));
  }

  // @Patch(':id')
  // update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   return this.usersService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.usersService.remove(id);
  // }
}
