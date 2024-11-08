// src/components/QRScanner.js

import axios from 'axios';
import React, { useState } from 'react';

const RedirectQr = () => {
    const [qrId, setQrId] = useState('');

    const handleScanQRCode = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/redirect/${qrId}`);
            if (response.status === 200 && response.data.redirectUrl) {
                window.location.href = response.data.redirectUrl; 
            } else {
                console.error('Redirect URL not found');
            }
        } catch (error) {
            console.error('QR redirection failed', error);
        }
    };

    return (
        <div>
            <h2>Scan QR Code</h2>
            <input
                type="text"
                placeholder="QR ID"
                value={qrId}
                onChange={(e) => setQrId(e.target.value)}
                required
            />
            <button onClick={handleScanQRCode}>Simulate Scan</button>
        </div>
    );
};

export default RedirectQr;
