import { Test, TestingModule } from '@nestjs/testing';
import { MenuTabController } from './menu-tab.controller';
import { MenuTabService } from './menu-tab.service';

describe('MenuTabController', () => {
  let controller: MenuTabController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuTabController],
      providers: [MenuTabService],
    }).compile();

    controller = module.get<MenuTabController>(MenuTabController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
