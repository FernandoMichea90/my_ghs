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
interface Document {
  id?: string;
  titulo: string;
  href: string;
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
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      console.log('Component mounted');
      try {
        let tag = searchParams.get('tag') || 'HDS';

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
          const documents = await Promise.all(
            documentCollectionDocSnap.docs.map(async (doc) => {
              const registros = await fetchDocuments(doc.id);
              return { ...doc.data(), registros };
            })
          );
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

  const fetchDocuments = async (title: string) => {
    try {
      const documentCollectionRef = collection(db, 'DocumentCollection', title, 'collections');
      const querySnapshot = await getDocs(documentCollectionRef);
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        titulo: doc.data().titulo,
        href: doc.data().href,
      })) as Document[];

      return documents;
    } catch (error) {
      console.error("Error fetching documents: ", error);
      return []; // Return an empty array in case of error
    } finally {
      console.log('Tarea finalizada');
    }
  };



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

      <div id='DocumentCollection' className='flex flex-wrap mt-20'>
        <ul>
          {DocumentCollection.map((doc: any, index) => doc.registros.length > 0 && (
            <li className='list-none my-2'>
              <span className='font-bold text-primary'>
                {doc.titulo}
              </span>

              {doc.registros.length > 0 && doc.registros.map((e: any) => (
                <ul>
                  <li className='list-none my-2'>
                    <a href={e.href} target='_blank'>
                      <span className='text-primary font-semibold'>
                        {'>> ' + e.titulo}
                      </span>
                    </a>
                  </li>
                </ul>
              ))
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default page