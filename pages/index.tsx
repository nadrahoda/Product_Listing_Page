import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '@/components/Navbar'

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}
const inter = Inter({ subsets: ['latin'] })
export default function Home () {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL as string
      )  // https://fakestoreapi.com/products
      setProducts(response.data)
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <>
    <Navbar search={search} setSearch={setSearch}/>
      <div className='container mx-auto p-4 min-h-screen '>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className='border shadow-xl p-4 rounded-2xl bg-white flex flex-col items-center'
            >
              <img
                src={product.image}
                alt={product.title}
                className='w-full h-48 object-contain mb-4'
              />
              <div className='flex flex-col flex-grow items-center'>

              <h2 className='text-md font-semibold h-12 overflow-hidden text-center w-4/5'>{product.title}</h2>
              <p className='text-orange-500 text-lg font-semibold mt-auto'>${product.price}</p>
              <button onClick={() => setSelectedProduct(product)} className='mt-2 text-sm bg-orange-500 text-white px-8 py-2 rounded-lg'>
               Buy Now
              </button>
              </div>
            </div>
          ))}
        </div>
        {selectedProduct && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 '>
            <div className='bg-white p-2 md:p-12 rounded max-w-2xl w-full flex md:flex-row flex-col rounded-xl shadow-md  flex items-center py-8 '>
              <div className='w-1/2 mr-10'>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className='w-full h-64 object-contain mb-4'
              />
              </div>
              <div className='w-1/2'>
              <h2 className='text-2xl font-semibold mb-4'>
                {selectedProduct.title}
              </h2>
              <p className='text-orange-500 mb-2 font-medium text-lg'>${selectedProduct.price}</p>
              <p className='text-gray-500 mb-4 font-medium text-sm '>In Stock: {selectedProduct.rating.count}</p>
              <p className='capitalize text-sm pb-2'>{selectedProduct.description}</p>
               <button
                className='mt-auto bg-orange-500 text-white mt-4 px-6 py-1 rounded-lg self-end'
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
