import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import { authenticatedFetch } from '../../utils/auth'; // Import authenticatedFetch

const APPOINTMENT_API_BASE_URL = 'http://localhost:5002/api/v1'; // Base URL for Appointment Service

const DEPARTMENTS = [
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Dermatology',
    'Oncology',
    'Orthopedics',
    'Gastroenterology',
    'Endocrinology',
    'Ophthalmology',
    'Psychiatry',
];

export default function AppointmentBooking() {
    const [form, setForm] = useState({ department: '', date: '', time: '' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!form.department || !form.date || !form.time) {
            setError('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const dateTimeStart = new Date(`${form.date}T${form.time}:00`);
            const time_start = dateTimeStart.toISOString();

            // Calculate end_time as time_start + 30 minutes, and format to ISO string
            const dateTimeEnd = new Date(dateTimeStart.getTime() + 30 * 60000);
            const end_time = dateTimeEnd.toISOString();

            const response = await authenticatedFetch(`${APPOINTMENT_API_BASE_URL}/appointments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    department: form.department,
                    time_start: time_start,
                    end_time: end_time, // Include end_time
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message || 'Lịch khám đã được đặt thành công và đang chờ xác nhận!');
            } else {
                setError(data.error || 'Đặt lịch thất bại. Vui lòng thử lại.');
            }
        } catch (err) {
            console.error('Error booking appointment:', err);
            setError('Lỗi kết nối đến máy chủ hoặc phiên làm việc đã hết hạn.');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMessage('');
        setError('');
    };

    return (
        <Card sx={{ maxWidth: 550, mx: 'auto', p: 4 }}>
            <CardContent>
                <Typography variant="h6" mb={2}>Đặt lịch khám</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth required sx={{ minWidth: 250 }}>
                                <InputLabel>Chuyên khoa</InputLabel>
                                <Select name="department" value={form.department} label="Chuyên khoa" onChange={handleChange}>
                                    <MenuItem value="">Chọn chuyên khoa</MenuItem>
                                    {DEPARTMENTS.map(dep => <MenuItem key={dep} value={dep}>{dep}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Ngày khám" name="date" type="date" value={form.date} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Giờ khám" name="time" type="time" value={form.time} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
                        </Grid>
                        {error && <Grid item xs={12}><Alert severity="error" sx={{ mt: 1 }}>{error}</Alert></Grid>}
                        <Grid item xs={12} mt={1}>
                            <Button type="submit" variant="contained" fullWidth disabled={loading}>
                                {loading ? 'Đang đặt lịch...' : 'Đặt lịch'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        {successMessage}
                    </Alert>
                </Snackbar>
                <Snackbar open={!!error && error !== 'Vui lòng nhập đầy đủ thông tin!'} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            </CardContent>
        </Card>
    );
}