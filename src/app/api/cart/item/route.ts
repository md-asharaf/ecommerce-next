import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { productId, variantId, quantity, cartId, unitPrice, originalPrice } =
        await req.json();

    if (!productId || !quantity || !cartId || !unitPrice) {
        return NextResponse.json(
            {
                message:
                    "Product ID, quantity , cartId and unitPrice are required",
            },
            { status: 400 }
        );
    }

    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const item = await prisma.item.create({
        data: {
            productId,
            variantId,
            quantity,
            unitPrice,
            cartId,
            originalPrice,
        },
    });
    if (!item) {
        return NextResponse.json(
            { message: "Failed to add item to cart" },
            { status: 500 }
        );
    }
    return NextResponse.json(
        { message: "Item added to cart successfully", data: { item } },
        { status: 200 }
    );
};
