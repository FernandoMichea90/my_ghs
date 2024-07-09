import React from 'react'

const page = () => {
    var soluciones = {
        titulo: '¿Por que usar PlanetColab?',
        texto: 'Usando PlanetColab podras disminuir el tiempo de busquedas en internet de fuentes de informacion ambiental de calidad y confiables, lo que te ahorrara tiempo y contribuira a reducir las emisiones de gases de efecto invernadero(GEI).',
        soluciones: [
            {
                img: "./ComponenteUno.png",
                titulo: "Ahorra Tiempo y Recursos",
                texto: "Aceleramos el acceso a informacion ambiental relevante para que ahorres en tiempo y seas mas productivo"
            },
            {
                img: "./ComponenteDos.png",
                titulo: "Accede a Informacion Confiable",
                texto: "Analizamos y sistematizamos información ambiental confiable, para ayudar a evitar que uses en tu trabajo o estudios información imprecisa o falsa"
            },
            {
                img: "./ComponenteTres.png",
                titulo: "Reduce Emisiones GEI",
                texto: "Contribuimos a reducir las emisiones GEI asociadas a las búsquedas de información ambiental en internet"
            },

        ]
    }
    return (
        <div className='flex min-h-screen justify-between text-gray-500 py-24 md:py-24 px-10 md:px-24'>
            <div className='flex flex-col items-center w-full'>
                <h1 className='font-bold text-2xl m-4 text-center'>
                    {soluciones.titulo}
                </h1>
                <p className='text-indent-15'>
                    {soluciones.texto}
                </p>

                <div className="flex flex-wrap justify-between items-center my-10">
                    {soluciones.soluciones.map((response: any,index: number) => (
                        <div key={index} className="p-2 text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <div className="w-[140px] h-[140px] mx-auto bg-gray-500 rounded-full overflow-hidden">
                                <img className="w-full h-full object-cover" src={response.img} alt={response.titulo} />
                            </div>
                            <h1 className="my-7 font-bold">{response.titulo}</h1>
                            <p>{response.texto}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default page