"use client"

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
import { useState } from "react"

const filters = [
    { id: 1, title: "Best Selling" },
    { id: 2, title: "Best Rating" },
    { id: 3, title: "Price: Low to High" },
    { id: 4, title: "Price: High to Low" },
    { id: 5, title: "Featured" },
]

const SortingFilter = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? filters.find((filter) => filter.id.toString() === value)?.title
                        : "Sort by..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search sorting option..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No sorting option found.</CommandEmpty>
                        <CommandGroup>
                            {filters.map((filter) => (
                                <CommandItem
                                    key={filter.id}
                                    value={filter.id.toString()}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {filter.title}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === filter.id.toString() ? "opacity-100" : "opacity-0"
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

export default SortingFilter