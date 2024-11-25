'use client';

import { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { addDoc, collection, updateDoc, doc,Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface SaveLinkOrFileProps {
    archivo: any;
    setArchivo: (archivo: any) => void;
    nameArchivo: string; // Nombre del campo en el estado
    titulo: string;
}
const SaveLinkOrFile: React.FC<SaveLinkOrFileProps> = ({
    archivo,
    setArchivo,
    nameArchivo,
    titulo
}) => {

    const [url, setUrl] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl('')
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const infoDocRef = doc(db, "Home", "info");

            if (url) {
                // Guardar URL en Firestore
                setArchivo({ ...archivo, [nameArchivo]: url });
                if ( nameArchivo === 'url_file_main') {
                    await updateDoc(infoDocRef, {
                        [nameArchivo]: url,
                        actualizacion: Timestamp.fromDate(new Date()),
                    })
                } else {
                    await updateDoc(infoDocRef, {
                        [nameArchivo]: url
                    })
                }

                setUrl(url)
                setMessage('URL guardada exitosamente.');
            } else if (file) {
                // Subir archivo a Storage y guardar enlace en Firestore
                const storageRef = ref(storage, `uploads/${file.name}`);
                const snapshot = await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);
                setArchivo({ ...archivo, [nameArchivo]: downloadURL });
                if (nameArchivo === 'url_file_main') {
                    await updateDoc(infoDocRef, {
                        [nameArchivo]:downloadURL,
                        actualizacion: Timestamp.fromDate(new Date()),

                    })
                } else {
                    await updateDoc(infoDocRef, {
                        [nameArchivo]: downloadURL
                    })
                }
                setUrl(downloadURL)
                setMessage('Archivo subido y enlace guardado exitosamente.');
            } else {
                setMessage('Por favor, proporciona una URL o selecciona un archivo.');
            }
        } catch (error) {
            console.error('Error al guardar:', error);
            setMessage('Ocurrió un error al guardar el enlace o archivo.');
        } finally {
            setLoading(false);
            setFile(null);
        }
    };

    useEffect(() => {

        setUrl(archivo[nameArchivo])

    }, [archivo])



    return (
        <div className="p-4 bg-gray-100 rounded shadow-md mt-5">
            <h2 className="text-xl font-bold mb-4">{titulo}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                        URL
                    </label>
                    <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={handleUrlChange}
                        placeholder="https://example.com"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                        Subir archivo
                    </label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-gray-700"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? 'Guardando...' : 'Guardar'}
                </button>
            </form>

            {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
        </div>
    );
};

export default SaveLinkOrFile;
