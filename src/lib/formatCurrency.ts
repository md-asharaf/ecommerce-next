export const formatCurrency = (amount: number, currency: string) => {
    try {
        return new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: currency.toUpperCase(),
        }).format(amount);
    } catch (error) {
        console.error("Invalid currency", currency, amount,error);
        return `${currency.toUpperCase()} ${amount.toFixed(2)}`;
    }
};
