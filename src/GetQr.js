import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GetQr = () => {
    const [qrCodes, setQRCodes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       
        const fetchQRCodes = async () => {
            try {
                const response = await axios.get('http://localhost:7000/api/fetch-qr');
                setQRCodes(response.data.qrCodes);
            } catch (error) {
                console.error("Error fetching QR codes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQRCodes();
    }, []);

    if (loading) {
        return <div>Loading QR codes...</div>;
    }

    return (
        <div>
            <h2>QR Codes List</h2>
            <ul>
                {qrCodes.map((qr) => (
                    <li key={qr._id}>
                        <p><strong>ID:</strong> {qr._id}</p>
                        <p><strong>Location:</strong> {qr.location}</p>
                        <p><strong>Default URL:</strong> {qr.default_url}</p>
                        <img src={qr.qr_code_image} alt="QR Code" style={{ width: '100px' }} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetQr;
