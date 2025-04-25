import { Controller, Get, Post, Body, UseGuards, Request, ForbiddenException, Patch, Param, Query, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto'; //Импортируем DTO для обновления

@ApiTags('deposits')
@ApiBearerAuth()
@Controller('deposits')
export class DepositsController {
  constructor(private depositsService: DepositsService) {}

  /**
   * Получает список всех депозитов.
   * Требует аутентификации пользователя.
   * @returns Список депозитов.
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all deposits' })
  @ApiResponse({ status: 200, description: 'List of deposits' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll() {
    return this.depositsService.findAll();
  }

  /**
   * Сравнивает вклады по сумме и сроку.
   * Требует аутентификации пользователя.
   * @param amount - Минимальная сумма вклада.
   * @param term - Минимальный срок вклада (в месяцах).
   * @returns Список подходящих вкладов.
   */
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
  ) {
    return this.depositsService.findMatching(amount, term);
  }

  /**
   * Создает новый депозит.
   * Доступно только для администраторов.
   * Требует аутентификации пользователя.
   * @param createDepositDto - Данные для создания депозита.
   * @param req - Объект запроса, содержащий информацию о пользователе.
   * @returns Созданный депозит.
   * @throws ForbiddenException если пользователь не является администратором.
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new deposit (admin only)' })
  @ApiBody({ type: CreateDepositDto }) //Указываем тело запроса
  @ApiResponse({ status: 201, description: 'Deposit created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only admins can add deposits' })
  async create(@Body() createDepositDto: CreateDepositDto, @Request() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Only admins can add deposits');
    }
    //Убедимся, что передаем все поля, включая amount и term
    return this.depositsService.create(createDepositDto);
  }

  /**
   * Обновляет существующий депозит.
   * Доступно только для администраторов.
   * Требует аутентификации пользователя.
   * @param id - ID депозита для обновления.
   * @param updateDepositDto - Данные для обновления.
   * @param req - Объект запроса, содержащий информацию о пользователе.
   * @returns Обновленный депозит.
   * @throws ForbiddenException если пользователь не является администратором.
   * @throws NotFoundException если депозит с указанным ID не найден.
   */
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
      throw error; //Перебрасываем другие ошибки
    }
  }
}