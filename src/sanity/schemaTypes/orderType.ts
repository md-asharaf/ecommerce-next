import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
    name: "order",
    title: "Orders",
    type: "document",
    icon: BasketIcon,
    fields: [
        defineField({
            name: "orderNumber",
            title: "Order Number",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "razorpaySignature",
            title: "Razorpay Signature",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "razorpayReceiptId",
            title: "Razorpay Receipt ID",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "clerkUserId",
            title: "Clerk User ID",
            type: "string",
        }),
        defineField({
            name: "customerName",
            title: "Customer Name",
            type: "string",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "email",
            title: "Customer Email",
            type: "string",
        }),
        defineField({
            name: "razorpayPaymentId",
            title: "Razorpay Payment ID",
            type: "string",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "products",
            title: "Products",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "product",
                            title: "Product Bought",
                            type: "reference",
                            to: [{ type: "product" }],
                        }),
                        defineField({
                            name: "quantity",
                            title: "Quantity Purchased",
                            type: "number",
                        }),
                    ],
                    preview: {
                        select: {
                            product: "product.name",
                            quantity: "quantity",
                            image: "product.image",
                            price: "product.price",
                            currency: "product.currency",
                        },
                        prepare(select) {
                            return {
                                title: `${select.product} x (${select.quantity})`,
                                media: select.image,
                                subtitle: `$${select.price} ${select.quantity}`,
                            };
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "currency",
            title: "Currency",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "amountDiscount",
            title: "Amount Discount",
            type: "number",
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: "status",
            title: "Order Status",
            type: "string",
            options: {
                list: [
                    { title: "Pending", value: "pending" },
                    { title: "Paid", value: "paid" },
                    { title: "Shipped", value: "shipped" },
                    { title: "Delivered", value: "delivered" },
                    { title: "Cancelled", value: "cancelled" },
                ],
            },
        }),
        defineField({
            name: "orderDate",
            title: "Order Date",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            name: "customerName",
            amount: "price",
            currency: "currency",
            orderId: "orderNumber",
            email: "email",
        },
        prepare(select) {
            const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;
            return {
                title: `${select.name} (${orderIdSnippet})`,
                subtitle: `${select.amount} ${select.currency}, ${select.email}`,
                media: BasketIcon,
            };
        },
    },
});
