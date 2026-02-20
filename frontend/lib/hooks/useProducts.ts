import { useState, useCallback } from 'react';
import apiClient from '@/lib/api/client';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    status: 'draft' | 'pending_approval' | 'approved' | 'rejected';
    business: number;
    business_name: string;
    created_at: string;
    created_by: number;
    created_by_name: string;
}

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ current: 1, totalPages: 1, previous: null, next: null });

    const fetchProducts = useCallback(async (params: any = {}) => {
        setLoading(true);
        setError(null);
        try {
            const url = params.internal ? '/products/list_internal/' : '/products/';
            const response = await apiClient.get(url, { params });
            if (response.data.results) {
                setProducts(response.data.results);
                // Simple pagination logic assuming DRF returns count/next/previous
                setPagination({
                    current: params.page || 1,
                    totalPages: Math.ceil(response.data.count / 10), // Assuming page size 10
                    previous: response.data.previous,
                    next: response.data.next
                });
            } else {
                // If not paginated or different format
                setProducts(Array.isArray(response.data) ? response.data : []);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }, []);

    const getProduct = async (id: number) => {
        return await apiClient.get(`/products/${id}/`);
    };

    const createProduct = async (data: any) => {
        return await apiClient.post('/products/', data);
    };

    const updateProduct = async (id: number, data: any) => {
        return await apiClient.patch(`/products/${id}/`, data);
    };

    const approveProduct = async (id: number) => {
        return await apiClient.post(`/products/${id}/approve/`, { approved: true });
    };

    const deleteProduct = async (id: number) => {
        return await apiClient.delete(`/products/${id}/`);
    };

    return {
        products,
        loading,
        error,
        pagination,
        fetchProducts,
        getProduct,
        createProduct,
        updateProduct,
        approveProduct,
        deleteProduct
    };
};
