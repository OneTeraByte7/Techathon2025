import React from 'react';
import GoogleTranslate from './googleTranslate';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className='w-full h-14 bg-customGreen flex items-center justify-between fixed top-0 left-0 z-50'>
      <h1 className='text-2xl font-logo text-white pl-3 cursor-pointer' onClick={() => navigate('/')}>
        MEDbuddy
      </h1>
      <GoogleTranslate />
    </nav>
  );
};