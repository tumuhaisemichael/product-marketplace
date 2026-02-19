'use client';

import ProductForm from '@/components/forms/ProductForm';
import { useProducts } from '@/lib/hooks/useProducts';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

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
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex flex-col gap-4">
                <Link
                    href="/dashboard/products"
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-semibold group w-fit"
                >
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Products
                </Link>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-200/60 text-indigo-600">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create New Product</h1>
                        <p className="text-slate-500 mt-1 text-sm">Fill in the details below to add a new item to your marketplace catalog.</p>
                    </div>
                </div>
            </div>

            <ProductForm onSubmit={handleSubmit} />
        </div>
    );
}
