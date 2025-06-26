import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, TextField, Avatar, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import WcIcon from '@mui/icons-material/Wc';
import CakeIcon from '@mui/icons-material/Cake';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealingIcon from '@mui/icons-material/Healing';

export default function PatientProfile() {
    const [info, setInfo] = useState({});
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({});

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('patient_info') || '{}');
        setInfo(data);
        setForm(data);
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setInfo(form);
        localStorage.setItem('patient_info', JSON.stringify(form));
        setEdit(false);
    };

    if (!info || !info.email) return <Typography color="error">Không có dữ liệu bệnh nhân.</Typography>;

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
                                <ListItemText primary={<><b>Ngày sinh:</b> {info.DOB}</>} />
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
                                <ListItemText primary={<><b>Dị ứng:</b> {info.allergies}</>} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><LocalHospitalIcon color="success" /></ListItemIcon>
                                <ListItemText primary={<><b>Bệnh mãn tính:</b> {info.chronic_diseases}</>} />
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
                            <Grid item xs={6}><TextField label="Ngày sinh" name="DOB" type="date" value={form.DOB || ''} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} /></Grid>
                            <Grid item xs={12}><TextField label="Địa chỉ" name="address" value={form.address || ''} onChange={handleChange} fullWidth required /></Grid>
                            <Grid item xs={6}><TextField label="Số điện thoại" name="phone" value={form.phone || ''} onChange={handleChange} fullWidth required /></Grid>
                            <Grid item xs={6}><TextField label="Dị ứng" name="allergies" value={form.allergies || ''} onChange={handleChange} fullWidth required /></Grid>
                            <Grid item xs={12}><TextField label="Bệnh mãn tính" name="chronic_diseases" value={form.chronic_diseases || ''} onChange={handleChange} fullWidth required /></Grid>
                            <Grid item xs={12} mt={2} display="flex" gap={2}>
                                <Button type="submit" variant="contained">Lưu</Button>
                                <Button variant="outlined" onClick={() => setEdit(false)}>Hủy</Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </CardContent>
        </Card>
    );
} 