import { Controller, Get, Post, Body, UseGuards, Request, ForbiddenException, Patch, Param, Query, ParseIntPipe, NotFoundException, BadRequestException, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { BankOffersService } from './bank-offers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CreateBankOfferDto } from './dto/create-bank-offer.dto';
import { UpdateBankOfferDto } from './dto/update-bank-offer.dto';
import { BankOfferComparisonResultDto } from './dto/bank-offer-comparison-result.dto';

@ApiTags('bank-offers')
@ApiBearerAuth()
@Controller('bank-offers')
export class BankOffersController {
  constructor(private bankOffersService: BankOffersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all bank offers' })
  @ApiResponse({ status: 200, description: 'List of bank offers' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll() {
    return this.bankOffersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific bank offer by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Bank offer ID' })
  @ApiResponse({ status: 200, description: 'Bank offer details' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Bank offer not found' })
  async findOne(@Param('id') id: string) {
    try {
      const offer = await this.bankOffersService.findOne(id);
      return offer;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get('compare')
  @ApiOperation({ summary: 'Compare bank offers by amount and term' })
  @ApiQuery({ name: 'amount', required: true, type: Number, description: 'Deposit amount' })
  @ApiQuery({ name: 'term', required: true, type: Number, description: 'Deposit term (in months)' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of matching bank offers with profit calculation.', 
    type: [BankOfferComparisonResultDto]
  })
  @ApiResponse({ status: 400, description: 'Invalid query parameters' })
  async compareOffers(
    @Query('amount', ParseIntPipe) amount: number,
    @Query('term', ParseIntPipe) term: number,
  ): Promise<BankOfferComparisonResultDto[]> {
    if (amount < 0 || term < 1) {
      throw new BadRequestException('Amount must be >= 0 and term must be >= 1');
    }
    return this.bankOffersService.findMatching(amount, term);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new bank offer (admin only)' })
  @ApiBody({ type: CreateBankOfferDto })
  @ApiResponse({ status: 201, description: 'Bank offer created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only admins can add bank offers' })
  async create(@Body() createBankOfferDto: CreateBankOfferDto, @Request() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Only admins can add bank offers');
    }
    return this.bankOffersService.create(createBankOfferDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing bank offer (admin only)' })
  @ApiParam({ name: 'id', required: true, description: 'Bank offer ID' })
  @ApiBody({ type: UpdateBankOfferDto })
  @ApiResponse({ status: 200, description: 'Bank offer updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only admins can update bank offers' })
  @ApiResponse({ status: 404, description: 'Bank offer not found' })
  async update(
    @Param('id') id: string,
    @Body() updateBankOfferDto: UpdateBankOfferDto,
    @Request() req,
  ) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Only admins can update bank offers');
    }
    try {
      return await this.bankOffersService.update(id, updateBankOfferDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a bank offer (admin only)' })
  @ApiParam({ name: 'id', required: true, description: 'Bank offer ID' })
  @ApiResponse({ status: 204, description: 'Bank offer deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only admins can delete bank offers' })
  @ApiResponse({ status: 404, description: 'Bank offer not found' })
  async delete(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Only admins can delete bank offers');
    }
    await this.bankOffersService.delete(id);
  }
}