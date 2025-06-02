import { TrolleyIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const productType = defineType({
    name: "product",
    title: "Products",
    type: "document",
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: "name",
            title: "Product Name",
            type: "string",
            validation: (Rule) => Rule.required().min(1).max(100),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            validation: (Rule) => Rule.required(),
            options: {
                source: "name",
                maxLength: 96,
            },
        }),
        defineField({
            name: "images",
            title: "Product Images",
            type: "array",
            of: [
                defineArrayMember({
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        defineField({
                            name: "alt",
                            title: "Alt Text",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                }),
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: "videos",
            title: "Product Videos",
            type: "array",
            of: [
                defineArrayMember({
                    type: "file",
                    options: {
                        accept: "video/*",
                    },
                    fields: [
                        defineField({
                            name: "title",
                            title: "Video Title",
                            type: "string",
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "price",
            title: "Current Price",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
            description: "Current selling price of the product",
        }),
        defineField({
            name: "originalPrice",
            title: "Original Price",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
            description: "Original price before any discounts",
        }),
        defineField({
            name: "featured",
            title: "Featured Product",
            type: "boolean",
            initialValue: false,
            description: "Toggle to feature this product on the homepage",
        }),
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [
                defineArrayMember({
                    type: "reference",
                    to: [{ type: "category" }],
                }),
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: "variants",
            title: "Product Variants",
            type: "array",
            of: [
                defineArrayMember({
                    type: "reference",
                    to: [{ type: "variant" }],
                }),
            ],
        }),
        defineField({
            name: "stock",
            title: "Stock Quantity",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
            description: "Available quantity in stock",
        }),
        defineField({
            name: "brand",
            title: "Brand",
            type: "reference",
            to: [{ type: "brand" }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            of: [
                defineArrayMember({
                    type: "string",
                }),
            ],
            options: {
                layout: "tags",
            },
        }),
        defineField({
            name: "metadata",
            title: "SEO Metadata",
            type: "object",
            fields: [
                defineField({
                    name: "metaTitle",
                    title: "Meta Title",
                    type: "string",
                }),
                defineField({
                    name: "metaDescription",
                    title: "Meta Description",
                    type: "text",
                    rows: 3,
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: "name",
            media: "images.0",
            price: "price",
            stock: "stock",
        },
        prepare({ title, media, price, stock }) {
            return {
                title,
                media,
                subtitle: `$${price} | Stock: ${stock}`,
            };
        },
    },
});
