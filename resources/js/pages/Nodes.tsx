import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Nodes() {
    const [search, setSearch] = useState('');

    return (
        <AppLayout breadcrumbs={[{ title: 'Nodes', href: '/nodes' }]}>
            <Head title="Nodes">
                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white p-6 font-[Orbitron] text-black transition-colors dark:bg-black dark:text-white">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between border-b border-cyan-500 pb-4 dark:border-cyan-600">
                    <h1 className="text-3xl font-semibold tracking-widest text-cyan-800 drop-shadow-none dark:text-cyan-400 dark:drop-shadow-[0_0_5px_#0ff]">
                        NODES
                    </h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => alert('Create Node')}
                            className="rounded border border-purple-400 bg-purple-100/50 px-4 py-1.5 text-sm text-purple-800 transition hover:bg-purple-200/70 dark:border-purple-500 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-700/50"
                        >
                            New Node
                        </button>
                    </div>
                </div>

                {/* Search + Filter */}
                <div className="mb-6 flex items-center gap-2">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search nodes..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded border border-cyan-300 bg-white px-3 py-2 pl-10 text-sm text-cyan-800 shadow-none placeholder:text-cyan-500 dark:border-cyan-700 dark:bg-black dark:text-cyan-200 dark:shadow-[0_0_5px_#0ff] dark:placeholder:text-cyan-600"
                        />
                        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-cyan-500 dark:text-cyan-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m0 0A7 7 0 103 10a7 7 0 0012 5z" />
                            </svg>
                        </span>
                    </div>
                    <button
                        onClick={() => alert('Open filters')}
                        className="rounded border border-pink-400 bg-pink-100/50 px-3 py-2 text-pink-800 transition hover:bg-pink-200/70 dark:border-pink-500 dark:bg-pink-900/30 dark:text-pink-300 dark:hover:bg-pink-700/50"
                        title="Filter"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0014 13.414V18a1 1 0 01-.447.832l-4 2.5A1 1 0 018 20.5V13.414a1 1 0 00-.293-.707L1.293 6.707A1 1 0 011 6V4z"
                            />
                        </svg>
                    </button>
                </div>

                {/* Tabla vacía */}
                <div className="overflow-hidden rounded-lg border border-cyan-300 bg-white shadow-none transition dark:border-cyan-700 dark:bg-neutral-950 dark:shadow-[0_0_10px_#0ff3]">
                    <table className="min-w-full table-auto text-sm">
                        <thead className="bg-cyan-100 text-cyan-700 dark:bg-cyan-950/20 dark:text-cyan-300">
                            <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Address</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={4} className="px-4 py-6 text-center text-cyan-500 dark:text-cyan-600">
                                    No nodes found.
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Per page selector */}
                    <div className="flex items-center justify-center border-t border-cyan-300 bg-cyan-50 px-4 py-3 dark:border-cyan-700 dark:bg-neutral-950">
                        <div className="inline-flex items-center gap-2 rounded-md border border-cyan-300 bg-white px-3 py-1.5 text-sm text-cyan-800 shadow-none dark:border-cyan-600 dark:bg-black dark:text-cyan-200 dark:shadow-[0_0_4px_#0ff]">
                            <span className="text-cyan-600 dark:text-cyan-400">Per page</span>
                            <select
                                className="bg-white text-cyan-800 outline-none dark:bg-black dark:text-cyan-200"
                                defaultValue={25}
                                onChange={(e) => alert(`Cambiar a ${e.target.value} por página`)}
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
