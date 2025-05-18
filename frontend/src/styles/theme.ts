import { createTheme } from '@mui/material/styles';

// Примерные цвета, как на скриншоте (темная тема)
const theme = createTheme({
  palette: {
    mode: 'dark', // Включаем темный режим
    primary: {
      main: '#8A2BE2', // Фиолетовый/синий для акцентов (кнопки, активные элементы)
      // contrastText: '#ffffff',
    },
    secondary: {
      main: '#00AEEF', // Голубой для некоторых элементов, если потребуется
    },
    background: {
      default: '#1A1C23', // Очень темный фон основной
      paper: '#2A2D35',   // Фон для карточек, инпутов, таблиц
    },
    text: {
      primary: '#E0E0E0', // Светло-серый для основного текста
      secondary: '#A0A0A0', // Более темный серый для второстепенного текста
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 600 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 500 },
    h5: { fontSize: '1.25rem', fontWeight: 500 },
    h6: { fontSize: '1rem', fontWeight: 500 },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none', // Убираем КАПС с кнопок, если нужно
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Скругленные углы для кнопок
          padding: '10px 20px',
        },
        containedPrimary: {
          color: '#fff',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8, // Скругленные углы для инпутов
            backgroundColor: '#2A2D35', // Фон инпутов
          },
          '& .MuiInputLabel-root': {
            color: '#A0A0A0',
          },
          '& .MuiOutlinedInput-input': {
            color: '#E0E0E0',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Скругление для карточек
          padding: '20px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2A2D35', // Фон навбара
        },
      },
    },
    MuiTableContainer: {
        styleOverrides: {
            root: {
                backgroundColor: '#2A2D35',
                borderRadius: 12,
            }
        }
    },
    MuiTableCell: {
        styleOverrides: {
            head: {
                backgroundColor: '#333740', // Фон заголовков таблицы
                color: '#E0E0E0',
                fontWeight: 'bold',
            },
            body: {
                color: '#C0C0C0',
            }
        }
    }
  },
});

export default theme; 