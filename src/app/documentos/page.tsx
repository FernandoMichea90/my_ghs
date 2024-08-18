'use client'
import { useEffect, useState } from 'react'
import sanitizeHtml from 'sanitize-html';
import '@/app/documentos/documentos.css';
import { getHref } from '@/Utils/urlHelpers';
import {db} from "@/lib/firebase"
import {doc,getDoc,setDoc} from 'firebase/firestore'

const page = () => {



  const [home, setHome] = useState({
    titulo: 'GHS y Seguridad Química en Minería',
    subtitulo: 'Selecciona la etiqueta correspondiente al tema que quieres obtener recursos y con eso ya estarás obteniendo información detallada sobre GHS',
    subtextpromocional: '',
    textpromocional: '',
    href: 'https://music.youtube.com/playlist?list=LM',
    tags:['HDS','Regulacion','Guias','Software','Manuales','Alertas','Cursos']
  })

  const [tags,setTags]=useState<String[]>([])

 
  useEffect(() => {

    const fetchData=async()=>{
      const tagRef=doc(db,"Documentos","Tags")
      const  tagDocSnap=await getDoc(tagRef)
      console.log(tagDocSnap)
      if(tagDocSnap.exists()){
        console.log(tagDocSnap.data())
        setTags(tagDocSnap.data().tags as String[]) 
      }

    }

    fetchData()
  }, [])
  

  return (
    <div className='flex-1 min-h-screen items-center justify-between text-gray-500 py-24 md:py-24 px-10 md:px-24'>
      
      <div className='flex items-center'> 
          <img src='icono_ghs/image.png' alt="" height={40} width={40}></img>
          <h1 className='font-bold  text-2xl text-gray-900 mx-2'>
            {home.titulo}
          </h1>
      </div>
      <p className='mb-1 mt-3'>
        {home.subtitulo}
      </p>
     
      <div className="flex flex-wrap gap-2 my-3">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-primary hover:bg-gray-900 text-white font-bold px-3 py-1 rounded-full text-sm"
        >
          {tag}
        </span>
      ))}
    </div>
      <span>
        {(home.href.trim() !== '' || home.href.trim == null) &&
          (
            <>
              {home.subtextpromocional + ' '}
              <a className='text-red-500 underline font-bold' href={home.href}>{home.textpromocional}</a>
            </>
          )
        }
      </span>


      <div className='flex flex-wrap mt-20'>
        
      </div>




    </div>

  )
}

export default page