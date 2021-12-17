import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    type: String,
    description: 'The password of the user.',
    examples: ['password'],
    example: 'password'
  })
  password: string

  @ApiProperty({
    type: String,
    description: 'The email of the user.',
    examples: ['user@some.where'],
    example: 'user@some.where'
  })
  email: string

  @ApiProperty({
    type: String,
    description: 'The firstname of the user.',
    examples: ['userFirstname'],
    example: 'userFirstname'
  })
  firstname: string

  @ApiProperty({
    type: String,
    description: 'The lastname of the user.',
    examples: ['userLastname'],
    example: 'userLastname'
  })
  lastname: string

  @ApiProperty({
    type: String,
    description: 'The contact of the user.',
    examples: ['userContact'],
    example: 'userContact'
  })
  phone: string
}
