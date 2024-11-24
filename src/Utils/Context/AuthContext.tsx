// context/AuthContext.tsx
'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { collection, where, query, getDocs } from 'firebase/firestore';

interface AuthContextType {
  user: IUserApp | null;
  loading:boolean
  setLoading:any
}

interface IUserApp extends User {
  administrador: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUserApp | null>(null);
  const [loading, setLoading] = useState(true);


  const checkIfAdmin = async (user: User): Promise<boolean> => {
    try {
      const administradoresRef = collection(db, "administradores");
      const q = query(administradoresRef, where("administrador", "==", user.email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error getting documents: ", error);
      return false;
    }
  };

  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const isAdmin = await checkIfAdmin(currentUser);
        setUser({ ...currentUser, administrador: isAdmin });
        setLoading(false)
      } else {
        setUser(null);
        setLoading(false)
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user,loading,setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
