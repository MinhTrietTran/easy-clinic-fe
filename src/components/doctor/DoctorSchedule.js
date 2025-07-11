import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, CircularProgress, Box, Alert } from '@mui/material';
import HealthRecordForm from './HealthRecordForm';
import { authenticatedFetch, API_BASE_URL as USER_API_BASE_URL } from '../../utils/auth';

const APPOINTMENT_API_BASE_URL = 'http://localhost:5002/api/v1';

// Giả lập tên bác sĩ đăng nhập từ localStorage hoặc biến
// const currentDoctor = localStorage.getItem('doctorName') || 'Nguyễn Văn A'; // Will be removed/replaced

// MOCK_SCHEDULE will be replaced by API data
// const MOCK_SCHEDULE = [
//     { id: 1, date: '2024-05-10', time: '09:00', patient: 'Nguyễn Văn C', status: 'Đã xác nhận', department: 'Nội tổng quát', doctor: 'Nguyễn Văn A', allergies: 'Không', chronic: 'Tăng huyết áp' },
//     { id: 2, date: '2024-05-11', time: '14:00', patient: 'Lê Thị D', status: 'Chờ xác nhận', department: 'Tai mũi họng', doctor: 'Trần Thị B', allergies: 'Penicillin', chronic: 'Tiểu đường' },
// ];

function AddHealthRecordDialog({ open, onClose, patientInfo, appointmentDate }) {
    // Tích hợp form bệnh án và đơn thuốc
    const [form, setForm] = useState({
        patient: patientInfo?.full_name || '',
        visit_date: appointmentDate || '',
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
    const [addRecord, setAddRecord] = useState({ open: false, scheduleId: null, patientInfo: null, appointmentDate: null });
    const [addedRecords, setAddedRecords] = useState([]); // lưu id đã thêm bệnh án
    const [doctorInfo, setDoctorInfo] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctorDataAndSchedule = async () => {
            try {
                // 1. Fetch doctor_id from /users/me/
                const meResponse = await authenticatedFetch(`${USER_API_BASE_URL}/users/me/`);
                if (!meResponse.ok) {
                    throw new Error('Failed to fetch user data.');
                }
                const meData = await meResponse.json();

                if (meData.phone !== 'doctor' && meData.role !== 'doctor') { // check both phone (from login page) and actual role
                    setError('Bạn không phải là bác sĩ để xem lịch này.');
                    setLoading(false);
                    return;
                }
                setDoctorInfo(meData);

                const doctorId = meData.id; // Get the doctor's actual ID

                // 2. Fetch doctor's schedule using doctor_id
                const scheduleResponse = await authenticatedFetch(`${APPOINTMENT_API_BASE_URL}/doctors/${doctorId}/schedule/`);
                if (!scheduleResponse.ok) {
                    throw new Error('Failed to fetch doctor schedule.');
                }
                const scheduleData = await scheduleResponse.json();

                // Flatten the schedule object into an array for easy mapping
                const flattenedSchedule = Object.keys(scheduleData.schedule).flatMap(dateKey =>
                    scheduleData.schedule[dateKey].map(appt => ({
                        ...appt,
                        date: dateKey, // Add date to each appointment object
                        time: new Date(appt.time_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        patient_name: appt.patient_info ? `${appt.patient_info.first_name} ${appt.patient_info.last_name}`.trim() : 'N/A',
                        status_display: appt.status_display || appt.status,
                        department_requested: appt.department_requested || 'N/A', // Add department if available
                    }))
                );

                setSchedule(flattenedSchedule);

            } catch (err) {
                console.error('Error fetching doctor schedule:', err);
                setError(err.message || 'Không thể tải lịch khám của bác sĩ.');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorDataAndSchedule();
    }, []); // Empty dependency array means this runs once on mount

    const handleAddRecord = (row) => {
        setAddRecord({
            open: true,
            scheduleId: row.appointment_id,
            patientInfo: row.patient_info, // Pass full patient info
            appointmentDate: row.date
        });
    };
    const handleAddRecordClose = (saved) => {
        if (saved && addRecord.scheduleId) setAddedRecords([...addedRecords, addRecord.scheduleId]);
        setAddRecord({ open: false, scheduleId: null, patientInfo: null, appointmentDate: null });
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
                <Typography ml={2}>Đang tải lịch khám...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!schedule || schedule.length === 0) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h6" mb={2}>Lịch khám</Typography>
                    <Typography>Không có lịch khám nào trong khoảng thời gian này.</Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" mb={2}>Lịch khám của {doctorInfo?.first_name} {doctorInfo?.last_name}</Typography>
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
                            {schedule.map(s => (
                                <TableRow key={s.appointment_id}>
                                    <TableCell>{s.date}</TableCell>
                                    <TableCell>{s.time}</TableCell>
                                    <TableCell>{s.patient_name}</TableCell>
                                    <TableCell>{s.status_display}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" size="small" onClick={() => setSelected(s)}>Xem chi tiết</Button>
                                        {s.status === 'confirmed' && !addedRecords.includes(s.appointment_id) && (
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
                                <Typography><b>Bệnh nhân:</b> {selected.patient_name}</Typography>
                                <Typography><b>Trạng thái:</b> {selected.status_display}</Typography>
                                <Typography><b>Dị ứng:</b> {selected.patient_info?.allergies || 'Không có'}</Typography>
                                <Typography><b>Bệnh mãn tính:</b> {selected.patient_info?.chronic_diseases || 'Không có'}</Typography>
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
                    patientInfo={addRecord.patientInfo}
                    appointmentDate={addRecord.appointmentDate}
                />
            </CardContent>
        </Card>
    );
} 