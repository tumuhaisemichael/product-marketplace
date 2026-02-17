'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold">Marketplace</h1>
                    {user && <p className="text-sm text-gray-500 mt-1">{user.business?.name}</p>}
                </div>
                <nav className="p-4 space-y-2">
                    <Link href="/dashboard/products" className="block p-2 hover:bg-gray-100 rounded">Products</Link>
                    <Link href="/dashboard/products/create" className="block p-2 hover:bg-gray-100 rounded">Create Product</Link>
                    <Link href="/dashboard/users" className="block p-2 hover:bg-gray-100 rounded">Users</Link>
                    <Link href="/dashboard/settings" className="block p-2 hover:bg-gray-100 rounded">Settings</Link>
                </nav>
                <div className="p-4 border-t mt-auto">
                    <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
