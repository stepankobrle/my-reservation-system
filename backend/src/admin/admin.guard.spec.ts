import { AdminGuard } from './admin.guard';
import { JwtService } from '@nestjs/jwt';

describe('AdminGuard', () => {
  it('should be defined', () => {
    expect(new AdminGuard(new JwtService())).toBeDefined();
  });
});
