import React from 'react';
export default function Button({ children, onClick, type = 'button', style = {}, disabled }) {
    return (
        <button type={type} onClick={onClick} style={{ padding: 8, borderRadius: 4, border: 'none', background: '#1976d2', color: '#fff', fontWeight: 500, ...style }} disabled={disabled}>
            {children}
        </button>
    );
} 