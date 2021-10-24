import { ApiProperty } from '@nestjs/swagger';
export class RoleDto {
  id?: number;
  @ApiProperty({ nullable: false, example: 'adm' })
  name: string;

}


