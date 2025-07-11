import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, Box, Avatar, Grid, Alert, Link, Snackbar } from '@mui/material';
import { API_BASE_URL, setTokens, clearTokens } from '../utils/auth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch(`${API_BASE_URL}/users/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setTokens(data.access, data.refresh);

                const meResponse = await fetch(`${API_BASE_URL}/users/me/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${data.access}`,
                        'Content-Type': 'application/json',
                    },
                });

                const meData = await meResponse.json();

                if (meResponse.ok) {
                    localStorage.setItem('user_info', JSON.stringify(meData));
                    localStorage.setItem('role', meData.phone);
                    setSuccessMessage('Đăng nhập thành công!');

                    setTimeout(() => {
                        if (meData.phone === 'admin') {
                            navigate('/admin');
                        } else if (meData.phone === 'doctor') {
                            navigate('/doctor');
                        } else if (meData.phone === 'patient') {
                            navigate('/patient');
                        }
                        window.location.reload();
                    }, 1000);

                } else {
                    clearTokens();
                    setError(meData.detail || 'Failed to fetch user details.');
                }

            } else {
                setError(data.error || 'Sai email hoặc mật khẩu!');
            }
        } catch (err) {
            setError('Lỗi kết nối đến máy chủ.');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMessage('');
    };

    return (
        <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="#f7f8fa">
            <Card sx={{ maxWidth: 400, width: '100%', p: 2, boxShadow: 3 }}>
                <CardContent>
                    <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                        <Avatar src="/Logo.png" alt="Logo" sx={{ width: 72, height: 72, mb: 1 }} />
                        <Typography variant="h5" fontWeight={700} color="primary" mb={1}>Đăng nhập</Typography>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Mật khẩu"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                        {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.2 }} disabled={loading}>
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </Button>
                    </form>
                    <Box mt={2} textAlign="center">
                        <Typography variant="body2">
                            Chưa có tài khoản?{' '}
                            <Link href="/register" underline="hover">Đăng ký bệnh nhân</Link>
                        </Typography>
                    </Box>
                    <Box mt={3} fontSize={12} color="#888" textAlign="left">
                        <Typography variant="subtitle2" fontWeight={700}>Tài khoản Admin và Bác sĩ:</Typography>
                        <Typography variant="body2">Admin: admin@hospital.com / admin123</Typography>
                        <Typography variant="body2">Bác sĩ: doctor@hospital.com / doctor123</Typography>
                    </Box>
                </CardContent>
            </Card>

            <Snackbar open={!!successMessage} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
} 