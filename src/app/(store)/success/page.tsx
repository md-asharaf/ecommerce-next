"use client";

import { Button } from "@/components/ui/button";
import { useBasketStore } from "@/store/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paymentId = searchParams.get("paymentId");
  const { clearBasket } = useBasketStore((state) => state);
  useEffect(() => {
    if (orderId) {
      clearBasket();
    }
  }, [orderId, clearBasket])
  if (!orderId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4 flex items-center flex-col">
          <h1 className="text-4xl font-bold mb-6 text-center">Order not found</h1>
          <p className="text-lg text-gray-700 mb-4 text-center">Please check your order number.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/">Go back to home</Link>
          </Button>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
        <div className="flex justify-center mb-8">
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
        </div>
        <h1 className="text-4xl font-bold mb-6 text-center">Thank You for Your Order</h1>
        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <p className="text-lg text-gray-700 mb-4 text-center">Your order has been confirmed and will be shipped shortly.</p>
          <div className="space-y-2 ">
            {
              orderId && (
                <div>
                  <p className="text-gray-600 flex items-center justify-center space-x-5">
                    <span>Order Id : </span>
                    <span className="font-mono text-sm text-green-600">{orderId}</span>
                  </p>
                  <p className="text-gray-600 flex items-center justify-center space-x-5">
                    <span>Payment Id : </span>
                    <span className="font-mono text-sm text-green-600">{paymentId}</span>
                  </p>
                </div>
              )
            }
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600"></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/orders">View Order details</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Continue shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage