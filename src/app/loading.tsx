import { Loader2, Loader2Icon } from 'lucide-react'
import React from 'react'

export default function loading() {
    return <>

        
            <div className='flex flex-col gap-3 text-center'>
                <div className=" bg-amber-400 flex justify-center">
                    <span className="text-3xl px-3 py-0.5 me-1 rounded-lg text-white bg-black">S</span>
                    <span className='text-3xl md:font-bold'>ShopMart</span>
                </div>
                <div className="bg-blue-500 flex items-center justify-center text-3xl pt-4 mt-3">
                    <Loader2Icon className="animate-spin" />
                </div>
            </div>

        {/* <h2 className='flex items-center justify-center text-5xl'>
        </h2> */}


    </>
}
