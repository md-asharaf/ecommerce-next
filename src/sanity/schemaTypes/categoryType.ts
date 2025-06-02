import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
    name: "category",
    title: "Categories",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "name",
            type: "string",
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "title",
            },
        }),
        defineField({
            name: "description",
            type: "text",
        }),
        defineField({
            name: "image",
            type: "image",
            options: {
                hotspot: true,
            },
        })
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "description",
        },
    },
});