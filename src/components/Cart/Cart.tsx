"use client"
import { clearCartAction, deleteProductAction, updateProductAction } from "@/actions/cartActions";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/Helpers/formatCurrency";
import { CartResponse } from "@/Interfaces/CartInterface";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import CheckOutSession from "../CheckOutSession/CheckOutSession";





export default function cart({ cartData }: { cartData: CartResponse | null }) {

  const [cart, setCart] = useState<CartResponse | null>(cartData || null)
  const [IsLoadingId, setIsLoadingId] = useState<string | null>(null)
  // dispatchEvent(new CustomEvent('cartUpdate', { detail: cartData?.numOfCartItems }))




  async function deleteCartProduct(productId: string) {
    setIsLoadingId(productId)
    const response: CartResponse = await deleteProductAction(productId)
    if (response.status == 'success') {
      setCart(response)
      dispatchEvent(new CustomEvent('cartUpdate', { detail: response.numOfCartItems }))
    }
    setIsLoadingId(null)
  }


  async function updateProductCount(productId: string, count: number) {
    setIsLoadingId(productId)
    const response: CartResponse = await updateProductAction(productId, count)
    if (response.status == 'success') {
      setCart(response)
      toast.success('Product count updated')
    }
    setIsLoadingId(null)
  }


  async function clearCart() {
    setIsLoadingId('clear')
    const response: CartResponse = await clearCartAction()
    if (response.message == 'success') {
      setCart(null)
      dispatchEvent(new CustomEvent('cartUpdate', { detail: 0 }))
    }
    setIsLoadingId(null)

  }



  return <>
    {cart ?

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">
          Shopping Cart
        </h1>
        <p className="text-gray-500 mb-8">
          {cart?.numOfCartItems} items in your cart
        </p>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart?.data.products.map((item) =>

              <div key={item._id} className="flex items-center bg-white p-4 mb-3 rounded-xl shadow">
                <Image src={item.product.imageCover}
                  alt={item.product.title} width={80} height={80} className="rounded" />
                <div className="flex-1 ml-4">
                  <h2 className="font-semibold">
                    {item.product.title}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {item.product.brand.name} . {item.product.category.name}
                  </p>
                  <div className="flex items-center gap-3 mt-2">

                    <button
                      disabled={item.count == 1}
                      aria-label="decrease"
                      className="size-8 rounded-lg border hover:bg-accent"
                      onClick={() => updateProductCount(item.product._id, item.count - 1)}
                    >
                      -
                    </button>

                    <span className="px-2">
                      {item.count}
                    </span>

                    <button
                      disabled={item.count == item.product.quantity}
                      aria-label="increase"
                      className="size-8 rounded-lg border hover:bg-accent"
                      onClick={() => updateProductCount(item.product._id , item.count + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold mb-3">
                    {formatCurrency(item.price)}
                  </p>
                  <Button
                    aria-label="remove"
                    className=" text-white hover:underline text-sm cursor-pointer flex gap-1 items-center"
                    onClick={() => deleteCartProduct(item.product._id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-xl  shadow h-fit">
            <h2 className="text-xl font-bold mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2">
              <span>
                Subtotal
              </span>
              <span>
                {formatCurrency(cart.data.totalCartPrice)}
              </span>
            </div>

            <div className="flex justify-between mb-4">
              <span>
                Shipping
              </span>
              <span className="text-green-500">
                Free
              </span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg my-4">
              <span>
                Total
              </span>
              <span>
                {formatCurrency(cart.data.totalCartPrice)}
              </span>
            </div>
            <div className="flex gap-2">
              <Link href="/products">
                <Button className=" border py-2 rounded-lg mb-3 ">
                  Continue Shopping
                </Button>
              </Link>
              <CheckOutSession cartId={cart.cartId} />
            </div>



          </div>
          <Button onClick={() => clearCart()} variant={'outline'} className="text-destructive hover:text-destructive mt-2 ms-auto flex cursor-pointer">
            {IsLoadingId == 'clear' && <Loader2 className="animate-spin" />}
            Clear Cart
          </Button>

        </div>
      </div>

      :

      <div className="min-h-[60vh] flex justify-center items-center flex-col">
        <h2 className="text-2xl mb-3">Your cart is empty</h2>
        <Link href={'/products'} className="">
          <Button>Add Ones</Button>
        </Link>
      </div>


    }
  </>
}