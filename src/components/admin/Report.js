import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, Button, IconButton, TextField } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ALL_MONTHS = [
    { month: 'Th1 2025', count: 100, pres: 60 },
    { month: 'Th2 2025', count: 110, pres: 80 },
    { month: 'Th3 2025', count: 130, pres: 90 },
    { month: 'Th4 2025', count: 120, pres: 70 },
    { month: 'Th5 2025', count: 140, pres: 100 },
    { month: 'Th6 2025', count: 160, pres: 80 },
];

const MOCK_PATIENTS = [
    { name: 'Nguyễn Văn A', age: 45, gender: 'Nam', lastVisit: '2024-03-15' },
    { name: 'Trần Thị B', age: 32, gender: 'Nữ', lastVisit: '2024-03-14' },
    { name: 'Lê Văn C', age: 28, gender: 'Nam', lastVisit: '2024-03-13' },
];
const MOCK_PRESCRIPTIONS = [
    { patient: 'Nguyễn Văn A', doctor: 'BS. Minh', date: '2024-03-15', status: 'Đã phát' },
    { patient: 'Trần Thị B', doctor: 'BS. Hùng', date: '2024-03-14', status: 'Chờ phát' },
    { patient: 'Lê Văn C', doctor: 'BS. Lan', date: '2024-03-13', status: 'Đã phát' },
];
const MOCK_APPOINTMENTS = [
    { patient: 'Nguyễn Văn A', doctor: 'BS. Minh', date: '2024-03-16', time: '09:00' },
    { patient: 'Trần Thị B', doctor: 'BS. Hùng', date: '2024-03-17', time: '10:30' },
    { patient: 'Lê Văn C', doctor: 'BS. Lan', date: '2024-03-18', time: '14:00' },
];

const TIME_OPTIONS = [
    { label: '1 tháng gần nhất', value: 1 },
    { label: '3 tháng gần nhất', value: 3 },
    { label: '6 tháng gần nhất', value: 6 },
    { label: 'Tất cả', value: ALL_MONTHS.length },
];

export default function Report() {
    const [months, setMonths] = useState(6);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const handleExport = () => {
        alert('Đã xuất file báo cáo (giả lập)!');
    };
    let data = ALL_MONTHS.slice(-months);
    if (fromDate && toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        data = ALL_MONTHS.filter(d => {
            const [th, year] = d.month.replace('Th', '').split(' ');
            const date = new Date(`${year}-${th.padStart(2, '0')}-01`);
            return date >= from && date <= to;
        });
    }
    const patientsByMonth = data.map(d => ({ month: d.month, count: d.count }));
    const prescriptionsByMonth = data.map(d => ({ month: d.month, count: d.pres }));
    return (
        <Box>
            <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2} gap={2}>
                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Khoảng thời gian</InputLabel>
                    <Select
                        value={months}
                        label="Khoảng thời gian"
                        onChange={e => setMonths(Number(e.target.value))}
                    >
                        {TIME_OPTIONS.map(opt => (
                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    size="small"
                    label="Từ ngày"
                    type="date"
                    value={fromDate}
                    onChange={e => setFromDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ minWidth: 140 }}
                />
                <TextField
                    size="small"
                    label="Đến ngày"
                    type="date"
                    value={toDate}
                    onChange={e => setToDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ minWidth: 140 }}
                />
                <Button variant="contained" color="primary" onClick={handleExport} sx={{ minWidth: 140 }}>
                    Xuất báo cáo
                </Button>
            </Box>
            <Grid container spacing={3} mb={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ textAlign: 'center', p: 2 }}>
                        <CardContent>
                            <Typography variant="h5" color="primary">690</Typography>
                            <Typography color="text.secondary">Tổng số bệnh nhân</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ textAlign: 'center', p: 2 }}>
                        <CardContent>
                            <Typography variant="h5" color="primary">401</Typography>
                            <Typography color="text.secondary">Tổng số đơn thuốc</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ textAlign: 'center', p: 2 }}>
                        <CardContent>
                            <Typography variant="h5" color="primary">115</Typography>
                            <Typography color="text.secondary">Trung bình bệnh nhân/tháng</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ textAlign: 'center', p: 2 }}>
                        <CardContent>
                            <Typography variant="h5" color="primary">67</Typography>
                            <Typography color="text.secondary">Trung bình đơn thuốc/tháng</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={3} mb={2}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" mb={2}>Biểu đồ bệnh nhân theo tháng</Typography>
                            <Box sx={{ width: '100%', minWidth: 450, height: 280 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={patientsByMonth} margin={{ left: 10, right: 30 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="count" name="Số bệnh nhân" stroke="#e57373" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" mb={2}>Biểu đồ đơn thuốc theo tháng</Typography>
                            <Box sx={{ width: '100%', minWidth: 450, height: 280 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={prescriptionsByMonth} margin={{ left: 10, right: 30 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" name="Số đơn thuốc" fill="#1976d2" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={3} mb={2}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" mb={2}>Thống kê bệnh nhân</Typography>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Họ tên</TableCell>
                                            <TableCell>Tuổi</TableCell>
                                            <TableCell>Giới tính</TableCell>
                                            <TableCell>Lần khám gần nhất</TableCell>
                                            <TableCell>Thao tác</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {MOCK_PATIENTS.map((row, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell>{row.age}</TableCell>
                                                <TableCell>{row.gender}</TableCell>
                                                <TableCell>{row.lastVisit}</TableCell>
                                                <TableCell><IconButton><MoreVertIcon /></IconButton></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" mb={2}>Thống kê đơn thuốc</Typography>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Bệnh nhân</TableCell>
                                            <TableCell>Bác sĩ</TableCell>
                                            <TableCell>Ngày</TableCell>
                                            <TableCell>Trạng thái</TableCell>
                                            <TableCell>Thao tác</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {MOCK_PRESCRIPTIONS.map((row, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell>{row.patient}</TableCell>
                                                <TableCell>{row.doctor}</TableCell>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>{row.status}</TableCell>
                                                <TableCell><IconButton><MoreVertIcon /></IconButton></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" mb={2}>Thống kê lịch hẹn</Typography>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Bệnh nhân</TableCell>
                                            <TableCell>Bác sĩ</TableCell>
                                            <TableCell>Ngày</TableCell>
                                            <TableCell>Giờ</TableCell>
                                            <TableCell>Thao tác</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {MOCK_APPOINTMENTS.map((row, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell>{row.patient}</TableCell>
                                                <TableCell>{row.doctor}</TableCell>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>{row.time}</TableCell>
                                                <TableCell><IconButton><MoreVertIcon /></IconButton></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
} 