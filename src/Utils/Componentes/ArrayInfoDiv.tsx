import React from 'react'
import { getHref } from '../urlHelpers'

interface Props {
    arrayInfo: {
        img: string,
        texto: string,
        titulo: string
    }
}

const ArrayInfoDiv = (response: Props) => {
    return (
        <div className='flex py-8 m-2 text-gray-900 w-full md:w-[28%] items-center'>
            <img    
            src={getHref('image3.png')}
            className='w-[10wh] h-[10vh]'
            //  src={response.arrayInfo.img}
            ></img>
            <div className='px-3'>
                <h1 className='font-bold'>{response.arrayInfo.titulo}</h1>
                <p>{response.arrayInfo.texto}</p>
            </div>
        </div>
    )
}

export default ArrayInfoDiv