'use client';

import ProductForm from '@/components/forms/ProductForm';
import { useProducts } from '@/lib/hooks/useProducts';
import { useRouter } from 'next/navigation';

export default function CreateProductPage() {
    const { createProduct } = useProducts();
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        try {
            await createProduct(data);
            router.push('/dashboard/products');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
            <ProductForm onSubmit={handleSubmit} />
        </div>
    );
}
