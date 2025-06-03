import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
// get customer by id
export const GET = async (req: Request) => {
    const user = await currentUser();
    if (!user) {
        return NextResponse.json(
            { message: "Unauthorized", data: null },
            { status: 401 }
        );
    }
    const customer = await prisma.customer.findUnique({
        where: { id: user.id },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            imageUrl: true,
        },
    });
    if (!customer) {
        return new Response("Customer not found", { status: 404 });
    }
    return NextResponse.json(
        { data: { customer }, message: "customer retrieved successfully" },
        { status: 200 }
    );
};

// update customer by id
export const PUT = async (req: Request) => {
    const user = await currentUser();
    if (!user) {
        return NextResponse.json(
            { message: "Unauthorized", data: null },
            { status: 401 }
        );
    }
    const body = await req.json();
    const { email, firstName, lastName, phone, imageUrl } = body;
    if (!email || !firstName || !lastName || !phone || !imageUrl) {
        return NextResponse.json(
            { message: "All fields are required", data: null },
            { status: 400 }
        );
    }
    const updatedCustomer = await prisma.customer.update({
        where: { id: user.id },
        data: {
            email,
            firstName,
            lastName,
            phone,
            imageUrl,
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            imageUrl: true,
        },
    });

    return NextResponse.json(
        {
            data: { customer: updatedCustomer },
            message: "customer updated successfully",
        },
        { status: 200 }
    );
};
