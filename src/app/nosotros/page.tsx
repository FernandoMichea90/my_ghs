import React from 'react';
import sanitizeHtml from 'sanitize-html';
import '@/app/nosotros/nosotros.css';

const Page: React.FC = () => {
  const nosotrosText = {
    html: `
      <p style="text-align:left;"><span style="color: rgb(0,0,0);font-size: 30px;font-family: Lato;"><strong>Nuestra misión</strong></span></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p><span style="color: rgb(33,37,41);font-size: 18px;font-family: Lato;">La misión de PlanetColab es facilitar el acceso a información ambiental de alta calidad y confiabilidad, y contribuir a evitar el uso de información ambiental imprecisa o falsa 😎.</span></p>
      <h2><span style="color: rgb(0,0,0);font-size: 30px;font-family: Lato;"><strong>Equipo</strong></span></h2>
      <p><span style="color: rgb(33,37,41);font-size: 18px;font-family: Lato;">El concepto, diseño y servicio ha sido creado y es administrado por </span> 
      <a href="https://www.linkedin.com/in/cristián-brito-martínez-6957941a/" target="_self"> <span>Cristian Brito</span></a> <span style="color: rgb(33,37,41);font-size: 18px;font-family: Lato;">, la plataforma ha sido desarrollada por </span><a href="https://www.linkedin.com/in/fernando-michea/" target="_self">
      <span style="color: rgb(33,37,41);font-size: 18px;font-family: Lato;">Fernando Michea.</span></a>
      <p style="text-align:justify;"></p>
      <p><span style="font-size: 30px;font-family: Lato;"><strong>Política de privacidad</strong></span></p>
      <p><span style="font-size: 18px;font-family: Lato;">No recolectamos ni almacenamos información personal y no te rastreamos. </span></p>
      <p></p>
      <p></p>
      <p><span style="font-size: 30px;font-family: Lato;"><strong>Clientes</strong></span></p>
      <p><span style="font-size: 18px;font-family: Lato;">Algunas de las empresas e instituciones con las que hemos asesorado:</span></p>
      <ul style="list-style: disc; padding: 0; margin: 0;">
        <li style="margin: 10px 0; font-size: 24px;">Codelco</li>
        <li style="margin: 10px 0; font-size: 24px;">Grupo Gestiona</li>
        <li style="margin: 10px 0; font-size: 24px;">Envis</li>
        <li style="margin: 10px 0; font-size: 24px;">Andess A.G</li>
        <li style="margin: 10px 0; font-size: 24px;">Ministerio del Medio Ambiente</li>
        <li style="margin: 10px 0; font-size: 24px;">Ministerio de Salud</li>
      </ul>
      <p></p>
      <p></p>
      <p style="text-align:start;"></p>
    `
  };

  return (
    <div className='flex min-h-screen justify-between text-gray-500 py-24 md:py-24 px-10 md:px-24'>
      <div id='nosotros' dangerouslySetInnerHTML={{ __html: sanitizeHtml(nosotrosText.html) }} />
    </div>
  );
}

export default Page;
