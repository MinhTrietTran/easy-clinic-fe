import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

const MOCK_DOCTORS = [
    { id: 1, name: 'Trần Thị B', department: 'Tai mũi họng', phone: '0901234567', is_active: true },
    { id: 2, name: 'Nguyễn Văn A', department: 'Nội tổng quát', phone: '0909876543', is_active: true },
];

export default function DoctorManagement() {
    const [doctors, setDoctors] = useState(MOCK_DOCTORS);
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({ name: '', department: '', phone: '' });

    const handleEdit = doctor => {
        setSelected(doctor);
        setForm({ name: doctor.name, department: doctor.department, phone: doctor.phone });
    };

    const handleSave = () => {
        setDoctors(doctors.map(d => d.id === selected.id ? { ...d, ...form } : d));
        setSelected(null);
    };

    return (
        <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f0f4f8' }}>
                        <th>Họ tên</th>
                        <th>Khoa</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map(d => (
                        <tr key={d.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td>{d.name}</td>
                            <td>{d.department}</td>
                            <td>{d.phone}</td>
                            <td>{d.is_active ? 'Đang làm việc' : 'Nghỉ'}</td>
                            <td><Button onClick={() => handleEdit(d)}>Sửa</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal open={!!selected} onClose={() => setSelected(null)} title="Sửa thông tin bác sĩ">
                <Input label="Họ tên" name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <Input label="Khoa" name="department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} required />
                <Input label="Số điện thoại" name="phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
                <Button onClick={handleSave} style={{ width: '100%', marginTop: 12 }}>Lưu</Button>
            </Modal>
        </div>
    );
} 