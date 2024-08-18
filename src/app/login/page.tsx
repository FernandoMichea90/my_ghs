'use client'
import { signInWithGoogle, auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


interface IUsuario {
  user: string,
  pass: string
}

const Page = () => {  

  const [usuario, setUsuario] = useState<IUsuario>({ user: '', pass: '' })
  const router= useRouter()


  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.log('error al inicial sesion en google ', error)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value
    }));
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()
    const { user, pass } = usuario
    try {
      await signInWithEmailAndPassword(auth, user, pass)
      console.log('Inicio de sesión con correo y contraseña exitoso');
      router.push("/")
      
    } catch (error) {
      console.log(error)
      alert('Error al iniciar sesión con correo y contraseña:');

    }

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="user"
              value={usuario.user}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-gray-800 focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              name="pass"
              value={usuario.pass}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none  text-gray-800 focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Iniciar sesión con Google
          </button>
        </div>
        <p className="text-center text-gray-600 mt-4">
          ¿No tienes una cuenta? <a href="#" className="text-blue-500 hover:underline">Regístrate</a>
        </p>
      </div>
    </div>
  );
};

export default Page;
