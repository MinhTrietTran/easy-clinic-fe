import React, { useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const MOCK_PENDING = [
    { id: 1, date: '2024-05-11', time: '14:00', patient: 'Lê Thị D', allergies: 'Penicillin', chronic: 'Tiểu đường', status: 'Chờ xác nhận' },
];

export default function ConfirmAppointment() {
    const [pending, setPending] = useState(MOCK_PENDING);

    const handleConfirm = id => {
        setPending(pending.map(a => a.id === id ? { ...a, status: 'Đã xác nhận' } : a));
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" mb={2}>Xác nhận lịch khám</Typography>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ngày</TableCell>
                                <TableCell>Giờ</TableCell>
                                <TableCell>Bệnh nhân</TableCell>
                                <TableCell>Dị ứng</TableCell>
                                <TableCell>Bệnh mãn tính</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pending.map(a => (
                                <TableRow key={a.id}>
                                    <TableCell>{a.date}</TableCell>
                                    <TableCell>{a.time}</TableCell>
                                    <TableCell>{a.patient}</TableCell>
                                    <TableCell>{a.allergies}</TableCell>
                                    <TableCell>{a.chronic}</TableCell>
                                    <TableCell>{a.status}</TableCell>
                                    <TableCell>
                                        {a.status === 'Chờ xác nhận' && <Button variant="contained" size="small" onClick={() => handleConfirm(a.id)}>Xác nhận</Button>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
} 