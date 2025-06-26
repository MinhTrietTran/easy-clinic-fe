import React, { useState } from 'react';
import Button from '../common/Button';

const MOCK_SCHEDULES = [
    { id: 1, date: '2024-05-10', time: '09:00', patient: 'Nguyễn Văn C', doctor: 'Nguyễn Văn A', status: 'Đã xác nhận' },
    { id: 2, date: '2024-05-11', time: '14:00', patient: 'Lê Thị D', doctor: 'Trần Thị B', status: 'Chờ xác nhận' },
];

export default function ScheduleManagement() {
    const [schedules, setSchedules] = useState(MOCK_SCHEDULES);

    const handleStatus = (id, status) => {
        setSchedules(schedules.map(s => s.id === id ? { ...s, status } : s));
    };

    return (
        <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f0f4f8' }}>
                        <th>Ngày</th>
                        <th>Giờ</th>
                        <th>Bệnh nhân</th>
                        <th>Bác sĩ</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map(s => (
                        <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td>{s.date}</td>
                            <td>{s.time}</td>
                            <td>{s.patient}</td>
                            <td>{s.doctor}</td>
                            <td>{s.status}</td>
                            <td>
                                <Button onClick={() => handleStatus(s.id, s.status === 'Đã xác nhận' ? 'Chờ xác nhận' : 'Đã xác nhận')}>
                                    {s.status === 'Đã xác nhận' ? 'Chuyển chờ xác nhận' : 'Xác nhận'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 