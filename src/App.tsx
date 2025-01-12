import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import { AudioProvider } from './contexts/AudioContext';

function App() {
  return (
    <AudioProvider>
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<MainPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </AudioProvider>
  );
}

export default App;
