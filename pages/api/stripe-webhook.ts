import prisma from "@/libs/prismadb"
import { buffer } from "micro"
import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import { Prisma } from '@prisma/client'

export const config = {
    api: {
        bodyParser: false
    }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20"
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']

    if (!sig) {
        return res.status(400).send("Missing the stripe signature")
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            buf,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err) {
        return res.status(400).send("webhook error" + err)
    }

    switch (event.type) {
        case 'charge.succeeded':
            const charge = event.data.object as Stripe.Charge

            if (typeof charge.payment_intent === 'string') {
                try {
                    const addressData = charge.shipping?.address
                        ? {
                            city: charge.shipping.address.city,
                            country: charge.shipping.address.country,
                            line1: charge.shipping.address.line1,
                            line2: charge.shipping.address.line2,
                            postal_code: charge.shipping.address.postal_code,
                            state: charge.shipping.address.state
                        }
                        : Prisma.JsonNull

                    await prisma.order.update({
                        where: { paymentIntentId: charge.payment_intent },
                        data: {
                            status: 'complete',
                            address: addressData
                        }
                    })
                } catch (error) {
                    console.error('Error updating order:', error)
                    return res.status(500).json({ error: 'Failed to update order' })
                }
            }
            break
        default:
            console.log("Unhandled event type:" + event.type)
    }

    res.json({
        received: true
    })
}