'use client'
import { db, storage } from '@/lib/firebase';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, DocumentData } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

interface Solucion {
    id: string;
    img: string;
    titulo: string;
    texto: string;
    posicion: number;
}

interface Soluciones {
    titulo: string;
    texto: string;
    soluciones: Solucion[];
}

const EditSoluciones: React.FC = () => {
    const [soluciones, setSoluciones] = useState<Soluciones>({
        titulo: '',
        texto: '',
        soluciones: [],
    });
    const [loading, setLoading] = useState(true);



    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, 'PagWhy'));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as DocumentData[];
        items.sort((a, b) => a.posicion - b.posicion);
        const formattedData = formatData(items);
        setSoluciones(formattedData);
        setLoading(false);
    };

    const formatData = (items: DocumentData[]): Soluciones => {
        const cabeza = items.find(item => item.id === 'Cabeza');
        const solucionesList = items.filter(item => item.id !== 'Cabeza').map(item => ({
            id: item.id,
            img: item.foto,
            titulo: item.titulo,
            texto: item.descripcion,
            posicion: item.posicion
        }));

        return {
            titulo: cabeza ? cabeza.titulo : '',
            texto: cabeza ? cabeza.descripcion : '',
            soluciones: solucionesList
        };
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: string) => {
        const updatedSoluciones = { ...soluciones };
        (updatedSoluciones.soluciones[index] as any)[field] = e.target.value;
        setSoluciones(updatedSoluciones);
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        const imagen = e.target.files[0];
        // Guardar imagen en firebase
        const storageRef = ref(storage, `PagWhy/${soluciones.soluciones[index].id}`);
        try {
            const snapshot = await uploadBytes(storageRef, imagen);
            const downloadURL = await getDownloadURL(snapshot.ref);
            const updatedSoluciones = { ...soluciones };
            updatedSoluciones.soluciones[index].img = downloadURL;
            setSoluciones(updatedSoluciones);
        } catch (error) {
            console.error('Error uploading image: ', error);

        }
    }

    const handleSave = async () => {
        try {
            const cabezaDoc = doc(db, 'PagWhy', 'Cabeza');
            await updateDoc(cabezaDoc, {
                titulo: soluciones.titulo,
                descripcion: soluciones.texto
            });



            for (const solucion of soluciones.soluciones) {
                const solucionDoc = doc(db, 'PagWhy', solucion.id);

                await updateDoc(solucionDoc, {
                    titulo: solucion.titulo,
                    descripcion: solucion.texto,
                    foto: solucion.img
                });
            }

            alert('Datos actualizados exitosamente');
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className='min-h-screen p-6 bg-gray-100 flex items-center justify-center'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-4xl'>
                <h1 className='text-2xl font-bold mb-6 text-center text-gray-800'>Editar Soluciones</h1>
                <div className='mb-4'>
                    <label htmlFor='titulo' className='block text-gray-700 mb-2'>Título Principal</label>
                    <input
                        type='text'
                        id='titulo'
                        value={soluciones.titulo}
                        onChange={(e) => setSoluciones({ ...soluciones, titulo: e.target.value })}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='texto' className='block text-gray-700 mb-2'>Texto Principal</label>
                    <textarea
                        id='texto'
                        value={soluciones.texto}
                        onChange={(e) => setSoluciones({ ...soluciones, texto: e.target.value })}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                {soluciones.soluciones.map((solucion, index) => (
                    <div key={solucion.id} className='mb-4'>
                        <h2 className='text-xl font-bold mb-4 text-gray-800'>{`Solución ${solucion.posicion}`}</h2>
                        <div className='mb-4'>
                            <label htmlFor={`titulo-${index}`} className='block text-gray-700 mb-2'>Título</label>
                            <input
                                type='text'
                                id={`titulo-${index}`}
                                value={solucion.titulo}
                                onChange={(e) => handleInputChange(e, index, 'titulo')}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor={`texto-${index}`} className='block text-gray-700 mb-2'>Texto</label>
                            <textarea
                                id={`texto-${index}`}
                                value={solucion.texto}
                                onChange={(e) => handleInputChange(e, index, 'texto')}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <div className='mb-4 border border-gray-300 rounded-lg p-3'  >
                            <label htmlFor={`img-${index}`} className='block text-gray-700 mb-2'>Imagen</label>
                            <img src={solucion.img} alt={`Imagen ${index}`} className='w-1/4 h-auto mb-2' />
                            <input
                                type='file'
                                id={`img-${index}`}
                                accept='image/*'
                                onChange={(e) => handleImageChange(e, index)}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />

                        </div>
                    </div>
                ))}
                <button
                    onClick={handleSave}
                    className='w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                >
                    Guardar Cambios
                </button>
            </div>
        </div>
    );
};

export default EditSoluciones;
