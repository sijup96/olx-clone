import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

interface ProductType {
  id: string;
  url: string;
  productName: string;
  category: string;
  price: number;
  uid: string;
}
const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    fetchProducts()
  }, []);

  const fetchProducts = async () => {
    try {
      const productCollection = collection(db, 'products')
      const productSnapshot = await getDocs(productCollection)
      const productsList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProductType))
      setProducts(productsList)
    } catch (error) {
      console.error(error);

    }
  }

  return (
    <div>
      <div className='text-2xl text-blue-900 p-3 ml-5'>Fresh Recomendations</div>
      <div className=' grid grid-cols-4 p-5'>
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  )
}

export default Products
