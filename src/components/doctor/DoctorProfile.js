import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Avatar, Grid, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PhoneIcon from '@mui/icons-material/Phone';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function DoctorProfile() {
    const [info, setInfo] = useState({});

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user_info') || '{}');
        setInfo(data);
    }, []);

    const userRole = localStorage.getItem('role');
    if (!info || !info.email || userRole !== 'doctor') return <Typography color="error">Không có dữ liệu bác sĩ hoặc vai trò không đúng.</Typography>;

    return (
        <Card sx={{ maxWidth: 420, mx: 'auto', boxShadow: 3 }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center" mb={2}>
                    <Grid item>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 72, height: 72, fontSize: 36 }}>
                            {info.last_name ? info.last_name[0] : 'BS'}
                        </Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" fontWeight={700} color="primary.main">{info.first_name} {info.last_name}</Typography>
                        <Typography color="text.secondary" fontSize={15}>{info.email}</Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                    <ListItem>
                        <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
                        <ListItemText primary={<><b>Họ tên:</b> {info.first_name} {info.last_name}</>} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><LocalHospitalIcon color="secondary" /></ListItemIcon>
                        <ListItemText primary={<><b>Khoa:</b> {info.department}</>} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><PhoneIcon color="action" /></ListItemIcon>
                        <ListItemText primary={<><b>Số điện thoại:</b> {info.phone || 'N/A'}</>} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><MonetizationOnIcon color="success" /></ListItemIcon>
                        <ListItemText primary={<><b>Chi phí khám:</b> {info.cost ? `${info.cost.toLocaleString()}đ/lượt` : 'N/A'}</>} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>{info.is_active ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</ListItemIcon>
                        <ListItemText primary={<><b>Trạng thái:</b> {info.is_active ? 'Đang làm việc' : 'Nghỉ'}</>} />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
} 