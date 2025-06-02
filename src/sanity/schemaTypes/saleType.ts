import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
    name: "sale",
    title: "Sales",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            title: "Sale Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Sale Description",
            type: "text",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "discountType",
            title: "Discount Type",
            type: "string",
            options: {
                list: [
                    { title: "Percentage", value: "percentage" },
                    { title: "Fixed Amount", value: "fixed" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "discountValue",
            title: "Discount Value",
            type: "number",
            description: "Enter percentage (1-100) or fixed amount",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "couponCode",
            title: "Coupon Code",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "startDate",
            title: "Start Date",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "expiryDate",
            title: "Expiry Date",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "isActive",
            title: "Is Active",
            type: "boolean",
            description: "Toggle to activate/deactivate the sale",
            initialValue: true,
        }),
        defineField({
            name: "usageLimit",
            title: "Usage Limit",
            type: "number",
            description: "Maximum number of times this sale can be used (leave empty for unlimited)",
        }),
        defineField({
            name: "minOrderAmount",
            title: "Minimum Order Amount",
            type: "number",
            description: "Minimum order amount required to apply this sale",
        }),
    ],
    preview: {
        select: {
            title: "title",
            discountType: "discountType",
            discountValue: "discountValue",
            isActive: "isActive",
            couponCode: "couponCode",
        },
        prepare({ title, discountType, discountValue, isActive, couponCode }) {
            const status = isActive ? "Active" : "Inactive";
            const discountDisplay = discountType === "percentage" 
                ? `${discountValue}% off` 
                : `$${discountValue} off`;
            return {
                title: `${title} - ${status}`,
                subtitle: `${discountDisplay} - Code: ${couponCode}`,
                media: TagIcon,
            };
        },
    },
});
