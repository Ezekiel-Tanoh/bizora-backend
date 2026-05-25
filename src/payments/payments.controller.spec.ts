import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { describe, beforeEach, it, expect } from '@jest/globals';

describe('PaymentsController', () => {
  let controller: PaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});