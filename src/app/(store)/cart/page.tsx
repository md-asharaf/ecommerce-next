"use client"
import { SignInButton, useAuth, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useCartStore } from "@/store/cart"
import { loadScript } from "@/lib/loadScript"
import { RazorpayOptions } from "@/types/razorpay"
import { createRazorpayOrder } from "@/actions/createRazorpayOrder"
import { RazorpaySuccessResponse, verifyRazorpaySignature } from "@/actions/verifyRazorpaySignature"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
export type Metadata = {
    email: string;
    clerkUserId: string;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    phone: string;
};
const CartPage = () => {
    const groupedItems = useCartStore((state) => state.items)
    const totalPrice = useCartStore((state) => state.getTotalPrice())
    const totalItems = useCartStore((state) => state.getTotalItems())
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error" | null>(null);
    const handleCheckout = async () => {
        if (!isSignedIn) return;
        setIsLoading(true)
        try {
            const metadata: Partial<Metadata> = {
                clerkUserId: user!.id,
                email: user?.emailAddresses?.[0].emailAddress || "Unknown",
            }
            const order = await createRazorpayOrder(groupedItems, metadata as Metadata);
            if (!order) {
                throw new Error("Order creation failed");
            }
            await loadScript("https://checkout.razorpay.com/v1/checkout.js");
            if (typeof window === "undefined" || !window.Razorpay) {
                console.error("Razorpay SDK not available");
                return;
            }
            const options: RazorpayOptions = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
                amount: order.amount as number,
                order_id: order.id,
                currency: order.currency,
                prefill: {
                    name: metadata.firstName + " " + metadata.lastName,
                    email: metadata.email,
                },
                theme: {
                    color: "#121212"
                },
                notes: order.notes,
                handler: async (response: RazorpaySuccessResponse) => {
                    setVerificationStatus("loading");
                    const url = await verifyRazorpaySignature(response);
                    if (url) setVerificationStatus("success");
                    else setVerificationStatus("error");
                    setTimeout(() => {
                        if (url) {
                            router.push(url);
                        } else {
                            setVerificationStatus(null);
                        }
                    }, url ? 2000 : 3000);
                }

            };
            try {
                const razorPopup = new window.Razorpay(options);
                razorPopup.open();
            } catch (error) {
                throw error;
            }
        } catch (error) {
            console.error("Error during checkout", error);
        } finally {
            setIsLoading(false)
        }

    }
    const data = groupedItems.map((item) => {
        return {
            product: item.product,
            quantity: item.quantity,
        }
    })
    if (groupedItems.length == 0) {
        return <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>
            <p className="text-gray-600 text-lg">Your Cart is Empty</p>
        </div>
    }
    return <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-2xl font-bold mb-4">
            Your Cart
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
            <DataTable columns={columns} data={data} />
            <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
                <h3 className="text-xl font-semibold">Order Summary</h3>
                <div className="mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>
                            Items:
                        </span>
                        <span>
                            {totalItems}
                        </span>
                    </p>
                    <p className="flex justify-between text-2xl font-bold border-t pt-2">
                        <span>
                            Total:
                        </span>
                        <span>
                            {totalPrice.toFixed(2)}
                        </span>
                    </p>
                    {
                        isSignedIn ? (
                            <button
                                onClick={handleCheckout}
                                disabled={isLoading}
                                className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                            >
                                {isLoading ? "PROCESSING" : "PROCEED TO CHECKOUT"}
                            </button>
                        ) : (
                            <SignInButton>
                                <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">SIGN IN TO CHECKOUT</button>
                            </SignInButton>
                        )
                    }
                </div>
            </div>
        </div>
        {verificationStatus && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    {verificationStatus === "loading" && (
                        <>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Verifying payment...</h2>
                            <div className="border-t-4 border-blue-500 h-8 w-8 rounded-full animate-spin" />
                        </>
                    )}
                    {verificationStatus === "success" && (
                        <>
                            <h2 className="text-xl font-semibold text-green-600 mb-4">Payment Successful!</h2>
                            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                                <svg className="h-8 w-8 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </>
                    )}
                    {verificationStatus === "error" && (
                        <>
                            <h2 className="text-xl font-semibold text-red-600 mb-4">Payment Failed</h2>
                            <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                                <svg className="h-8 w-8 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div></>

                    )}
                </div>
            </div>
        )}
    </div>
}

export default CartPage