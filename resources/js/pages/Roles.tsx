import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Pencil, ShieldCheck, Users, ChevronUp, ChevronDown } from 'lucide-react';

interface Role {
    id: number;
    name: string;
    permissions: string[];
    users_count: number;
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

export default function Roles() {
    const { roles, filters } = usePage<{
        roles: Pagination<Role>;
        filters: { search?: string; sort?: string; direction?: string; per_page?: number };
    }>().props;

    return (
        <AppLayout breadcrumbs={[{ title: 'Roles', href: '/roles' }]}>
            <Head title="Roles">
                <meta name="description" content="Roles management page" />
                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&display=swap" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-black p-6 font-[Orbitron] text-white">
                <div className="mb-6 flex items-center justify-between border-pink-500">
                    <h1 className="text-3xl tracking-widest text-pink-400 drop-shadow-[0_0_6px_#f0f]">ROLES</h1>
                    <button className="rounded border border-pink-500 bg-pink-900/30 px-4 py-2 text-sm text-pink-300 transition hover:bg-pink-700/50">
                        + New Role
                    </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-pink-500 bg-neutral-950 shadow-[0_0_10px_#f0f3]">
                    <table className="min-w-full table-auto text-sm">
                        <thead className="border-b border-pink-500 bg-pink-900 text-pink-200">
                            <tr>
                                <th className="px-4 py-2 text-center">
                                    <button onClick={() => handleSort('name')} className="flex items-center gap-1 text-pink-300 hover:text-white">
                                        Role Name
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
                                <th className="px-4 py-2 text-left">Permissions</th>
                                <th className="px-4 py-2 text-left">Users</th>
                                <th className="px-4 py-2 text-left">Nodes</th>
                                <th className="px-4 py-2 text-right"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {roles.data.map((role) => (
                                <tr key={role.id} className="border-t border-pink-700 hover:bg-pink-900/10">
                                    <td className="px-4 py-3 font-semibold text-white">{role.name}</td>
                                    <td className="px-4 py-3 text-pink-300">
                                        {role.permissions.includes('all') ? (
                                            <span className="inline-flex items-center gap-1 rounded border border-pink-400 px-2 py-0.5 text-xs font-medium text-pink-200 shadow-sm">
                                                <ShieldCheck className="h-4 w-4" />
                                                All
                                            </span>
                                        ) : (
                                            role.permissions.join(', ')
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-pink-300">
                                        <span className="inline-flex items-center gap-1">
                                            <Users className="h-4 w-4" /> {role.users_count}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-pink-300">
                                        <span className="inline-flex items-center gap-1">All</span>
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
