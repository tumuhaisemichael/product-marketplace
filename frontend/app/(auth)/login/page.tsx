'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingBag, ArrowLeft, Lock, User, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

function LoginContent() {
    const { login } = useAuth();
    const searchParams = useSearchParams();
    const registered = searchParams.get('registered');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsPending(true);
        try {
            await login(username, password);
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="mb-10">
                        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-8">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Back to home
                        </Link>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                                <ShoppingBag className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold text-slate-900 tracking-tight">Marketplace</span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Please enter your details to sign in to your business.
                        </p>
                    </div>

                    {registered && (
                        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-[10px] font-bold">✓</span>
                            </div>
                            <div className="text-emerald-800 text-sm font-medium">
                                Business created successfully! You can now log in.
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-sm font-semibold text-slate-700">Username</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                    <User className="h-5 w-5" />
                                </div>
                                <Input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl"
                                    placeholder="your_username"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</Label>
                                <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pl-10 pr-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-70"
                        >
                            {isPending ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <p className="text-center text-sm text-slate-600 font-medium">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-indigo-600 hover:text-indigo-500 font-bold decoration-indigo-200 underline-offset-4 hover:underline">
                                Start a Business
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Decoration/Marketing */}
            <div className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-slate-900 z-10" />
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80')] bg-cover bg-center" />

                <div className="relative z-20 w-full flex flex-col justify-center px-16 text-white">
                    <div className="max-w-md">
                        <div className="w-12 h-1 bg-indigo-500 mb-8 rounded-full" />
                        <h3 className="text-4xl font-bold mb-6 leading-tight">Scale your business with speed and precision.</h3>
                        <p className="text-lg text-indigo-100/80 mb-10">
                            Join thousands of businesses that trust Marketplace for their product management and distribution needs.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-3xl font-bold text-white mb-1">99%</div>
                                <div className="text-xs text-indigo-200/60 uppercase tracking-wider font-semibold">Uptime Sync</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                                <div className="text-xs text-indigo-200/60 uppercase tracking-wider font-semibold">Live Support</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative circles */}
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute -top-48 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
