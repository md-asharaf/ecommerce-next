import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
    if (!RAZORPAY_WEBHOOK_SECRET) {
        console.error("RAZORPAY_WEBHOOK_SECRET is not defined.");
        return NextResponse.json(
            { message: "Server configuration error" },
            { status: 500 }
        );
    }

    let body: string;
    let signature: string | null;
    let event: any;

    try {
        body = await req.text();
        signature = req.headers.get("x-razorpay-signature");

        // 2. Signature Verification
        if (!signature) {
            console.warn(
                "Webhook received without x-razorpay-signature header."
            );
            return NextResponse.json(
                { message: "Signature header missing" },
                { status: 400 }
            );
        }

        const expectedSignature = crypto
            .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
            .update(body)
            .digest("hex");

        if (signature !== expectedSignature) {
            console.warn("Invalid Razorpay webhook signature.");
            return NextResponse.json(
                { message: "Invalid signature" },
                { status: 400 }
            );
        }

        event = JSON.parse(body);
        console.log(
            "Received Razorpay webhook event:",
            event.event,
            "for payment ID:",
            event.payload?.payment?.entity?.id
        );
    } catch (error) {
        console.error(
            "Error parsing webhook body or verifying signature:",
            error
        );
        return NextResponse.json(
            { message: "Invalid request or processing error" },
            { status: 400 }
        );
    }

    // Process only relevant events
    if (
        event.event === "payment.captured" ||
        event.event === "payment.failed"
    ) {
        try {
            // Safely extract data using optional chaining
            const razorpayPaymentId = event.payload?.payment?.entity?.id;
            const razorpayOrderId = event.payload?.payment?.entity?.order_id;
            const amount = event.payload?.payment?.entity?.amount;
            const currency = event.payload?.payment?.entity?.currency;
            const method = event.payload?.payment?.entity?.method;
            // Your internal order ID from notes
            const internalOrderId =
                event.payload?.order?.entity?.notes?.orderId;

            if (
                !razorpayPaymentId ||
                !razorpayOrderId ||
                amount === undefined ||
                !currency ||
                !internalOrderId
            ) {
                console.error(
                    "Missing essential data in webhook payload:",
                    event
                );
                return NextResponse.json(
                    { message: "Missing essential data in payload" },
                    { status: 400 }
                );
            }

            const paymentStatus =
                event.event === "payment.captured" ? "PAID" : "FAILED";

            // Idempotency: Use upsert to handle duplicate webhooks
            const paymentRecord = await prisma.payment.upsert({
                where: { razorpayPaymentId },
                update: {
                    status: paymentStatus,
                },
                create: {
                    razorpayPaymentId: razorpayPaymentId,
                    razorpayOrderId: razorpayOrderId,
                    amount: amount,
                    currency: currency,
                    status: paymentStatus,
                    method: method,
                    orderId: internalOrderId,
                },
            });

            console.log(
                `Payment record ${paymentRecord.id} ${paymentRecord.status} for order ${internalOrderId}`
            );

            // Update the associated Order status
            await prisma.order.update({
                where: { id: internalOrderId },
                data: {
                    status: paymentStatus === "PAID" ? "PROCESSING" : "PENDING",
                },
            });

            console.log(
                `Order ${internalOrderId} status updated to ${paymentStatus === "PAID" ? "COMPLETED" : "FAILED"}`
            );
        } catch (dbError) {
            console.error(
                "Database operation failed for webhook event:",
                event.event,
                "Error:",
                dbError
            );
            // Return 500 to tell Razorpay to retry the webhook
            return NextResponse.json(
                { message: "Internal server error during database operation" },
                { status: 500 }
            );
        }
    } else {
        // Log other events that you might not be processing currently
        console.log("Received unhandled Razorpay webhook event:", event.event);
    }

    return NextResponse.json({ received: true }, { status: 200 });
}
