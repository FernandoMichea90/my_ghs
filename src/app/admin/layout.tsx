import NavAdmin from '@/Utils/Componentes/NavAdmin';
import AuthGuard from '@/Utils/Context/AuthGuard';
import React from 'react'

export default function AdminLayout  ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
    <AuthGuard>
        <NavAdmin></NavAdmin>
        {children}
    </AuthGuard>
    </>
  )
}

