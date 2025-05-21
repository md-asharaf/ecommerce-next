import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
    name: "order",
    title: "Orders",
    type: "document",
    icon: BasketIcon,
    fields: [
        defineField({
            name: "orderId",
            title: "Order Id",
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
            name: "clerkUserId",
            title: "Clerk User ID",
            type: "string",
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
            name: "totalAmount",
            title: "Total Amount",
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
        defineField({
            name: "firstName",
            title: "First Name",
            type: "string",
            validation: (Rule) => Rule.required().min(2),
        }),
        defineField({
            name: "lastName",
            title: "Last Name",
            type: "string",
            validation: (Rule) => Rule.required().min(2),
        }),
        defineField({
            name: "street",
            title: "Street Address",
            type: "string",
            validation: (Rule) => Rule.required().min(5),
        }),
        defineField({
            name: "city",
            title: "City",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "state",
            title: "State/Province",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "country",
            title: "Country",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "zip",
            title: "Postal Code",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "phone",
            title: "Phone Number",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            firstName: "firstName",
            lastName: "lastName",
            amount: "totalAmount",
            currency: "currency",
            orderId: "orderId",
            email: "email",
        },
        prepare(select) {
            const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;
            return {
                title: `${select.firstName} ${select.lastName} (${orderIdSnippet})`,
                subtitle: `${select.amount} ${select.currency}, ${select.email}`,
                media: BasketIcon,
            };
        },
    },
});
