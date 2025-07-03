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
    acceptedFileTypes?: string; // Tipos de archivos aceptados (opcional)
}
const SaveLinkOrFile: React.FC<SaveLinkOrFileProps> = ({
    archivo,
    setArchivo,
    nameArchivo,
    titulo,
    acceptedFileTypes
}) => {

    const [url, setUrl] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [pdfImageFile, setPdfImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [previewImage, setPreviewImage] = useState<string>('');


    // Función para generar preview de la primera página del PDF
  
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
                   var response_url_file_main =await updateDoc(infoDocRef, {
                        [nameArchivo]: url,
                        actualizacion: Timestamp.fromDate(new Date()),
                    })
                    console.log("response_url_file_main PRINCIPAL", response_url_file_main)
                } else {
                    await updateDoc(infoDocRef, {
                        [nameArchivo]: url
                    })
                }

                setUrl(url)
                setMessage('URL guardada exitosamente.');
            } else if (file) {
                // Validar que se haya subido la imagen del PDF si es url_file_main
                if (nameArchivo === 'url_file_main' && !pdfImageFile) {
                    setMessage('Debes subir una imagen del PDF.');
                    setLoading(false);
                    return;
                }
                
                // Subir archivo a Storage y guardar enlace en Firestore
                const storageRef = ref(storage, `uploads/${file.name}`);
                const snapshot = await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);

                // Si hay imagen del PDF, subirla también (siempre con el mismo nombre)
                let pdfImageURL = '';
                if (nameArchivo === 'url_file_main' && pdfImageFile) {
                    try {
                        const imageStorageRef = ref(storage, `previews/pdf_preview.png`);
                        const imageSnapshot = await uploadBytes(imageStorageRef, pdfImageFile);
                        pdfImageURL = await getDownloadURL(imageSnapshot.ref);
                    } catch (error) {
                        console.error('Error al subir imagen del PDF:', error);
                    }
                }
                
                setArchivo({ ...archivo, [nameArchivo]: downloadURL });
                if (nameArchivo === 'url_file_main') {
                    await updateDoc(infoDocRef, {
                        [nameArchivo]: downloadURL,
                        actualizacion: Timestamp.fromDate(new Date()),
                        ...(pdfImageURL && { src: pdfImageURL })
                    })
                    setArchivo({ ...archivo, src: pdfImageURL })
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
            setPdfImageFile(null);
            setPreviewImage('');
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
                        accept={acceptedFileTypes}
                        required
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-gray-700"
                    />
                </div>

                {/* Campo adicional para imagen del PDF cuando es url_file_main */}
                {nameArchivo === 'url_file_main' && (
                    <div>
                        <label htmlFor="pdfImage" className="block text-sm font-medium text-gray-700">
                            Imagen del PDF *
                        </label>
                        <input
                            type="file"
                            id="pdfImage"
                            accept="image/*"
                            required
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    const file = e.target.files[0];
                                    setPdfImageFile(file);
                                    
                                    // Crear preview de la imagen seleccionada
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                        setPreviewImage(e.target?.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-gray-700"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Sube una imagen (JPG, PNG) para mostrar como preview del PDF. Campo obligatorio.
                        </p>
                        
                        {/* Preview de la imagen seleccionada */}
                        {previewImage && (
                            <div className="mt-2">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Preview de la imagen:</h4>
                                <div className="border border-gray-300 rounded-lg p-2 bg-white w-fit">
                                    <img 
                                        src={previewImage} 
                                        alt="Preview de la imagen" 
                                        className="max-w-full h-auto max-h-32 object-contain"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? 'Guardando...' : 'Guardar'}
                </button>
            </form>

            {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
            
            {/* Preview del PDF */}
            {/* Imagen existente del PDF */}
            {nameArchivo === 'url_file_main' && archivo.src && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Imagen actual del PDF:</h3>
                    <div className="border border-gray-300 rounded-lg p-2 bg-white w-fit">
                        <img 
                            src={archivo.src} 
                            alt="Imagen del PDF" 
                            className="max-w-full h-auto max-h-64 object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SaveLinkOrFile;
