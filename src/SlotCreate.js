// src/components/SlotCreation.js

import axios from 'axios';
import React, { useState } from 'react';

const SlotCreate = () => {
    const [brandId, setBrandId] = useState('');
    const [qrId, setQrId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [redirectUrl, setRedirectUrl] = useState('');

    const handleCreateSlot = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:7000/api/create-slot`, {
                brand_id: brandId,
                qr_id: qrId,
                start_time: startDate,
                end_time: endDate,
                redirect_url: redirectUrl,
            });
            alert('Slot created successfully');
        } catch (error) {
            console.error('Slot creation failed', error);
        }
    };

    return (
        <div>
            <h2>Create Slot</h2>
            <form onSubmit={handleCreateSlot}>
                <input
                    type="text"
                    placeholder="Brand ID"
                    value={brandId}
                    onChange={(e) => setBrandId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="QR ID"
                    value={qrId}
                    onChange={(e) => setQrId(e.target.value)}
                    required
                />
                <input
                    type="datetime-local"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                <input
                    type="datetime-local"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Redirect URL"
                    value={redirectUrl}
                    onChange={(e) => setRedirectUrl(e.target.value)}
                    required
                />
                <button type="submit">Create Slot</button>
            </form>
        </div>
    );
};

export default SlotCreate;
