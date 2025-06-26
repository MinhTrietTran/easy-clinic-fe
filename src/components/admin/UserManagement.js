import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

const MOCK_USERS = [
    { id: 1, email: 'admin@abc.com', role: 'admin', name: 'Admin', status: 'Hoạt động' },
    { id: 2, email: 'doctor@abc.com', role: 'doctor', name: 'Trần Thị B', status: 'Hoạt động' },
    { id: 3, email: 'patient@abc.com', role: 'patient', name: 'Nguyễn Văn C', status: 'Hoạt động' },
];

export default function UserManagement() {
    const [users, setUsers] = useState(MOCK_USERS);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ email: '', name: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleAdd = () => {
        if (!form.email || !form.name || !form.password) {
            setError('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        setUsers([...users, { id: users.length + 1, email: form.email, role: 'doctor', name: form.name, status: 'Hoạt động' }]);
        setForm({ email: '', name: '', password: '' });
        setError('');
        setOpen(false);
    };

    const handleReset = id => {
        alert('Đã reset mật khẩu cho user ID ' + id);
    };

    return (
        <div>
            <Button onClick={() => setOpen(true)} style={{ marginBottom: 16 }}>+ Thêm bác sĩ</Button>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f0f4f8' }}>
                        <th>Email</th>
                        <th>Họ tên</th>
                        <th>Phân quyền</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td>{u.email}</td>
                            <td>{u.name}</td>
                            <td>{u.role}</td>
                            <td>{u.status}</td>
                            <td><Button onClick={() => handleReset(u.id)} style={{ background: '#888' }}>Reset mật khẩu</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal open={open} onClose={() => setOpen(false)} title="Thêm bác sĩ mới">
                <Input label="Email" name="email" value={form.email} onChange={handleChange} required />
                <Input label="Họ tên" name="name" value={form.name} onChange={handleChange} required />
                <Input label="Mật khẩu" name="password" type="password" value={form.password} onChange={handleChange} required />
                {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
                <Button onClick={handleAdd} style={{ width: '100%' }}>Tạo tài khoản</Button>
            </Modal>
        </div>
    );
} 