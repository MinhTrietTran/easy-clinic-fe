import React from 'react';
export default function Input({ label, value, onChange, type = 'text', name, required, style, placeholder }) {
    return (
        <div style={{ marginBottom: 12 }}>
            {label && <label style={{ display: 'block', marginBottom: 4 }}>{label}</label>}
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', ...style }}
                placeholder={placeholder}
            />
        </div>
    );
} 