// lib/quillModules.js
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Importa los estilos de Quill

// Define los módulos que necesitas
export const modules = {
  toolbar: [
    [{ 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
    ['clean']
  ],
  
};

// Define los formatos disponibles
export const formats = [
  'font',
  'list', 'bullet', 'align',
  'bold', 'italic', 'underline',
  'link', 'image'
];
