import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold">
                    Welcome to <span className="text-blue-600">Marketplace</span>
                </h1>

                <p className="mt-3 text-2xl">
                    The best place to manage your business products.
                </p>

                <div className="flex gap-4 mt-8">
                    <Link href="/login">
                        <Button size="lg">Login</Button>
                    </Link>
                    <Link href="/products">
                        <Button variant="outline" size="lg">Browse Products</Button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
