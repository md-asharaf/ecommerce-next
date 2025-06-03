import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async () => {
    const user = await currentUser();
    const ratings = await prisma.rating.findMany({
        where: { customerId: user?.id },
    });
    if (!ratings) {
        return NextResponse.json(
            { message: "No ratings found" },
            { status: 404 }
        );
    }
    return NextResponse.json({ data: { ratings } }, { status: 200 });
};
