import { useState, useCallback } from 'react';
import apiClient from '@/lib/api/client';

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    is_business_admin: boolean;
}

export interface Role {
    id: number;
    name: string;
}

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get('/auth/users/');
            setUsers(Array.isArray(response.data) ? response.data : response.data.results || []);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchRoles = useCallback(async () => {
        try {
            const response = await apiClient.get('/auth/roles/');
            setRoles(Array.isArray(response.data) ? response.data : response.data.results || []);
        } catch (err: any) {
            console.error('Failed to fetch roles', err);
        }
    }, []);

    const createUser = async (data: any) => {
        return await apiClient.post('/auth/users/', data);
    };

    const updateUser = async (id: number, data: any) => {
        return await apiClient.patch(`/auth/users/${id}/`, data);
    };

    const deleteUser = async (id: number) => {
        return await apiClient.delete(`/auth/users/${id}/`);
    };

    return {
        users,
        roles,
        loading,
        error,
        fetchUsers,
        fetchRoles,
        createUser,
        updateUser,
        deleteUser
    };
};
