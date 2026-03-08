import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandsResponse } from '@/Interfaces/BrandInterfaces';
import Link from 'next/link';

export default async function brands() {

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
  const data: BrandsResponse = await response.json();
  // console.log(data);



  return <>

    <div className='text-center font-bold text-3xl mb-3 pb-3 '>All Brands</div>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {data.data.map((brand) => <div key={brand._id} className="p-2 my-3  transition-shadow duration-300 ">
        <Card className=" text-center my-6 size-80 rounded-4">
          <Link href={'/brands/' + brand._id}>
            <CardHeader>
              <CardTitle className='text-3xl font-bold my-5 py-2'>{brand.name}</CardTitle>
              <CardDescription className='text-sm py-3'>
                {brand.slug}
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

      </div>)}

    </div>



  </>
}
