import { Body, Controller, Delete, Get, Put, HttpStatus, Param, Post, UsePipes, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from '@infrastructure/rest/pipes/joi.validation.pipe';
import { UserDto } from '../dtos/user.dto';
import { createUserJoiSchema, updateUserJoiSchema } from '@infrastructure/validators/user.joi.schema';

import { FindAllUserUseCase } from '@application/usecases/user/find.all.user.use.case';
import { CreateUserUseCase } from '@application/usecases/user/create.user.use.case';
import { UpdateUserUseCase } from '@application/usecases/user/update.user.use.case';
import { DeleteUserUseCase } from '@application/usecases/user/delete.user.use.case';
import { FindByEmailUserUseCase } from '@application/usecases/user/find.by.email.user.use.case';
import { RoleBasedAuthGuard } from '@infrastructure/rest/guards/role.based.auth.guard';
import { roleBasedAuthAllowedRoles, roleBasedAuthRolesMetakey } from '@domain/shared/constants/roles';

@ApiBearerAuth('jwt-access-token')
@ApiTags(`user`)
@Controller('/api/v1/user')
@UseGuards(RoleBasedAuthGuard)
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: `<b>UNAUTHORIZED</b> - AUTHORIZATION_HEADER_NOT_FOUND`,
})
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: `<b>BAD REQUEST</b> - INVALID_JWT_TOKEN`,
})
export class UserController {
  constructor(
    private readonly findByEmailUserUseCase: FindByEmailUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly findAllUserUseCase: FindAllUserUseCase
  ) {}
  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `<b>OK</b>`,
  })
  @Get('/')
  @SetMetadata(roleBasedAuthRolesMetakey, [roleBasedAuthAllowedRoles.ADMIN])
  async findAll() {
    return await this.findAllUserUseCase.execute();
  }
  @ApiOperation({ summary: 'add user' })
  @Post('/')
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: `<b>CONFLICT</b> - user email already registered`,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `<b>user successfully added</b>`,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `<b>BAD REQUEST</b> - missing fields`,
  })
  @UsePipes(new JoiValidationPipe(createUserJoiSchema))
  async create(@Body() userDto: UserDto) {
    return await this.createUserUseCase.execute(userDto);
  }

  @ApiOperation({ summary: 'delete user by id' })
  @Delete('/:id')
  @ApiParam({ name: 'id', required: true, type: () => Number })
  async remove(@Param('id') id: string | number) {
    return await this.deleteUserUseCase.execute(id);
  }
  @ApiOperation({ summary: 'get user by email' })
  @Get('/:email')
  @ApiParam({ name: 'email', required: true, type: () => String })
  async findOneByEmail(@Param('email') email: string) {
    return await this.findByEmailUserUseCase.execute(email);
  }

  @ApiOperation({ summary: 'add user' })
  @Put('/:id')
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: `<b>CONFLICT</b> - user email already registered`,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `<b>user successfully added</b>`,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `<b>BAD REQUEST</b> - missing fields`,
  })
  @ApiParam({ name: 'id', required: true, type: () => Number })
  async update(@Body(new JoiValidationPipe(updateUserJoiSchema)) userDto: UserDto, @Param('id') id: number) {
    return await this.updateUserUseCase.execute(userDto, id);
  }
}
