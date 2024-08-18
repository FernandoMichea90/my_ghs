'use client';

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Asegúrate de que esta importación sea correcta
import sanitizeHtml from 'sanitize-html';
import '@/app/nosotros/nosotros.css';

const Page = () => {
  const [contactoText, setContactoText] = useState<string>('');

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
      }
    };

    fetchContactoData();
  }, []);

  return (
    <div className='flex min-h-screen justify-between text-gray-500 py-24 md:py-24 px-10 md:px-24'>
      <div
        id='nosotros'
        dangerouslySetInnerHTML={{ __html: contactoText }}
      />
    </div>
  );
};

export default Page;
