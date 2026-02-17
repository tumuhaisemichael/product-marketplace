import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Product } from "@/lib/hooks/useProducts";
import { Check, Edit, Trash } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
    canEdit: boolean;
    canApprove: boolean;
    onApprove?: (id: number) => void;
    onDelete?: (id: number) => void;
}

export default function ProductCard({
    product,
    canEdit,
    canApprove,
    onApprove,
    onDelete,
}: ProductCardProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.business_name}</CardDescription>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${product.status === 'approved' ? 'bg-green-100 text-green-800' :
                        product.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                        }`}>
                        {product.status.replace('_', ' ')}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {product.description}
                </p>
                <div className="text-lg font-bold">${Number(product.price).toFixed(2)}</div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                    {canEdit && (
                        <Link href={`/dashboard/products/${product.id}`}>
                            <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                            </Button>
                        </Link>
                    )}
                </div>
                <div className="flex gap-2">
                    {canApprove && product.status !== 'approved' && onApprove && (
                        <Button size="sm" onClick={() => onApprove(product.id)} className="bg-green-600 hover:bg-green-700">
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
