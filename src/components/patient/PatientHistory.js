import React, { useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const MOCK_HISTORY = [
    {
        id: 1, date: '2024-05-01', doctor: 'BS. Minh', diagnosis: 'Cảm cúm', treatment: 'Nghỉ ngơi, uống thuốc đầy đủ', notes: 'Không nghiêm trọng', prescription: [
            { name: 'Paracetamol', dosage: '500mg', frequency: '2 lần/ngày', duration: '5 ngày' },
            { name: 'Vitamin C', dosage: '1000mg', frequency: '1 lần/ngày', duration: '7 ngày' },
        ]
    },
    { id: 2, date: '2024-04-10', doctor: 'BS. Hùng', diagnosis: 'Viêm họng', treatment: 'Kháng sinh', notes: 'Tái khám sau 1 tuần' },
];

export default function PatientHistory() {
    const [selected, setSelected] = useState(null);
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" mb={2}>Lịch sử khám bệnh</Typography>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ngày khám</TableCell>
                                <TableCell>Bác sĩ</TableCell>
                                <TableCell>Chẩn đoán</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {MOCK_HISTORY.map(r => (
                                <TableRow key={r.id}>
                                    <TableCell>{r.date}</TableCell>
                                    <TableCell>{r.doctor}</TableCell>
                                    <TableCell>{r.diagnosis}</TableCell>
                                    <TableCell><Button variant="outlined" size="small" onClick={() => setSelected(r)}>Xem chi tiết</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="xs" fullWidth>
                    <DialogTitle>Chi tiết khám bệnh</DialogTitle>
                    <DialogContent dividers>
                        {selected && (
                            <>
                                <Typography><b>Ngày khám:</b> {selected.date}</Typography>
                                <Typography><b>Bác sĩ:</b> {selected.doctor}</Typography>
                                <Typography><b>Chẩn đoán:</b> {selected.diagnosis}</Typography>
                                <Typography><b>Điều trị:</b> {selected.treatment}</Typography>
                                <Typography><b>Ghi chú:</b> {selected.notes}</Typography>
                                {selected.prescription && selected.prescription.length > 0 && (
                                    <>
                                        <Typography mt={1}><b>Đơn thuốc:</b></Typography>
                                        <ul style={{ margin: 0, paddingLeft: 18 }}>
                                            {selected.prescription.map((item, idx) => (
                                                <li key={idx}>{item.name} - {item.dosage} - {item.frequency} - {item.duration}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSelected(null)}>Đóng</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
} 