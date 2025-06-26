import React, { useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const MOCK_PRESCRIPTIONS = [
    {
        id: 1, date: '2024-05-01', status: 'Đã lấy', items: [
            { name: 'Paracetamol', dosage: '500mg', frequency: '2 lần/ngày', duration: '5 ngày' },
            { name: 'Vitamin C', dosage: '1000mg', frequency: '1 lần/ngày', duration: '7 ngày' },
        ], notes: 'Uống sau ăn'
    },
    {
        id: 2, date: '2024-04-10', status: 'Chưa lấy', items: [
            { name: 'Amoxicillin', dosage: '500mg', frequency: '3 lần/ngày', duration: '7 ngày' },
        ], notes: ''
    },
];

export default function PrescriptionList() {
    const [prescriptions, setPrescriptions] = useState(MOCK_PRESCRIPTIONS);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTakeMedicine = (id) => {
        setPrescriptions(prescriptions.map(p => p.id === id ? { ...p, status: 'Đang chuẩn bị' } : p));
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000); // giả lập chuẩn bị thuốc
    };

    const handleReceived = (id) => {
        setPrescriptions(prescriptions.map(p => p.id === id ? { ...p, status: 'Đã lấy' } : p));
        setSelected({ ...prescriptions.find(p => p.id === id), status: 'Đã lấy' });
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" mb={2}>Đơn thuốc</Typography>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ngày</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {prescriptions.map(p => (
                                <TableRow key={p.id}>
                                    <TableCell>{p.date}</TableCell>
                                    <TableCell>{p.status}</TableCell>
                                    <TableCell><Button variant="outlined" size="small" onClick={() => setSelected(p)}>Xem chi tiết</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="xs" fullWidth>
                    <DialogTitle>Chi tiết đơn thuốc</DialogTitle>
                    <DialogContent dividers>
                        {selected && (
                            <>
                                <Typography><b>Ngày:</b> {selected.date}</Typography>
                                <Typography><b>Trạng thái:</b> {prescriptions.find(p => p.id === selected.id)?.status || selected.status}</Typography>
                                <Typography><b>Ghi chú:</b> {selected.notes}</Typography>
                                <Typography mt={1}><b>Thuốc:</b></Typography>
                                <ul style={{ margin: 0, paddingLeft: 18 }}>
                                    {selected.items.map((item, idx) => (
                                        <li key={idx}>{item.name} - {item.dosage} - {item.frequency} - {item.duration}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        {selected && prescriptions.find(p => p.id === selected.id)?.status === 'Chưa lấy' && (
                            <Button onClick={() => handleTakeMedicine(selected.id)} disabled={loading} variant="contained" color="primary">
                                {loading ? 'Đang xử lý...' : 'Lấy thuốc'}
                            </Button>
                        )}
                        <Button onClick={() => setSelected(null)}>Đóng</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
} 