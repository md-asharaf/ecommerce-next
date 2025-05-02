import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
    name: "sales",
    title: "Sales",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            title: "Sale Title",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Sale Description",
            type: "text",
        }),
        defineField({
            name: "discountAmount",
            title: "Discount Amount",
            type: "number",
            description: "Amount off in percentage or fixed value",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "couponCode",
            title: "Coupon Code",
            type: "string",
        }),
        defineField({
            name: "validFrom",
            title: "Valid From",
            type: "datetime",
        }),
        defineField({
            name: "validUntil",
            title: "Valid Until",
            type: "datetime",
        }),
        defineField({
            name: "isActive",
            title: "Is Active",
            type: "boolean",
            description: "Toggle to activate/deactivate the sale",
            initialValue: true,
        }),
    ],
    preview:{
        select: {
            title: "title",
            discountAmount: "discountAmount",
            isActive: "isActive",
            couponCode: "couponCode",
        },
        prepare({ title, discountAmount,isActive,couponCode }) {
            const status = isActive ? "Active" : "Inactive";
            return {
                title: `${title} - ${isActive ? "Active" : "Inactive"}`,
                subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`,
                media: TagIcon,
            }
        }
    }
});
