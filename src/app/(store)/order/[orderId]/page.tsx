const OrderDetails = async ({params}:{params:Promise<{
    orderId: string
}>}) => {
    const {orderId} = await params;
  return (
    <div>Order:{orderId}</div>
  )
}

export default OrderDetails