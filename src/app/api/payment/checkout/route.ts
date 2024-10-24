import { productData } from "@/productData";
import { NextResponse } from "next/server";

import Stripe from "stripe";
const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

// POST route to create a checkout session
export async function POST(request: Request) {
    try{
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: productData?.currency,
                        product_data: {
                            name: productData?.name
                        },

                        // unit_amount: price * 100 (to convert to cents)
                        unit_amount: productData?.price * 100
                    },
                    quantity: 1,
                }
            ],
            mode: "payment",
            shipping_address_collection: { 
                // Note: 
                // https://docs.stripe.com/checkout/custom-checkout/collect-shipping-or-billing-information
                allowed_countries: ["SG", "ID", "US", "KR"] // Change this if required
            },
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        });
        return NextResponse.json({ url: session.url, }, { status: 200 });
    } 
    catch (error: any){
        return new NextResponse(JSON.stringify(error.message), { status: 500 });
    }
}