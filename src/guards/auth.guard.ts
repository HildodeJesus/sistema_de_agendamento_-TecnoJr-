import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from 'src/UseCases/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    console.log(token);

    if (!token) {
      throw new UnauthorizedException();
    }

    this.authService.validateUser(request.headers.authorization);

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const authorization = request.headers.authorization?.split(' ') ?? [];
    return authorization[0] === 'Bearer' ? authorization[1] : undefined;
  }
}
