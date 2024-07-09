'use client'
import {useState} from 'react'
import sanitizeHtml from 'sanitize-html';
import '@/app/documentos/documentos.css';

const page = () => {
  const [home, setHome] = useState({
    titulo: 'Obtiene Recursos para cumplir con el GHS',
    subtitulo: '+120 documentos, 16 HDS, 12 software',
    subtextpromocional: 'Apoyado por ',
    textpromocional: 'Oxiquim',
    href: 'https://music.youtube.com/playlist?list=LM',
  })

  const menu = [
    {
      text: 'HDS',
      color: 'text-purple-500',
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9zm4 16H5V5h9v5h5m-2 4H7v-2h10m-3 5H7v-2h7" />
        </svg>
      ),
    }
    ,
    {
      text: 'Regulacion',
      color: 'text-red-500',
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9zm4 16H5V5h9v5h5m-2 4H7v-2h10m-3 5H7v-2h7" />
        </svg>
      ),
    }
    , {
      text: 'Software',
      color: 'text-indigo-500',
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9zm4 16H5V5h9v5h5m-2 4H7v-2h10m-3 5H7v-2h7" />
        </svg>
      ),
    }
    , {
      text: 'Minutas',
      color: 'text-green-500',
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9zm4 16H5V5h9v5h5m-2 4H7v-2h10m-3 5H7v-2h7" />
        </svg>
      ),
    }
    , {
      text: 'Data',
      color: 'text-orange-500',
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9zm4 16H5V5h9v5h5m-2 4H7v-2h10m-3 5H7v-2h7" />
        </svg>
      ),
    }
    ,

    {
      text: 'Manuales',
      color: 'text-purple-500',
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9zm4 16H5V5h9v5h5m-2 4H7v-2h10m-3 5H7v-2h7" />
        </svg>
      )
    },
    {
      text: 'Cursos',
      color: 'text-yellow-500',
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9zm4 16H5V5h9v5h5m-2 4H7v-2h10m-3 5H7v-2h7" />
        </svg>
      ),
    }

  ]


  const archivos = [
    {
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 2h3c.28 0 .53.11.71.29l2.08 2.09l.8-.79C10 3.2 10.5 3 11 3h6c.5 0 1 .2 1.41.59l1 1C19.8 5 20 5.5 20 6v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8c0-.5.2-1 .59-1.41l.79-.8L5.59 4H3zm8 3v2h6V5zm.41 6l-2-2H8v1.41l2 2v3.18l-2 2V19h1.41l2-2h3.18l2 2H18v-1.41l-2-2v-3.18l2-2V9h-1.41l-2 2zm.59 2h2v2h-2z" /></svg>
      ),
      titulo: "Combustibles",
      texto: `<p>
        No son útiles para eliminar el virus, pueden causar incendios y contaminar el suelo y el agua.
      </p>
        <ul>
          <li>Molibdeno</li>
          <li>Cobre</li>
          <li>Cemento de Cobre</li>
          <li>Cátodos</li>
          <li>Ánodos</li>
          <li>Barros Anódicos</li>
          <li>Renio</li>
          <li>Óxido de molibdeno</li>
        </ul>`
    },
    {
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 2h3c.28 0 .53.11.71.29l2.08 2.09l.8-.79C10 3.2 10.5 3 11 3h6c.5 0 1 .2 1.41.59l1 1C19.8 5 20 5.5 20 6v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8c0-.5.2-1 .59-1.41l.79-.8L5.59 4H3zm8 3v2h6V5zm.41 6l-2-2H8v1.41l2 2v3.18l-2 2V19h1.41l2-2h3.18l2 2H18v-1.41l-2-2v-3.18l2-2V9h-1.41l-2 2zm.59 2h2v2h-2z" /></svg>
      ),
      titulo: "Combustibles",
      texto: `
       <p>
          No son útiles para eliminar el virus, pueden causar incendios y contaminar el suelo y el agua.
        </p>
        <ul>
          <li>Molibdeno</li>
          <li>Cobre</li>
          <li>Cemento de Cobre</li>
          <li>Cátodos</li>
          <li>Ánodos</li>
          <li>Barros Anódicos</li>
          <li>Renio</li>
          <li>Óxido de molibdeno</li>
        </ul>

    `

    },
    {
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 2h3c.28 0 .53.11.71.29l2.08 2.09l.8-.79C10 3.2 10.5 3 11 3h6c.5 0 1 .2 1.41.59l1 1C19.8 5 20 5.5 20 6v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8c0-.5.2-1 .59-1.41l.79-.8L5.59 4H3zm8 3v2h6V5zm.41 6l-2-2H8v1.41l2 2v3.18l-2 2V19h1.41l2-2h3.18l2 2H18v-1.41l-2-2v-3.18l2-2V9h-1.41l-2 2zm.59 2h2v2h-2z" /></svg>
      ),
      titulo: "Combustibles",
      texto: `
       <p>
          No son útiles para eliminar el virus, pueden causar incendios y contaminar el suelo y el agua.
        </p>
        <ul>
          <li>Molibdeno</li>
          <li>Cobre</li>
          <li>Cemento de Cobre</li>
          <li>Cátodos</li>
          <li>Ánodos</li>
          <li>Barros Anódicos</li>
          <li>Renio</li>
          <li>Óxido de molibdeno</li>
        </ul>

    `

    }
  ]


  return (
    <div className='flex-1 min-h-screen items-center justify-between text-gray-500 py-24 md:py-24 px-10 md:px-24 text-center'>
      <h1 className='font-bold mb-4 text-2xl'>
        {home.titulo}
      </h1>
      <p className='mb-1'>
        {home.subtitulo}
      </p>
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

      <div className='flex flex-row flex-wrap border border-primary shadow rounded p-3 my-4 justify-between text-gray-500'>
        {menu.map((response: any, index: number) => (
          <div key={index} className='flex items-center mb-2 w-full md:w-auto'>
            <span className={`mx-1 ${response.color}`}>
              {response.icono}
            </span>
            <span>
              {response.text}
            </span>
          </div>
        ))}
      </div>

      <div className='flex flex-wrap'>

        {
          archivos.map((response: any) => (
            <div className='w-full lg:w-1/2 flex flex-rows justify-between items-center   py-4  text-gray-500 '>
            <div className="w-full  w-[100%] md:w-[95%] m-auto flex flex-rows shadow mb-4  items-center py-4 ">
              <div className='w-[30%] min-w-[90px]'>
                <span className={'text-primary text-6xl lg:text-8xl'}>
                  {response.icono}
                </span>
              </div>
              <div className='flex flex-col items-start'>
                <h1 className='font-bold mb-4 text-2xl'>
                  {response.titulo}
                </h1>
                <div id='archivos' className='mb-1 text-start text-sm' dangerouslySetInnerHTML={{ __html: sanitizeHtml(response.texto) }} />
              </div>
            </div>

            </div>
          ))
        }

      </div>
    </div>

  )
}

export default page