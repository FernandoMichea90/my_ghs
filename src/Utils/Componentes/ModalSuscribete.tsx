import React from 'react'
// import modal  
import Modal from '@mui/material/Modal';
// importar box 
import { Box } from '@mui/material';
// importar useState
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from "@/lib/firebase";


// estilo del modal
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
};

//codigo en tsx 
// recibe props open, handleClose y handleOpen

interface ModalSuscribeteProps {
    open: boolean;
    handleClose: () => void;
    handleOpen: () => void;
    setShowToast: (value: boolean) => void;
    showToast: boolean;
}
const ModalSuscribete = ({ open, handleClose, handleOpen,setShowToast,showToast }: ModalSuscribeteProps) => {

    const [email, setEmail] = useState('');
    const [cargando, setCargando] = useState(false);
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
            handleClose()
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000); // Ocultar la alerta después de 3 segundos
            setEmail(''); // Limpiar el input
        }
    };


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="flex items-center justify-center  bg-white">
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
                                    className={`bg-red-600 text-white py-2 px-4 rounded-md flex  justify-end sm:w-auto ${cargando ? 'opacity-50 cursor-not-allowed' : ''
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
                        
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default ModalSuscribete