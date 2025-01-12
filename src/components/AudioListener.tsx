import { useEffect, useRef } from 'react';
import { useAudio } from '../contexts/AudioContext';

interface AudioListenerProps {
  isSessionActive: boolean;
}

function AudioListener({ isSessionActive }: AudioListenerProps) {
  const { isRecording } = useAudio();
  const websocketRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    let chunks: Blob[] = [];

    const initializeWebSocket = () => {
      websocketRef.current = new WebSocket('ws://your-websocket-server-url');
      
      websocketRef.current.onopen = () => {
        console.log('WebSocket connection established');
      };

      websocketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      websocketRef.current.onclose = () => {
        console.log('WebSocket connection closed');
      };
    };

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
            // Send the audio chunk to the server
            if (websocketRef.current?.readyState === WebSocket.OPEN) {
              websocketRef.current.send(event.data);
            }
          }
        };

        mediaRecorderRef.current.start(1000); // Collect data every second
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    const stopRecording = () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };

    // Initialize WebSocket when session starts
    if (isSessionActive) {
      initializeWebSocket();
    }

    // Start/stop recording based on isRecording state
    if (isSessionActive && isRecording) {
      startRecording();
    } else {
      stopRecording();
    }

    // Cleanup function
    return () => {
      stopRecording();
      if (websocketRef.current) {
        websocketRef.current.close();
      }
      chunks = [];
    };
  }, [isSessionActive, isRecording]);

  return null; // This component doesn't render anything
}

export default AudioListener; 