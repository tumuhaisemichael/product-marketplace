'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { useProducts, Product } from '@/lib/hooks/useProducts';
import ProductForm from '@/components/forms/ProductForm';
import { ChevronLeft, Edit3, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = parseInt(params.id as string);
    const { hasPermission, loading: authLoading } = useAuth();
    const { getProduct, updateProduct } = useProducts();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!authLoading && !hasPermission('edit')) {
            router.push('/dashboard/products');
        }
    }, [authLoading, hasPermission, router]);

    useEffect(() => {
        if (id) {
            loadProduct();
        }
    }, [id]);

    const loadProduct = async () => {
        try {
            const response = await getProduct(id);
            setProduct(response.data);
        } catch (err: any) {
            setError(err.message || 'Failed to load product');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            await updateProduct(id, data);
            router.push('/dashboard/products');
        } catch (err: any) {
            alert(err.response?.data?.error || 'Failed to update product');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (authLoading || loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
            <Loader2 className="animate-spin text-indigo-500 mb-4" size={48} />
            <p className="font-medium animate-pulse">Retrieving product details...</p>
        </div>
    );

    if (error || !product) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-3xl border border-slate-200">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4 text-rose-500">
                <AlertCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">{error || 'Product not found'}</h2>
            <Link href="/dashboard/products">
                <Button variant="outline" className="mt-4 rounded-xl border-2">Back to Dashboard</Button>
            </Link>
        </div>
    );

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
                        <Edit3 size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Edit Product</h1>
                        <p className="text-slate-500 mt-1 text-sm">Update the information for <span className="text-indigo-600 font-bold">{product.name}</span>.</p>
                    </div>
                </div>
            </div>

            <ProductForm
                initialData={{
                    name: product.name,
                    description: product.description,
                    price: parseFloat(product.price),
                    status: product.status as any,
                }}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}
