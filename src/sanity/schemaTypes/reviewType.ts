import { defineArrayMember, defineField, defineType } from "sanity";
export const reviewType = defineType({
    name: "review",
    title: "Reviews",
    type: "document",
    fields: [
        defineField({
            name: "description",
            title: "Description",
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
            title: "title",
        },
        prepare({ title }) {
            return {
                title,
                subtitle: `Title: ${title}`,
            };
        },
    },
});
