import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

export async function POST(request: Request) {
    const body = await request.json();
    const paymentId = body.payment_id;
  
    // Ensure payment_id exists first
    if (!paymentId) {
      return NextResponse.json({ error: "Error 106: payment_id is required" }, { status: 400 });
    }
  
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
      
      if (paymentIntent) {
        return NextResponse.json({ paymentIntent }, { status: 200 });
      } 
      else {
        return NextResponse.json({ errorMessage: "Payment Id not found" }, { status: 500 });
      }
    } 
    catch (error: any) {
      console.log(error);
      return NextResponse.json({ errorMessage: "Internal server error" }, { status: 500 });
    }
}