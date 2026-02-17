'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useProducts } from '@/lib/hooks/useProducts';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function ProductsPage() {
    const { user, hasPermission } = useAuth();
    const { products, loading, error, pagination, fetchProducts, approveProduct } = useProducts();
    const [filters, setFilters] = useState({
        status: '',
        search: '',
        sort: '-created_at',
    });

    useEffect(() => {
        fetchProducts({ ...filters, internal: true });
    }, [filters]);

    if (loading) return <div className="flex justify-center p-8">Loading...</div>;
    if (error) return <div className="text-red-500 p-8">Error: {error}</div>;

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Products</h1>
                {hasPermission('create') && (
                    <Link href="/dashboard/products/create">
                        <Button className="flex items-center gap-2">
                            <Plus size={16} />
                            New Product
                        </Button>
                    </Link>
                )}
            </div>

            <ProductFilters filters={filters} onFilterChange={setFilters} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        canEdit={hasPermission('edit')}
                        canApprove={hasPermission('approve')}
                        onApprove={async (id) => {
                            console.log("APPROVE CLICKED", id);
                            try {
                                const res = await approveProduct(id);
                                console.log("APPROVE SUCCESS", res.data);
                                fetchProducts({ ...filters, internal: true });
                            } catch (err: any) {
                                console.error("APPROVE FAILED", err);
                                if (err.response) {
                                    console.error("RESPONSE DATA", err.response.data);
                                    console.error("RESPONSE STATUS", err.response.status);
                                }
                                alert(err.response?.data?.error || err.response?.data?.detail || "Failed to approve product");
                            }
                        }}
                    />
                ))}
            </div>

            {pagination && (
                <div className="flex justify-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        disabled={!pagination.previous}
                        onClick={() => fetchProducts({ ...filters, page: pagination.current - 1 })}
                    >
                        Previous
                    </Button>
                    <span className="py-2 px-4">
                        Page {pagination.current} of {pagination.totalPages}
                    </span>
                    <Button
                        variant="outline"
                        disabled={!pagination.next}
                        onClick={() => fetchProducts({ ...filters, page: pagination.current + 1 })}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}
