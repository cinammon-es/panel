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

    const activeFilters = filters.tag ? 1 : 0;
    const [selectedTag, setSelectedTag] = useState(filters.tag || '');
    const [tagSearch, setTagSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);


    return (
        <AppLayout breadcrumbs={[{ title: 'Eggs', href: '/eggs' }]}>
            <Head title="Eggs">
                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-black p-6 font-[Orbitron] text-white transition-colors">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between border-cyan-600">
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

                <div className="space-y-6 rounded-xl border border-cyan-700 bg-[#0a0a0a] p-6">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="mb-6 flex flex-wrap items-center justify-end gap-3">
                        <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                            <input
                                type="text"
                                placeholder="Search eggs..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded border border-cyan-700 bg-black px-3 py-2 pl-10 text-sm text-cyan-200 shadow-[0_0_5px_#0ff] placeholder:text-cyan-600"
                            />
                            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-cyan-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M21 21l-6-6m0 0A7 7 0 103 10a7 7 0 0012 5z"
                                    />
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
                                <div className="absolute right-0 w-72 rounded bg-neutral-950 shadow-lg">
                                    <div className="space-y-4 p-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-white">Filters</span>
                                            <button
                                                onClick={() => {
                                                    setSelectedTag('');
                                                    setTagSearch('');
                                                    setSearch('');
                                                    setShowDropdown(false);
                                                    setShowFilterMenu(false);

                                                    router.get(
                                                        '/eggs',
                                                        {
                                                            sort: filters.sort,
                                                            direction: filters.direction,
                                                            per_page: filters.per_page,
                                                            tag: '',
                                                            search: '',
                                                        },
                                                        {
                                                            preserveScroll: true,
                                                            preserveState: false,
                                                            replace: true, // <-- Esto fuerza que los filtros queden vacíos
                                                        },
                                                    );
                                                }}
                                                className="text-sm font-semibold text-red-400 hover:text-red-300"
                                            >
                                                Reset
                                            </button>
                                        </div>

                                        <div>
                                            <label htmlFor="tags" className="mb-3 block text-sm font-medium text-cyan-300">
                                                Tag
                                            </label>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setShowDropdown(!showDropdown)}
                                                    className="w-full rounded border bg-black px-3 py-2 pr-10 text-left text-sm text-cyan-200"
                                                >
                                                    {selectedTag || 'Select an option'}
                                                    <ChevronDown className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-cyan-400" />
                                                </button>

                                                {selectedTag && (
                                                    <button
                                                        onClick={() => {
                                                            setSelectedTag('');
                                                            setTagSearch('');
                                                            router.get(
                                                                '/eggs',
                                                                {
                                                                    ...filters,
                                                                    tag: '',
                                                                },
                                                                {
                                                                    preserveScroll: true,
                                                                    preserveState: true,
                                                                },
                                                            );
                                                        }}
                                                        className="absolute top-1/2 right-7 -translate-y-1/2 text-cyan-400 hover:text-red-500"
                                                        title="Clear tag"
                                                    >
                                                        &times;
                                                    </button>
                                                )}

                                                {showDropdown && (
                                                    <div className="absolute z-50 mt-1 w-full bg-black">
                                                        <input
                                                            type="text"
                                                            placeholder="Start typing to search..."
                                                            value={tagSearch}
                                                            onChange={(e) => setTagSearch(e.target.value)}
                                                            className="w-full border-b bg-black px-3 py-2 text-sm text-cyan-200 placeholder:text-cyan-600 focus:outline-none"
                                                        />
                                                        <ul className="max-h-60 overflow-y-auto">
                                                            {availableTags
                                                                .filter((tag) => tag.toLowerCase().includes(tagSearch.toLowerCase()))
                                                                .map((tag) => (
                                                                    <li
                                                                        key={tag}
                                                                        onClick={() => {
                                                                            setSelectedTag(tag);
                                                                            setShowDropdown(false);
                                                                            router.get(
                                                                                '/eggs',
                                                                                {
                                                                                    ...filters,
                                                                                    tag,
                                                                                },
                                                                                {
                                                                                    preserveScroll: true,
                                                                                    preserveState: true,
                                                                                },
                                                                            );
                                                                        }}
                                                                        className="cursor-pointer px-3 py-2 text-sm text-cyan-200 hover:bg-cyan-800"
                                                                    >
                                                                        {tag}
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
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
                                                (filters.direction === 'asc' ? (
                                                    <ChevronUp className="h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4" />
                                                ))}
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
                                <ul className="max-h-60 overflow-y-auto">
                                    {availableTags
                                        .filter((tag) => tag.toLowerCase().includes(tagSearch.toLowerCase()))
                                        .map((tag) => (
                                            <li
                                                key={tag}
                                                onClick={() => {
                                                    setSelectedTag(tag);
                                                    setShowDropdown(false);
                                                    router.get(
                                                        '/eggs',
                                                        {
                                                            ...filters,
                                                            tag,
                                                        },
                                                        {
                                                            preserveScroll: true,
                                                            preserveState: true,
                                                        },
                                                    );
                                                }}
                                                className="cursor-pointer px-3 py-2 text-sm text-cyan-200 hover:bg-cyan-800"
                                            >
                                                {tag}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}

                        <div className="flex items-center justify-center border-t border-cyan-300 bg-cyan-50 px-4 py-3 dark:border-cyan-700 dark:bg-neutral-950">
                            <div className="inline-flex items-center overflow-hidden rounded-md border border-cyan-700 bg-black text-sm text-cyan-200 shadow-[0_0_4px_#0ff]">
                                <span className="border-r border-cyan-700 bg-black px-4 py-2 text-cyan-400">Per page</span>
                                <div className="relative">
                                    <select
                                        className="appearance-none bg-black px-4 py-2 pr-8 text-cyan-200 focus:outline-none"
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
                                                {
                                                    preserveScroll: true,
                                                    preserveState: true,
                                                },
                                            );
                                        }}
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">All</option>
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-cyan-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
