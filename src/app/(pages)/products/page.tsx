import { ProductsResponse } from '@/Interfaces/productInterface';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StarIcon } from 'lucide-react';
import Link from 'next/link';
import AddToCart from '@/components/AddToCart/AddToCart';
import { formatCurrency } from '@/Helpers/formatCurrency';

export default async function products() {

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
  const data: ProductsResponse = await response.json();


  return <>
    <div className='text-center font-bold text-3xl '>All Products</div>

    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {data.data.map((product) => <div key={product.id} className="p-2">
        <Card className="relative   w-full max-w-sm overflow-hidden py-0 ">
          <Link href={'/products/' + product.id}>
            <div className="absolute inset-0 z-30 aspect-square " />
            <img
              src={product.imageCover}
              alt={product.title}
              className="relative z-20 aspect-square w-full object-cover  "
            />
            <CardHeader>
              <CardDescription className='text-sm'>
                {product.brand.name}
              </CardDescription>
              <CardTitle className='line-clamp-1'>{product.title}</CardTitle>
              <CardDescription className='text-sm mb-0'>
                {product.category.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
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
          </Link>
          <AddToCart productId={product.id} />
        </Card>

      </div>)}

    </div>


  </>
}
