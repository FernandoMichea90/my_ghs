'use client'
import { useEffect, useState } from 'react'
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation';

interface IInfoPrincipal {
  titulo: string,
  subtitulo: string,
  subtextpromocional: string,
  textpromocional: string,
  href: string,
  tags: string[]
}

const page = () => {
  const [home, setHome] = useState<IInfoPrincipal>({
    titulo: '',
    subtitulo: '',
    subtextpromocional: '',
    textpromocional: '',
    href: '',
    tags: []
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagRef = doc(db, "Documentos", "InfoPrincipal");
        const tagDocSnap = await getDoc(tagRef);
        if (tagDocSnap.exists()) {
          setHome(tagDocSnap.data() as IInfoPrincipal);
        } else {
          console.log("InfoPrincipal no encontrada");
        }
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHome((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHome((prevState) => ({
      ...prevState,
      tags: value.split(', ').map(tag => tag.trim())
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tagRef = doc(db, "Documentos", "InfoPrincipal");
      await updateDoc(tagRef, home as any);
      alert('Datos actualizados correctamente');
      router.push('/documentos'); // Redirigir al usuario a la página de documentos
    } catch (error) {
      console.error("Error al actualizar los datos: ", error);
      alert('Error al actualizar los datos');
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='flex-1 min-h-screen items-center justify-between text-gray-500 py-24 md:py-24 px-10 md:px-24'>
      <h1 className='text-2xl font-bold'>Admin Documentos</h1>
      <form onSubmit={handleSubmit} className='mt-6'>
        <div className='mb-4'>
          <label htmlFor='titulo' className='block text-sm font-medium text-gray-700'>Título</label>
          <input
            type='text'
            id='titulo'
            name='titulo'
            value={home.titulo}
            onChange={handleInputChange}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='subtitulo' className='block text-sm font-medium text-gray-700'>Subtítulo</label>
          <textarea
            id='subtitulo'
            name='subtitulo'
            value={home.subtitulo}
            onChange={handleInputChange}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='tags' className='block text-sm font-medium text-gray-700'>Etiquetas (separadas por comas)</label>
          <input
            type='text'
            id='tags'
            name='tags'
            value={home.tags.join(', ')}
            onChange={handleTagsChange}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='href' className='block text-sm font-medium text-gray-700'>Enlace</label>
          <input
            type='text'
            id='href'
            name='href'
            value={home.href}
            onChange={handleInputChange}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
          />
        </div>
        <button
          type='submit'
          className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600'
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default page;
