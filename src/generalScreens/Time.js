import React, { useState, useEffect } from 'react';
import './Time.css';

const Time = () => {
  const [israelDateTime, setIsraelDateTime] = useState('');

  const formatDateTime = (date) => {
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        timeZone: 'Asia/Jerusalem'
    };
    return new Date(date).toLocaleString('en-IL', options);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsraelDateTime(formatDateTime(Date.now()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="left-align">
      
      <p>תאריך ושעה בישראל</p>
      <p>{israelDateTime}</p>
    </div>
  );
};

export default Time;