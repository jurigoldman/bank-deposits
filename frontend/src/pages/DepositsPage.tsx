import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { Container, Typography, Box, TextField, Button, MenuItem, Select, List, ListItem, ListItemText } from '@mui/material';

interface DepositOption {
  bank: { name: string; interestRate: number };
  amount: number;
}

const DepositsPage: React.FC = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [sum, setSum] = useState('');
  const [termMonths, setTermMonths] = useState<number | ''>('');
  const [depositOptions, setDepositOptions] = useState<DepositOption[]>([]);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleCalculate = async () => {
    try {
      const response = await apiClient.post('/banks/calculate', {
        sum: parseFloat(sum),
        termMonths: parseInt(termMonths as string),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepositOptions(response.data);
    } catch (err) {
      console.error('Failed to calculate:', err);
      navigate('/login');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Calculate Deposits
        </Typography>
        <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
          <TextField
            label="Deposit Amount"
            type="number"
            value={sum}
            onChange={(e) => setSum(e.target.value)}
            fullWidth
          />
          <Select
            value={termMonths}
            onChange={(e) => setTermMonths(parseInt(e.target.value as string))}
            displayEmpty
            fullWidth
          >
            <MenuItem value="" disabled>Select Period</MenuItem>
            <MenuItem value={3}>3 Months</MenuItem>
            <MenuItem value={6}>6 Months</MenuItem>
            <MenuItem value={12}>1 Year</MenuItem>
          </Select>
          <Button
            variant="contained"
            onClick={handleCalculate}
            disabled={!sum || !termMonths}
          >
            Calculate
          </Button>
        </Box>
        {depositOptions.length > 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Deposit Options:
            </Typography>
            <List>
              {depositOptions.map((option, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${option.bank.name} - ${option.bank.interestRate}%`}
                    secondary={`Total Amount: ${option.amount.toFixed(2)}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default DepositsPage;