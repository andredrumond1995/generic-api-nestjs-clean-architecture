import { ApiProperty } from '@nestjs/swagger';
import { RoleModel } from '@domain/models/role.model';
export class UserDto {
	id?: number;
	@ApiProperty({ nullable: false, example: 'test user' })
	name: string;
	@ApiProperty({ nullable: false, example: 'testuser@gmail.com' })
	email: string;
	@ApiProperty({ nullable: false, example: 'testuserpasswd' })
	password: string;
	@ApiProperty({ nullable: false, example: [ 1, 2 ] })
	roles: RoleModel[];
	@ApiProperty({ nullable: true, example: true })
	activated?: boolean;
}

export class UserAuthDto {
	@ApiProperty({ nullable: false, example: 'testuser@gmail.com' })
	email: string;

	@ApiProperty({ nullable: false, example: 'testuserpasswd' })
	password: string;
}
