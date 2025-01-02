import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomeScreen from './screens/HomeScreen';
import DetailsScreens from './screens/DetailsScreens';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <BrowserRouter>
         <Routes>
            <Route index element={<HomeScreen />} />
            <Route path="/user/:id" element={<DetailsScreens />} />
         </Routes>
      </BrowserRouter>
   </StrictMode>
);
