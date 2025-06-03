import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const secret = process.env.CLERK_SIGNING_SECRET;
    if (!secret)
        return NextResponse.json(
            { message: "Missing secret" },
            { status: 500 }
        );

    const wh = new Webhook(secret);
    const body = await req.text();
    const headerPayload = await headers();

    const event = wh.verify(body, {
        "svix-id": headerPayload.get("svix-id")!,
        "svix-timestamp": headerPayload.get("svix-timestamp")!,
        "svix-signature": headerPayload.get("svix-signature")!,
    }) as WebhookEvent;

    if (event.type === "user.created" || event.type === "user.updated") {
        const {
            id,
            primary_email_address_id,
            first_name,
            last_name,
            primary_phone_number_id,
            image_url,
        } = event.data;
        const customer = await prisma.customer.upsert({
            where: { id },
            update: {},
            create: {
                id,
                email: primary_email_address_id!,
                firstName: first_name || "",
                lastName: last_name || "",
                phone: primary_phone_number_id,
                imageUrl: image_url,
            },
        });
        if (!customer) {
            return NextResponse.json(
                { message: "Failed to create or update customer" },
                { status: 500 }
            );
        }
        if (event.type === "user.created") {
            // create cart for this user
            const cart = await prisma.cart.create({
                data: {
                    customerId: id,
                },
            });
            console.log(
                cart
                    ? "Cart created successfully" + cart.id
                    : "Failed to create cart"
            );
        }
    } else if (event.type === "user.deleted") {
        const { id } = event.data;
        await prisma.customer.delete({
            where: { id },
        });
    }
    return NextResponse.json("OK");
}
