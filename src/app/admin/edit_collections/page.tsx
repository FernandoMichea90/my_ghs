'use client';
import { useEffect, useState } from 'react';
import '@/app/documentos/documentos.css';
import { db } from "@/lib/firebase";
import { doc, setDoc, deleteDoc, collection, query, getDocs, where, orderBy } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';

interface Document {
    id?: string;
    titulo: string;
    tag: string;
}

const DocumentPage = () => {
    const [documentos, setDocumentos] = useState<Document[]>([]);
    const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
    const [titulo, setTitulo] = useState('');
    const [tag, setTag] = useState('HDS');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const router= useRouter()

    useEffect(() => {
        const tagParam = searchParams.get('tag');
        if (tagParam) {
            setTag(tagParam);
        }
        fetchDocuments(tagParam || 'HDS');
    }, [searchParams,tag]);

    const fetchDocuments = async (tag: string) => {
        setLoading(true);
        try {
            const documentCollectionRef = collection(db, "DocumentCollection");
            const q = query(
                documentCollectionRef,
                where("tag", "==", tag),
            );

            const querySnapshot = await getDocs(q);
            const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Document[];
            setDocumentos(documents);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && currentDocument) {
                // Update document
                const docRef = doc(db, "DocumentCollection", currentDocument.id as string);
                await setDoc(docRef, { titulo, tag });
                alert('Documento actualizado exitosamente');
            } else {
                // Create new document
                const docRef = doc(collection(db, "DocumentCollection"));
                await setDoc(docRef, { titulo, tag });
                alert('Documento creado exitosamente');
            }
            setTitulo('');
            setTag('HDS');
            setIsEditing(false);
            setCurrentDocument(null);
            fetchDocuments(tag); // Refresh the document list with the current tag
        } catch (error) {
            console.error("Error saving document: ", error);
        }
    };

    const handleEdit = (document: Document) => {
        setCurrentDocument(document);
        setTitulo(document.titulo);
        setTag(document.tag);
        setIsEditing(true);
    };

    const handleShowCollection = (document: Document) => {
        router.push(`/admin/edit_collection/${document.id}`);
    }

    const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTag = e.target.value;
        setTag(newTag);
        router.push(`?tag=${newTag}`); // Update URL with new tag
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, "DocumentCollection", id));
            alert('Documento eliminado exitosamente');
            setDocumentos(documentos.filter(doc => doc.id !== id));
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    return (
        <div className='flex-1 min-h-screen items-center justify-between text-gray-500 py-24 md:py-24 px-10 md:px-24'>
            <h1 className='text-2xl font-bold mb-6'>{isEditing ? 'Editar Documento' : 'Crear Documento'}</h1>

            <form onSubmit={handleCreateOrUpdate} className='mb-6'>
                <div className='mb-4'>
                    <label htmlFor='titulo' className='block text-sm font-medium text-gray-700'>Título</label>
                    <input
                        type='text'
                        id='titulo'
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='tag' className='block text-sm font-medium text-gray-700'>Etiqueta</label>
                    <select
                        id='tag'
                        value={tag}
                        onChange={(e) => handleTagChange(e)}
                        className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
                        required
                    >
                        <option value='HDS'>HDS</option>
                        <option value='Regulación'>Regulación</option>
                        <option value='Guias'>Guias</option>
                        <option value='Software'>Software</option>
                        <option value='Manuales'>Manuales</option>
                        <option value='Alertas'>Alertas</option>
                        <option value='Cursos'>Cursos</option>
                    </select>
                </div>
                <button
                    type='submit'
                    className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600'
                >
                    {isEditing ? 'Actualizar' : 'Crear'}
                </button>
            </form>

            <h2 className='text-xl font-bold mb-4'>Lista de Documentos</h2>
            <ul className='space-y-2'>
                {documentos.map((doc) => (
                    <li key={doc.id} className='flex items-center justify-between'>
                        <span>{doc.titulo} - {doc.tag}</span>
                        <div>
                            <button
                                onClick={() => handleShowCollection(doc)}
                                className='mr-2 px-2 py-1 bg-green-500 text-white rounded'
                            >
                                Ver Registros
                            </button>
                            <button
                                onClick={() => handleEdit(doc)}
                                className='mr-2 px-2 py-1 bg-yellow-500 text-white rounded'
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(doc.id as string)}
                                className='px-2 py-1 bg-red-500 text-white rounded'
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentPage;
