// lib/quillModules.js
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Importa los estilos de Quill

// Define los módulos que necesitas
export const modules = {
  toolbar: [
    [{ 'header': '1'}, { 'header': '2' }, { 'header': [1,2,3, 4, 5, 6] }], // Encabezados
    [{ 'font': [] }], // Familia de fuente
    [{ 'size': ['small', false, 'large', 'huge'] }], // Tamaño de fuente
    ['bold', 'italic', 'underline', 'strike'], // Estilo de texto
    [{ 'color': [] }, { 'background': [] }], // Color de texto y fondo
    [{ 'script': 'sub' }, { 'script': 'super' }], // Subíndice/Superíndice
    [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Listas
    [{ 'indent': '-1' }, { 'indent': '+1' }], // Sangría
    [{ 'direction': 'rtl' }], // Dirección de texto
    [{ 'align': [] }], // Alineación de texto
    ['link', 'image', 'video'], // Insertar
    ['blockquote', 'code-block'], // Citas y código
    ['clean'] // Limpiar formato
  ],
  
};

// Define los formatos disponibles
export const formats = [  
  'align',
  'background',
  'blockquote',
  'bold',
  'bullet',
  'code',
  'code-block',
  'color',
  'direction',
  'font',
  'formula',
  'header',
  'image',
  'indent',
  'italic',
  'link',
  'list',
  'script',
  'size',
  'strike',
  'table',
  'underline',
  'video',
];
