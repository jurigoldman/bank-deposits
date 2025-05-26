import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { Container, Typography, Box, TextField, Button, List, ListItem, ListItemText, IconButton, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface Bank {
  _id: string;
  name: string;
  interestRate: number;
  isActive: boolean;
}

const AdminPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [name, setName] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchBanks();
  }, [user, navigate]);

  const fetchBanks = async () => {
    try {
      const response = await apiClient.get('/banks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBanks(response.data);
    } catch (err) {
      console.error('Failed to fetch banks:', err);
      navigate('/login');
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      const body = { name, interestRate: parseFloat(interestRate), isActive: true };
      if (editId) {
        await apiClient.patch(`/banks/${editId}`, body, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await apiClient.post('/banks', body, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setName('');
      setInterestRate('');
      setEditId(null);
      fetchBanks();
    } catch (err) {
      console.error('Failed to save bank:', err);
    }
  };

  const handleEdit = (bank: Bank) => {
    setName(bank.name);
    setInterestRate(bank.interestRate.toString());
    setEditId(bank._id);
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await apiClient.patch(`/banks/${id}`, { isActive: !isActive }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBanks();
    } catch (err) {
      console.error('Failed to toggle bank status:', err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Panel - Manage Banks
        </Typography>
        <Box sx={{ mb: 4 }}>
          <TextField
            label="Bank Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mr: 2 }}
          />
          <TextField
            label="Interest Rate (%)"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleAddOrUpdate}
            disabled={!name || !interestRate}
          >
            {editId ? 'Update Bank' : 'Add Bank'}
          </Button>
        </Box>
        <Typography variant="h6" gutterBottom>
          Banks List
        </Typography>
        <List>
          {banks.map((bank) => (
            <ListItem key={bank._id} secondaryAction={
              <>
                <IconButton edge="end" onClick={() => handleEdit(bank)}>
                  <EditIcon />
                </IconButton>
                <Switch
                  checked={bank.isActive}
                  onChange={() => handleToggleActive(bank._id, bank.isActive)}
                />
              </>
            }>
              <ListItemText
                primary={`${bank.name} - ${bank.interestRate}%`}
                secondary={bank.isActive ? 'Active' : 'Inactive'}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default AdminPage;