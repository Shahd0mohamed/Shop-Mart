import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return <div className="py-20 px-3">
    <div className="md:mx-16 md:px-8 flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-5xl xl:text-6xl py-3 mb-6 font-bold">Welcome to ShopMart</h2>
      <p className="text-center xl:px-8 text-xl font-light mb-10 xl:mx-20">Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.</p>
    </div>
    <div className="flex flex-col md:flex-row justify-center gap-4">
      <Button className="rounded-3xl mb-2 px-7 border-2 py-6"><Link href={'/products'}>Shop Now</Link></Button>
      <Button className="rounded-3xl px-7 py-6 bg-accent text-accent-foreground border-2 border-accent-foreground hover:bg-accent"><Link href={'/categories'}>Browse Categories</Link></Button>
    </div>

  </div>
}
