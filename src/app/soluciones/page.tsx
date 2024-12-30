'use client'
import { db } from '@/lib/firebase';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, DocumentData } from 'firebase/firestore';

interface Solucion {
    img: string;
    titulo: string;
    texto: string;
}

interface Soluciones {
    titulo: string;
    texto: string;
    soluciones: Solucion[];
}

const Page: React.FC = () => {
    const [soluciones, setSoluciones] = useState<Soluciones>({
        titulo: '',
        texto: '',
        soluciones: []
    });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, 'PagWhy'));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as DocumentData[];
        const formattedData = formatData(items);
        setSoluciones(formattedData);
        setLoading(false);
    };

    const formatData = (items: DocumentData[]): Soluciones => {
        const cabeza = items.find(item => item.id === 'Cabeza');
        const solucionesList = items.filter(item => item.id !== 'Cabeza').map(item => ({
            img: item.foto,
            titulo: item.titulo,
            texto: item.descripcion
        }));

        return {
            titulo: cabeza ? cabeza.titulo : '',
            texto: cabeza ? cabeza.descripcion : '',
            soluciones: solucionesList
        };
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className='flex min-h-screen justify-between text-gray-500 py-3 md:py-3 px-10 md:px-24'>
                <div className='flex flex-col items-center w-full'>
                    <div className="animate-pulse w-3/4 h-8 bg-gray-300 rounded my-4"></div>
                    <div className="animate-pulse w-full h-4 bg-gray-300 rounded mb-10"></div>

                    <div className="flex flex-wrap justify-between items-center my-10 w-[70%]">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="p-2 text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                                <div className="w-[140px] h-[140px] mx-auto bg-gray-300 rounded-full animate-pulse"></div>
                                <div className="animate-pulse w-3/4 h-6 bg-gray-300 rounded my-7 mx-auto"></div>
                                <div className="animate-pulse w-full h-4 bg-gray-300 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex min-h-screen justify-between text-gray-500 py-5 md:py-5 px-10 md:px-24'>
            <div className='flex flex-col items-center w-full'>
                <h1 className='font-bold text-2xl m-4 text-center'>
                    {soluciones.titulo}
                </h1>
                <p className='text-indent-15'>
                    {soluciones.texto}
                </p>

                <div className="flex flex-wrap justify-between items-center my-10">
                    {soluciones.soluciones.map((response, index) => (
                        <div key={index} className="p-2 text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <div className="w-[140px] h-[140px] mx-auto bg-gray-500 rounded-full overflow-hidden">
                                <img className="w-full h-full object-cover" src={response.img} alt={response.titulo} />
                            </div>
                            <h1 className="my-7 font-bold">{response.titulo}</h1>
                            <p>{response.texto}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
