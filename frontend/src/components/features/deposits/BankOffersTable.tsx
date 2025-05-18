import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BankOffer } from '../../../types/bankOffer'; // Путь к вашему типу

interface BankOffersTableProps {
  offers: BankOffer[];
  // onSelectOffer?: (offer: BankOffer) => void;
}

// Вспомогательная функция для форматирования ставки
const formatRate = (rate: number): string => {
  return `${(rate * 100).toFixed(2)}%`;
};

// Вспомогательная функция для отображения срока
const formatTerm = (minTerm: number, maxTerm?: number): string => {
  if (maxTerm !== undefined) {
    if (minTerm === maxTerm) return `${minTerm} мес.`;
    return `${minTerm} - ${maxTerm} мес.`;
  }
  return `от ${minTerm} мес.`;
};

// Вспомогательная функция для отображения суммы
const formatAmount = (amount?: number): string => {
  if (amount === undefined) return '-';
  return `${amount.toLocaleString('ru-RU')} ₽`;
};

export const BankOffersTable: React.FC<BankOffersTableProps> = ({ offers }) => {
  if (!offers || offers.length === 0) {
    return (
      <Paper sx={{ textAlign: 'center', p: 3 }}>
        <Typography variant="subtitle1">Нет доступных предложений по вашему запросу.</Typography>
      </Paper>
    );
  }
  return (
    <TableContainer component={Paper} sx={{ /* Стили из темы должны примениться */ }}>
      <Table sx={{ minWidth: 650 }} aria-label="bank offers table">
        <TableHead sx={{ /* Стили из темы */ }}>
          <TableRow>
            <TableCell>Банк</TableCell>
            <TableCell align="right">Ставка</TableCell>
            <TableCell align="right">Срок</TableCell>
            <TableCell align="right">Сумма</TableCell>
            <TableCell align="center">Условия</TableCell>
            <TableCell align="center">Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offers.map((offer) => (
            <TableRow
              key={offer.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {offer.logoUrl && (
                    <Avatar src={offer.logoUrl} sx={{ mr: 1.5, width: 32, height: 32 }} variant="rounded" />
                  )}
                  <Typography variant="body2" component="span" sx={{ fontWeight: 'medium'}}>{offer.bankName}</Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main'}}>{formatRate(offer.rate)}</Typography>
              </TableCell>
              <TableCell align="right">{formatTerm(offer.minTerm, offer.maxTerm)}</TableCell>
              <TableCell align="right">
                {offer.minAmount !== undefined ? `от ${formatAmount(offer.minAmount)}` : 'Любая'}
                {offer.maxAmount !== undefined ? ` до ${formatAmount(offer.maxAmount)}` : ''}
              </TableCell>
              <TableCell align="center">
                {offer.specialConditions && offer.specialConditions.length > 0 
                    ? offer.specialConditions.join(', ')
                    : '-'}
                </TableCell>
              <TableCell align="center">
                <Button variant="outlined" color="secondary" size="small" /*onClick={() => onSelectOffer?.(offer)}*/>
                  Выбрать
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}; 