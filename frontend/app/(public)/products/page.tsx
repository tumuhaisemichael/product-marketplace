'use client';

import { useEffect } from 'react';
import { useProducts } from '@/lib/hooks/useProducts';
import ProductCard from '@/components/products/ProductCard';

export default function PublicProductsPage() {
    const { products, loading, fetchProducts } = useProducts();

    useEffect(() => {
        fetchProducts({ status: 'approved' });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Public Marketplace</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        canEdit={false}
                        canApprove={false}
                    />
                ))}
            </div>
        </div>
    );
}
