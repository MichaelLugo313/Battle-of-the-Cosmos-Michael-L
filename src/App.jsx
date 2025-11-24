import { HashRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import { Layout } from '../components/Layout';
import { HomePage } from '../components/HomePage';
import { StoryGamePage } from '../components/StoryGamePage';
import { AboutPage } from '../components/AboutPage';
import { ContactPage } from '../components/ContactPage';
import { SavePage } from '../components/SavePage';
import { LoadPage } from '../components/LoadPage';
import { GameStateProvider } from '../contexts/GameStateContext';

export default function App() {
  return (
    <StrictMode>
      <GameStateProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/story" element={<StoryGamePage />} />
              <Route path="/save" element={<SavePage />} />
              <Route path="/load" element={<LoadPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Layout>
        </HashRouter>
      </GameStateProvider>
    </StrictMode>
  );
}
