import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Select, InputLabel, FormControl } from '@mui/material';

const DEPARTMENTS = [
    'Nội tổng quát',
    'Tai mũi họng',
    'Nhi',
    'Sản',
    'Da liễu',
    'Tim mạch',
    'Tiêu hóa',
];

export default function AppointmentBooking() {
    const [form, setForm] = useState({ department: '', date: '', time: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!form.department || !form.date || !form.time) {
            setError('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        setError('');
        setSuccess(true);
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
                        {error && <Grid item xs={12}><Typography color="error">{error}</Typography></Grid>}
                        <Grid item xs={12} mt={1}>
                            <Button type="submit" variant="contained" fullWidth>Đặt lịch</Button>
                        </Grid>
                    </Grid>
                </form>
                <Dialog open={success} onClose={() => setSuccess(false)} maxWidth="xs" fullWidth>
                    <DialogTitle>Đặt lịch thành công</DialogTitle>
                    <DialogContent>Lịch khám đã được đặt thành công!</DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSuccess(false)}>Đóng</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
} 