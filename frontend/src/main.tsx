import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SecondPage from './components/SecondPage/SecondPage.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/secondPage" element={<SecondPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);