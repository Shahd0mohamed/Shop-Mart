import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { MenuIcon, ShoppingCart, User2Icon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from 'next-auth/react'
import Logout from '@/components/Logout/Logout'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { CartResponse } from '@/Interfaces/CartInterface'
import CartIcon from '@/components/CartIcon/CartIcon'

export default async function Navbar() {

  const session = await getServerSession(authOptions)

  let data : CartResponse | null = null
  if (session) {
    
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart' , {
        headers: {
          token: session?.token as string
        }
      }); 
      data = await response.json()

  }



  return <>
    <nav className='bg-gray-100 py-3 shadow fixed z-50 w-full'>
      <div className="container px-3 md:px-0 mx-auto text-2xl font-semibold flex justify-between items-center">
        <h2>
          <span className="px-3 py-0.5 me-1 rounded-lg text-white bg-black">S</span>
          <Link href={'/'} className='md:font-bold'>ShopMart</Link>
        </h2>

        <div>
          <NavigationMenu>
            <NavigationMenuList className='hidden md:flex'>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/brands">Brands</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/categories">Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div>
          <NavigationMenu>
            <NavigationMenuList className='flex gap-2.5'>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className='hover:bg-accent'>
                  {session && data &&
                    <CartIcon serverCartNum={ data?.numOfCartItems} />
                  }
                </NavigationMenuLink>
              </NavigationMenuItem>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <User2Icon className='size-5 md:size-6 pe-1' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    {session ? <>
                      <Link href={'/profile'}>
                        <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
                      </Link>
                      <Link href={'/my-orders'}>
                        <DropdownMenuItem className='cursor-pointer'>MyOrders</DropdownMenuItem>
                      </Link>
                      <Logout />
                    </>
                      : <>
                        <Link href={'/login'}>
                          <DropdownMenuItem className='cursor-pointer'>Login</DropdownMenuItem>
                        </Link>
                        <Link href={'/register'}>
                          <DropdownMenuItem className='cursor-pointer'>Register</DropdownMenuItem>
                        </Link>
                      </>}

                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <NavigationMenuItem>
                <NavigationMenuTrigger> <MenuIcon className='md:hidden size-5 mt-2.5' />  </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>  <Link href="/products">Products</Link> </NavigationMenuLink>
                  <NavigationMenuLink>  <Link href="/brands">Brands</Link> </NavigationMenuLink>
                  <NavigationMenuLink>  <Link href="/categories">Categories</Link> </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  </>
}
