import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

export async function POST(request: Request) {
    const body = await request.json();
    const sessionId = body.session_id;
  
    // Ensure sessionId exists first
    if (!sessionId) {
      return NextResponse.json({ error: "Error 106: session_id is required" }, { status: 400 });
    }
  
    try {
      // Retrieve session and line items in parallel using Promise.all
      const [session, lineItems] = await Promise.all([
        stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["payment_intent.payment_method"],
        }),
        stripe.checkout.sessions.listLineItems(sessionId),
      ]);
  
      // If both session and line items are retrieved successfully
      return NextResponse.json({ session, lineItems }, { status: 200 });
    } 
    catch (error: any) {
      return NextResponse.json({ error: error.message || "Internal Server Error"}, { status: 500 });
    }
  }