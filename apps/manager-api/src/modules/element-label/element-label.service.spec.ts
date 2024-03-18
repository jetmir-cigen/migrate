import { Test, TestingModule } from '@nestjs/testing';
import { ElementLabelService } from './element-label.service';

describe('ElementLabelService', () => {
  let service: ElementLabelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElementLabelService],
    }).compile();

    service = module.get<ElementLabelService>(ElementLabelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
