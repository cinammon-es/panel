import TicketFormModal from '@/components/TicketFormModal';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Tickets', href: '/tickets' }];

type Ticket = {
    id: number;
    subject: string;
    status: 'open' | 'pending' | 'closed';
};

export default function Tickets() {
    const { tickets } = usePage<{ tickets: Ticket[] }>().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    const openModal = (ticket: Ticket | null = null) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        router.delete(`/tickets/${id}`, {
            onSuccess: () => {
                toast.success('Ticket eliminado');
                router.reload();
            },
            onError: () => toast.error('Error al eliminar el ticket'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tickets">
                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&display=swap" rel="stylesheet" />
            </Head>

            <Toaster position="top-center" richColors />

            <div className="min-h-screen bg-white p-6 font-[Orbitron] text-black transition-colors dark:bg-black dark:text-white">
                {/* Título estilo cyber como en Eggs.tsx */}
                <div className="mb-6 flex items-center justify-between border-b border-cyan-600 pb-4">
                    <h1 className="text-3xl font-semibold tracking-widest text-cyan-400 drop-shadow-[0_0_5px_#0ff]">TICKETS</h1>
                    <button
                        onClick={() => openModal()}
                        className="rounded border border-pink-400 bg-pink-100/50 px-4 py-2 text-sm text-pink-800 shadow-none transition hover:bg-pink-200/70 dark:border-pink-500 dark:bg-pink-900/30 dark:text-pink-300 dark:shadow-[0_0_6px_#ec4899] dark:hover:bg-pink-700/50"
                    >
                        + Crear Ticket
                    </button>
                </div>

                {/* Tabla */}
                <div className="overflow-hidden rounded-lg border border-purple-300 bg-white shadow-none transition dark:border-purple-700 dark:bg-neutral-900 dark:shadow-[0_0_15px_#c084fc33]">
                    <table className="min-w-full table-auto text-sm">
                        <thead className="bg-purple-100 tracking-wider text-purple-700 uppercase dark:bg-purple-950 dark:text-purple-300">
                            <tr>
                                {['ID', 'Asunto', 'Estado', 'Acciones'].map((header) => (
                                    <th key={header} className="px-4 py-3 text-left">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.length ? (
                                tickets.map((ticket) => (
                                    <tr
                                        key={ticket.id}
                                        className="border-t border-purple-200 transition hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-800/10"
                                    >
                                        <td className="px-4 py-2 font-medium text-purple-700 dark:text-purple-100">{ticket.id}</td>
                                        <td className="px-4 py-2 text-purple-800 dark:text-purple-200">{ticket.subject}</td>
                                        <td className="px-4 py-2 text-purple-600 capitalize dark:text-purple-300">{ticket.status}</td>
                                        <td className="flex flex-wrap gap-2 px-4 py-2">
                                            <button
                                                onClick={() => openModal(ticket)}
                                                className="rounded bg-yellow-400 px-2 py-1 text-sm text-white shadow hover:bg-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-500"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => router.get(`/tickets/${ticket.id}`)}
                                                className="rounded bg-purple-400 px-2 py-1 text-sm text-white shadow hover:bg-purple-300 dark:bg-purple-600 dark:hover:bg-purple-500"
                                            >
                                                Abrir Chat
                                            </button>
                                            <button
                                                onClick={() => handleDelete(ticket.id)}
                                                className="rounded bg-red-500 px-2 py-1 text-sm text-white shadow hover:bg-red-400 dark:hover:bg-red-600"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-4 py-6 text-center text-purple-500 dark:text-purple-400">
                                        No hay tickets disponibles.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <TicketFormModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} ticket={selectedTicket} />
        </AppLayout>
    );
}
