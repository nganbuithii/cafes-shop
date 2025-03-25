import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
    try {
        const sessionId = req.nextUrl.searchParams.get("session_id");

        if (!sessionId) {
            return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        return NextResponse.json({ status: session.payment_status });
    } catch (error: unknown) {

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }

}
