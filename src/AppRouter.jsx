import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import MoviePage from './pages/MoviePage';

const Header = ({children}) => {
  return (
    <>
    <header className="bg-neutral-950 text-white p-6">
         <Link to="/">
        <h1 className="text-2xl font-bold text-text-primary">Space Movies</h1>
      </Link>
    </header>
          {children}
    </>
  )
}


export default function AppRouter() {
  return (
  
    <BrowserRouter>
      <Header>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
      </Header>
    </BrowserRouter>
  
  );
}
