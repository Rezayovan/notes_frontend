import { Container, Box } from '@mui/material';
import { useState } from 'react';
import Timer from '../components/Timer';
import Transcriber from '../components/Transcriber';
import AudioListener from '../components/AudioListener';
import { useMockAudioStream } from '../services/mockAudioService';
import { useAudio } from '../contexts/AudioContext';

function MainPage() {
  const [sessionStarted, setSessionStarted] = useState(false);
  const { resetTranscription, setIsRecording } = useAudio();

  const handleSessionStart = () => {
    resetTranscription();
    setIsRecording(true);
    setSessionStarted(true);
  };

  const handleSessionEnd = () => {
    resetTranscription();
    setIsRecording(false);
    setSessionStarted(false);
  };

  const handlePause = () => {
    setIsRecording(false);
  };

  const handleResume = () => {
    setIsRecording(true);
  };

  // Start mock audio stream when session starts
  useMockAudioStream();

  return (
    <Container maxWidth="lg">
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 120px)',
          pt: 4,
        }}
      >
        <Timer 
          onStart={handleSessionStart} 
          onEnd={handleSessionEnd}
          onPause={handlePause}
          onResume={handleResume}
        />
        {sessionStarted && (
          <>
            <Transcriber />
            <AudioListener isSessionActive={sessionStarted} />
          </>
        )}
      </Box>
    </Container>
  );
}

export default MainPage; 