import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag, BarChart2, ShieldCheck } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc]">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                            Marketplace
                        </span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                            Browse
                        </Link>
                        <Link href="/login">
                            <Button variant="ghost" size="sm">Login</Button>
                        </Link>
                        <Link href="/register">
                            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="flex-1 pt-24">
                {/* Hero Section */}
                <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    {/* Background decorations */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px]" />
                        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-100/50 rounded-full blur-[100px]" />
                    </div>

                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-left space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold tracking-wider uppercase">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                Next Generation Marketplace
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                                Elevate Your <br />
                                <span className="text-gradient">Business Strategy</span>
                            </h1>

                            <p className="text-lg lg:text-xl text-slate-600 max-w-xl leading-relaxed">
                                The ultimate ecosystem to manage, track, and scale your business products with AI-powered insights and seamless integration.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link href="/register">
                                    <Button size="lg" className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-lg shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1">
                                        Start Your Business <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link href="/products">
                                    <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-2 hover:bg-slate-50 transition-all">
                                        Explore Marketplace
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-slate-500 pt-8 border-t border-slate-200/50">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>
                                    ))}
                                </div>
                                <p>Joined by <span className="font-bold text-slate-900">500+</span> businesses this month</p>
                            </div>
                        </div>

                        <div className="relative lg:block animate-float">
                            <div className="relative z-10 glass rounded-3xl p-8 shadow-2xl overflow-hidden border-slate-200/50">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="h-40 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 text-white flex flex-col justify-between">
                                            <BarChart2 className="w-8 h-8" />
                                            <div>
                                                <div className="text-2xl font-bold">+128%</div>
                                                <div className="text-xs opacity-80 text-white/90">Growth Rate</div>
                                            </div>
                                        </div>
                                        <div className="h-32 rounded-2xl bg-white border border-slate-100 p-6 flex flex-col justify-between">
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div className="text-sm font-semibold text-slate-700">Verified Seller</div>
                                        </div>
                                    </div>
                                    <div className="pt-8 space-y-4">
                                        <div className="h-32 rounded-2xl bg-white border border-slate-100 p-6 flex flex-col justify-between shadow-sm">
                                            <div className="flex justify-between items-start">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">NEW</span>
                                            </div>
                                            <div className="text-sm font-semibold text-slate-700">Recent Sale</div>
                                        </div>
                                        <div className="h-40 rounded-2xl bg-slate-900 p-6 flex flex-col justify-between shadow-xl">
                                            <div className="space-y-1">
                                                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="w-[70%] h-full bg-indigo-500"></div>
                                                </div>
                                                <div className="w-full h-1 bg-slate-800 rounded-full"></div>
                                                <div className="w-full h-1 bg-slate-800 rounded-full"></div>
                                            </div>
                                            <div className="text-white text-lg font-bold">Analytics Preview</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Features section could go here */}
            </main>
        </div>
    );
}
