export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    handler: (response: any) => void;
}

interface RazorpayInstance {
    open: () => void;
}

declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
}