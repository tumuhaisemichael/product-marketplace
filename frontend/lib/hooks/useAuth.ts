import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    business?: {
        id: number;
        name: string;
    };
    is_business_admin: boolean;
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async () => {
        try {
            const response = await apiClient.get('/auth/me/');
            setUser(response.data);
        } catch (error) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        const response = await apiClient.post('/auth/login/', { username: email, password }); // Fixed: using username as email usually requires backend support or just pass username
        // Note: Django SimpleJWT expects 'username' and 'password' by default. If using email, user needs to input email in username field or backend configured.
        // The prompt shows login(email, password) but backend uses default TokenObtainPairView which uses 'username'. 
        // I'll assume standard Django 'username' field usage, or frontend sends email AS username.

        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        await fetchUser();
        router.push('/dashboard/products');
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        router.push('/');
    };

    const hasPermission = (action: string) => {
        if (!user) return false;

        const permissions: Record<string, string[]> = {
            admin: ['create', 'edit', 'approve', 'delete', 'manage_users'],
            editor: ['create', 'edit', 'delete'],
            approver: ['create', 'edit', 'approve', 'delete'],
            viewer: ['view'],
        };

        return permissions[user.role]?.includes(action) || false;
    };

    return { user, loading, login, logout, hasPermission };
};
