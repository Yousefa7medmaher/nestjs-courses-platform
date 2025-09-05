import { Controller, Post,  Get, Patch, Delete, Param, Body, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** GET my profile */
  @Get('me')
  async getProfile(@Req() req) {
    const userId = req.user.id;   
    return this.usersService.findOne(userId);
  }

  @Post() 
  @Roles(UserRole.ADMIN)
  async createUser( @Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
  
  /** UPDATE my profile */
  @Patch('me')
  async updateProfile(@Req() req, @Body() dto: UpdateUserDto) {
    const userId = req.user.id;
    return this.usersService.update(userId, dto);
  }

  /** DELETE my account */
  @Delete('me')
  async deleteProfile(@Req() req) {
    const userId = req.user.id;
    return this.usersService.remove(userId);
  }

  /** GET all users - Admin only */
  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  /** GET a user by ID - Admin only */
  @Get(':id')
  @Roles(UserRole.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  /** UPDATE user by ID - Admin only */
  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  /** DELETE user by ID - Admin only */
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
