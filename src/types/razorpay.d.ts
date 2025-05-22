export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name?: string;
    description?: string;
    image?: string;
    order_id?: string;
    handler: (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
    }) => void;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    notes?: Record<string, any>;
    theme?: {
        color?: string;
    };
}
export type LineItem = {
    type: string;
    sku: string;
    variant_id: string;
    price: string;
    offer_price: string;
    tax_amount: number;
    quantity: number;
    name: string;
    description: string;
    weight: string;
    dimensions: {
        height: string;
        width: string;
        length: string;
    };
    image_url: string;
    product_url: string;
};
interface RazorpayInstance {
    open: () => void;
}

declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
}
