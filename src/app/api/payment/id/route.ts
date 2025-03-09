import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

export async function POST(request: Request) {
  try {
    const { payment_id: paymentId } = await request.json();

    // Check for paymentId
    if (!paymentId) {
      return NextResponse.json({ error: "Error 106: payment_id is required" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    return NextResponse.json({ paymentIntent }, { status: 200 });
  } 
  catch (error: unknown) {
    console.error("Stripe Payment Intent Retrieval Error:", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error instanceof Error ? error.message : "Unknown error" },{ status: 500 });
  }
}