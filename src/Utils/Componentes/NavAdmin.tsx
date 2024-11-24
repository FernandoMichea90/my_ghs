'use client';

import React from 'react';
import { useAuth } from '../Context/AuthContext';
import { signOut } from 'firebase/auth';
import {auth} from '@/lib/firebase'
import { useRouter } from 'next/navigation';

const NavAdmin = () => {
  const { user, setLoading} = useAuth(); // Obtener el usuario desde el contexto
  const router = useRouter()

  if (!user) {
    return (
      <div className="mt-20 mb-5">
        <p>No se encontró información del usuario.</p>
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Sesión cerrada exitosamente');
      setLoading(true)
      router.push('/login'); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Ocurrió un error al intentar cerrar sesión. Por favor, inténtalo de nuevo.');
    }
  };


  return (
    <div className="mt-20 mb-5 w-full flex justify-end items-center px-12">
      <p>{user.email}</p>
      <button 
        className="text-blue-600 hover:underline mx-2 p-2 border rounded hover:shadow" 
        onClick={() => handleSignOut()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"/></svg>
      </button>
    </div>
  );
};

export default NavAdmin;
