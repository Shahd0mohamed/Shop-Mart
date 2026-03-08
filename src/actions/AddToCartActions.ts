"use server"

import { authOptions } from "@/auth";
import { CartResponse } from "@/Interfaces/CartInterface";
import { getServerSession } from "next-auth";

export async function addToCartAction(productId:string) {
    
    const session = await getServerSession(authOptions)

    if (session) {
        
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            method: 'POST',
            body: JSON.stringify({ productId }),
            headers: {
                token: session?.token as string,
                "content-type": "application/json"
            }
        });
        const data: CartResponse = await response.json();
        
        return data
    }else{
        return null
    }

    
}