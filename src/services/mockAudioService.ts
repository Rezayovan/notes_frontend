import { useAudio } from '../contexts/AudioContext';
import { useEffect } from 'react';

export function useMockAudioStream() {
  const { addTranscription, isRecording } = useAudio();

  useEffect(() => {
    if (!isRecording) return;

    const words = [
      "Hello", "this", "is", "a", "test", "of", "the", "live", 
      "transcription", "system", "..."
    ];
    let wordIndex = 0;

    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        addTranscription(words[wordIndex] + " ");
        wordIndex++;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [addTranscription, isRecording]);
} 