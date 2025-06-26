import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, Box, Grid, Alert, Link, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

export default function RegisterPage() {
    const [form, setForm] = useState({
        email: '', password: '', first_name: '', last_name: '', gender: '', DOB: '', address: '', phone: '', allergies: '', chronic_diseases: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        for (let key in form) {
            if (!form[key]) {
                setError('Vui lòng nhập đầy đủ thông tin!');
                return;
            }
        }
        // Lấy danh sách bệnh nhân hiện tại
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');
        // Kiểm tra trùng email
        if (patients.some(p => p.email === form.email)) {
            setError('Email đã được đăng ký.');
            return;
        }
        // Thêm bệnh nhân mới
        const newPatients = [...patients, form];
        localStorage.setItem('patients', JSON.stringify(newPatients));
        // Chuyển về trang đăng nhập, có thể truyền email vừa đăng ký qua state nếu muốn
        navigate('/login');
    };

    return (
        <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="#f7f8fa">
            <Card sx={{ maxWidth: 500, width: '100%', p: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" fontWeight={700} color="primary" mb={3} align="center">Đăng ký bệnh nhân</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Họ" name="first_name" value={form.first_name} onChange={handleChange} fullWidth required sx={{ mb: 2, minWidth: 400 }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Tên" name="last_name" value={form.last_name} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required sx={{ mb: 2, minWidth: 170 }}>
                                    <InputLabel>Giới tính</InputLabel>
                                    <Select
                                        name="gender"
                                        value={form.gender}
                                        label="Giới tính"
                                        onChange={handleChange}
                                        MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
                                    >
                                        <MenuItem value="">Chọn giới tính</MenuItem>
                                        <MenuItem value="male">Nam</MenuItem>
                                        <MenuItem value="female">Nữ</MenuItem>
                                        <MenuItem value="other">Khác</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Ngày sinh" name="DOB" type="date" value={form.DOB} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} sx={{ mb: 2 }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Địa chỉ" name="address" value={form.address} onChange={handleChange} fullWidth required sx={{ mb: 2, minWidth: 230 }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Số điện thoại" name="phone" value={form.phone} onChange={handleChange} fullWidth required sx={{ mb: 2, minWidth: 400 }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} fullWidth required sx={{ mb: 2, minWidth: 400 }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Mật khẩu" name="password" type="password" value={form.password} onChange={handleChange} fullWidth required sx={{ mb: 2, minWidth: 400 }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Dị ứng" name="allergies" value={form.allergies} onChange={handleChange} fullWidth required sx={{ mb: 2, minWidth: 400 }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Bệnh mãn tính" name="chronic_diseases" value={form.chronic_diseases} onChange={handleChange} fullWidth required sx={{ mb: 2, minWidth: 400 }} />
                            </Grid>
                        </Grid>
                        {error && <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{error}</Alert>}
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5, backgroundColor: '#f44336', '&:hover': { backgroundColor: '#d32f2f' } }}>
                            Đăng ký
                        </Button>
                    </form>
                    <Box mt={2} textAlign="center">
                        <Typography variant="body2">
                            Đã có tài khoản?{' '}
                            <Link href="/login" underline="hover">Đăng nhập</Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
} 