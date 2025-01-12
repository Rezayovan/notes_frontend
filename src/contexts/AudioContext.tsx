import { createContext, useContext, ReactNode, useState } from 'react';

interface AudioContextType {
  transcription: string;
  isRecording: boolean;
  addTranscription: (text: string) => void;
  resetTranscription: () => void;
  setIsRecording: (isRecording: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [transcription, setTranscription] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const addTranscription = (text: string) => {
    setTranscription(prev => prev + text);
  };

  const resetTranscription = () => {
    setTranscription('');
  };

  return (
    <AudioContext.Provider 
      value={{ 
        transcription, 
        isRecording,
        addTranscription, 
        resetTranscription,
        setIsRecording 
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
} 