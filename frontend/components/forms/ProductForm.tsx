'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ShoppingBag, DollarSign, FileText, Tag, ChevronLeft, Save } from 'lucide-react';
import Link from 'next/link';

const productSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').max(255),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.number().min(0, 'Price must be positive'),
    status: z.enum(['draft', 'pending_approval', 'approved', 'rejected']).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
    initialData?: ProductFormData;
    onSubmit: (data: ProductFormData) => void;
    isSubmitting?: boolean;
}

export default function ProductForm({ initialData, onSubmit, isSubmitting }: ProductFormProps) {
    const form = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData || {
            name: '',
            description: '',
            price: 0,
            status: 'draft',
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/20 space-y-8">
                    {/* Basic Info Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                            <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                                <Tag size={18} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">General Information</h3>
                        </div>

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-bold text-slate-700">Product Name</FormLabel>
                                    <FormControl>
                                        <div className="relative group">
                                            <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                            <Input
                                                placeholder="e.g. Wireless Noise Cancelling Headphones"
                                                className="pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl font-medium"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormDescription className="text-[11px]">Give your product a short and descriptive name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-bold text-slate-700">Product Description</FormLabel>
                                    <FormControl>
                                        <div className="relative group">
                                            <FileText className="absolute left-3 top-4 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                            <Textarea
                                                placeholder="Describe the key features and benefits of your product..."
                                                className="pl-10 min-h-[160px] bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl font-medium resize-none py-3"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Pricing Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                                <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                                    <DollarSign size={18} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">Pricing</h3>
                            </div>

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold text-slate-700">Base Price ($)</FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="0.00"
                                                    className="pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-emerald-50 transition-all rounded-xl font-bold"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {initialData && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                                    <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
                                        <Save size={18} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">Publication</h3>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-bold text-slate-700">Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-12 bg-slate-50/50 border-slate-200 focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl font-medium">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                                                    <SelectItem value="draft" className="py-3 font-medium">Draft (Internal only)</SelectItem>
                                                    <SelectItem value="pending_approval" className="py-3 font-medium">Submit for Approval</SelectItem>
                                                    <SelectItem value="approved" className="py-3 font-medium text-emerald-600">Approved (Live)</SelectItem>
                                                    <SelectItem value="rejected" className="py-3 font-medium text-rose-600">Rejected</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => window.history.back()}
                        className="h-12 px-8 rounded-xl font-bold text-slate-500 hover:text-slate-900 transition-all flex items-center gap-2"
                    >
                        <ChevronLeft size={20} />
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-12 px-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Saving...
                            </span>
                        ) : (
                            <>
                                <Save size={20} />
                                {initialData ? 'Update Product' : 'Create Product'}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
