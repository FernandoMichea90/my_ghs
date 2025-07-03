import { getHrefAdmin } from '@/Utils/urlHelpers'
import React from 'react'

function page () {
  return (
    <div className='mx-20 font-bold border  rounded py-10 px-4'>
       <div className='border-b'>
            <h1>
                <span className='flex justify-center items-center mb-3 text-black'>
                    <svg className='mx-2 ' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="#40535b" d="m23.265 24.381l.9-.894c4.164.136 4.228-.01 4.411-.438l1.144-2.785l.085-.264l-.093-.231c-.049-.122-.2-.486-2.8-2.965V15.5c3-2.89 2.936-3.038 2.765-3.461l-1.139-2.814c-.171-.422-.236-.587-4.37-.474l-.9-.93a20 20 0 0 0-.141-4.106l-.116-.263l-2.974-1.3c-.438-.2-.592-.272-3.4 2.786l-1.262-.019c-2.891-3.086-3.028-3.03-3.461-2.855L9.149 3.182c-.433.175-.586.237-.418 4.437l-.893.89c-4.162-.136-4.226.012-4.407.438l-1.146 2.786l-.09.267l.094.232c.049.12.194.48 2.8 2.962v1.3c-3 2.89-2.935 3.038-2.763 3.462l1.138 2.817c.174.431.236.584 4.369.476l.9.935a20.2 20.2 0 0 0 .137 4.1l.116.265l2.993 1.308c.435.182.586.247 3.386-2.8l1.262.016c2.895 3.09 3.043 3.03 3.466 2.859l2.759-1.115c.436-.173.588-.234.413-4.436m-11.858-6.524a4.957 4.957 0 1 1 6.488 2.824a5.014 5.014 0 0 1-6.488-2.824"/></svg>    
                    
                    Panel de administracion 
                </span>
            </h1>
        </div> 

        <div className='mt-5'>
            <ul className='ml-5 p-3 text-gray-500 font-thin'>
                <li>
                    <a className='p-2 my-2 flex justify-start items-center hover:shadow' href={getHrefAdmin('edit_emails')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m5.812 11l2.178 2.168a1.1 1.1 0 0 0 1.05.3a1.12 1.12 0 0 0 .809-.74l3.576-10.72A1.118 1.118 0 0 0 11.987.57L1.267 4.147a1.12 1.12 0 0 0-.74.859a1.1 1.1 0 0 0 .3 1l2.737 2.737l-.09 3.466zM13.106.79L3.564 8.742"/></svg>
                    <span className='pl-2'>Suscripciones</span>
                    </a>
                </li>
                <li>
                    <a className='p-2 my-2 flex justify-start items-center hover:shadow' href={getHrefAdmin('edit_home')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" d="M22 22H2m0-11l4.063-3.25M22 11l-8.126-6.5a3 3 0 0 0-3.748 0l-.782.625M15.5 5.5v-2A.5.5 0 0 1 16 3h2.5a.5.5 0 0 1 .5.5v5M4 22V9.5m16 0v4m0 8.5v-4.5"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 22v-5c0-1.414 0-2.121-.44-2.56C14.122 14 13.415 14 12 14s-2.121 0-2.56.44M9 22v-5"/><path d="M14 9.5a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z"/></g></svg>
                        <span className='pl-2'> Home</span>
                    </a>
                </li>   
                

                <li>
                    <a className='p-2 my-2 flex justify-start items-center hover:shadow' href={getHrefAdmin('edit_nosotros')}>
                        <svg  xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9 13c-1.915 0-3.603.965-4.792 2.245c-1.182 1.273-1.958 2.948-1.958 4.505c0 .414.336.75.75.75h12a.75.75 0 0 0 .75-.75c0-1.558-.775-3.232-1.958-4.505C12.602 13.965 10.915 13 9 13m8.204.301a.75.75 0 0 0-.408 1.444c.933.264 1.801 1.019 2.45 2.014c.647.995 1.004 2.122 1.004 2.99a.75.75 0 0 0 1.5 0c0-1.22-.478-2.627-1.248-3.808c-.769-1.181-1.9-2.244-3.298-2.64M9 3.5A3.75 3.75 0 1 0 9 11a3.75 3.75 0 0 0 0-7.5m6 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75a3.75 3.75 0 1 0 0-7.5"/></svg>
                        <span className='pl-2'> Nosotros</span>
                    </a>
                </li>   
                
                <li>
                    <a className='p-2 my-2 flex justify-start items-center hover:shadow' href={getHrefAdmin('edit_soluciones')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="m25.7 9.3l-7-7c-.2-.2-.4-.3-.7-.3H8c-1.1 0-2 .9-2 2v24c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-.3-.1-.5-.3-.7M18 4.4l5.6 5.6H18zM24 28H8V4h8v6c0 1.1.9 2 2 2h6z"/><path fill="currentColor" d="M10 22h12v2H10zm0-6h12v2H10z"/></svg>
                        <span className='pl-2'> Soluciones</span>
                    </a>
                </li>   
                
                 
               
            </ul>
        </div>
    </div>
  )
}

export default page