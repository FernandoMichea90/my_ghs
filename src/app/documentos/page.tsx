'use client'
import { useEffect, useState } from 'react'
import '@/app/documentos/documentos.css';
import { db } from "@/lib/firebase"
import { doc, getDoc, query, where, collection, getDocs } from 'firebase/firestore'
import { useSearchParams } from 'next/navigation';


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
    titulo: 'GHS y Seguridad Química en Minería',
    subtitulo: 'Selecciona la etiqueta correspondiente al tema que quieres obtener recursos y con eso ya estarás obteniendo información detallada sobre GHS',
    subtextpromocional: 'sathaeahu',
    textpromocional: 'astehutse',
    href: 'https://music.youtube.com/playlist?list=LM',
    tags: ['HDS', 'Regulación', 'Guias', 'Software', 'Manuales', 'Alertas', 'Cursos']
  })

  const [DocumentCollection, setDocumentCollection] = useState([])
  const searchParams = useSearchParams();


  useEffect(() => {
    const fetchData = async () => {
      console.log('Component mounted');
      try {
        var tag = searchParams.get('tag');
        if (!tag) {
          tag = 'HDS'
        }
        const tagRef = doc(db, "Documentos", "InfoPrincipal");
        const tagDocSnap = await getDoc(tagRef);
        if (tagDocSnap.exists()) {
          setHome(tagDocSnap.data() as IInfoPrincipal);
        } else {
          console.log("InfoPrincipal no encontrada");
        }
        const documentCollectionRef = collection(db, "DocumentCollection");
        const q = query(documentCollectionRef, where("tag", "==", tag));
        const documentCollectionDocSnap = await getDocs(q);
        if (!documentCollectionDocSnap.empty) {
          const documents = documentCollectionDocSnap.docs.map(doc => doc.data());
          setDocumentCollection(documents as any);
          console.log(documents);
        } else {
          console.log("DocumentCollection no encontrada o vacía");
        }
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };
    fetchData();
    return () => {
      console.log('Component unmounted');
    };
  }, [searchParams]);

  return (
    <div className='flex-1 min-h-screen items-center justify-between text-gray-500 py-24 md:py-24 px-10 md:px-24'>

      <div id='admin_documentos' className='flex items-center'>
        <img src='icono_ghs/image.png' alt="" height={40} width={40}></img>
        <h1 className='font-bold  text-2xl text-gray-900 mx-2'>
          {home.titulo}
        </h1>
      </div>
      <p className='mb-1 mt-3'>
        {home.subtitulo}
      </p>
      <div className="flex flex-wrap gap-2 my-3">
        {home.tags.map((tag, index) => (
          <a href={'/documentos?tag=' + tag}>
            <span key={index} className="bg-primary hover:bg-gray-900 text-white font-bold px-3 py-1 rounded-full text-sm">{tag}</span>
          </a>
        ))}
      </div>
      {/* <span>
        {(home.href.trim() !== '' || home.href.trim == null) &&
          (
            <>
              {home.subtextpromocional + ' '}
              <a className='text-red-500 underline font-bold' href={home.href}>{home.textpromocional}</a>
            </>
          )
        }
      </span> */}
      <div className='flex flex-wrap mt-20'>
        <ul>
          {DocumentCollection.map((doc: any, index) => (

            <li>
              <a href={doc.href}>
                <span>
                  {doc.titulo}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default page