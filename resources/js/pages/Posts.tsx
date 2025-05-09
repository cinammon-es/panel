import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { type BreadcrumbItem } from '@/types';
import PostFormModal from '@/components/PostFormModal';
import { Toaster, toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Posts', href: '/posts' }];

export default function Posts() {
    const { posts } = usePage<{ posts: { id: number; title: string; content: string; picture?: string }[] }>().props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const openModal = (post = null) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        router.delete(`/posts/${id}`, {
            onSuccess: () => {
                toast.success('Post deleted successfully!');
                router.reload();
            },
            onError: (error) => {
                toast.error('Error deleting post!');
                console.error('Error deleting post:', error);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />

            <Toaster position="top-center" richColors closeButton={false} expand={false} />
            <div className="flex flex-col gap-6 rounded-lg p-6 text-black shadow-lg">
                <div className="flex justify-end">
                    <button onClick={() => openModal()} className="mt-4 rounded bg-pink-500 px-4 py-2 text-white">
                        Add New Post
                    </button>
                </div>

                <table className="w-full border-collapse rounded-lg bg-white text-black shadow-sm">
                    <thead>
                        <tr className="bg-gray-100 text-gray-800">
                            {['Picture', 'Title', 'Content', 'Actions'].map((header) => (
                                <th key={header} className="border border-gray-200 p-3 text-left">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length ? (
                            posts.map((post) => (
                                <tr key={post.id} className="border-b">
                                    <td className="p-3">
                                        {post.picture ? (
                                            <img src={post.picture} alt={post.title} className="h-16 w-16 rounded" />
                                        ) : (
                                            'No picture'
                                        )}
                                    </td>
                                    <td className="p-3">{post.title}</td>
                                    <td className="p-3">{post.content}</td>
                                    <td className="flex-gap 2 p-3"> 
                                        <button onClick={() => openModal(post)} className="rounded bg-blue-500 px-2 py-1 text-white">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(post.id)} className="ml-2 rounded bg-red-500 px-2 py-1 text-white">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-3 text-center">
                                    No posts available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <PostFormModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} post={selectedPost} />
        </AppLayout>
    );


}
