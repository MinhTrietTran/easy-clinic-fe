import React from 'react';
export default function NotificationBell({ count = 0, onClick }) {
    return (
        <div style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }} onClick={onClick}>
            <span role="img" aria-label="bell" style={{ fontSize: 24 }}>🔔</span>
            {count > 0 && (
                <span style={{ position: 'absolute', top: -4, right: -4, background: 'red', color: '#fff', borderRadius: '50%', padding: '2px 6px', fontSize: 12 }}>{count}</span>
            )}
        </div>
    );
} 