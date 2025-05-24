import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronUp, Mail, Pencil, UserCheck } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    verified: boolean;
}

interface Pagination<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    per_page: number;
}

function handleSort(column: string) {
    const url = new URL(window.location.href);
    const currentSort = url.searchParams.get('sort');
    const currentDirection = url.searchParams.get('direction');

    if (currentSort === column) {
        url.searchParams.set('direction', currentDirection === 'asc' ? 'desc' : 'asc');
    } else {
        url.searchParams.set('sort', column);
        url.searchParams.set('direction', 'asc');
    }

    window.location.href = url.toString();
}

export default function Users() {
    const { users, filters } = usePage<{
        users: Pagination<User>;
        filters: { search?: string; sort?: string; direction?: string; per_page?: number };
    }>().props;

    return (
        <AppLayout breadcrumbs={[{ title: 'Users', href: '/users' }]}>
            <Head title="Users">
                <meta name="description" content="User management page" />
                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&display=swap" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-black p-6 font-[Orbitron] text-white">
                <div className="mb-6 flex items-center justify-between border-pink-500">
                    <h1 className="text-3xl tracking-widest text-pink-400 drop-shadow-[0_0_6px_#f0f]">USERS</h1>
                    <button className="rounded border border-pink-500 bg-pink-900/30 px-4 py-2 text-sm text-pink-300 transition hover:bg-pink-700/50">
                        + New User
                    </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-pink-500 bg-neutral-950 shadow-[0_0_10px_#f0f3]">
                    <table className="min-w-full table-auto text-sm">
                        <thead className="border-b border-pink-500 bg-pink-900 text-pink-200">
                            <tr>
                                <th className="px-4 py-2 text-left">
                                    <button onClick={() => handleSort('name')} className="flex items-center gap-1 text-pink-300 hover:text-white">
                                        Name
                                        {filters.sort === 'name' ? (
                                            filters.direction === 'asc' ? (
                                                <ChevronUp className="h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4" />
                                            )
                                        ) : (
                                            <ChevronDown className="h-4 w-4 opacity-30" />
                                        )}
                                    </button>
                                </th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Role</th>
                                <th className="px-4 py-2 text-left">Verified</th>
                                <th className="px-4 py-2 text-right"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((user) => (
                                <tr key={user.id} className="border-t border-pink-700 hover:bg-pink-900/10">
                                    <td className="px-4 py-3 font-semibold text-white">{user.name}</td>
                                    <td className="inline-flex items-center gap-1 px-4 py-3 text-pink-300">
                                        <Mail className="h-4 w-4" /> {user.email}
                                    </td>
                                    <td className="px-4 py-3 text-pink-300">{user.role}</td>
                                    <td className="px-4 py-3 text-pink-300">
                                        <span className="inline-flex items-center gap-1">
                                            <UserCheck className={`h-4 w-4 ${user.verified ? 'text-green-400' : 'text-red-400'}`} />
                                            {user.verified ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="text-pink-300 hover:text-white">
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
