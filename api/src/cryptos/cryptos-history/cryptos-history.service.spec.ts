import { Test, TestingModule } from '@nestjs/testing';
import { CryptosHistoryService } from './cryptos-history.service';

describe('CryptosHistoryService', () => {
  let service: CryptosHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptosHistoryService],
    }).compile();

    service = module.get<CryptosHistoryService>(CryptosHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
