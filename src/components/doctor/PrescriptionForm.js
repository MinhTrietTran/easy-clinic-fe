import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function PrescriptionForm() {
    const [form, setForm] = useState({
        patient: '', date: '', notes: '', items: [{ name: '', dosage: '', frequency: '', duration: '' }]
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [locked, setLocked] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleItemChange = (idx, e) => {
        const items = [...form.items];
        items[idx][e.target.name] = e.target.value;
        setForm({ ...form, items });
    };

    const addItem = () => {
        setForm({ ...form, items: [...form.items, { name: '', dosage: '', frequency: '', duration: '' }] });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!form.patient || !form.date || form.items.some(i => !i.name || !i.dosage || !i.frequency || !i.duration)) {
            setError('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        setError('');
        setSuccess(true);
        setLocked(true);
    };

    return (
        <Card sx={{ maxWidth: 600, mx: 'auto' }}>
            <CardContent>
                <Typography variant="h6" mb={2}>Tạo đơn thuốc</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}><TextField label="Bệnh nhân" name="patient" value={form.patient} onChange={handleChange} fullWidth required disabled={locked} /></Grid>
                        <Grid item xs={6}><TextField label="Ngày kê đơn" name="date" type="date" value={form.date} onChange={handleChange} fullWidth required disabled={locked} InputLabelProps={{ shrink: true }} /></Grid>
                        <Grid item xs={12}><TextField label="Ghi chú" name="notes" value={form.notes} onChange={handleChange} fullWidth disabled={locked} /></Grid>
                        <Grid item xs={12}><Typography fontWeight={500}>Thuốc:</Typography></Grid>
                        {form.items.map((item, idx) => (
                            <Grid container spacing={1} key={idx} mb={1}>
                                <Grid item xs={3}><TextField label="Tên thuốc" name="name" value={item.name} onChange={e => handleItemChange(idx, e)} fullWidth required disabled={locked} /></Grid>
                                <Grid item xs={3}><TextField label="Liều lượng" name="dosage" value={item.dosage} onChange={e => handleItemChange(idx, e)} fullWidth required disabled={locked} /></Grid>
                                <Grid item xs={3}><TextField label="Số lần/ngày" name="frequency" value={item.frequency} onChange={e => handleItemChange(idx, e)} fullWidth required disabled={locked} /></Grid>
                                <Grid item xs={3}><TextField label="Số ngày" name="duration" value={item.duration} onChange={e => handleItemChange(idx, e)} fullWidth required disabled={locked} /></Grid>
                            </Grid>
                        ))}
                        {!locked && (
                            <Grid item xs={12}>
                                <Grid container spacing={2} justifyContent="flex-end">
                                    <Grid item>
                                        <Button type="button" onClick={addItem} variant="outlined">+ Thêm thuốc</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button type="submit" variant="contained">Tạo đơn thuốc</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </form>
                <Dialog open={success} onClose={() => setSuccess(false)} maxWidth="xs" fullWidth>
                    <DialogTitle>Tạo đơn thuốc thành công</DialogTitle>
                    <DialogContent>Đơn thuốc đã được tạo và không thể chỉnh sửa!</DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSuccess(false)}>Đóng</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
} 