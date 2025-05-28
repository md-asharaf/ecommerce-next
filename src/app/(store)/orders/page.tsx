import PaginatedOrders from "@/components/PaginatedOrders"
const OrdersPage = () => {
  return (
    <div className="container mx-auto p-8 max-w-4xl bg-white min-h-[calc(100vh-4rem)]">
      <div className="bg-white/50 p-4 sm:p-8 rounded-xl w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-8">
          Your Orders
        </h1>
        <PaginatedOrders />
      </div>
    </div>
  )
}

export default OrdersPage