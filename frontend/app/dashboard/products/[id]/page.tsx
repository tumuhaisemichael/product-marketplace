'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { useProducts, Product } from '@/lib/hooks/useProducts';
import ProductForm from '@/components/forms/ProductForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = parseInt(params.id as string);
    console.log("EDIT PAGE PARAMS", params, "ID", id);
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

    if (authLoading || loading) return <div className="p-8 text-center">Loading product...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
    if (!product) return <div className="p-8 text-center">Product not found</div>;

    return (
        <div className="container max-w-2xl mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Product: {product.name}</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
            </Card>
        </div>
    );
}
