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
            <Head title="Tickets" />
            <Toaster position="top-center" />

            <div className="flex flex-col gap-6 rounded-lg p-6 shadow-lg">
                <div className="flex justify-end">
                    <button onClick={() => openModal()} className="rounded bg-pink-500 px-4 py-2 text-white">
                        Crear ticket
                    </button>
                </div>

                <table className="w-full border-collapse bg-black shadow-sm">
                    <thead>
                        <tr>
                            {['ID', 'Asunto', 'Estado', 'Acciones'].map((header) => (
                                <th key={header} className="border p-3 text-left">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.length ? (
                            tickets.map((ticket) => (
                                <tr key={ticket.id} className="border-b">
                                    <td className="p-3">{ticket.id}</td>
                                    <td className="p-3">{ticket.subject}</td>
                                    <td className="p-3">{ticket.status}</td>
                                    <td className="flex gap-2 p-3">
                                        <button
                                            onClick={() => openModal(ticket)}
                                            className="rounded bg-yellow-500 px-2 py-1 text-white"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => router.get(`/tickets/${ticket.id}`)}
                                            className="rounded bg-blue-500 px-2 py-1 text-white"
                                        >
                                            Abrir Chat
                                        </button>
                                        <button
                                            onClick={() => handleDelete(ticket.id)}
                                            className="rounded bg-red-500 px-2 py-1 text-white"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-3 text-center">
                                    No hay tickets
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <TicketFormModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                ticket={selectedTicket}
            />
        </AppLayout>
    );
}
