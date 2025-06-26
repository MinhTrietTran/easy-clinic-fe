import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, Box, Avatar, Grid, Alert, Link } from '@mui/material';

const USERS = [
    { email: 'admin@abc.com', password: 'admin123', role: 'admin' },
    { email: 'doctor@abc.com', password: 'doctor123', role: 'doctor' },
];

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check admin/doctor
        const user = USERS.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('role', user.role);
            if (user.role === 'admin') {
                navigate('/admin');
                window.location.reload();
            } else if (user.role === 'doctor') {
                navigate('/doctor');
                window.location.reload();
            }
            return;
        }
        // Check patient
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');
        const patient = patients.find(p => p.email === email && p.password === password);
        if (patient) {
            localStorage.setItem('role', 'patient');
            localStorage.setItem('patient_info', JSON.stringify(patient));
            navigate('/patient');
            window.location.reload();
            return;
        }
        setError('Sai email hoặc mật khẩu!');
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
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.2 }}>
                            Đăng nhập
                        </Button>
                    </form>
                    <Box mt={2} textAlign="center">
                        <Typography variant="body2">
                            Chưa có tài khoản?{' '}
                            <Link href="/register" underline="hover">Đăng ký bệnh nhân</Link>
                        </Typography>
                    </Box>
                    <Box mt={3} fontSize={12} color="#888" textAlign="left">
                        <Typography variant="subtitle2" fontWeight={700}>Tài khoản mẫu:</Typography>
                        <Typography variant="body2">Admin: admin@abc.com / admin123</Typography>
                        <Typography variant="body2">Bác sĩ: doctor@abc.com / doctor123</Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
} 