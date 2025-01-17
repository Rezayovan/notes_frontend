import { Paper, TextField } from '@mui/material';
import { useAudio } from '../contexts/AudioContext';
import { useEffect, useRef } from 'react';
import './Transcriber.css';

function Transcriber() {
  const { transcription } = useAudio();
  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current.scrollTop = textFieldRef.current.scrollHeight;
    }
  }, [transcription]);

  return (
    <div className="transcriber-container">
      <Paper elevation={3} className="transcriber-paper">
        <TextField
          multiline
          fullWidth
          variant="outlined"
          value={transcription}
          placeholder="Transcription will appear here..."
          InputProps={{
            readOnly: true,
            inputRef: textFieldRef
          }}
          className="transcriber-textfield"
        />
      </Paper>
    </div>
  );
}

export default Transcriber; 