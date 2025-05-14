import { defineArrayMember, defineField, defineType } from "sanity";
import { Product } from "../../../sanity.types";
export const reviewType = defineType({
    name: "review",
    title: "Reviews",
    type: "document",
    fields: [
        defineField({
            name: "product",
            title: "Product",
            type: "reference",
            to: [{ type: "product" }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "clerkUserId",
            title: "Clerk User ID",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "rating",
            title: "Rating",
            type: "number",
            validation: (Rule) => Rule.required().min(1).max(5),
        }),
        defineField({
            name: "review",
            title: "Review",
            type: "text",
            validation: (Rule) => Rule.min(10).max(500),
        }),
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.min(2).max(100),
        }),
        defineField({
            name: "images",
            title: "Images",
            type: "array",
            of: [
                defineArrayMember({
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                }),
            ],
            validation: (Rule) => Rule.max(5),
        }),
    ],
    preview: {
        select: {
            productName: "product.name",
            rating: "rating",
            title: "title"
        },
        prepare({ productName, rating, title }) {
            return {
                title,
                subtitle: `Rating: ${rating}/5 on ${productName}`,
            };
        },
    },
});
