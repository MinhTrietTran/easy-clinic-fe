import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, Typography, Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Avatar, Badge, Menu, MenuItem } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MedicationIcon from '@mui/icons-material/Medication';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

import DoctorProfile from '../components/doctor/DoctorProfile';
import DoctorSchedule from '../components/doctor/DoctorSchedule';
import HealthRecordForm from '../components/doctor/HealthRecordForm';
import PrescriptionForm from '../components/doctor/PrescriptionForm';

const drawerWidth = 220;

const TABS = [
    { key: 'profile', label: 'Hồ sơ bác sĩ', icon: <PeopleIcon /> },
    { key: 'schedule', label: 'Lịch khám', icon: <CalendarMonthIcon /> },
    { key: 'healthrecord', label: 'Cập nhật bệnh án', icon: <AssignmentIcon /> },
    { key: 'prescription', label: 'Tạo đơn thuốc', icon: <MedicationIcon /> },
];

export default function DoctorPage() {
    const [tab, setTab] = useState('profile');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const currentTab = TABS.find(t => t.key === tab);

    const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => {
        localStorage.removeItem('role');
        window.location.href = '/login';
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', background: '#fff', borderRight: '1px solid #eee' },
                }}
            >
                <Toolbar>
                    <Typography variant="h5" color="primary" fontWeight={700} sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Easy Clinic
                    </Typography>
                </Toolbar>
                <List>
                    {TABS.map(t => (
                        <ListItem button key={t.key} selected={tab === t.key} onClick={() => setTab(t.key)}>
                            <ListItemIcon sx={{ color: tab === t.key ? 'primary.main' : '#888' }}>{t.icon}</ListItemIcon>
                            <ListItemText primary={t.label} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
                <AppBar position="static" elevation={0} color="inherit" sx={{ borderBottom: '1px solid #eee' }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }} color="primary">
                            {currentTab ? currentTab.label : ''}
                        </Typography>
                        <IconButton color="primary" sx={{ mr: 2 }}>
                            <Badge badgeContent={2} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Avatar sx={{ bgcolor: 'primary.main', cursor: 'pointer' }} onClick={handleAvatarClick}>BS</Avatar>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                            <MenuItem onClick={handleLogout}>
                                <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Đăng xuất
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Box sx={{ p: 3 }}>
                    {tab === 'profile' && <DoctorProfile />}
                    {tab === 'schedule' && <DoctorSchedule />}
                    {tab === 'healthrecord' && <HealthRecordForm />}
                    {tab === 'prescription' && <PrescriptionForm />}
                </Box>
            </Box>
        </Box>
    );
} 