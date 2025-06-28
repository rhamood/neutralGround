import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import BiasPage from './biasPage.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/bias" element={<BiasPage />} />
      {/* <Route path="/results" element={<ResultsPage />} /> */}
    </Routes>
  </BrowserRouter>
)
