import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import NotFoundPage from './pages/NotFoundPage';
// Placeholder components
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const PatientPage = React.lazy(() => import('./pages/PatientPage'));
const DoctorPage = React.lazy(() => import('./pages/DoctorPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));

const theme = createTheme({
  palette: {
    primary: { main: '#e57373' },
    secondary: { main: '#1976d2' },
    background: { default: '#f5f6fa' },
  },
  shape: { borderRadius: 10 },
  typography: { fontFamily: 'Roboto, Arial, sans-serif' },
});

function App() {
  // Giả lập auth, sau này sẽ thay bằng context hoặc redux
  const role = localStorage.getItem('role');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box minHeight="100vh" bgcolor="background.default">
        <Router>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/patient/*" element={role === 'patient' ? <PatientPage /> : <Navigate to="/login" />} />
              <Route path="/doctor/*" element={role === 'doctor' ? <DoctorPage /> : <Navigate to="/login" />} />
              <Route path="/admin/*" element={role === 'admin' ? <AdminPage /> : <Navigate to="/login" />} />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </React.Suspense>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
