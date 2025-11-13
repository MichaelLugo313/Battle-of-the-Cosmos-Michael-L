import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import { Layout } from '../components/Layout';
import { HomePage } from '../components/HomePage';
import { SavePage } from '../components/SavePage';
import { AboutPage } from '../components/AboutPage';


export default function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/save" element={<SavePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StrictMode>
  );
}
