import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            items: true,
            customer: true,
            shippingAddress: true,
        },
    });
    if (!order) {
        return NextResponse.json(
            { message: "Order not found" },
            { status: 404 }
        );
    }
    return NextResponse.json({ data: { order } }, { status: 200 });
};
