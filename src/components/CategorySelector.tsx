"use client";
import { useRouter } from "next/navigation";
import { Category } from "../../sanity.types"
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
interface CategorySelectorProps {
    categories: Category[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const router = useRouter();
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full max-w-full relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold px-4 py-2 rounded-md"
                >
                    {value
                        ? categories.find((category) => category._id === value)?.title
                        : "Filter by Category"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" collisionPadding={16}>
                <Command>
                    <CommandInput placeholder="Search category..." className="h-9" onKeyDown={
                        (e) => {
                            if (e.key == "Enter") {
                                const selectedCategory = categories.find((category) => category.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase())
                                );
                                if (selectedCategory?.slug?.current) {
                                    setValue(selectedCategory._id);
                                    router.push(`/category/${selectedCategory.slug.current}`);
                                    setOpen(false)
                                }
                            }
                        }
                    } />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category.title}
                                    onSelect={() => {
                                        setValue(category._id === value ? "" : category._id);
                                        router.push(`/category/${category?.slug?.current}`);
                                        setOpen(false)
                                    }}
                                >{category.title}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === category._id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}


export default CategorySelector