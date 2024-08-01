import Stripe from 'stripe'
import prisma from '@/libs/prismadb'
import { CartProductType } from '@/app/components/ProductDetails'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20"
})

const calculateOrderAmount = (items: CartProductType[]): number => {
    const totalPrice = items.reduce((acc,item) => {
        const itemTotal = item.price * item.quantity
        return acc + itemTotal
    },0)
    const price  = Math.floor(totalPrice)
    return price*100
}

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { items, payment_intent_id } = body as { items: CartProductType[], payment_intent_id?: string }
        const total = calculateOrderAmount(items) * 100

        if (total < 50) {
            return NextResponse.json({ error: 'Amount too low' }, { status: 400 });
        }

        let paymentIntentId: string | undefined = payment_intent_id

        if (payment_intent_id) {
            const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)

            if (current_intent) {
                const update_intent = await stripe.paymentIntents.update(
                    payment_intent_id,
                    { amount: total }
                )

                const [existing_order, update_order] = await Promise.all([
                    prisma.order.findFirst({
                        where: { paymentIntentId: payment_intent_id }
                    }),
                    prisma.order.update({
                        where: { paymentIntentId: payment_intent_id },
                        data: {
                            amount: total,
                            products: JSON.stringify(items.map((item: CartProductType) => ({
                                id: item.id,
                                name: item.name,
                                description: item.description,
                                category: item.category,
                                brand: item.brand,
                                selectedImage: item.selectedImg,
                                quantity: item.quantity,
                                price: item.price
                            })))
                        }
                    })
                ])

                if (!existing_order) {
                    return NextResponse.json(
                        { error: 'Invalid Payment Intent' },
                        { status: 400 }
                    )
                }
                return NextResponse.json({ paymentIntent: update_intent })
            }
        } else {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: "inr",
                automatic_payment_methods: { enabled: true }
            })

            paymentIntentId = paymentIntent.id
        }

        const orderData = {
            userId: currentUser.id,
            amount: total,
            currency: "inr",
            status: "pending",
            deliveryStatus: "pending",
            paymentIntentId: paymentIntentId!,
            products: JSON.stringify(items.map((item: CartProductType) => ({
                id: item.id,
                name: item.name,
                description: item.description,
                category: item.category,
                brand: item.brand,
                selectedImage: item.selectedImg,
                quantity: item.quantity,
                price: item.price
            })))
        }

        await prisma.order.create({
            data: orderData
        })

        return NextResponse.json({ paymentIntent: { id: paymentIntentId } })
    } catch (error) {
        console.error("Error processing order:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}