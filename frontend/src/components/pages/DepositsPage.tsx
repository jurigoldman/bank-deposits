import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'; // Для обертывания секций
import { DepositForm } from '../features/deposits/DepositForm';
import { BankOffersTable } from '../features/deposits/BankOffersTable';

// Предположим, что у нас будет такой тип данных для демонстрации
import { BankOffer } from '../../types/bankOffer';

// Моковые данные для таблицы, пока нет API
const mockOffers: BankOffer[] = [
  {
    id: '1',
    bankName: 'SberBank',
    rate: 0.075, // 7.5%
    minAmount: 50000,
    maxAmount: 1000000,
    minTerm: 6, // месяцев
    maxTerm: 24,
    currency: 'RUB',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Sberbank_Logo_2020.svg/2560px-Sberbank_Logo_2020.svg.png',
    compoundingFrequency: 'monthly',
  },
  {
    id: '2',
    bankName: 'Tinkoff Bank',
    rate: 0.082, // 8.2%
    minAmount: 10000,
    minTerm: 3,
    currency: 'RUB',
    logoUrl: 'https://acdn.tinkoff.ru/static/documents/19a28a7a-7465-4397-8949-279cb3b49996.png',
    compoundingFrequency: 'end_of_term',
  },
  {
    id: '3',
    bankName: 'VTB',
    rate: 0.070,
    minAmount: 30000,
    minTerm: 12,
    maxTerm: 36,
    currency: 'RUB',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/VTB_logo_2018.svg/1200px-VTB_logo_2018.svg.png',
    specialConditions: ['Online only', 'New clients']
  },
];

export const DepositsPage: React.FC = () => {
  // Состояние для хранения предложений (позже будет из API)
  const [offers, setOffers] = React.useState<BankOffer[]>(mockOffers);
  // Состояние для параметров формы
  const [depositParams, setDepositParams] = React.useState({ amount: '', term: '' });

  const handleFormChange = (newParams: { amount: string; term: string }) => {
    setDepositParams(newParams);
    // Здесь будет логика запроса к API с новыми параметрами
    console.log('Form params changed:', newParams);
    // filterMockOffers(newParams);
  };

  // Пример фильтрации моковых данных (заменить на API вызов)
  // const filterMockOffers = (params: { amount: string; term: string }) => {
  //   let filtered = mockOffers;
  //   if (params.amount) {
  //     const amountNum = parseFloat(params.amount);
  //     filtered = filtered.filter(offer => 
  //       (offer.minAmount === undefined || amountNum >= offer.minAmount) &&
  //       (offer.maxAmount === undefined || amountNum <= offer.maxAmount)
  //     );
  //   }
  //   if (params.term) {
  //     const termNum = parseInt(params.term, 10);
  //     filtered = filtered.filter(offer => 
  //       (offer.minTerm === undefined || termNum >= offer.minTerm) &&
  //       (offer.maxTerm === undefined || termNum <= offer.maxTerm)
  //     );
  //   }
  //   setOffers(filtered);
  // };

  // React.useEffect(() => {
  //   // Первоначальная загрузка данных (позже из API)
  //   // fetchBankOffers().then(setOffers);
  // }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Секция для формы ввода параметров */} 
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom component="div">
              Рассчитать депозит
            </Typography>
            <DepositForm params={depositParams} onParamsChange={handleFormChange} />
          </Paper>
        </Grid>

        {/* Секция для отображения предложений банков */} 
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom component="div" sx={{ mb: 2 }}>
            Предложения банков
          </Typography>
          <BankOffersTable offers={offers} />
        </Grid>
      </Grid>
    </Box>
  );
}; 