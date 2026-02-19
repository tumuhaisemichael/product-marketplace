'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useProducts } from '@/lib/hooks/useProducts';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import { Button } from '@/components/ui/button';
import { Plus, LayoutGrid, List, SlidersHorizontal, Package, CheckCircle2, AlertCircle } from 'lucide-react';
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

    // Stats calculation (simplified)
    const stats = [
        { name: 'Total Products', value: products.length, icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { name: 'Approved', value: products.filter(p => p.status === 'approved').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { name: 'Pending', value: products.filter(p => p.status === 'pending_approval' || p.status === 'draft').length, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    if (error) return (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-200">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="text-rose-500 w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
            <p className="text-slate-500 mb-6">{error}</p>
            <Button onClick={() => fetchProducts({ ...filters, internal: true })} variant="outline">Try again</Button>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Products Catalog</h1>
                    <p className="text-slate-500 mt-1">Manage, approve, and track your business inventory.</p>
                </div>
                {hasPermission('create') && (
                    <Link href="/dashboard/products/create">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 h-12 px-6 rounded-xl shadow-lg shadow-indigo-100 flex items-center gap-2 transition-all active:scale-95">
                            <Plus size={20} />
                            Create New Product
                        </Button>
                    </Link>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-inner`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-500">{stat.name}</p>
                                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters Section */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
                <ProductFilters filters={filters} onFilterChange={setFilters} />
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="bg-white rounded-3xl border border-slate-200/60 h-96 animate-pulse" />
                    ))}
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            canEdit={hasPermission('edit')}
                            canApprove={hasPermission('approve')}
                            onApprove={async (id) => {
                                try {
                                    await approveProduct(id);
                                    fetchProducts({ ...filters, internal: true });
                                } catch (err: any) {
                                    alert(err.response?.data?.error || err.response?.data?.detail || "Failed to approve product");
                                }
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                    <Package className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Inventory is empty</h3>
                    <p className="text-slate-500 mb-6">Start by adding your first product to the marketplace.</p>
                    <Link href="/dashboard/products/create">
                        <Button variant="outline" className="border-2 font-bold px-8 rounded-xl">Add Product</Button>
                    </Link>
                </div>
            )}

            {/* Pagination */}
            {pagination && (
                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                    <p className="text-sm text-slate-500 font-medium">
                        Showing page <span className="text-slate-900 font-bold">{pagination.current}</span> of <span className="text-slate-900 font-bold">{pagination.totalPages}</span>
                    </p>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="rounded-xl font-bold h-11 px-5 border-slate-200 disabled:opacity-40"
                            disabled={!pagination.previous}
                            onClick={() => fetchProducts({ ...filters, page: pagination.current - 1, internal: true })}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-xl font-bold h-11 px-5 border-slate-200 disabled:opacity-40"
                            disabled={!pagination.next}
                            onClick={() => fetchProducts({ ...filters, page: pagination.current + 1, internal: true })}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
