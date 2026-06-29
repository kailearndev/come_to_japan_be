import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { createResponseDto } from 'src/common/response.dto';
import { UserDto } from './dto/user.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Users')
@ApiCookieAuth('access_token')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách users' })
  @ApiOkResponse({ type: createResponseDto(UserDto) })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy user theo id' })
  @ApiOkResponse({ type: createResponseDto(UserDto) })
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật user' })
  @ApiOkResponse({ type: createResponseDto(UserDto) })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa user' })
  delete(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
