import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, TextField, Avatar, List, ListItem, ListItemIcon, ListItemText, Divider, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import PersonIcon from '@mui/icons-material/Person';
import WcIcon from '@mui/icons-material/Wc';
import CakeIcon from '@mui/icons-material/Cake';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealingIcon from '@mui/icons-material/Healing';
import { authenticatedFetch, API_BASE_URL } from '../../utils/auth';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PatientProfile() {
    const [info, setInfo] = useState({});
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user_info') || '{}');
        setInfo(data);
        setForm({
            ...data,
            dob: data.dob ? data.dob.split('T')[0] : '',
        });
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await authenticatedFetch(`${API_BASE_URL}/users/me/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: form.first_name,
                    last_name: form.last_name,
                    gender: form.gender,
                    dob: form.dob,
                    address: form.address,
                    phone: form.phone,
                    allergies: form.allergies,
                    chronic_diseases: form.chronic_diseases,
                }),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setInfo(updatedData);
                setForm(updatedData);
                localStorage.setItem('user_info', JSON.stringify(updatedData));
                setEdit(false);
                setSnackbarMessage('Cập nhật hồ sơ thành công!');
                setSnackbarSeverity('success');
            } else {
                const errorData = await response.json();
                setSnackbarMessage(errorData.detail || 'Cập nhật hồ sơ thất bại.');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            setSnackbarMessage('Lỗi kết nối đến máy chủ hoặc phiên đã hết hạn.');
            setSnackbarSeverity('error');
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const userRole = localStorage.getItem('role');
    if (!info || !info.email || userRole !== 'patient') return <Typography color="error">Không có dữ liệu bệnh nhân hoặc vai trò không đúng.</Typography>;

    return (
        <Card sx={{ maxWidth: 420, mx: 'auto', boxShadow: 3 }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center" mb={2}>
                    <Grid item>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 72, height: 72, fontSize: 36 }}>
                            {info.last_name ? info.last_name[0] : 'BN'}
                        </Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" fontWeight={700} color="primary.main">{info.first_name} {info.last_name}</Typography>
                        <Typography color="text.secondary" fontSize={15}>{info.email}</Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ mb: 2 }} />
                {!edit ? (
                    <>
                        <List dense>
                            <ListItem>
                                <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
                                <ListItemText primary={<><b>Họ tên:</b> {info.first_name} {info.last_name}</>} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><WcIcon color="secondary" /></ListItemIcon>
                                <ListItemText primary={<><b>Giới tính:</b> {info.gender}</>} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><CakeIcon color="action" /></ListItemIcon>
                                <ListItemText primary={<><b>Ngày sinh:</b> {info.dob}</>} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><HomeIcon color="info" /></ListItemIcon>
                                <ListItemText primary={<><b>Địa chỉ:</b> {info.address}</>} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><PhoneIcon color="action" /></ListItemIcon>
                                <ListItemText primary={<><b>Số điện thoại:</b> {info.phone}</>} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><HealingIcon color="error" /></ListItemIcon>
                                <ListItemText primary={<><b>Dị ứng:</b> {info.allergies || 'Không có'}</>} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><LocalHospitalIcon color="success" /></ListItemIcon>
                                <ListItemText primary={<><b>Bệnh mãn tính:</b> {info.chronic_diseases || 'Không có'}</>} />
                            </ListItem>
                        </List>
                        <Grid item xs={12} mt={2}>
                            <Button variant="contained" onClick={() => setEdit(true)}>Chỉnh sửa</Button>
                        </Grid>
                    </>
                ) : (
                    <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}><TextField label="Họ" name="first_name" value={form.first_name || ''} onChange={handleChange} fullWidth required /></Grid>
                            <Grid item xs={6}><TextField label="Tên" name="last_name" value={form.last_name || ''} onChange={handleChange} fullWidth required /></Grid>
                            <Grid item xs={6}><TextField label="Giới tính" name="gender" value={form.gender || ''} onChange={handleChange} fullWidth required /></Grid>
                            <Grid item xs={6}><TextField label="Ngày sinh" name="dob" type="date" value={form.dob || ''} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} /></Grid>
                            <Grid item xs={12}><TextField label="Địa chỉ" name="address" value={form.address || ''} onChange={handleChange} fullWidth required /></Grid>
                            <Grid item xs={6}><TextField label="Số điện thoại" name="phone" value={form.phone || ''} onChange={handleChange} fullWidth required /></Grid>
                            <Grid item xs={6}><TextField label="Dị ứng" name="allergies" value={form.allergies || ''} onChange={handleChange} fullWidth /></Grid>
                            <Grid item xs={12}><TextField label="Bệnh mãn tính" name="chronic_diseases" value={form.chronic_diseases || ''} onChange={handleChange} fullWidth /></Grid>
                            <Grid item xs={12} mt={2} display="flex" gap={2}>
                                <Button type="submit" variant="contained" disabled={loading}>Lưu</Button>
                                <Button variant="outlined" onClick={() => setEdit(false)} disabled={loading}>Hủy</Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </CardContent>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
} 