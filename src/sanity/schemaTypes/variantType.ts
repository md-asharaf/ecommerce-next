import { defineField, defineType } from "sanity";

export const variantType = defineType({
    name: "variant",
    title: "Variants",
    type: "document",
    fields: [
        defineField({
            name: "color",
            title: "Color",
            type: "string",
            description: "Optional color variant"
        }),
        defineField({
            name: "size",
            title: "Size",
            type: "string",
            description: "Optional size variant"
        }),
        defineField({
            name: "stock",
            title: "Stock",
            type: "number",
            validation: (Rule) => Rule.required().min(0)
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: (Rule) => Rule.required().min(0)
        }),
        defineField({
            name: "sku",
            title: "SKU",
            type: "string",
            validation: (Rule) => Rule.required()
        })
    ],
    preview: {
        select: {
            title: "sku",
            subtitle: "color",
            media: "images.0",
            price: "price",
            stock: "stock"
        },
        prepare({ title, subtitle, media, price, stock }) {
            return {
                title,
                subtitle: `${subtitle || 'No color'} | $${price} | Stock: ${stock}`,
                media
            }
        }
    }
})