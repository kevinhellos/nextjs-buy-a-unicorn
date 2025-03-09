# Next JS Stripe
Template for a checkout/ purchase of digital product (e.g. course) with Next JS and Stripe

## Setup
### Step 1 - Stripe API Key
- Go to https://dashboard.stripe.com/ to obtain your Stripe Secret Key.
- Paste Stripe Secret Key as a value to the environment variable ```STRIPE_SECRET_KEY``` in the  ```.env```

### Step 2 - Configure productData.ts
- Change the product name, price, currency, labels, etc...

### Step 3 - Configure product.tsx
- Your paid contents/ videos goes in this page
- Note: this page is a server component, without a correct url, the product page will not get rendered and not discoverable as client side codes

## Payment API Flowchart
![Stripe-NEXTJS](https://github.com/user-attachments/assets/ec4865a2-244e-4486-899f-8fc74af513e0)
