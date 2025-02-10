// components/Notification.jsx
import React from 'react';

const Notification = ({ message, type }) => {
  if (!message) return null;

  const notificationStyle = type === 'success'
    ? { color: 'green', backgroundColor: 'lightgreen', padding: '10px', border: '1px solid green' }
    : { color: 'red', backgroundColor: 'lightcoral', padding: '10px', border: '1px solid red' };

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;


  