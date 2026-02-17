'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard/products');
    }, []);

    return (
        <div className="flex items-center justify-center p-8">
            Redirecting to products...
        </div>
    );
}
