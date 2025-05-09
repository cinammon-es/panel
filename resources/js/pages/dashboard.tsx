import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="relative flex flex-1 flex-col gap-6 rounded-xl p-4 text-white md:p-6">
                <div className="pointer-events-none absolute inset-0 z-0 animate-pulse bg-gradient-to-br from-pink-500/5 via-purple-700/5 to-blue-500/5" />
                <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle,#ff44cc22_1px,transparent_1px)] bg-[length:20px_20px]" />

                <div className="relative z-10 grid auto-rows-min gap-6 md:grid-cols-3">
                    {[1, 2, 3].map((_, i) => (
                        <div
                            key={i}
                            className="group relative aspect-video overflow-hidden rounded-xl border border-pink-500/20 bg-black/70 shadow-lg transition-all duration-300 hover:border-pink-500 hover:shadow-pink-500/20"
                        >
                            <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,#ff44cc33,#5500ff33,#44ccff33,#ff44cc33)] opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-10" />
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-white/10" />
                        </div>
                    ))}
                </div>

                <div className="relative z-10 min-h-[40vh] w-full flex-1 overflow-hidden rounded-xl border border-pink-500/20 bg-black/70 shadow-lg transition-all hover:border-pink-500 hover:shadow-pink-500/20">
                    <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,#ff44cc33,#5500ff33,#44ccff33,#ff44cc33)] opacity-0 blur-sm transition-opacity duration-500 hover:opacity-10" />
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-white/10" />
                </div>
            </div>
        </AppLayout>
    );
}
