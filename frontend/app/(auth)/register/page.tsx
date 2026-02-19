'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Building2, User, Mail, Lock, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        business_name: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await apiClient.post('/auth/register/', formData);
            router.push('/login?registered=true');
        } catch (err: any) {
            setError(err.response?.data?.username?.[0] || err.response?.data?.detail || 'Registration failed. Please check your details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left side - Marketing/Info */}
            <div className="hidden lg:flex flex-1 relative bg-indigo-600 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 to-blue-800 z-10" />

                <div className="relative z-20 w-full flex flex-col justify-between p-16 text-white">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 mb-12">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                <ShoppingBag className="text-indigo-600 w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">Marketplace</span>
                        </Link>

                        <h2 className="text-5xl font-extrabold mb-8 leading-tight">
                            Start your business journey today.
                        </h2>

                        <div className="space-y-6">
                            {[
                                "Global reach for your products",
                                "Advanced inventory analytics",
                                "Secure payment processing",
                                "24/7 dedicated business support"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-indigo-50 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-lg">
                        <p className="italic text-indigo-50 mb-4">
                            "Switching to Marketplace was the best decision for our retail business. Our efficiency increased by 40% in just two months."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-300" />
                            <div>
                                <div className="font-bold">Sarah Chen</div>
                                <div className="text-xs text-indigo-200">Founder, EcoStyle</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            </div>

            {/* Right side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="mb-8">
                        <Link href="/" className="lg:hidden inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-6">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Back
                        </Link>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create your Business</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Join the marketplace and start managing products.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="business_name" className="text-sm font-semibold text-slate-700">Business Name</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                    <Building2 className="h-5 w-5" />
                                </div>
                                <Input
                                    id="business_name"
                                    type="text"
                                    required
                                    value={formData.business_name}
                                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                                    placeholder="e.g. Acme Corp"
                                    className="pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-sm font-semibold text-slate-700">Admin Username</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                    <User className="h-5 w-5" />
                                </div>
                                <Input
                                    id="username"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    placeholder="johndoe"
                                    className="pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="john@example.com"
                                    className="pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-70"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creating Account...
                                </span>
                            ) : 'Create Business'}
                        </Button>

                        <p className="text-center text-sm text-slate-600 mt-6 font-medium">
                            Already have an account?{' '}
                            <Link href="/login" className="text-indigo-600 hover:text-indigo-500 font-bold hover:underline decoration-indigo-200 underline-offset-4">
                                Log in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
