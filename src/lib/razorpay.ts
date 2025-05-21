// 🚫 DO NOT import this file in any client component. Server-only Razorpay instance.
import "server-only";
import Razorpay from "razorpay";
const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_SECRET_KEY;
if (!key_id || !key_secret) {
    throw new Error(
        "Razorpay credentials are not set in environment variables"
    );
}

export const razorpay = new Razorpay({
    key_id,
    key_secret,
});
