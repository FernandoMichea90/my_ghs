'use client'
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc,getDoc} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { db, storage } from "@/lib/firebase";

interface Document {
    id?: string;
    titulo: string;
    href: string;
}

interface IEditCollection {
    params: {
        title: string;
    }
}

const Page = ({ params }: IEditCollection) => {
    const { title } = params;
    const [loading, setLoading] = useState(false);
    const [documentos, setDocumentos] = useState<Document[]>([]);
    const [docu, setDoc] = useState<Document | null>(null);
    const [titulo, setTitulo] = useState('');
    const [href, setHref] = useState('');
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const docCollectionRef = doc(db, 'DocumentCollection', title);
            const docSnap = await getDoc(docCollectionRef);
            if (docSnap.exists()) {
                setDoc(docSnap.data() as Document);
            }
            const documentCollectionRef = collection(db, 'DocumentCollection', title, 'collections');
            const querySnapshot = await getDocs(documentCollectionRef);
            const documents = querySnapshot.docs.map(doc => ({
                id: doc.id,
                titulo: doc.data().titulo,
                href: doc.data().href,
            })) as Document[];

            setDocumentos(documents);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setPdfFile(file);
    };

    const handleSaveDocument = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let fileUrl = href;

            if (pdfFile) {
                const fileRef = ref(storage, `collection/${editId || Date.now()}`);
                await uploadBytes(fileRef, pdfFile);
                fileUrl = await getDownloadURL(fileRef);
            }

            const documentData: Document = {
                titulo,
                href: fileUrl,
            };

            if (editMode && editId) {
                const docRef = doc(db, 'DocumentCollection', title, 'collections', editId);
                await updateDoc(docRef, documentData as any);
            } else {
                await addDoc(collection(db, 'DocumentCollection', title, 'collections'), documentData);
            }

            resetForm();
            fetchDocuments();
        } catch (error) {
            console.error('Error saving document: ', error);
        }
    };

    const handleEditDocument = (document: Document) => {
        setEditMode(true);
        setEditId(document.id || null);
        setTitulo(document.titulo);
        setHref(document.href);
    };

    const handleDeleteDocument = async (docId: string) => {
        try {
            const docRef = doc(db, 'DocumentCollection', title, 'collections', docId);
            const documentData = documentos.find((d) => d.id === docId);

            if (documentData?.href.includes('firebasestorage')) {
                const fileRef = ref(storage, `Collection/${docId}`);
                await deleteObject(fileRef);
            }

            await deleteDoc(docRef);
            setDocumentos(documentos.filter((doc) => doc.id !== docId));
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    const resetForm = () => {
        setTitulo('');
        setHref('');
        setPdfFile(null);
        setEditMode(false);
        setEditId(null);
    };

    return (
        <div className='flex-1 min-h-screen py-24 md:py-24 px-4 md:px-24 bg-gray-50'>
            <h1 className='text-2xl font-bold mb-6 text-gray-800'>Collection: {docu?.titulo}</h1>

            <form onSubmit={handleSaveDocument} className='space-y-6 bg-white p-6 rounded-lg shadow-md'>
                <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700'>Título</label>
                    <input
                        type='text'
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                        className='w-full border border-gray-300 text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                
                <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700'>Enlace o PDF</label>
                    <input
                        type='text'
                        value={href}
                        onChange={(e) => setHref(e.target.value)}
                        placeholder='Ingresa un enlace o sube un PDF'
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
                    />
                    <input
                        type='file'
                        onChange={handleFileChange}
                        accept='application/pdf'
                        className='mt-2 block text-sm text-gray-700'
                    />
                </div>
                <div className='flex space-x-4'>
                    <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'>
                        {editMode ? 'Actualizar' : 'Guardar'}
                    </button>
                    {editMode && (
                        <button onClick={resetForm} className='bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition'>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {loading ? (
                <p className='mt-8 text-center text-gray-600'>Cargando documentos...</p>
            ) : (
                <ul className='mt-8 space-y-4'>
                    {documentos.map((doc) => (
                        <li key={doc.id} className='flex justify-between items-center bg-white p-4 rounded-lg shadow-md'>
                            <a href={doc.href} target="_blank" className='text-blue-600 hover:underline'>{doc.titulo}</a>
                            <div className='flex space-x-2'>
                                <button onClick={() => handleEditDocument(doc)} className='bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition'>
                                    Editar
                                </button>
                                <button onClick={() => handleDeleteDocument(doc.id!)} className='bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition'>
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Page;
