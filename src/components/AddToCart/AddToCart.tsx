"use client"
import React, { useState } from 'react'
import { CardFooter } from '../ui/card'
import Link from 'next/link'
import { Heart, Loader2, ShoppingBag, ShoppingCart } from 'lucide-react'
import { Button } from '../ui/button'
import { CartResponse } from '@/Interfaces/CartInterface'
import toast from 'react-hot-toast'
import { addToCartAction } from '@/actions/AddToCartActions'
import { useRouter } from 'next/navigation'

export default function AddToCart({ productId }: { productId: string }) {
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    async function addToCart(productId: string) {

        try {
            setIsLoading(true)

            const data = await addToCartAction(productId)
            if (data == null) {
                router.push('/login')
            }

            toast.success('Product added successfully in your cart')
            dispatchEvent(new CustomEvent('cartUpdate', { detail: data?.numOfCartItems }))


        } catch (err) {

        }
        setIsLoading(false)


    }

    return <>
        <CardFooter className='flex justify-between items-center mb-3'>
            <Button disabled={isLoading} onClick={() => addToCart(productId)} className='w-25 md:w-35 lg:w-35 xl:w-55 gap-2'>
                {isLoading ? <Loader2 className='animate-spin' /> : <ShoppingCart />} Add to cart</Button>
            <Heart className='' />
        </CardFooter>


    </>
}
