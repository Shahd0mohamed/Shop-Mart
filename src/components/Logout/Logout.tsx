'use client'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function Logout() {
    return <>

        <DropdownMenuItem onClick={() => signOut({
            callbackUrl: '/'
        })} className='cursor-pointer ms-2 border-none'>Logout</DropdownMenuItem>
    </>
}
