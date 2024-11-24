'use client'
import React, {useEffect, ReactNode, useState } from 'react';
import {useAuth} from "@/Utils/Context/AuthContext"
import { useRouter } from 'next/navigation';


interface AuthGuardProps {
  children: ReactNode;  // Definimos el tipo de la propiedad 'children'
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {

  const { user,loading } = useAuth();  // Obtenemos el usuario desde el contexto
  const [isLoading, setIsLoading] = useState(true);
  const router= useRouter()

  useEffect(() => {
    if(isLoading && !loading){
        if (user !== null) {
          setIsLoading(false);  // El usuario ya ha sido cargado
        }else{
            setIsLoading(false)
            router.push('/login')
        }
    }
  }, [user,loading]); // Se ejecuta cuando 'user' cambia

  if (isLoading ||loading) {
    return <div className='mt-20'>Cargando...</div>; // Puedes mostrar un indicador de carga mientras se obtiene el usuario
  }else{
      
      return <>{children}</>;
  }
 
};

export default AuthGuard;
