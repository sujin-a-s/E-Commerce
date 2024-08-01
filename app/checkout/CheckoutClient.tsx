'use client'

import { useCart } from "@/hooks/useCart"
import { loadStripe } from "@stripe/stripe-js"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import {StripeElementsOptions} from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"
import Button from "../components/Button"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

const CheckoutClient = () => {

    const {cartProducts , paymentIntent , handleSetPaymentIntent} = useCart()
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const [clientSecret,setClientSecret] = useState('')
    const [paymentSuccess,setPaymentSucess] = useState(false)

    const router = useRouter()
    console.log('paymentIntent',paymentIntent)

    console.log('clientSecret',clientSecret)

    useEffect(() => {
        const createPaymentIntent = async () => {
          if (cartProducts) {
            setLoading(true)
            setError(false)
    
            try {
              const res = await axios.post('/api/create-payment-intent', {
                items: cartProducts,
                payment_intent_id: paymentIntent
              })
    
              setLoading(false)
    
              if (res.status === 401) {
                return router.push("/login")
              }
    
              const data = res.data
              console.log(data)
              setClientSecret(data.paymentIntent.client_secret)
              handleSetPaymentIntent(data.paymentIntent.id)
    
            } catch (error) {
                setLoading(false)
                setError(true)
                console.log("Error", error)
                toast.error("Something went wrong")
            }
          }
        }
    
        createPaymentIntent()
      }, [cartProducts, paymentIntent])

      const options : StripeElementsOptions = {
        clientSecret,
        appearance : {
          theme : 'stripe',
          labels : 'floating'
        }
      }

      const handleSetPaymentSuccess = useCallback((value : boolean)=>{
        setPaymentSucess(value)
      },[])
    return (
        <div className="w-full">
          {clientSecret && cartProducts && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm clientSecret={clientSecret} handleSetPaymentSucess={handleSetPaymentSuccess}/>
            </Elements>
          )}
          {loading && <div className="text-center">Loading Checkout</div>}
          {error && <div className="text-center text-rose-400">Something went wrong</div>}
          {paymentSuccess && (
            <div className="flex items-center flex-col gap-4">
              <div className="text-teal-500 text-center">Payement Success</div>
              <div className="max-w-[220px] w-full">
                <Button label="View Your Orders" onClick={()=>router.push("/order")}/>
              </div>
            </div>
          )}
        </div>
    )
}
 
export default CheckoutClient;