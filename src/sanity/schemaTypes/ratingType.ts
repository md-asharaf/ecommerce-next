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
        }),
        defineField({
            name: "review",
            title: "Review",
            type: "reference",
            to: [{ type: "review" }],
        })
    ],
    preview: {
        select: {
            productName: "product.name",
            rating: "rating",
        },
        prepare({ productName, rating }) {
            return {
                subtitle: `Rating: ${rating}/5 on ${productName}`,
            };
        },
    },
});
