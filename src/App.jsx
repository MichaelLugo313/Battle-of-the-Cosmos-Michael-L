import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import { Layout } from '../components/Layout';
import { HomePage } from '../components/HomePage';

export default function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StrictMode>
  );
}
