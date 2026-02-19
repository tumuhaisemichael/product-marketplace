'use client';

import { useEffect, useState } from 'react';
import { useProducts } from '@/lib/hooks/useProducts';
import ProductCard from '@/components/products/ProductCard';
import { Search, Filter, SlidersHorizontal, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PublicProductsPage() {
    const { products, loading, fetchProducts } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts({ status: 'approved' });
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.business_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            {/* Header / Nav */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                            <ShoppingBag className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold text-slate-900">Marketplace</span>
                    </Link>

                    <div className="flex-1 max-w-lg mx-8 hidden md:block">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <Input
                                placeholder="Search products or businesses..."
                                className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost" className="font-semibold text-slate-600">Merchant Login</Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 rounded-xl">Join as Seller</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero / Category Title */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Discover Extraordinary Products</h1>
                    <p className="text-slate-600 text-lg max-w-2xl">
                        Handpicked quality items from verified businesses across the globe. Seamlessly browse and connect with top sellers.
                    </p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                        <Button variant="outline" className="rounded-full px-6 bg-white border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all font-medium">All Products</Button>
                        <Button variant="outline" className="rounded-full px-6 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-medium">Electronics</Button>
                        <Button variant="outline" className="rounded-full px-6 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-medium">Fashion</Button>
                        <Button variant="outline" className="rounded-full px-6 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-medium">Home & Living</Button>
                    </div>
                    <Button variant="outline" className="gap-2 rounded-xl border-slate-200 h-11 px-5">
                        <SlidersHorizontal className="w-4 h-4" />
                        More Filters
                    </Button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="space-y-4">
                                <div className="aspect-square bg-slate-200 rounded-3xl animate-pulse" />
                                <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse" />
                                <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in duration-700">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                canEdit={false}
                                canApprove={false}
                                canDelete={false}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                        <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                        <Button variant="link" onClick={() => setSearchTerm('')} className="mt-4 text-indigo-600 font-bold">Clear search</Button>
                    </div>
                )}
            </main>
        </div>
    );
}
