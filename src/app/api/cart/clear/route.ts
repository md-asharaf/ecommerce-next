import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PUT = async () => {
    const { userId } = await auth();
    const cart = await prisma.cart.findUnique({
        where: {
            customerId: userId || "",
        },
    });
    if (!cart) {
        return NextResponse.json(
            { message: "Cart not found" },
            { status: 404 }
        );
    }
    const clearedCart = await prisma.item.updateMany({
        where: {
            cartId: cart.id,
        },
        data: {
            cartId: null,
        },
    });
    if (!clearedCart) {
        return NextResponse.json(
            { message: "Failed to clear cart" },
            { status: 500 }
        );
    }
    return NextResponse.json(
        { message: "Cart cleared successfully" },
        { status: 200 }
    );
};
