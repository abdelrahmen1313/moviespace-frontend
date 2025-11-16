import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './AppRouter';
import './styles.css';
import { ThemeProvider } from "./theme/ThemeContext";
import { TelevisionProvider } from "./television/TelevisionContext";



const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ThemeProvider>
    <TelevisionProvider>
 
      <AppRouter />
    
    </TelevisionProvider>
  </ThemeProvider>
);
