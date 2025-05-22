"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useCategoryStore } from "@/store/category";
import { getAllCategories } from "@/sanity/lib/category/getAllCategories";

const CategorySelector = ({ categoryId = "" }: { categoryId?: string }) => {
    const [open, setOpen] = useState(false);
    const { categories, setCategories } = useCategoryStore();
    const router = useRouter();

    useEffect(() => {
        if (categories.length === 0) {
            getAllCategories().then(setCategories);
        }
    }, [categories.length, setCategories]);

    const handleSelect = (id: string, slug: string) => {
        router.push(`/category/${slug}`);
        setOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const match = categories.find((cat) =>
                cat.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase())
            );
            if (match?.slug?.current) {
                handleSelect(match._id, match.slug.current);
            }
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full flex justify-start items-center space-x-2 bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold px-4 py-2 rounded-md"
                >
                    {categoryId
                        ? categories.find((c) => c._id === categoryId)?.title
                        : "Show by Category"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" collisionPadding={16}>
                <Command>
                    <CommandInput placeholder="Search category..." className="h-9" onKeyDown={handleKeyDown} />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category.title}
                                    onSelect={() => handleSelect(category._id, category.slug?.current || "")}
                                >
                                    {category.title}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            categoryId === category._id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default CategorySelector;
