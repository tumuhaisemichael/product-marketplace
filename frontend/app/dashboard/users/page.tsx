'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useUsers, User } from '@/lib/hooks/useUsers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, Trash2, Shield, UserPlus, Loader2, Mail, User as UserIcon, Lock, ChevronRight } from 'lucide-react';

export default function UsersPage() {
    const { hasPermission } = useAuth();
    const { users, roles, loading, fetchUsers, fetchRoles, createUser, deleteUser } = useUsers();

    const [isAdding, setIsAdding] = useState(false);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        role: 'viewer'
    });

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, [fetchUsers, fetchRoles]);

    if (!hasPermission('manage_users')) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 bg-white rounded-3xl border border-slate-200 shadow-sm p-12">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Shield size={40} className="text-slate-300" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Access Restricted</h2>
                <p className="max-w-xs text-center mt-2">Only business administrators have permission to manage team members and roles.</p>
            </div>
        );
    }

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUser(newUser);
            setNewUser({ username: '', email: '', password: '', role: 'viewer' });
            setIsAdding(false);
            fetchUsers();
        } catch (err) {
            alert('Failed to create user. Please ensure the username and email are unique.');
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to remove this user?')) {
            try {
                await deleteUser(id);
                fetchUsers();
            } catch (err) {
                alert('Failed to delete user');
            }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight text-gradient">Team Management</h1>
                    <p className="text-slate-500 mt-1">Add members, assign roles, and manage permissions.</p>
                </div>
                <Button
                    onClick={() => setIsAdding(!isAdding)}
                    className={`${isAdding ? 'bg-slate-200 text-slate-900 hover:bg-slate-300' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'} h-12 px-6 rounded-xl transition-all active:scale-95 flex items-center gap-2`}
                >
                    {isAdding ? (
                        'Cancel'
                    ) : (
                        <>
                            <UserPlus size={20} />
                            Invite Member
                        </>
                    )}
                </Button>
            </div>

            {/* Stats Summary (Optional/New) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total Members</p>
                    <p className="text-3xl font-black text-slate-900">{users.length}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Administrators</p>
                    <p className="text-3xl font-black text-indigo-600">{users.filter(u => u.role === 'admin').length}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Available Roles</p>
                    <p className="text-3xl font-black text-slate-900">{roles.length}</p>
                </div>
            </div>

            {isAdding && (
                <Card className="border-indigo-100 bg-white rounded-3xl overflow-hidden shadow-2xl shadow-indigo-100/20 animate-in slide-in-from-top-4 duration-500">
                    <CardHeader className="bg-indigo-50/50 border-b border-indigo-100/50 p-8">
                        <CardTitle className="text-xl font-bold text-slate-900">Invite a new teammate</CardTitle>
                        <CardDescription className="text-slate-500 text-base">They'll be able to access the business dashboard with their assigned role.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-sm font-bold text-slate-700">Username</Label>
                                <div className="relative group">
                                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500" />
                                    <Input
                                        id="username"
                                        required
                                        value={newUser.username}
                                        onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                                        placeholder="johndoe"
                                        className="pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl font-medium"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-bold text-slate-700">Email Address</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500" />
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={newUser.email}
                                        onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                        placeholder="john@example.com"
                                        className="pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl font-medium"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-bold text-slate-700">Temporary Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500" />
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={newUser.password}
                                        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                        placeholder="••••••••"
                                        className="pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl font-medium"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role" className="text-sm font-bold text-slate-700">Permissions Role</Label>
                                <Select
                                    value={newUser.role}
                                    onValueChange={val => setNewUser({ ...newUser, role: val })}
                                >
                                    <SelectTrigger className="h-12 bg-slate-50/50 border-slate-200 focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl font-medium">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                                        {roles.map(role => (
                                            <SelectItem key={role.id} value={role.name} className="py-3 font-medium">
                                                {role.name.charAt(0).toUpperCase() + role.name.slice(1)} Permissions
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="md:col-span-2 pt-2">
                                <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95">
                                    Launch invitation
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {loading ? (
                    <div className="flex justify-center items-center py-20 col-span-2">
                        <Loader2 className="animate-spin text-indigo-500" size={48} />
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 col-span-2">
                        <UserIcon className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No team members yet</h3>
                        <p className="text-slate-500 mb-6">Start growing your business team today.</p>
                        <Button onClick={() => setIsAdding(true)} variant="outline" className="border-2 font-bold px-8 rounded-xl">Add First Member</Button>
                    </div>
                ) : (
                    users.map(user => (
                        <Card key={user.id} className="group hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 border-slate-200/60 rounded-3xl overflow-hidden bg-white">
                            <CardContent className="p-0">
                                <div className="flex items-center p-8">
                                    <div className="relative">
                                        <div className="h-20 w-20 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors duration-500 shrink-0">
                                            {user.role === 'admin' ? <Shield size={32} className="text-amber-500" /> : <UserIcon size={32} />}
                                        </div>
                                        {user.is_business_admin && (
                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm ring-4 ring-amber-50">
                                                <Shield size={14} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0 ml-6">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-extrabold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{user.username}</h3>
                                            {user.is_business_admin && (
                                                <span className="px-3 py-1 text-[10px] font-black bg-amber-100 text-amber-700 rounded-lg uppercase tracking-widest">Business Owner</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <Mail size={14} />
                                            <p className="text-sm font-medium truncate">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3 shrink-0 ml-4">
                                        <div className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-colors
                                            ${user.role === 'admin' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-500 border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-500 group-hover:border-indigo-100'}
                                        `}>
                                            {user.role}
                                        </div>

                                        {!user.is_business_admin && (
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="opacity-0 group-hover:opacity-100 p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                                                title="Remove user"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="h-1.5 w-full bg-slate-50 group-hover:bg-indigo-600 transition-colors duration-500" />
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
