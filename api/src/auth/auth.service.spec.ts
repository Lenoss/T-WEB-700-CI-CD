import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { UsersService } from '../users/users.service'
import {User} from "../users/users.schema";

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '604800s' },
        })
      ],
      providers: [
        AuthService,
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            username: 'user10',
            password: 'user10pw',
            email: 'user10@email.com'
          }
        }
      ],
      exports: [AuthService]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})