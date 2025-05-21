'use server';
import { CartItem } from '@/store/cart';
import { razorpay } from '@/lib/razorpay';
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
export const createRazorpayOrder = async (items: CartItem[], metadata: Metadata) => {
  try {
    const itemsWithoutPrice = items.some(({ product }) => !product.price);
    if (itemsWithoutPrice) {
      throw new Error('Some items do not have price');
    }
    const totalPrice = items.reduce((total, { product, quantity }) => {
      return total + (product.price ?? 0) * quantity;
    }, 0);
    const order = await razorpay.orders.create({
      amount: totalPrice * 100,
      currency: 'INR',
      payment_capture: true,
      line_items: items.map(({ product, quantity }) => ({
        type: 'product',
        sku: product._id || '',
        variant_id: product._rev || '',
        price: `${(product.price || 0) * 100}`,
        offer_price: `${(product.price || 0) * 100}`,
        tax_amount: 0,
        quantity: quantity,
        name: product.name || '',
        description: product.description || '',
        weight: `0`,
        dimensions: {
          height: `0`,
          width: `0`,
          length: `0`,
        },
        image_url: product.imageUrl || '',
        product_url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${product.slug}`,
      })),
      notes: metadata,
    });
    return order || null;
  } catch (error) {
    console.error('Error creating checkout session', error);
    return null;
  }
};
