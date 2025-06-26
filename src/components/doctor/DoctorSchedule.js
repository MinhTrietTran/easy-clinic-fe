import React, { useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material';
import HealthRecordForm from './HealthRecordForm';

// Giả lập tên bác sĩ đăng nhập từ localStorage hoặc biến
const currentDoctor = localStorage.getItem('doctorName') || 'Nguyễn Văn A';

const MOCK_SCHEDULE = [
    { id: 1, date: '2024-05-10', time: '09:00', patient: 'Nguyễn Văn C', status: 'Đã xác nhận', department: 'Nội tổng quát', doctor: 'Nguyễn Văn A', allergies: 'Không', chronic: 'Tăng huyết áp' },
    { id: 2, date: '2024-05-11', time: '14:00', patient: 'Lê Thị D', status: 'Chờ xác nhận', department: 'Tai mũi họng', doctor: 'Trần Thị B', allergies: 'Penicillin', chronic: 'Tiểu đường' },
];

function AddHealthRecordDialog({ open, onClose, patient, date }) {
    // Tích hợp form bệnh án và đơn thuốc
    const [form, setForm] = useState({
        patient: patient || '',
        visit_date: date || '',
        diagnosis: '',
        treatment: '',
        notes: '',
        next_appointment: '',
        prescription: [{ name: '', dosage: '', frequency: '', duration: '' }],
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handlePrescriptionChange = (idx, e) => {
        const prescription = [...form.prescription];
        prescription[idx][e.target.name] = e.target.value;
        setForm({ ...form, prescription });
    };
    const handlePrescriptionRemove = (idx) => {
        if (form.prescription.length === 1) return;
        const prescription = form.prescription.filter((_, i) => i !== idx);
        setForm({ ...form, prescription });
    };
    const addPrescription = () => {
        setForm({ ...form, prescription: [...form.prescription, { name: '', dosage: '', frequency: '', duration: '' }] });
    };
    const handleSubmit = e => {
        e.preventDefault();
        if (!form.patient || !form.visit_date || !form.diagnosis || !form.treatment || form.prescription.some(i => !i.name || !i.dosage || !i.frequency || !i.duration)) {
            setError('Vui lòng nhập đầy đủ thông tin bắt buộc!');
            return;
        }
        setError('');
        setSuccess(true);
        setTimeout(() => { onClose(true); }, 1200);
    };
    return (
        <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Thêm bệnh án & đơn thuốc</DialogTitle>
            <DialogContent dividers>
                <form onSubmit={handleSubmit} id="add-health-record-form">
                    <Grid container spacing={2}>
                        <Grid item xs={12}><TextField label="Bệnh nhân" name="patient" value={form.patient} onChange={handleChange} fullWidth required disabled /></Grid>
                        <Grid item xs={6}><TextField label="Ngày khám" name="visit_date" type="date" value={form.visit_date} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} disabled /></Grid>
                        <Grid item xs={6}><TextField label="Chẩn đoán" name="diagnosis" value={form.diagnosis} onChange={handleChange} fullWidth required /></Grid>
                        <Grid item xs={12}><TextField label="Điều trị" name="treatment" value={form.treatment} onChange={handleChange} fullWidth required /></Grid>
                        <Grid item xs={12}><TextField label="Ghi chú" name="notes" value={form.notes} onChange={handleChange} fullWidth /></Grid>
                        <Grid item xs={12}><TextField label="Lịch hẹn tiếp theo" name="next_appointment" type="date" value={form.next_appointment} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
                        <Grid item xs={12} sx={{ mt: 1, mb: 1, pl: 0 }}>
                            <Typography fontWeight={500} align="left" sx={{ textAlign: 'left', pl: 8 }}>Đơn thuốc:</Typography>
                        </Grid>
                        {form.prescription.map((item, idx) => (
                            <Grid container spacing={1} key={idx} mb={1} alignItems="center">
                                <Grid item xs={3}><TextField label="Tên thuốc" name="name" value={item.name} onChange={e => handlePrescriptionChange(idx, e)} fullWidth required /></Grid>
                                <Grid item xs={3}><TextField label="Liều lượng" name="dosage" value={item.dosage} onChange={e => handlePrescriptionChange(idx, e)} fullWidth required /></Grid>
                                <Grid item xs={3}><TextField label="Số lần/ngày" name="frequency" value={item.frequency} onChange={e => handlePrescriptionChange(idx, e)} fullWidth required /></Grid>
                                <Grid item xs={2}><TextField label="Số ngày" name="duration" value={item.duration} onChange={e => handlePrescriptionChange(idx, e)} fullWidth required /></Grid>
                                <Grid item xs={1}>
                                    {form.prescription.length > 1 && (
                                        <Button color="error" onClick={() => handlePrescriptionRemove(idx)}>-</Button>
                                    )}
                                </Grid>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Button type="button" onClick={addPrescription} variant="outlined">+ Thêm thuốc</Button>
                        </Grid>
                        {error && <Grid item xs={12}><Typography color="error">{error}</Typography></Grid>}
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose(false)}>Huỷ</Button>
                <Button type="submit" form="add-health-record-form" variant="contained">Lưu bệnh án</Button>
            </DialogActions>
            <Dialog open={success} onClose={() => setSuccess(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Lưu thành công</DialogTitle>
                <DialogContent>Bệnh án và đơn thuốc đã được lưu!</DialogContent>
                <DialogActions>
                    <Button onClick={() => setSuccess(false)}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </Dialog>
    );
}

export default function DoctorSchedule() {
    const [selected, setSelected] = useState(null);
    const [addRecord, setAddRecord] = useState({ open: false, scheduleId: null });
    const [addedRecords, setAddedRecords] = useState([]); // lưu id đã thêm bệnh án
    const mySchedule = MOCK_SCHEDULE.filter(s => s.doctor === currentDoctor);
    const handleAddRecord = (row) => setAddRecord({ open: true, scheduleId: row.id, patient: row.patient, date: row.date });
    const handleAddRecordClose = (saved) => {
        if (saved && addRecord.scheduleId) setAddedRecords([...addedRecords, addRecord.scheduleId]);
        setAddRecord({ open: false, scheduleId: null });
    };
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" mb={2}>Lịch khám</Typography>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ngày</TableCell>
                                <TableCell>Giờ</TableCell>
                                <TableCell>Bệnh nhân</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mySchedule.map(s => (
                                <TableRow key={s.id}>
                                    <TableCell>{s.date}</TableCell>
                                    <TableCell>{s.time}</TableCell>
                                    <TableCell>{s.patient}</TableCell>
                                    <TableCell>{s.status}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" size="small" onClick={() => setSelected(s)}>Xem chi tiết</Button>
                                        {s.status === 'Đã xác nhận' && !addedRecords.includes(s.id) && (
                                            <Button variant="contained" size="small" sx={{ ml: 1 }} onClick={() => handleAddRecord(s)}>Thêm bệnh án</Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="xs" fullWidth>
                    <DialogTitle>Chi tiết lịch khám</DialogTitle>
                    <DialogContent dividers>
                        {selected && (
                            <>
                                <Typography><b>Ngày:</b> {selected.date}</Typography>
                                <Typography><b>Giờ:</b> {selected.time}</Typography>
                                <Typography><b>Bệnh nhân:</b> {selected.patient}</Typography>
                                <Typography><b>Chuyên khoa:</b> {selected.department}</Typography>
                                <Typography><b>Trạng thái:</b> {selected.status}</Typography>
                                <Typography><b>Dị ứng:</b> {selected.allergies}</Typography>
                                <Typography><b>Bệnh mãn tính:</b> {selected.chronic}</Typography>
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSelected(null)}>Đóng</Button>
                    </DialogActions>
                </Dialog>
                <AddHealthRecordDialog
                    open={addRecord.open}
                    onClose={handleAddRecordClose}
                    patient={addRecord.patient}
                    date={addRecord.date}
                />
            </CardContent>
        </Card>
    );
} 