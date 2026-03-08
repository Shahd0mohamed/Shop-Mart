import { ProductsResponse } from '@/Interfaces/productInterface';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import AddToCart from '@/components/AddToCart/AddToCart';
import { CategoryResponse } from '@/Interfaces/CategoryInterfaces';
import { Params } from 'next/dist/server/request/params';

export default async function categories() {

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
  const data: CategoryResponse = await response.json();
  // console.log(data);


  return <>
    <div className='text-center font-bold text-3xl mb-3'>All Categories</div>

    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3'>
      {data.data.map((category) => <div key={category._id} className="p-2">
        <Card className="relative   w-full max-w-sm overflow-hidden py-0 ">
          <Link href={'/categories/' + category._id}>
            <div className="absolute inset-0 z-30 aspect-square " />
            <img
              src={category.image}
              alt={category.name}
              className="relative z-20 aspect-square w-full object-cover  "
            />
          </Link>
        </Card>

      </div>)}

    </div>


  </>
}

