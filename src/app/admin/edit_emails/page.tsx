'use client';
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";

interface Email {
    id: string;
    email: string;
    date: string;
}

export default function AdminPage() {
    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Estados para la paginación
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [emailsPerPage] = useState<number>(10); // Número de correos por página

    // Función para obtener todos los correos de la base de datos
    const fetchEmails = async () => {
        setLoading(true);
        try {
            const emailCollectionRef = collection(db, "emailCollection");
            const q = query(emailCollectionRef, orderBy("date", "desc"));
            const emailSnapshot = await getDocs(q);
            const emailList = emailSnapshot.docs.map(doc => {
                const data = doc.data();

                return {
                    id: doc.id,
                    email: data.email,
                    date: data.date ? data.date.toDate().toLocaleString() : "Fecha no disponible", // Verificación de la fecha
                };
            }) as Email[];
            setEmails(emailList);
        } catch (error) {
            console.error("Error obteniendo los correos:", error);
            setError("Hubo un error al cargar los correos.");
        }
        setLoading(false);
    };

    // Función para eliminar un correo por su ID
    const deleteEmail = async (id: string) => {
        try {
            await deleteDoc(doc(db, "emailCollection", id));
            setEmails(emails.filter(email => email.id !== id)); // Actualiza la lista localmente
        } catch (error) {
            console.error("Error al eliminar el correo:", error);
        }
    };

    // Cargar correos al montar el componente
    useEffect(() => {
        fetchEmails();
    }, []);

    // Cálculo de los correos actuales para mostrar según la página actual
    const indexOfLastEmail = currentPage * emailsPerPage;
    const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
    const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);

    // Cambiar de página
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <main className="py-24 md:py-24 px-1 md:px-24">
            <h1 className="text-2xl font-bold my-8 text-black">Administración de Correos</h1>
            {loading ? (
                <p>Cargando correos...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : emails.length === 0 ? (
                <p>No hay correos guardados.</p>
            ) : (
                <>
                    <table className="min-w-full bg-white text-black border">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Correo</th>
                                <th className="px-4 py-2">Fecha</th>
                                <th className="px-4 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEmails.map((email) => (
                                <tr key={email.id} className="border-t">
                                    <td className="px-4 py-2 text-start">{email.email}</td>
                                    <td className="px-4 py-2 text-center">{email.date}</td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            onClick={() => deleteEmail(email.id)}
                                            className="bg-red-500 text-white py-1 px-3 rounded"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Paginación */}
                    <div className="flex justify-center my-4">
                        {Array.from({ length: Math.ceil(emails.length / emailsPerPage) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </main>
    );
}
