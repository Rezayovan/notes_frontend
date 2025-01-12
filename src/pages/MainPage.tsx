import { Container } from '@mui/material';
import { useState } from 'react';
import Timer from '../components/Timer';
import Transcriber from '../components/Transcriber';
import AudioListener from '../components/AudioListener';
import { useMockAudioStream } from '../services/mockAudioService';
import { useAudio } from '../contexts/AudioContext';
import './MainPage.css';

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
      <div className="main-container">
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
      </div>
    </Container>
  );
}

export default MainPage; 