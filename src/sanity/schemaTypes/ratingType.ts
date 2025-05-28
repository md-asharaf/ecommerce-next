import { defineField, defineType } from "sanity";
export const ratingType = defineType({
    name: "rating",
    title: "Ratings",
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
        })
    ],
    preview: {
        select: {
            productName: "product.name",
            rating: "rating",
            title: "title",
        },
        prepare({ productName, rating, title }) {
            return {
                title,
                subtitle: `Rating: ${rating}/5 on ${productName}`,
            };
        },
    },
});
