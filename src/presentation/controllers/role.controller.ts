import { Body, Controller, Delete, Get, Put, HttpStatus, Param, Post, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from '@infrastructure/rest/pipes/joi.validation.pipe';
import { RoleDto } from '../dtos/role.dto';
import { createRoleJoiSchema, updateRoleJoiSchema } from '@infrastructure/validators/role.joi.schema';
import { CreateRoleUseCase } from '@application/usecases/role/create.role.use.case';
import { UpdateRoleUseCase } from '@application/usecases/role/update.role.use.case';
import { DeleteRoleUseCase } from '@application/usecases/role/delete.role.use.case';
import { FindAllRoleUseCase } from '@application/usecases/role/find.all.role.use.case';

@ApiBearerAuth('jwt-access-token')
@ApiTags(`role`)
@Controller('/api/v1/role')
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: `<b>UNAUTHORIZED</b> - AUTHORIZATION_HEADER_NOT_FOUND`,
})
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: `<b>BAD REQUEST</b> - INVALID_JWT_TOKEN`,
})
export class RoleController {
  constructor(private readonly createRoleUseCase: CreateRoleUseCase, private readonly findAllRoleUseCase: FindAllRoleUseCase, private readonly deleteRoleUseCase: DeleteRoleUseCase, private readonly updateRoleUseCase: UpdateRoleUseCase) {}
  @ApiOperation({ summary: 'get all roles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `<b>OK</b>`,
  })
  @Get('/')
  async findAll() {
    return await this.findAllRoleUseCase.execute();
  }
  @ApiOperation({ summary: 'add role' })
  @Post('/')
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: `<b>CONFLICT</b> - role email already registered`,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `<b>role successfully added</b>`,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `<b>BAD REQUEST</b> - missing fields`,
  })
  @UsePipes(new JoiValidationPipe(createRoleJoiSchema))
  async create(@Body() roleDto: RoleDto) {
    return await this.createRoleUseCase.execute(roleDto);
  }

  @ApiOperation({ summary: 'delete role by id' })
  @Delete('/:id')
  @ApiParam({ name: 'id', required: true, type: () => Number })
  async remove(@Param('id') id: string | number) {
    return await this.deleteRoleUseCase.execute(id);
  }

  @ApiOperation({ summary: 'add role' })
  @Put('/:id')
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: `<b>CONFLICT</b> - role email already registered`,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `<b>role successfully added</b>`,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `<b>BAD REQUEST</b> - missing fields`,
  })
  @ApiParam({ name: 'id', required: true, type: () => Number })
  async update(@Body(new JoiValidationPipe(updateRoleJoiSchema)) roleDto: RoleDto, @Param('id') id: number) {
    return await this.updateRoleUseCase.execute(roleDto, id);
  }
}
