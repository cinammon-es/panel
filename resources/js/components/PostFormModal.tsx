import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Post {
    id?: number;
    title: string;
    content: string;
    picture?: string;
}

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    post?: Post | null;
}

export default function PostFormModal({ isOpen, closeModal, post }: Props) {
    const [formData, setFormData] = useState<Post>({ title: '', content: '', picture: '' });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');

    useEffect(() => {
        if (post) {
            setFormData({ title: post.title, content: post.content, picture: post.picture || '' });
            setPreview(post.picture || '');
            setSelectedFile(null);
        } else {
            setFormData({ title: '', content: '', picture: '' });
            setPreview('');
            setSelectedFile(null);
        }
    }, [post]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        if (selectedFile) {
            data.append('picture', selectedFile);
        }
        const successMessage = post ? 'Post updated successfully!' : 'Post created successfully!';
        const errorMessage = post ? 'Error updating post!' : 'Error creating post!';
        if (post?.id) {
            data.append('_method', 'PUT');
            router.post(`/posts/${post.id}`, data, {
                onSuccess: () => {
                    toast.success(successMessage);
                    closeModal();
                    router.reload();
                },
                onError: (error) => {
                    toast.error(errorMessage);
                    console.error(error.message || 'Failed to submit form');
                },
            });
        } else {
            router.post('/posts', data, {
                onSuccess: () => {
                    toast.success(successMessage);
                    closeModal();
                    router.reload();
                },
                onError: (error) => {
                    toast.error(errorMessage);
                    console.error(error.message || 'Failed to submit form');
                },
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="w-full max-w-xl rounded-lg bg-white p-6 text-black shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">{post ? 'Edit Post' : 'Add Post'}</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded border p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full rounded border p-2"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Picture (optional)</label>
                        <input type="file" name="picture" accept="image/*" onChange={handleFileChange} className="w-full" />
                    </div>
                    {preview && (
                        <div className="mb-3">
                            <p className="mb-1 text-sm">Image Preview:</p>
                            <img src={preview} alt="Preview" className="w-full" />
                        </div>
                    )}
                    <div className="mt-4 flex justify-end gap-2">
                        <button type="button" onClick={closeModal} className="mr-2 rounded-md bg-gray-300 px-4 py-2 text-black">
                            Cancel
                        </button>
                        <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white">
                            {post ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
