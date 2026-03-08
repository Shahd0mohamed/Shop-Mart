import AddToCart from '@/components/AddToCart/AddToCart'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Product } from '@/Interfaces/CartInterface'
import { ProductsResponse } from '@/Interfaces/productInterface'
import { StarIcon } from 'lucide-react'
import { Params } from 'next/dist/server/request/params'
import Image from 'next/image'
import React from 'react'

export default async function CategoriesDetails({ params }: { params: Params }) {
    const { categoryId } = await params
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products')
    const result: ProductsResponse = await response.json()



    const filteredProducts = result.data.filter(
        (product) => product.category._id === categoryId
    )
    const categoryName = filteredProducts[0]?.category.name
    return <>

        <div className='mb-5'>
            <h1 className='text-3xl mb-3 font-bold'>{categoryName}</h1>
            <span>Products from this category</span>
        </div>
        <div className="container">
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2.5 items-center'>
                {filteredProducts.map((product: Product) => <div key={product.id} className=''>
                    <Card className='grid grid-cols-1 md:grid-cols-3 items-center '>
                        <div className="">
                            {/* <Carousel>
                            <CarouselContent>
                                <CarouselItem><Image src={product.imageCover} alt={product.title} width={400} height={300} className='w-full'/></CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel> */}
                            <Image src={product.imageCover} alt={product.title} width={400} height={300} className='w-full' />
                        </div>
                        <div className="col-span-2 space-y-5 p-4">
                            <CardHeader>
                                <CardDescription className='text-sm'>
                                    {product.brand.name}
                                </CardDescription>
                                <CardTitle>{product.title}</CardTitle>
                                <CardAction className='text-sm mb-4 mt-4'>
                                    {product.category.name}
                                </CardAction>
                            </CardHeader>
                            <CardContent className='mb-6 ps-5'>
                                <div className="flex mt-0">
                                    <StarIcon className='fill-amber-400 text-amber-400 me-0.5'></StarIcon>
                                    <StarIcon className='fill-amber-400 text-amber-400 me-0.5'></StarIcon>
                                    <StarIcon className='fill-amber-400 text-amber-400 me-0.5'></StarIcon>
                                    <StarIcon className='fill-amber-400 text-amber-400 me-0.5'></StarIcon>
                                    <StarIcon className='fill-amber-400 text-amber-400 me-0.5'></StarIcon>
                                    <p className='ms-2 font-light'>({product.ratingsAverage})</p>
                                </div>
                            </CardContent>
                            <AddToCart productId={product.id} />
                        </div>
                    </Card >
                </div>)}
            </div>
        </div>


    </>

}