'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function LoginContent() {
    const { login } = useAuth();
    const searchParams = useSearchParams();
    const registered = searchParams.get('registered');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 py-12 px-4">
            <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-2xl shadow-xl border border-slate-100">
                <div>
                    <h2 className="text-3xl font-extrabold text-center text-slate-900">Login</h2>
                    <p className="mt-2 text-center text-sm text-slate-600">Access your business dashboard</p>
                </div>

                {registered && (
                    <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 text-emerald-700 text-sm">
                        Business created successfully! Please log in.
                    </div>
                )}

                {error && (
                    <div className="bg-rose-50 border-l-4 border-rose-400 p-4 text-rose-700 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="h-11"
                            placeholder="Your username"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="h-11"
                            placeholder="••••••••"
                        />
                    </div>
                    <Button type="submit" className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 font-medium">
                        Sign In
                    </Button>
                </form>

                <div className="text-center text-sm text-slate-600 mt-4">
                    Don't have an account?{' '}
                    <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 underline decoration-indigo-200 underline-offset-4">
                        Create a Business
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="text-slate-500">Loading...</div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
