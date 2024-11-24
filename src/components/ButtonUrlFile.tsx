import React, { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';

const ButtonUrlFile = () => {
    const [modalFile, setModalFile] = useState(false);
    const [modalUrl, setModalUrl] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    const [fileInput, setFileInput] = useState(null);

    const SubirDocumento = (nombre:string) => {
        if (nombre === 'url') {
            setModalUrl(true);
        }
        if (nombre === 'file') {
            setModalFile(true);
        }
    };

    const handleUrlSave = () => {
        console.log('URL guardado:', urlInput);
        setModalUrl(false);
    };

    const handleFileSave = () => {
        if (fileInput) {
            // console.log('Archivo seleccionado:', fileInput.name);
            // Aquí deberías enviar el archivo al servidor para guardarlo en la carpeta `public`.
        }
        setModalFile(false);
    };

    return (
        <>
            <div className="flex my-6 items-center">
                <span className="text-red-500 px-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h8M9 8H6a4 4 0 1 0 0 8h3m6-8h3a4 4 0 0 1 0 8h-3" />
                    </svg>
                </span>
                <label className="block font-bold">Archivo Principal:</label>
            </div>
            <div>
                <button onClick={() => SubirDocumento("url")} className="bg-red-500 rounded-l-lg py-1 px-4 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" fillRule="evenodd" d="m17.657 12l-1.414-1.414l2.121-2.122a2 2 0 1 0-2.828-2.828l-4.243 4.243a2 2 0 0 0 0 2.828l-1.414 1.414a4 4 0 0 1 0-5.657l4.242-4.242a4 4 0 0 1 5.657 5.657zM6.343 12l1.414 1.414l-2.121 2.122a2 2 0 1 0 2.828 2.828l4.243-4.243a2 2 0 0 0 0-2.828l1.414-1.414a4 4 0 0 1 0 5.657L9.88 19.778a4 4 0 1 1-5.657-5.657z" />
                    </svg>
                </button>
                <button onClick={() => SubirDocumento("file")} className="text-red-500 py-1 px-4 rounded-r-lg border border-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
                        <path fill="currentColor" d="M544 864V672h128L512 480L352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.81 239.81 0 0 1 512 192a239.87 239.87 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6z" />
                    </svg>
                </button>
            </div>

            {/* Modal para URL */}
            <Modal open={modalUrl} onClose={() => setModalUrl(false)}>
                <Box className="bg-white p-6 rounded-md mx-auto mt-10 max-w-md">
                    <h2 className="text-lg font-bold mb-4">Ingrese la URL</h2>
                    <TextField
                        fullWidth
                        label="URL"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        variant="outlined"
                    />
                    <div className="flex justify-end mt-4">
                        <Button variant="contained" color="primary" onClick={handleUrlSave}>
                            Guardar URL
                        </Button>
                    </div>
                </Box>
            </Modal>

            {/* Modal para Archivo */}
            <Modal open={modalFile} onClose={() => setModalFile(false)}>
                <Box className="bg-white p-6 rounded-md mx-auto mt-10 max-w-md">
                    <h2 className="text-lg font-bold mb-4">Subir Archivo</h2>
                    <input
                        type="file"
                        // onChange={(e) => setFileInput(e.target.files[0])}
                        className="mb-4"
                    />
                    <div className="flex justify-end">
                        <Button variant="contained" color="primary" onClick={handleFileSave}>
                            Guardar Archivo
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default ButtonUrlFile;
