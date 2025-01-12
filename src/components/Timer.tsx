import { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';

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
    <Box sx={{ textAlign: 'center' }}>
      {hasStarted && (
        <Typography variant="h1" sx={{ mb: 4, fontFamily: 'monospace' }}>
          {formatTime(time)}
        </Typography>
      )}
      
      {!hasStarted && (
        <Button 
          variant="contained" 
          size="large" 
          onClick={handleStart}
          sx={{ fontSize: '1.2rem', px: 4, py: 1.5 }}
        >
          Start Session
        </Button>
      )}
      
      {isRunning && (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large" 
            onClick={handlePause}
            sx={{ fontSize: '1.2rem', px: 4, py: 1.5 }}
          >
            Pause
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            size="large" 
            onClick={handleEnd}
            sx={{ fontSize: '1.2rem', px: 4, py: 1.5 }}
          >
            End Session
          </Button>
        </Box>
      )}
      
      {!isRunning && hasStarted && (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            onClick={handleResume}
            sx={{ fontSize: '1.2rem', px: 4, py: 1.5 }}
          >
            Resume
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            size="large" 
            onClick={handleEnd}
            sx={{ fontSize: '1.2rem', px: 4, py: 1.5 }}
          >
            End Session
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Timer; 