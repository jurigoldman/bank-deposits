import { Controller, Get, Post, Body, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateDepositDto } from './dto/create-deposit.dto';

@ApiTags('deposits')
@ApiBearerAuth()
@Controller('deposits')
export class DepositsController {
  constructor(private depositsService: DepositsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all deposits' })
  @ApiResponse({ status: 200, description: 'List of deposits' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll() {
    return this.depositsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new deposit (admin only)' })
  @ApiBody({ type: CreateDepositDto }) // Указываем тело запроса
  @ApiResponse({ status: 201, description: 'Deposit created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only admins can add deposits' })
  async create(@Body() createDepositDto: CreateDepositDto, @Request() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Only admins can add deposits');
    }
    return this.depositsService.create(createDepositDto);
  }
}