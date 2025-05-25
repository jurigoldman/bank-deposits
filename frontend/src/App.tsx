import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState, AppDispatch } from './store';
import { loadUser } from './features/auth/authSlice';
import theme from './styles/theme';

// Components
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import DepositsPage from './pages/DepositsPage';
import CreateBankOffer from './components/CreateBankOffer';
import CompareBankOffers from './components/CompareBankOffers';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Initialize the app with user data if token exists
const AppContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Try to load user if token exists
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch, token]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="deposits"
              element={
                <ProtectedRoute>
                  <DepositsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="create-deposit"
              element={
                <ProtectedRoute requiredRole="admin">
                  <CreateBankOffer />
                </ProtectedRoute>
              }
            />
            <Route
              path="compare-deposits"
              element={
                <ProtectedRoute>
                  <CompareBankOffers />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* 404 - Not Found */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

// Main App component with Redux Provider
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;