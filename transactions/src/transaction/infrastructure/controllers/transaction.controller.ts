import { Controller, Inject } from '@nestjs/common';
import { TransactionServiceInterface } from '../../domain/interfaces/transaction.service.interface';
import { TransactionMapper } from '../../application/mapper/transaction.mapper';
import { BaseController } from 'src/shared/infrastructure/controllers/base.controller';
import { CreateTransactionDto } from 'src/transaction/application/dto/transaction.create.dto';
import { TransactionDto } from 'src/transaction/application/dto/transaction.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateTransactionDto } from 'src/transaction/application/dto/transaction.update.dto';

@Controller('transactions')
export class TransactionController extends BaseController {
  private mapper: TransactionMapper;
  constructor(
    @Inject('TransactionService')
    private readonly service: TransactionServiceInterface,
  ) {
    super();
    this.mapper = new TransactionMapper();
  }

  @MessagePattern('process_transaction')
  async create(
    @Payload() message: CreateTransactionDto,
  ): Promise<TransactionDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(message));
    return this.mapper.toDto(data);
  }

  @MessagePattern('reject_transaction')
  async reject(
    @Payload() message: UpdateTransactionDto,
  ): Promise<TransactionDto> {
    const data = await this.service.reject(message.id);
    return this.mapper.toDto(data);
  }

  @MessagePattern('approve_transaction')
  async approve(
    @Payload() message: UpdateTransactionDto,
  ): Promise<TransactionDto> {
    const data = await this.service.approve(message.id);
    return this.mapper.toDto(data);
  }
}