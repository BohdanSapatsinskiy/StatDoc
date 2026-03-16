import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import { SettingsProvider } from "./context/SettingsContext";
import {MusicPlayer} from "./components/MusicPlayer";

createRoot(document.getElementById('root')!).render(

  <StrictMode>
      <SettingsProvider>
        <MusicPlayer src="src/assets/music/chill.mp3" />
        <App />
    </SettingsProvider>
  </StrictMode>,
)
