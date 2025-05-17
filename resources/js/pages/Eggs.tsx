import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronUp, Copy, Egg, Pencil, Server, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Egg {
    id: number;
    uuid: string;
    name: string;
    author: string;
    description: string;
    servers: number;
}

interface Pagination<T> {
    data: T[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    from: number;
    to: number;
    total: number;
    per_page: number;
}


export default function Eggs() {
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const { eggs, filters, availableTags } = usePage<{
        eggs: Pagination<Egg>;
        filters: { search?: string; sort?: string; direction?: string; per_page?: number; tag?: string };
        availableTags: string[];
    }>().props;

    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/eggs',
            { search, sort: filters.sort, direction: filters.direction, per_page: filters.per_page },
            { preserveScroll: true, preserveState: true },
        );
    };

    const handleSort = () => {
        const newDirection = filters.direction === 'asc' ? 'desc' : 'asc';
        router.get(
            '/eggs',
            { search, sort: 'name', direction: newDirection, per_page: filters.per_page },
            { preserveScroll: true, preserveState: true },
        );
    };

    const activeFilters = Object.values(filters).filter((value) => value !== undefined && value !== '').length;
    
    const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTag = e.target.value;
        router.get(
            '/eggs',
            {
                search,
                sort: filters.sort,
                direction: filters.direction,
                per_page: filters.per_page,
                tag: selectedTag,
            },
            { preserveScroll: true, preserveState: true },
        );
    };


    return (
        <AppLayout breadcrumbs={[{ title: 'Eggs', href: '/eggs' }]}>
            <Head title="Eggs">
                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-black p-6 font-[Orbitron] text-white transition-colors">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between border-b border-cyan-600 pb-4">
                    <h1 className="text-3xl font-semibold tracking-widest text-cyan-400 drop-shadow-[0_0_5px_#0ff]">EGGS</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => alert('Import')}
                            className="rounded border border-cyan-500 bg-cyan-900/30 px-4 py-1.5 text-sm text-cyan-300 transition hover:bg-cyan-700/50"
                        >
                            Import
                        </button>
                        <button
                            onClick={() => router.visit('/eggs/create')}
                            className="rounded border border-purple-500 bg-purple-900/30 px-4 py-1.5 text-sm text-purple-300 transition hover:bg-purple-700/50"
                        >
                            New Egg
                        </button>
                    </div>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="mb-6 flex items-center gap-2">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search eggs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded border border-cyan-700 bg-black px-3 py-2 pl-10 text-sm text-cyan-200 shadow-[0_0_5px_#0ff] placeholder:text-cyan-600"
                        />
                        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-cyan-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m0 0A7 7 0 103 10a7 7 0 0012 5z" />
                            </svg>
                        </span>
                    </div>

                    {/* Active filters */}
                    <div className="relative">
                        <button type="button" onClick={() => setShowFilterMenu(!showFilterMenu)} className="relative rounded p-3">
                            <i className="bi bi-funnel-fill text-2xl text-cyan-300"></i>
                            {activeFilters > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white shadow-md">
                                    {activeFilters}
                                </span>
                            )}
                        </button>

                        {/* Filter menu */}
                        {showFilterMenu && (
                            <div className="absolute top-full right-0 mt-2 w-48 rounded border border-cyan-600 bg-neutral-950 shadow-[0_0_10px_#0ff3]">
                                <div className="p-2">
                                    <div className="mb-2 flex items-center justify-between">
                                        <label htmlFor="search" className="block text-sm text-cyan-300">
                                            Filters
                                        </label>
                                        <button>
                                            <i className="bi bi-x-lg color-red-500 text-cyan-300" onClick={() => setShowFilterMenu(false)}></i>
                                        </button>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="tags" className="block text-sm font-medium text-cyan-300">
                                            Tag
                                        </label>
                                        <select
                                            id="tags"
                                            className="mt-4 block w-full rounded border border-cyan-700 bg-black px-3 py-2 text-sm text-cyan-200 shadow-[0_0_5px_#0ff] focus:border-cyan-400 focus:ring focus:ring-cyan-400"
                                            onChange={handleTagChange}
                                            value={filters.tag || ''}
                                        >
                                            <option value="tag">Select a Tag</option>
                                            {availableTags.map((tag) => (
                                                <option key={tag} value={tag}>
                                                    {tag}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </form>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-cyan-700 bg-neutral-950 shadow-[0_0_10px_#0ff3]">
                    <table className="min-w-full table-auto text-sm">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">
                                    <button onClick={handleSort} className="flex items-center gap-1 text-cyan-300 hover:text-cyan-100">
                                        Name
                                        {filters.sort === 'name' &&
                                            (filters.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                                    </button>
                                </th>
                                <th className="px-4 py-2 text-left">Servers</th>
                                <th className="px-4 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eggs.data.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-6 text-center text-cyan-600">
                                        No eggs found.
                                    </td>
                                </tr>
                            ) : (
                                eggs.data.map((egg) => (
                                    <tr
                                        key={egg.id}
                                        onClick={() => router.visit(`/eggs/${egg.id}/edit`)}
                                        className="cursor-pointer border-t border-cyan-800 transition hover:bg-cyan-900/20"
                                    >
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col">
                                                <span className="inline-flex items-center gap-1 font-semibold text-white">
                                                    <Egg className="h-4 w-4 text-cyan-400" />
                                                    {egg.name}
                                                </span>
                                                <span className="text-sm text-cyan-400">{egg.description}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <div className="inline-flex items-center gap-1 text-cyan-300">
                                                <Server className="h-4 w-4" />
                                                {egg.servers ?? 0}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    title="Edit"
                                                    className="text-cyan-300 hover:text-cyan-100"
                                                    onClick={() => router.visit(`/eggs/${egg.id}/edit`)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button
                                                    title="Duplicate"
                                                    className="text-blue-400 hover:text-blue-200"
                                                    onClick={() => alert('Duplicate not implemented')}
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </button>
                                                <button
                                                    title="Delete"
                                                    className="text-pink-400 hover:text-pink-200"
                                                    onClick={() => alert('Delete not implemented')}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {eggs.links.length > 5 && (
                        <div className="mt-6 flex justify-center p-4">
                            <ul className="flex flex-wrap gap-2 text-sm font-medium">
                                {eggs.links.map((link, i) => (
                                    <li key={i}>
                                        <button
                                            disabled={!link.url}
                                            onClick={() => {
                                                if (!link.url) return;
                                                const url = new URL(link.url);
                                                const page = url.searchParams.get('page');
                                                router.get(
                                                    '/eggs',
                                                    {
                                                        page,
                                                        search,
                                                        sort: filters.sort,
                                                        direction: filters.direction,
                                                        per_page: filters.per_page,
                                                    },
                                                    { preserveScroll: true, preserveState: true },
                                                );
                                            }}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`rounded border px-3 py-1.5 text-xs transition ${link.active ? 'border-cyan-500 bg-cyan-500 text-white shadow-md' : 'border-cyan-700 bg-black text-cyan-400 hover:bg-cyan-800/30 hover:text-white'} ${!link.url ? 'cursor-not-allowed opacity-40' : ''}`}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Per page selector */}
                <div className="fi-pagination-records-per-page mt-4 flex items-center justify-between gap-2 border-t border-cyan-300 bg-cyan-50 px-4 py-3 dark:border-cyan-700 dark:bg-neutral-950">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Showing {eggs.from} to {eggs.to} of {eggs.total} results
                    </span>
                    <label className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 shadow-sm ring-1 ring-cyan-800 dark:bg-black dark:ring-cyan-700">
                        <span className="font-mono text-sm text-cyan-400">Per page</span>
                        <div className="relative">
                            <select
                                className="w-20 appearance-none rounded border border-cyan-700 bg-black px-2 py-1 font-mono text-xs text-cyan-200 outline-none focus:border-cyan-400"
                                value={filters.per_page ?? 10}
                                onChange={(e) => {
                                    const perPage = parseInt(e.target.value, 10);
                                    router.get(
                                        '/eggs',
                                        {
                                            search,
                                            sort: filters.sort,
                                            direction: filters.direction,
                                            per_page: perPage,
                                        },
                                        { preserveScroll: true, preserveState: true },
                                    );
                                }}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-3 w-3 -translate-y-1/2 text-cyan-400" />
                        </div>
                    </label>
                </div>
            </div>
        </AppLayout>
    );
}
