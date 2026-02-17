import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductFiltersProps {
    filters: {
        status: string;
        search: string;
        sort: string;
    };
    onFilterChange: (filters: any) => void;
}

export default function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
    const handleChange = (key: string, value: string) => {
        onFilterChange({ ...filters, [key]: value });
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleChange('search', e.target.value)}
                className="w-full md:w-64"
            />

            <Select value={filters.status} onValueChange={(value) => handleChange('status', value === 'all' ? '' : value)}>
                <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending_approval">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
            </Select>

            <Select value={filters.sort} onValueChange={(value) => handleChange('sort', value)}>
                <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="-created_at">Newest</SelectItem>
                    <SelectItem value="created_at">Oldest</SelectItem>
                    <SelectItem value="price">Price: Low to High</SelectItem>
                    <SelectItem value="-price">Price: High to Low</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
