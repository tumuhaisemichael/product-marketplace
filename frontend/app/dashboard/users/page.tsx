'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useUsers, User } from '@/lib/hooks/useUsers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, Trash2, Shield, UserPlus, Loader2 } from 'lucide-react';

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
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
                <Shield size={64} className="mb-4 opacity-20" />
                <h2 className="text-xl font-semibold">Access Denied</h2>
                <p>Only business administrators can manage users.</p>
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
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 border-b-4 border-indigo-500 pb-1">Team Management</h1>
                    <p className="text-slate-500 mt-2">Add members and assign roles to your business.</p>
                </div>
                <Button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all h-11"
                >
                    {isAdding ? 'Cancel' : (
                        <>
                            <UserPlus size={18} className="mr-2" />
                            Invite Member
                        </>
                    )}
                </Button>
            </div>

            {isAdding && (
                <Card className="border-indigo-100 bg-indigo-50/30 overflow-hidden">
                    <CardHeader className="bg-white border-b border-indigo-50">
                        <CardTitle className="text-lg">Register New Member</CardTitle>
                        <CardDescription>Members will be able to log in with these credentials.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 bg-white">
                        <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    required
                                    value={newUser.username}
                                    onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                                    placeholder="johndoe"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={newUser.email}
                                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Initial Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={newUser.password}
                                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Assign Role</Label>
                                <Select
                                    value={newUser.role}
                                    onValueChange={val => setNewUser({ ...newUser, role: val })}
                                >
                                    <SelectTrigger className="h-10">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map(role => (
                                            <SelectItem key={role.id} value={role.name}>
                                                {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="md:col-span-2 pt-2">
                                <Button type="submit" className="w-full md:w-auto px-8 bg-indigo-600">
                                    Confirm and Add Member
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {loading ? (
                    <div className="flex justify-center items-center py-20 col-span-2">
                        <Loader2 className="animate-spin text-indigo-500" size={40} />
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 border-2 border-dashed rounded-2xl col-span-2">
                        No team members found. Start by inviting someone!
                    </div>
                ) : (
                    users.map(user => (
                        <Card key={user.id} className="hover:shadow-lg transition-all border-slate-200 overflow-hidden group">
                            <CardContent className="p-0">
                                <div className="flex items-center p-6 bg-white">
                                    <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mr-4 border border-slate-200 shrink-0">
                                        <Shield size={24} className={user.role === 'admin' ? 'text-amber-500' : 'text-slate-400'} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-slate-900 truncate">{user.username}</h3>
                                            {user.is_business_admin && (
                                                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 rounded-full uppercase tracking-wider">Owner</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-500 truncate">{user.email}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                            ${user.role === 'admin' && 'bg-amber-50 text-amber-700 border border-amber-100'}
                                            ${user.role === 'editor' && 'bg-blue-50 text-blue-700 border border-blue-100'}
                                            ${user.role === 'approver' && 'bg-emerald-50 text-emerald-700 border border-emerald-100'}
                                            ${user.role === 'viewer' && 'bg-slate-50 text-slate-600 border border-slate-100'}
                                        `}>
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>

                                        {!user.is_business_admin && (
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="opacity-0 group-hover:opacity-100 p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                                title="Remove user"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
