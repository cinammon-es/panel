import PostFormModal from '@/components/PostFormModal';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Posts', href: '/posts' }];

export default function Posts() {
    const { posts } = usePage<{ posts: { id: number; title: string; content: string; picture?: string }[] }>().props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<{ id: number; title: string; content: string; picture?: string } | null>(null);

    const openModal = (post: typeof selectedPost = null) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        router.delete(`/posts/${id}`, {
            onSuccess: () => {
                toast.success('Post eliminado con éxito');
                router.reload();
            },
            onError: () => {
                toast.error('Error al eliminar el post');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts">
                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&display=swap" rel="stylesheet" />
            </Head>

            <Toaster position="top-center" richColors />

            <div className="min-h-screen bg-white p-6 font-[Orbitron] text-black transition-colors dark:bg-black dark:text-white">
                {/* Título estilo cyber como Eggs/Tickets */}
                <div className="mb-6 flex items-center justify-between border-b border-cyan-600 pb-4">
                    <h1 className="text-3xl font-semibold tracking-widest text-cyan-400 drop-shadow-[0_0_5px_#0ff]">POSTS</h1>
                    <button
                        onClick={() => openModal()}
                        className="rounded border border-pink-400 bg-pink-100/50 px-4 py-2 text-sm text-pink-800 shadow-none transition hover:bg-pink-200/70 dark:border-pink-500 dark:bg-pink-900/30 dark:text-pink-300 dark:shadow-[0_0_6px_#ec4899] dark:hover:bg-pink-700/50"
                    >
                        + Add New Post
                    </button>
                </div>

                {/* Tabla de posts */}
                <div className="mt-6 overflow-hidden rounded-lg border border-purple-300 bg-white shadow-none transition dark:border-purple-700 dark:bg-neutral-900 dark:shadow-[0_0_15px_#c084fc33]">
                    <table className="min-w-full table-auto text-sm">
                        <thead className="bg-purple-100 tracking-wide text-purple-700 uppercase dark:bg-purple-950 dark:text-purple-300">
                            <tr>
                                <th className="px-4 py-3 text-left">Picture</th>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Content</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length ? (
                                posts.map((post) => (
                                    <tr
                                        key={post.id}
                                        className="border-t border-gray-200 transition hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-800/10"
                                    >
                                        <td className="px-4 py-3">
                                            {post.picture ? (
                                                <img
                                                    src={post.picture}
                                                    alt={post.title}
                                                    className="h-16 w-16 rounded border border-purple-300 shadow-sm dark:border-purple-500"
                                                />
                                            ) : (
                                                <span className="text-purple-600 dark:text-purple-400">No picture</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-purple-800 dark:text-purple-100">{post.title}</td>
                                        <td className="px-4 py-3 text-purple-700 dark:text-purple-200">{post.content}</td>
                                        <td className="flex justify-end gap-2 px-4 py-3">
                                            <button
                                                onClick={() => openModal(post)}
                                                className="rounded bg-yellow-400 px-2 py-1 text-xs text-white hover:bg-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-500"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-400 dark:bg-red-600 dark:hover:bg-red-500"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-4 py-6 text-center text-purple-500 dark:text-purple-400">
                                        No posts available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <PostFormModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} post={selectedPost} />
        </AppLayout>
    );
}
