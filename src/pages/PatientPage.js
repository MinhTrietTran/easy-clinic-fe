import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, Typography, Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Avatar, Badge, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

import PatientProfile from '../components/patient/PatientProfile';
import PatientHistory from '../components/patient/PatientHistory';
import AppointmentBooking from '../components/patient/AppointmentBooking';
import PrescriptionList from '../components/patient/PrescriptionList';
import PatientNotification from '../components/patient/PatientNotification';

const drawerWidth = 220;

const MOCK_NOTIFICATIONS = [
    { id: 1, message: 'Nhắc nhở: Bạn có lịch khám vào 2024-05-10 09:00', read: false },
    { id: 2, message: 'Đơn thuốc ngày 2024-05-01 đã sẵn sàng', read: false },
];

const TABS = [
    { key: 'profile', label: 'Hồ sơ cá nhân', icon: <PersonIcon /> },
    { key: 'history', label: 'Lịch sử khám', icon: <HistoryIcon /> },
    { key: 'appointment', label: 'Đặt lịch khám', icon: <CalendarMonthIcon /> },
    { key: 'prescription', label: 'Đơn thuốc', icon: <MedicationIcon /> },
    { key: 'notification', label: 'Thông báo', icon: <NotificationsIcon /> },
];

export default function PatientPage() {
    const [tab, setTab] = useState('profile');
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
    const [openNotify, setOpenNotify] = useState(false);
    const open = Boolean(anchorEl);
    const currentTab = TABS.find(t => t.key === tab);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => {
        localStorage.removeItem('role');
        window.location.href = '/login';
    };
    // Khi chuyển sang tab Thông báo thì đánh dấu đã đọc
    const handleTabChange = (key) => {
        setTab(key);
        if (key === 'notification') {
            setNotifications(notifications.map(n => ({ ...n, read: true })));
        }
    };
    // Khi nhấn chuông hồng
    const handleOpenNotify = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        setOpenNotify(true);
    };
    const handleCloseNotify = () => setOpenNotify(false);

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
                        <ListItem button key={t.key} selected={tab === t.key} onClick={() => handleTabChange(t.key)}>
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
                        <IconButton color="primary" sx={{ mr: 2 }} onClick={handleOpenNotify}>
                            <Badge badgeContent={unreadCount} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Avatar sx={{ bgcolor: 'primary.main', cursor: 'pointer' }} onClick={handleAvatarClick}>BN</Avatar>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                            <MenuItem onClick={handleLogout}>
                                <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Đăng xuất
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Dialog open={openNotify} onClose={handleCloseNotify} maxWidth="xs" fullWidth>
                    <DialogTitle>Thông báo</DialogTitle>
                    <DialogContent>
                        <PatientNotification notifications={notifications} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNotify}>Đóng</Button>
                    </DialogActions>
                </Dialog>
                <Box sx={{ p: 3 }}>
                    {tab === 'profile' && <PatientProfile />}
                    {tab === 'history' && <PatientHistory />}
                    {tab === 'appointment' && <AppointmentBooking />}
                    {tab === 'prescription' && <PrescriptionList />}
                    {tab === 'notification' && <PatientNotification notifications={notifications} />}
                </Box>
            </Box>
        </Box>
    );
} 