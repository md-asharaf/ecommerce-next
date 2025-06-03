import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async () => {
    const user = await currentUser();
    const addresses = await prisma.address.findMany({
        where: { customerId: user?.id },
    });
    if (!addresses) {
        return NextResponse.json(
            { message: "No addresses found" },
            { status: 404 }
        );
    }
    return NextResponse.json({ data: { addresses } }, { status: 200 });
};
