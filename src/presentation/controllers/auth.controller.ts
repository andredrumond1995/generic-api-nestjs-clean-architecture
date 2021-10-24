import {
  HttpStatus,
  Controller,
  Body,
  Post,
  HttpCode,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserAuthDto } from '../dtos/user.dto';
import { JoiValidationPipe } from '@infrastructure/rest/pipes/joi.validation.pipe';
import { userAuthJoiSchema } from '@infrastructure/validators/user.joi.schema';
import { ValidateUserAuthUseCase } from '@application/usecases/auth/validate.user.auth.use.case';
@Controller(`/api/v1/authenticate`)
@ApiTags(`authenticate`)
export class AuthController {
  constructor(private readonly validateUserAuthUseCase: ValidateUserAuthUseCase) {}
  @ApiOperation({ summary: 'get jwt token by user credentials' })
  @Post(`/`)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(userAuthJoiSchema))
  async authenticate(@Body() userAuthDto: UserAuthDto) {
    return await this.validateUserAuthUseCase.execute(userAuthDto);
  }
}
