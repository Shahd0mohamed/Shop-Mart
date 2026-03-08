'use client'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function CartIcon({serverCartNum} : {serverCartNum : number}) {
    const [cartNum, setCartNum] = useState(serverCartNum)

    useEffect(() => {
        function handler(e: CustomEvent){
            setCartNum(e.detail)
        }
        window.addEventListener('cartUpdate' , handler as EventListener)
      
    }, [])
    



    return <>

        <Link href="/cart" className='relative cursor-pointer'> <ShoppingCart className='bg-accent-foreground text-black size-4 
                     md:size-5' />
            <span className='absolute bottom-2 start-5/6 text-xs size-7 bg-accent-foreground text-accent flex justify-center items-center rounded-full'>{ cartNum}</span>
        </Link>

    </>
}
