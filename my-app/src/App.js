
import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import './countdown.css';

const Countdown = () => {

  
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(interval);
          setIsActive(false);
        } else {
          if (seconds === 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleStop = () => {
    setIsActive(false);
    setMinutes(0);
    setSeconds(0);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(0);
    setSeconds(0);
  };

  const formatTime = (time) => {
    return String(time).padStart(2, '0');
  };

  return (
    
    <div className="container">
    <div className="floating-text">COUNTDOWN-TIMER</div>
    <span style={{ fontSize: '48px',color: '#3d73ad' }}> Minutes</span>
      <div>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
          style={{ fontSize: '36px' }}
        />
        
      </div>
      <div>
        <p style={{ fontSize: '40px',fontWeight: 'bold', color: '#87CEEB' }}>
          {formatTime(Math.floor(minutes / 60))}:{formatTime(minutes % 60)}:
          {formatTime(seconds)}
        </p>
      </div>
      <div>
        <button onClick={handleStart} disabled={isActive}>
          <FaPlay />
        </button>
        <button onClick={handlePause} disabled={!isActive}>
          <FaPause />
        </button>
        <button onClick={handleStop} disabled={!isActive}>
          <FaStop />
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Countdown;

