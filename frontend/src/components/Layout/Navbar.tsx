import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // Пример иконки
import SettingsIcon from '@mui/icons-material/Settings'; // Иконка настроек как на скриншоте
import Box from '@mui/material/Box';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleDepositsClick = () => {
    navigate('/deposits');
  };

  const handlePortfolioClick = () => {
    navigate('/portfolio');
  };

  const handleSettingsClick = () => {
    // Здесь можно добавить логику для открытия настроек
    console.log('Settings clicked');
  };

  const handleConnectWallet = () => {
    // Здесь можно добавить логику для подключения кошелька
    console.log('Connect wallet clicked');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ mr: 2 }}
          onClick={handleLogoClick}
        >
          <MonetizationOnIcon sx={{ fontSize: 40 }} /> {/* Иконка R как на скриншоте, заменена */} 
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
          Bank Deposits
        </Typography>

        <Button color="inherit" onClick={handleDepositsClick}>
          Deposits
        </Button>
        <Button color="inherit" onClick={handlePortfolioClick}>
          My Portfolio
        </Button>
        
        <Box sx={{ flexGrow: 1 }} /> {/* Заполнитель для выравнивания элементов справа */}

        <IconButton color="inherit" onClick={handleSettingsClick}>
          <SettingsIcon />
        </IconButton>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleConnectWallet}
          sx={{ backgroundColor: 'secondary.main', color: 'background.default' }}
        >
          Connect Wallet
        </Button>
      </Toolbar>
    </AppBar>
  );
}; 