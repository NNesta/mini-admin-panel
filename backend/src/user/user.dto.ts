import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: 'admin' })
  role: string;

  @ApiProperty({ example: 'active' })
  status: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'john@example.com', required: false })
  email?: string;

  @ApiProperty({ example: 'user', required: false })
  role?: string;

  @ApiProperty({ example: 'inactive', required: false })
  status?: string;
}
