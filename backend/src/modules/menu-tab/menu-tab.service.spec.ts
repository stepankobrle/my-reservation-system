import { Test, TestingModule } from '@nestjs/testing';
import { MenuTabService } from './menu-tab.service';

describe('MenuTabService', () => {
  let service: MenuTabService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuTabService],
    }).compile();

    service = module.get<MenuTabService>(MenuTabService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
