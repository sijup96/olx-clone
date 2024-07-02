import React, { useRef, useState } from 'react'
import productValidate from '../utils/productValidate'
import PhotoIcon from '../assets/PhotoIcon'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'


const SellProduct = () => {
  const [error, setError] = useState<string[]>([])
  const [displayImage, setDisplayImage] = useState<string | null>(null)
  const [productImage, setProductImage] = useState<File | null>(null)

  const navigate = useNavigate()

  const productNameRef = useRef<HTMLInputElement>(null)
  const categoryRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProductImage(file)
      const imageURL = URL.createObjectURL(file)
      setDisplayImage(imageURL)
    }
  }

  const handleSubmit = () => {
    const productName = productNameRef.current?.value || ''
    const category = categoryRef.current?.value || ''
    const price = parseFloat(priceRef.current?.value || '0')
    const image = productImage
    const errorMessage = productValidate({ productName, category, price, image })
    setError(errorMessage)
    if (error.length > 0) return
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login')
      } else {
        const uid = user.uid
        const storage = getStorage()
        const filePath = 'images/' + productName
        const fileRef = ref(storage, filePath)
        if (productImage)
          await uploadBytes(fileRef, productImage)
        const downloadedURL = await getDownloadURL(fileRef)
        await addDoc(collection(db, 'Products'), {
          productName: productName,
          category: category,
          price: price,
          uid: uid,
          url: downloadedURL
        }).then(() => {
          navigate('/')
        })
          .catch(error => console.log(error))

      }
    })
  }

  return (
    <div className='w-3/5  border flex flex-col  border-black p-4 '>
      <div className='p-4 flex space-x-5 ml-5'>
        <div className='w-1/2'>
          <p className='font-bold text-xl mb-3'>INCLUDE SOME DETAILS</p>
          <div className='mb-8'>
            <p>Name of the Product</p>
            <input ref={productNameRef} className='border border-black rounded w-full p-2' type="text" />
            {error.includes("nameError") &&
              <p className='text-sm text-red-500'>Enter a valid product name</p>}
          </div>
          <div className='mb-8'>
            <p>Category</p>
            <input ref={categoryRef} className='border border-black rounded w-full p-2' type="text" />
            {error.includes("categoryError") &&
              <p className='text-sm text-red-500'>Enter a valid category</p>}
          </div>
          <div className='mb-8'>
            <p>Price</p>
            <input ref={priceRef} className='border border-black rounded w-full p-2' type="number" />
            {error.includes("priceError") &&
              <p className='text-sm text-red-500'>price between 100 and 100000</p>}
          </div>
          <div>
            <label htmlFor="file_input"><PhotoIcon /></label>
            <input onChange={handlePhoto} id='file_input' style={{ display: 'none' }} type="file" />
            {error.includes("imageError") &&
              <p className='text-sm text-red-500'>Please select an image</p>}
          </div>
        </div>
        <div className='border p-5 w-96 h-96 border-black'>
          <img className='w-full h-full object-cover' src={displayImage || ''} alt="selected Image" />

        </div>
      </div>
      <div className='flex justify-center'>
        <button
          onClick={handleSubmit}
          className='text-white p-2 rounded-md font-bold'
          style={{ backgroundColor: '#002F34' }}>POST NOW</button>
      </div>
    </div>
  )
}

export default SellProduct
