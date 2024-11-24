'use client'
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from "@/lib/firebase";

const Page = () => {
  const [email, setEmail] = useState('');
  const [cargando, setCargando] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const saveEmail = async (email: string) => {
    try {
      const emailDocRef = collection(db, 'emailCollection');
      await addDoc(emailDocRef, { email, date: new Date() });
      return true;
    } catch (error) {
      console.error('Error al guardar el correo', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    const success = await saveEmail(email);
    setCargando(false);
    if (success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Ocultar la alerta después de 3 segundos
      setEmail(''); // Limpiar el input
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="p-8 border border-black rounded-md w-full max-w-lg text-left">
        <h1 className="text-lg font-bold border-b border-black pb-2 mb-4">
          Suscríbete y obtén alertas
        </h1>
        <p className="text-sm text-gray-700 mb-6">
          Permanece informado sobre cambios regulatorios en GHS, MARPOL, REACH,
          CLP y conoce a tiempo riesgos, plazos e hitos que deben cumplirse.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-black rounded-md"
          />
          <div className='flex justify-end'>
            <button
                type="submit"
                disabled={cargando}
                className={`bg-red-600 text-white py-2 px-4 rounded-md flex  justify-end sm:w-auto ${
                cargando ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {cargando ? (
                <>
                    <svg
                    className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"
                    viewBox="0 0 24 24"
                    ></svg>
                    Cargando...
                </>
                ) : (
                'Suscribete'
                )}
            </button>
          </div>
          
        </form>
        {showToast && (
          <div className="fixed top-20 right-5 bg-green-500 text-white py-2 px-4 rounded shadow-lg transition-opacity duration-300">
            ¡Correo guardado exitosamente!
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
