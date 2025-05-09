import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface Ticket {
    id?: number;
    subject: string;
    status: 'open' | 'pending' | 'closed';
    message?: string;
}

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    ticket?: Ticket | null;
}

export default function TicketFormModal({ isOpen, closeModal, ticket }: Props) {
    const [formData, setFormData] = useState<Ticket>({
        subject: '',
        message: '',
        status: 'open',
    });

    useEffect(() => {
        if (ticket) {
            setFormData({
                subject: ticket.subject,
                message: ticket.message ?? '',
                status: ticket.status,
            });
        } else {
            setFormData({ subject: '', message: '', status: 'open' });
        }
    }, [ticket]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const isEdit = !!ticket?.id;
        const method = isEdit ? 'put' : 'post';
        const url = isEdit ? `/tickets/${ticket.id}` : '/tickets';

        const data = {
            subject: formData.subject,
            message: formData.message ?? '',
            status: formData.status,
        };

        router.visit(url, {
            method,
            data,
            preserveScroll: true,
            onFinish: () => {
                closeModal();
                toast.success(isEdit ? 'Ticket actualizado' : 'Ticket creado');
                router.reload();
            },
            onError: () => {
                toast.error('Error al guardar');
            },
        });
    };
    
    

    if (!isOpen) return null;

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 text-black shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">{ticket ? 'Editar Ticket' : 'Nuevo Ticket'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Asunto</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full rounded border p-2"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm font-medium">Mensaje</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} className="w-full rounded border p-2" required />
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm font-medium">Estado</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded border p-2">
                            <option value="open">Abierto</option>
                            <option value="pending">Pendiente</option>
                            <option value="closed">Cerrado</option>
                        </select>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                        <button type="button" onClick={closeModal} className="rounded-md bg-gray-300 px-4 py-2 text-black">
                            Cancelar
                        </button>
                        <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white">
                            {ticket ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
