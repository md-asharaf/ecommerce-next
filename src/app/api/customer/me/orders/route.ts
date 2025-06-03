import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async () => {
    const user = await currentUser();
    const orders = await prisma.order.findMany({
        where: { customerId: user?.id },
    });
    if (!orders) {
        return NextResponse.json(
            { message: "No orders found" },
            { status: 404 }
        );
    }
    return NextResponse.json({ data: { orders } }, { status: 200 });
};
