import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Product } from "@/lib/hooks/useProducts";
import { Check, Edit, ShoppingCart, ExternalLink, Building2, User, Trash2 } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
    canEdit: boolean;
    canApprove: boolean;
    canDelete: boolean;
    onApprove?: (id: number) => void;
    onDelete?: (id: number) => void;
}

export default function ProductCard({
    product,
    canEdit,
    canApprove,
    canDelete,
    onApprove,
    onDelete,
}: ProductCardProps) {
    const isApproved = product.status === 'approved';
    const isRejected = product.status === 'rejected';

    return (
        <Card className="group overflow-hidden rounded-3xl border border-slate-200/60 bg-white hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 hover:-translate-y-2">
            {/* Image Placeholder */}
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                    <ShoppingCart className="w-16 h-16 opacity-20" />
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10">
                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md border shadow-sm uppercase tracking-wider ${isApproved ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200/50 bg-white/80' :
                            isRejected ? 'bg-rose-500/10 text-rose-600 border-rose-200/50 bg-white/80' :
                                'bg-amber-500/10 text-amber-600 border-amber-200/50 bg-white/80'
                        }`}>
                        {product.status.replace('_', ' ')}
                    </span>
                </div>

                {/* Quick Action Overlay */}
                <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors duration-500" />
            </div>

            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">
                        <Building2 className="w-3 h-3" />
                        <span className="truncate">{product.business_name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                        <User className="w-2.5 h-2.5" />
                        <span>{product.created_by_name}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">
                    {product.name}
                </h3>

                <p className="text-sm text-slate-500 line-clamp-2 mb-6 h-10 leading-relaxed">
                    {product.description || "No description provided for this premium marketplace item."}
                </p>

                <div className="flex items-end justify-between">
                    <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Price</span>
                        <div className="text-2xl font-black text-slate-900 leading-none">
                            <span className="text-sm font-bold text-indigo-500 mr-0.5">$</span>
                            {Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                    </div>

                    {!canEdit && !canApprove && (
                        <Button size="icon" variant="secondary" className="rounded-2xl w-12 h-12 bg-slate-50 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                            <ExternalLink className="w-5 h-5" />
                        </Button>
                    )}
                </div>
            </CardContent>

            {(canEdit || canApprove || canDelete) && (
                <CardFooter className="px-6 pb-6 pt-0 flex gap-2">
                    {canEdit && (
                        <Link href={`/dashboard/products/${product.id}`} className="flex-1">
                            <Button variant="outline" className="w-full h-11 rounded-xl border-slate-200 font-bold hover:bg-slate-50 transition-all">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                        </Link>
                    )}

                    {canApprove && product.status !== 'approved' && onApprove && (
                        <Button
                            onClick={() => onApprove(product.id)}
                            className="flex-1 h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95"
                        >
                            <Check className="w-4 h-4 mr-2" />
                            Approve
                        </Button>
                    )}

                    {canDelete && onDelete && (
                        <Button
                            onClick={() => onDelete(product.id)}
                            variant="ghost"
                            className="w-11 h-11 p-0 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                            title="Delete product"
                        >
                            <Trash2 className="w-5 h-5" />
                        </Button>
                    )}
                </CardFooter>
            )}
        </Card>
    );
}
