import { Injectable } from '@nestjs/common';
import { UserNotAllowedException } from '@domain/exceptions/user.exception';
import { UserAuthDto } from '@presentation/dtos/user.dto';
import { FindByEmailUserUseCase } from '../user/find.by.email.user.use.case';
import { JwtCustomService } from '@domain/shared/services/jwt.custom.service';
@Injectable()
export class ValidateUserAuthUseCase {
  constructor(private readonly findByEmailUserUseCase: FindByEmailUserUseCase, private readonly jwtCustomService: JwtCustomService) {}
  async execute(userAuthDto: UserAuthDto) {
    const queryResult = await this.findByEmailUserUseCase.execute(userAuthDto.email);
    if (!queryResult || queryResult.email !== userAuthDto.email || queryResult.password !== userAuthDto.password) throw new UserNotAllowedException();
    else {
      const { password, roles, ...userData } = queryResult;
			const rolesArrayString = roles.map((role) => role.name);
			userData['roles'] = rolesArrayString;
			const jwtPayload = {
				user: userData
			};
      return await this.jwtCustomService.generateJwtExpiresIn(jwtPayload, '1h');
    }
  }
}
