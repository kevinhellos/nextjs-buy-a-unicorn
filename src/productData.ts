interface ProductData {
  name: string;
  price: number;
  currency: string;
  description: string;
  labels: { text: string }[];
  isTestMode: boolean;
  textModeMessage?: string;
}
// Edit this file to customise product data

export const productData: ProductData = {
  name: "🦄 Unicorn",
  price: 10,
  
  // Note:
  // See https://docs.stripe.com/currencies for list of supported currencies
  currency: "sgd",
  
  // Product description goes here
  description: "Buy a unicorn that can travel through time and fly high in the sky",

  labels: [
    {
      text: "100% real"
    },
    {
      text: "Easy to setup"
    },
    {
      text: "Instant access"
    }
  ],

  // Setting this to true will display a test mode yellow banner
  isTestMode: false,
  textModeMessage: "",
};