'use client';

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Asegúrate de que esta importación sea correcta
import sanitizeHtml from 'sanitize-html';
import '@/app/nosotros/nosotros.css';

const Page = () => {
  const [contactoText, setContactoText] = useState<string>('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchContactoData = async () => {
      try {
        const contactoRef = collection(db, 'Contacto');
        const querySnapshot = await getDocs(contactoRef);
        const firstDoc = querySnapshot.docs[0];

        if (firstDoc) {
          const data = firstDoc.data();
          const htmlContent = data.html || ''; // Asegúrate de que el campo sea correcto
          setContactoText(htmlContent);
        }
      } catch (error) {
        console.error('Error fetching contacto data:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchContactoData();
  }, []);

  return (
    <div className='flex min-h-screen justify-between text-gray-500 py-24 md:py-24 px-10 md:px-24'>
      {loading ?
        <div className='space-y-6 w-full'>
          <div className='h-8 bg-gray-300 rounded animate-pulse w-1/2'></div>
          <div className='h-[200px] bg-gray-300 rounded animate-pulse w-full'></div>
          <div className='h-6 bg-gray-300 rounded animate-pulse w-full'></div>
          <div className='h-6 bg-gray-300 rounded animate-pulse w-3/4'></div>
          <div className='h-6 bg-gray-300 rounded animate-pulse w-2/3'></div>
        </div>
        :
        <div
          id='nosotros'
          dangerouslySetInnerHTML={{ __html: contactoText }}
        />
      }
    </div>
  )

}

export default Page;

