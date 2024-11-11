import React, { useState } from 'react';

function App() {
  // State for QR Code generation form
  const [qrCodeId, setQrCodeId] = useState('');
  const [url, setUrl] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [message, setMessage] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // State for Slot creation and update form
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [redirectionUrl, setRedirectionUrl] = useState('');
  const [defaultUrl, setDefaultUrl] = useState('');
  const [durationInMinutes, setDurationInMinutes] = useState('');
  const [slotMessage, setSlotMessage] = useState('');
  const [slotId, setSlotId] = useState('');

  // API URL for your backend
  const apiUrl = 'https://qrbackend-aio3.onrender.com/api';  // Adjust this to your actual API URL

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
        body: JSON.stringify({ qrCodeId, url, durationInMinutes: 60 }),  // Default duration set to 60 minutes
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

  // Create Slot
  const createSlot = async () => {
    if (!qrCodeId || !startTime || !endTime || !redirectionUrl || !defaultUrl || !durationInMinutes) {
      setSlotMessage('All fields are required for slot creation.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/create-slot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrCodeId, startTime, endTime, redirectionUrl, defaultUrl, durationInMinutes }),
      });

      const data = await response.json();
      if (response.ok) {
        setSlotMessage(data.message);
      } else {
        setSlotMessage(data.message);
      }
    } catch (err) {
      setSlotMessage('Error creating slot.');
    }
  };

  // Update Slot
  const updateSlot = async () => {
    if (!slotId || !startTime || !endTime || !redirectionUrl || !defaultUrl || !durationInMinutes) {
      setSlotMessage('All fields are required for slot update.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/update-slot/${slotId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startTime, endTime, redirectionUrl, defaultUrl, durationInMinutes }),
      });

      const data = await response.json();
      if (response.ok) {
        setSlotMessage(data.message);
      } else {
        setSlotMessage(data.message);
      }
    } catch (err) {
      setSlotMessage('Error updating slot.');
    }
  };

  return (
    <div className="App">
      <h1>QR Code Generator and Slot Management</h1>

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
          placeholder="Enter QR Code ID"
          value={qrCodeId}
          onChange={(e) => setQrCodeId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter New URL"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <button onClick={updateQrCodeUrl}>Update QR Code URL</button>
      </div>

      {/* Slot Creation Form */}
      <div className="form-container">
        <h2>Create Slot for QR Code</h2>
        <input
          type="text"
          placeholder="Enter QR Code ID"
          value={qrCodeId}
          onChange={(e) => setQrCodeId(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Redirection URL"
          value={redirectionUrl}
          onChange={(e) => setRedirectionUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Default Link"
          value={defaultUrl}
          onChange={(e) => setDefaultUrl(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duration in Minutes"
          value={durationInMinutes}
          onChange={(e) => setDurationInMinutes(e.target.value)}
        />
        <button onClick={createSlot}>Create Slot</button>
      </div>

      {/* Slot Update Form */}
      <div className="form-container">
        <h2>Update Slot</h2>
        <input
          type="text"
          placeholder="Enter Slot ID to Update"
          value={slotId}
          onChange={(e) => setSlotId(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Redirection URL"
          value={redirectionUrl}
          onChange={(e) => setRedirectionUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Default Link"
          value={defaultUrl}
          onChange={(e) => setDefaultUrl(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duration in Minutes"
          value={durationInMinutes}
          onChange={(e) => setDurationInMinutes(e.target.value)}
        />
        <button onClick={updateSlot}>Update Slot</button>
      </div>

      {/* Slot or Update Message */}
      {slotMessage && <p>{slotMessage}</p>}
    </div>
  );
}

export default App;
