'use client'
import React from 'react'
import { useState } from "react";
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Image from 'next/image';
import { BASE_URL } from '@/config-global';
import { getHref } from './urlHelpers';
import ModalSuscribete from './Componentes/ModalSuscribete';

const Nav = () => {
    const Icono = getHref('icono_ghs/main_icon.png')
    // abrir y cerrar modal 
    const [openModal, setOpenModal] = useState(false);
    const [open, setOpen] = useState(false);
    // const menuArray=['Inicio', 'Documentos', 'Nosotros', 'Soluciones', 'Contacto']
    const menuArray = ['Inicio', 'Nosotros', 'Soluciones', 'Contacto', 'Suscribete']
    // state show toast
    const [showToast, setShowToast] = useState(false);
    // funcion para abrir el modal 
    const handleOPenModal = () => setOpenModal(true);
    // funcion para cerrar el modal
    const handleCloseModal = () => setOpenModal(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };



    const DrawerList = (
        <Drawer open={open} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                <div>
                    <div className="flex justify-center items-center">
                        <a href={BASE_URL} className='m-auto py-[15px]'>
                            <Image
                                src={Icono}
                                alt="Icon"
                                width={90}
                                height={32}
                            />
                        </a>
                    </div>
                </div>


                <Divider></Divider>
                <List>
                    {menuArray.map((text, index) => (
                        <ListItem key={index} disablePadding>

                            <ListItemButton component="a" href={getHref(text)}>
                                <ListItemText primary={text} />
                            </ListItemButton>

                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );

    return (
        <>
            <nav className="bg-white fixed top-0 left-0 right-0 border-b border-gray-400">
                <ModalSuscribete open={openModal} handleClose={handleCloseModal} handleOpen={handleOPenModal} setShowToast={setShowToast} showToast={showToast} />
                {/* Toast */}
                {showToast && (
                    <div className="fixed top-25 right-10 bg-green-500 text-white py-2 px-4 rounded shadow-lg transition-opacity duration-300">
                        ¡Gracias por suscribirte!
                    </div>

                )}

                <div className="w-full px-4 sm:px-6 lg:px-8 -z-10">

                    <div className="flex justify-between h-16">

                        <div className="flex">

                            <div className="flex-shrink-0 flex items-center">
                                <a href={BASE_URL}>
                                    <Image
                                        src={Icono}
                                        alt="Icon"
                                        width={90}
                                        height={32}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="absolute mt-2  right-[45%] hidden md:flex items-center  text-gray-600  text-center">
                            <a onClick={handleOPenModal}  >
                                <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md hover:shadow-md ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M5 5h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m0 1c-.5 0-.94.17-1.28.47l7.78 5.03l7.78-5.03C18.94 6.17 18.5 6 18 6zm6.5 6.71L3.13 7.28C3.05 7.5 3 7.75 3 8v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8c0-.25-.05-.5-.13-.72z" />
                                    </svg>
                                    <span>Suscríbete</span>
                                </div>
                            </a>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            {/* <a href={getHref('Documentos')} className="text-gray-700 hover:text-gray-900">
                                Documentos
                            </a> */}
                            <a href={getHref('Nosotros')} className="text-gray-700 hover:text-gray-900">
                                Nosotros
                            </a>
                            <a href={getHref('Soluciones')} className="text-gray-700 hover:text-gray-900">
                                Soluciones
                            </a>
                            <a href={getHref('Contacto')} className="text-white  rounded-lg  bg-red-500 py-1 px-2  flex items-center hover:shadow">
                                <img className='mr-1 h-[15px]' src={getHref("icono_ghs/world.png")}></img>
                                Contacto
                            </a>
                        </div>
                        <div className="md:hidden flex items-center text-gray-500">
                            <IconButton onClick={toggleDrawer(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <g fill="none">
                                        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                        <path fill="currentColor" d="M20 17.5a1.5 1.5 0 0 1 .144 2.993L20 20.5H4a1.5 1.5 0 0 1-.144-2.993L4 17.5zm0-7a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3zm0-7a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 1 1 0-3z" />
                                    </g>
                                </svg>

                            </IconButton>
                        </div>
                    </div>
                </div>
            </nav>
            {DrawerList}
        </>


    )
}

export default Nav