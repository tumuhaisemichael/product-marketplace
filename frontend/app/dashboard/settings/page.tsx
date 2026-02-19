'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Building, Shield, Mail, Lock, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
    const { user } = useAuth();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Settings</h1>
                <p className="text-slate-500 mt-1">Manage your account preferences and business configuration.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Overview */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="rounded-3xl border-slate-200/60 overflow-hidden group">
                        <div className="h-24 bg-gradient-to-br from-indigo-500 to-blue-600" />
                        <CardContent className="relative pt-0 flex flex-col items-center">
                            <div className="absolute -top-12 w-24 h-24 rounded-2xl bg-white p-1 shadow-xl">
                                <div className="w-full h-full bg-slate-50 rounded-xl flex items-center justify-center text-3xl font-black text-indigo-600 border border-slate-100">
                                    {user?.username?.[0]?.toUpperCase()}
                                </div>
                            </div>
                            <div className="mt-16 text-center">
                                <h3 className="text-xl font-bold text-slate-900">{user?.username}</h3>
                                <p className="text-slate-500 text-sm mb-4">{user?.email}</p>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-black uppercase tracking-wider">
                                    <Shield size={12} />
                                    {user?.role}
                                </div>
                            </div>
                        </CardContent>
                        <div className="p-6 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <span>Last login</span>
                            <span className="text-slate-900">Today, 10:45 AM</span>
                        </div>
                    </Card>

                    <Card className="rounded-3xl border-slate-200/60 p-6 bg-slate-900 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                        <h4 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-4">Account Security</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 size={18} className="text-emerald-400 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm">Two-Factor Auth</p>
                                    <p className="text-xs opacity-60">Extra layer of protection active.</p>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full mt-6 bg-transparent border-white/20 text-white hover:bg-white hover:text-slate-900 rounded-xl font-bold h-11">
                            Update Security
                        </Button>
                    </Card>
                </div>

                {/* Settings Forms */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Account Settings */}
                    <Card className="rounded-3xl border-slate-200/60 shadow-xl shadow-slate-200/20">
                        <CardHeader className="p-8 border-b border-slate-50">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                    <User size={20} />
                                </div>
                                <CardTitle className="text-xl font-bold">Profile Information</CardTitle>
                            </div>
                            <CardDescription>Update your personal details and how others see you.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-sm font-bold text-slate-700">Username</Label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500" />
                                        <Input id="username" defaultValue={user?.username} className="pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl font-medium" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-bold text-slate-700">Email Address</Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500" />
                                        <Input id="email" defaultValue={user?.email} className="pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl font-medium" />
                                    </div>
                                </div>
                            </div>
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-indigo-100">
                                Save Profile
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Business Settings */}
                    {user?.is_business_admin && (
                        <Card className="rounded-3xl border-slate-200/60 shadow-xl shadow-slate-200/20">
                            <CardHeader className="p-8 border-b border-slate-50">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                                        <Building size={20} />
                                    </div>
                                    <CardTitle className="text-xl font-bold">Business Configuration</CardTitle>
                                </div>
                                <CardDescription>Configure your marketplace identity and visibility.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="business-name" className="text-sm font-bold text-slate-700">Legal Business Name</Label>
                                    <div className="relative group">
                                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500" />
                                        <Input id="business-name" defaultValue={user?.business?.name} className="pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl font-medium" />
                                    </div>
                                </div>
                                <Button className="bg-slate-900 hover:bg-black text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-slate-100">
                                    Update Business
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Password Change */}
                    <Card className="rounded-3xl border-slate-200/60 shadow-xl shadow-slate-200/20">
                        <CardHeader className="p-8 border-b border-slate-50">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                    <Lock size={20} />
                                </div>
                                <CardTitle className="text-xl font-bold">Update Password</CardTitle>
                            </div>
                            <CardDescription>Secure your account with a fresh, strong password.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="new-password" className="text-sm font-bold text-slate-700">New Password</Label>
                                    <Input id="new-password" type="password" className="h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password" className="text-sm font-bold text-slate-700">Confirm New Password</Label>
                                    <Input id="confirm-password" type="password" className="h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-xl" />
                                </div>
                            </div>
                            <Button variant="outline" className="border-2 font-bold h-12 px-8 rounded-xl">
                                Change Password
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
