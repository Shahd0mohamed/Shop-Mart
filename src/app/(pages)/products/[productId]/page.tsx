import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/Interfaces/productInterface';
import { StarIcon } from 'lucide-react';
import { Params } from 'next/dist/server/request/params'
import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import AddToCart from '@/components/AddToCart/AddToCart';
import { formatCurrency } from '@/Helpers/formatCurrency';

export default async function productDetails({ params }: { params: Params }) {

    const { productId } = await params;

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/' + productId)

    const { data: product }: { data: Product } = await response.json();
    console.log(product);


    return <>
        <div className=''>z   
            <div className="flex justify-center gap-5 items-center shadow-accent-foreground ">
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
                            <CardDescription className='text-sm mb-10'>
                                {product.description}
                            </CardDescription>
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
                            <p className='font-bold text-xl'>{formatCurrency(product.price)} </p>
                        </CardContent>
                        <AddToCart productId={product.id} />
                    </div>
                </Card >
            </div>
        </div>
    </>
}
