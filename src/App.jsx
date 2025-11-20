import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import { Layout } from '../components/Layout';
import { HomePage } from '../components/HomePage';
import { SavePage } from '../components/SavePage';
import { LoadPage } from '../components/LoadPage';
import { AboutPage } from '../components/AboutPage';
import { ContactPage } from '../components/ContactPage';

export default function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/save" element={<SavePage />} />
            <Route path="/load" element={<LoadPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StrictMode>
  );
}
