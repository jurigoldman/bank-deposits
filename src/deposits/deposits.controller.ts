import { Controller, Get, Post, Body, UseGuards, Request, ForbiddenException, Patch, Param, Query, ParseIntPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { DepositsService, DepositWithProfit } from './deposits.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

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
  @Get('compare')
  @ApiOperation({ summary: 'Compare deposits by amount and term' })
  @ApiQuery({ name: 'amount', required: true, type: Number, description: 'Minimum deposit amount' })
  @ApiQuery({ name: 'term', required: true, type: Number, description: 'Minimum deposit term (in months)' })
  @ApiResponse({ status: 200, description: 'List of matching deposits' })
  @ApiResponse({ status: 400, description: 'Invalid query parameters' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async compareDeposits(
    @Query('amount', ParseIntPipe) amount: number,
    @Query('term', ParseIntPipe) term: number,
  ): Promise<DepositWithProfit[]> {
    if (amount < 0 || term < 1) {
      throw new BadRequestException('Amount must be >= 0 and term must be >= 1');
    }
    return this.depositsService.findMatching(amount, term);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new deposit (admin only)' })
  @ApiBody({ type: CreateDepositDto })
  @ApiResponse({ status: 201, description: 'Deposit created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only admins can add deposits' })
  async create(@Body() createDepositDto: CreateDepositDto, @Request() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Only admins can add deposits');
    }
    return this.depositsService.create(createDepositDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing deposit (admin only)' })
  @ApiParam({ name: 'id', required: true, description: 'Deposit ID' })
  @ApiBody({ type: UpdateDepositDto })
  @ApiResponse({ status: 200, description: 'Deposit updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only admins can update deposits' })
  @ApiResponse({ status: 404, description: 'Deposit not found' })
  async update(
    @Param('id') id: string,
    @Body() updateDepositDto: UpdateDepositDto,
    @Request() req,
  ) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Only admins can update deposits');
    }
    try {
      return await this.depositsService.update(id, updateDepositDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}