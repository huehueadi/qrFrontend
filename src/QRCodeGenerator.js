import React, { useState } from 'react';


function App() {
  // State for form inputs
  const [qrCodeId, setQrCodeId] = useState('');
  const [url, setUrl] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [message, setMessage] = useState('');

  // API URL for your backend
  const apiUrl = 'https://qrbackend-aio3.onrender.com/api';

  // Generate QR Code
  const generateQrCode = async () => {
    if (!qrCodeId || !url) {
      setMessage('QR Code ID and URL are required.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrCodeId, url }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setQrCodeUrl(data.qrCodeUrl); // Display the generated QR Code image URL
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('Error generating QR code.');
    }
  };

  // Update QR Code URL
  const updateQrCodeUrl = async () => {
    if (!qrCodeId || !newUrl) {
      setMessage('QR Code ID and New URL are required.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/update/${qrCodeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newUrl }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('Error updating QR code URL.');
    }
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>

      {/* Generate QR Code Form */}
      <div className="form-container">
        <h2>Generate QR Code</h2>
        <input
          type="text"
          placeholder="Enter QR Code ID"
          value={qrCodeId}
          onChange={(e) => setQrCodeId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter URL for the QR Code"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={generateQrCode}>Generate QR Code</button>
      </div>

      {/* Display Generated QR Code */}
      {qrCodeUrl && (
        <div className="qr-code-display">
          <h3>Generated QR Code:</h3>
          <img src={qrCodeUrl} alt="Generated QR Code" />
        </div>
      )}

      {/* Message */}
      {message && <p>{message}</p>}

      {/* Update QR Code URL Form */}
      <div className="form-container">
        <h2>Update QR Code URL</h2>
        <input
          type="text"
          placeholder="Enter QR Code ID to Update"
          value={qrCodeId}
          onChange={(e) => setQrCodeId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter New URL"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <button onClick={updateQrCodeUrl}>Update URL</button>
      </div>
    </div>
  );
}

export default App;

