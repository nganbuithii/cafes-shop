import { CartItemType } from '@/components/types/cartType';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
    try {
        const { cartItems } = await req.json();

        const lineItems = cartItems.map((item: CartItemType) => ({
            price_data: {
                currency: 'usd',
                product_data: { name: item.name },
                unit_amount: item.price * 100, 
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: unknown) {

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }

}