import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

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
            name: "image",
            title: "Product Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "descrription",
            title: "Description",
            type: "blockContent",
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "reference", to: [{ type: "category" }] }],
        }),
        defineField({
            name: "stock",
            title: "Stock",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
    ],
    preview: {
        select: {
            title: "name",
            media: "image",
            subtitle: "price",
        },
        prepare(select) {
            return {
                title: select.title,
                media: select.media,
                subtitle: `$${select.subtitle}`,
            };
        },
    },
});
