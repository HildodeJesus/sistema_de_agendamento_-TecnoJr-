import { JwtModule } from '@nestjs/jwt';

export default JwtModule.register({
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '3d' },
});
