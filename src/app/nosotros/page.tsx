'use client'
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import sanitizeHtml from 'sanitize-html';
import '@/app/nosotros/nosotros.css';
import 'react-quill/dist/quill.snow.css';

const Page = () => {
  const [nosotrosText, setNosotrosText] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNosotrosData = async () => {
      try {
        const nosotrosRef = collection(db, 'Nosotros');
        const querySnapshot = await getDocs(nosotrosRef);
        const firstDoc = querySnapshot.docs[0];

        if (firstDoc) {
          const data = firstDoc.data();
          const htmlContent = data.html || '';
          setNosotrosText(htmlContent);
        }
      } catch (error) {
        console.error('Error fetching nosotros data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNosotrosData();
  }, []);

  const cleanHtml = nosotrosText;

  return (
    <div className='flex min-h-screen justify-between text-gray-500 py-24 md:py-24 px-10 md:px-24'>
      {loading ? (
        <div className='space-y-6 w-full'>
          <div className='h-8 bg-gray-300 rounded animate-pulse w-1/2'></div>
          <div className='h-[200px] bg-gray-300 rounded animate-pulse w-full'></div>
          <div className='h-6 bg-gray-300 rounded animate-pulse w-full'></div>
          <div className='h-6 bg-gray-300 rounded animate-pulse w-3/4'></div>
          <div className='h-6 bg-gray-300 rounded animate-pulse w-2/3'></div>
        </div>
      ) : (
        <div
          id='nosotros'
          className='ql-editor'
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
      )}
    </div>
  );
};

export default Page;
