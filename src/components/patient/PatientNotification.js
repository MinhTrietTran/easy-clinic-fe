import React from 'react';
import Modal from '../common/Modal';

export default function PatientNotification({ notifications = [] }) {
    return (
        <div>
            <ul>
                {notifications.length === 0 && <li>Không có thông báo.</li>}
                {notifications.map(n => <li key={n.id}>{n.message}</li>)}
            </ul>
        </div>
    );
} 