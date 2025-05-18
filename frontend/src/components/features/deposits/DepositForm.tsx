import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';

interface DepositFormParams {
  amount: string;
  term: string;
}

interface DepositFormProps {
  params: DepositFormParams;
  onParamsChange: (params: DepositFormParams) => void;
  // onCalculate?: () => void; // Для кнопки "Рассчитать", если нужна отдельная
}

export const DepositForm: React.FC<DepositFormProps> = ({ params, onParamsChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onParamsChange({
      ...params,
      [event.target.name]: event.target.value,
    });
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (onCalculate) {
  //     onCalculate();
  //   }
  // };

  return (
    <Box component="form" noValidate autoComplete="off" /*onSubmit={handleSubmit}*/>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Сумма депозита"
            name="amount"
            type="number"
            value={params.amount}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">₽</InputAdornment>,
              // Добавляем кнопки Max/50% как на скриншоте, если нужно
            }}
            // helperText="Например, 100000"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Срок депозита"
            name="term"
            type="number"
            value={params.term}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">мес.</InputAdornment>,
            }}
            // helperText="Например, 12"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            // disabled={!params.amount || !params.term} // Пример дизейбла кнопки
          >
            Рассчитать предложения
          </Button>
        </Grid> */} 
        {/* Кнопка "Рассчитать" может быть не нужна, если данные обновляются при изменении полей */}
        {/* Дизайн кнопки "Enter Token Amount" со скриншота можно применить здесь */}
        <Grid item xs={12} sx={{ mt: 1}}>
            <Button 
                variant="contained" 
                color="secondary" // Используем secondary цвет из темы
                fullWidth
                // disabled={!params.amount || !params.term}
                sx={{ 
                    py: 1.5, 
                    fontSize: '1.1rem',
                    backgroundColor: 'secondary.main', // Явное указание, если тема не подхватывает
                    '&:hover': {
                        backgroundColor: 'secondary.dark',
                    }
                }}
            >
                Подобрать предложения
            </Button>
        </Grid>
      </Grid>
    </Box>
  );
}; 