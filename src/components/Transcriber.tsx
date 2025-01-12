import { Box, Paper, TextField } from '@mui/material';
import { useAudio } from '../contexts/AudioContext';
import { useEffect, useRef } from 'react';

function Transcriber() {
  const { transcription } = useAudio();
  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Scroll to bottom when new transcription arrives
    if (textFieldRef.current) {
      textFieldRef.current.scrollTop = textFieldRef.current.scrollHeight;
    }
  }, [transcription]);

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Paper 
        elevation={3}
        sx={{
          width: '60%',
          margin: '0 auto',
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              height: '100%',
              '& textarea': {
                height: '100% !important',
                padding: 3,
              },
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
        />
      </Paper>
    </Box>
  );
}

export default Transcriber; 