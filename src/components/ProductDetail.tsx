import React, { useEffect, useState } from 'react'
import Header from './Header'
import Banner from './Banner'
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface ProductDetailProps {
  url: string;
  price: number;
  productName: string;
  category: string;
}
interface UserProps {
  name: string;
}
const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const [productDetails, setProductDetails] = useState<ProductDetailProps>({
    url: '',
    price: 0,
    productName: '',
    category: ''
  })
  const [user, setUser] = useState<UserProps>({ name: '' });
  
  const getProductDetail = async () => {
    if (productId) {
      const docRef = doc(db, 'products', productId)
      const productDoc = await getDoc(docRef)
      if (productDoc.exists()) {
        const products=productDoc.data()
        setProductDetails(products as ProductDetailProps)
        const userRef=doc(db,'users',products.uid)
        const user=await getDoc(userRef)
        setUser(user.data()as UserProps)
      }
    }
  }
  useEffect(()=>{
    getProductDetail()
  },[])
  return (
    <div>
      <Header />
      <div style={{ backgroundColor: '#F3F4F0' }} className='h-72 mb-7 mx-auto w-5/6 bg-red-100'><Banner /></div>
      <div className='mx-auto  bg-slate-100 flex space-x-4  w-10/12 p-4'>
        <div className='w-3/5'>
          <img className='rounded' src={productDetails.url} alt="" />
        </div>
        <div className='flex flex-col w-2/5'>
          <div className='w-full bg-white p-4 rounded border mb-4 border-gray-300'>
            <p style={{ color: '#002F34' }} className='font-bold text-4xl mb-3'> $ {productDetails.price}</p>
            <p className='mb-3 text-lg flex'> <span className='text-xl font-bold'> Title:</span> <div className='pl-2'> {productDetails.productName}</div></p>
            <p className='mb-3'><span className='text-xl font-bold'>Category: </span>{productDetails.category}</p>
          </div>
          <div className='bg-white p-7'>
            <h1 className='text-xl font-bold' >Seller</h1>
            <div className='flex items-center space-x-5'>
              <img className='w-20 h-20' src="https://statics.olx.in/external/base/img/avatar_2.png" alt="" />
              <p style={{ color: '#002F34' }} className='text-2xl font-bold'>{user.name}</p>
            </div>
            <div className='p-3 border border-black flex  justify-center rounded'>
              <p style={{ color: '#002F34' }} className='font-bold text-lg cursor-pointer'>Chat with seller</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
