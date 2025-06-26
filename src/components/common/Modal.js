import React from 'react';
export default function Modal({ open, onClose, title, children }) {
    if (!open) return null;
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', zIndex: 1000 }} onClick={onClose}>
            <div style={{ background: '#fff', borderRadius: 8, maxWidth: 400, margin: '100px auto', padding: 24, position: 'relative' }} onClick={e => e.stopPropagation()}>
                {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
                {children}
                <button onClick={onClose} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: 18, cursor: 'pointer' }}>×</button>
            </div>
        </div>
    );
} 