import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, Typography, Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Avatar, Badge, Menu, MenuItem } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

import UserManagement from '../components/admin/UserManagement';
import DoctorManagement from '../components/admin/DoctorManagement';
import Report from '../components/admin/Report';
import ScheduleManagement from '../components/admin/ScheduleManagement';

const drawerWidth = 220;

const TABS = [
    { key: 'user', label: 'Users', icon: <PeopleIcon /> },
    { key: 'doctor', label: 'Doctors', icon: <MedicationIcon /> },
    { key: 'schedule', label: 'Appointments', icon: <CalendarMonthIcon /> },
    { key: 'report', label: 'Reports', icon: <BarChartIcon /> },
];

export default function AdminPage() {
    const [tab, setTab] = useState('report');
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
                            <Badge badgeContent={3} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Avatar sx={{ bgcolor: 'primary.main', cursor: 'pointer' }} onClick={handleAvatarClick}>A</Avatar>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                            <MenuItem onClick={handleLogout}>
                                <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Đăng xuất
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Box sx={{ p: 3 }}>
                    {tab === 'user' && <UserManagement />}
                    {tab === 'doctor' && <DoctorManagement />}
                    {tab === 'schedule' && <ScheduleManagement />}
                    {tab === 'report' && <Report />}
                </Box>
            </Box>
        </Box>
    );
} 