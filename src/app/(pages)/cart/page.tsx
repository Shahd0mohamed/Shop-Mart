import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import Cart from "@/components/Cart/Cart"
import React from 'react'
import { CartResponse } from '@/Interfaces/CartInterface';

export default async function cartPage() {

  const session = await getServerSession(authOptions);
  console.log(session)
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart' , {
    headers: {
      token: session?.token as string
    }
  }); 
  const data : CartResponse = await response.json()
  console.log(data);
  

  return <>

    <Cart cartData={data.numOfCartItems == 0? null : data}/> 

  </>
} 
