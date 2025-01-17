import { useState, useEffect } from 'react';
import { Button, Typography, } from '@mui/material';
import './Timer.css';

interface TimerProps {
  onStart?: () => void;
  onEnd?: () => void;
  onPause?: () => void;
  onResume?: () => void;
}

function Timer({ onStart, onEnd, onPause, onResume }: TimerProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let intervalId: number;

    if (isRunning) {
      intervalId = window.setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setHasStarted(true);
    onStart?.();
  };

  const handlePause = () => {
    setIsRunning(false);
    onPause?.();
  };

  const handleResume = () => {
    setIsRunning(true);
    onResume?.();
  };

  const handleEnd = () => {
    setIsRunning(false);
    setTime(0);
    setHasStarted(false);
    onEnd?.();
  };

  return (
    <div className="timer-container">
      {hasStarted && (
        <Typography variant="h2" className="timer-display">
          {formatTime(time)}
        </Typography>
      )}
      
      {!hasStarted && (
        <Button 
          variant="contained" 
          size="large" 
          onClick={handleStart}
          className="timer-button"
        >
          Start Session
        </Button>
      )}
      
      {isRunning && (
        <div className="button-group">
          <Button 
            variant="contained" 
            color="secondary" 
            size="large" 
            onClick={handlePause}
            className="timer-button"
          >
            Pause
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            size="large" 
            onClick={handleEnd}
            className="timer-button"
          >
            End Session
          </Button>
        </div>
      )}
      
      {!isRunning && hasStarted && (
        <div className="button-group">
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            onClick={handleResume}
            className="timer-button"
          >
            Resume
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            size="large" 
            onClick={handleEnd}
            className="timer-button"
          >
            End Session
          </Button>
        </div>
      )}
    </div>
  );
}

export default Timer; 