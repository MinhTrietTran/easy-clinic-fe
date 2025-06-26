import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function HealthRecordForm() {
    const [form, setForm] = useState({
        patient: '', visit_date: '', diagnosis: '', treatment: '', notes: '', next_appointment: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!form.patient || !form.visit_date || !form.diagnosis || !form.treatment) {
            setError('Vui lòng nhập đầy đủ thông tin bắt buộc!');
            return;
        }
        setError('');
        setSuccess(true);
    };

    return (
        <Card sx={{ maxWidth: 500, mx: 'auto' }}>
            <CardContent>
                <Typography variant="h6" mb={2}>Cập nhật bệnh án</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}><TextField label="Bệnh nhân" name="patient" value={form.patient} onChange={handleChange} fullWidth required /></Grid>
                        <Grid item xs={6}><TextField label="Ngày khám" name="visit_date" type="date" value={form.visit_date} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} /></Grid>
                        <Grid item xs={6}><TextField label="Chẩn đoán" name="diagnosis" value={form.diagnosis} onChange={handleChange} fullWidth required /></Grid>
                        <Grid item xs={12}><TextField label="Điều trị" name="treatment" value={form.treatment} onChange={handleChange} fullWidth required /></Grid>
                        <Grid item xs={12}><TextField label="Ghi chú" name="notes" value={form.notes} onChange={handleChange} fullWidth /></Grid>
                        <Grid item xs={12}><TextField label="Lịch hẹn tiếp theo" name="next_appointment" type="date" value={form.next_appointment} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
                        {error && <Grid item xs={12}><Typography color="error">{error}</Typography></Grid>}
                        <Grid item xs={12} mt={1}>
                            <Button type="submit" variant="contained" fullWidth>Lưu bệnh án</Button>
                        </Grid>
                    </Grid>
                </form>
                <Dialog open={success} onClose={() => setSuccess(false)} maxWidth="xs" fullWidth>
                    <DialogTitle>Lưu thành công</DialogTitle>
                    <DialogContent>Bệnh án đã được lưu!</DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSuccess(false)}>Đóng</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
} 