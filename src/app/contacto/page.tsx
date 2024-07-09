'use client'
import React from 'react'
import sanitizeHtml from 'sanitize-html';
import '@/app/nosotros/nosotros.css';



const page = () => {
    var contactoText={
        html:`  
        <p> <span> <strong> Contacto     </strong> </span></p>
        <p> <span> Si tienes dudas o quieres conocer más de nuestros servicios y como podemos apoyarte en el cumplimiento del reglamento GHS escríbenos a 😎.    </span> </p>
        `
    }
  return (
    <div className='flex min-h-screen justify-between text-gray-500 py-24 md:py-24 px-10 md:px-24'>
    <div id='nosotros' dangerouslySetInnerHTML={{ __html: sanitizeHtml(contactoText.html) }} />
  </div>
  )
}

export default page