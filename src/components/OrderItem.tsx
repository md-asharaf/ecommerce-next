import { formatCurrency } from "@/lib/formatCurrency";
import { imageUrl } from "@/lib/imageUrl";
import { PopulatedOrder } from "@/sanity/lib/order/getMyOrders";
import Image from "next/image";

const OrderItem = ({ order }: { order: PopulatedOrder }) => (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                <div>
                    <p className="text-gray-600 text-sm mb-1 font-bold">Order Id</p>
                    <p className="font-mono text-sm text-green-600 break-all">
                        {order.orderId}
                    </p>
                </div>
                <div className="sm:text-right">
                    <p className="text-sm text-gray-600 mb-1">Order Date</p>
                    <p className="font-medium">
                        {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center">
                    <span className="text-sm mr-2">Status :</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${order.status === "paid" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                        {order.status}
                    </span>
                </div>
                <div className="sm:text-right">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="font-bold text-lg">
                        {formatCurrency(order.totalAmount ?? 0, order.currency!)}
                    </p>
                </div>
            </div>

            {order.amountDiscount && (
                <div className="mt-4 p-3 sm:p-4 bg-red-50 rounded-lg">
                    <p className="text-red-600 font-medium mb-1 text-sm sm:text-base">
                        Discount Applied: {formatCurrency(order.amountDiscount, order.currency!)}
                    </p>
                    <p className="text-sm text-gray-600">
                        Original SubTotal:{" "}
                        {formatCurrency((order.totalAmount ?? 0) + order.amountDiscount, order.currency!)}
                    </p>
                </div>
            )}

            <div className="px-4 py-3 sm:p-6 sm:py-4">
                <p className="text-sm font-semibold text-gray-600 mb-3 sm:mb-4">Order Items</p>
                <div className="space-y-3 sm:space-y-4">
                    {order.products?.map(({ product, quantity }) => (
                        <div
                            key={product?._id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2 border-b last:border-b-0"
                        >
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden">
                                    <Image
                                        src={product?.image ? imageUrl(product?.image).url() : product?.imageUrl!}
                                        alt={product?.name || "Product Image"}
                                        className="object-cover aspect-video"
                                        fill
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-sm sm:text-base">{product?.name}</p>
                                    <p className="text-sm text-gray-600">Quantity: {quantity ?? "N/A"}</p>
                                </div>
                            </div>
                            <p className="font-medium text-right">
                                {product?.price
                                    ? formatCurrency(product.price * quantity!, order.currency!)
                                    : "N/A"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
)
export default OrderItem;