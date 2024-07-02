import React from 'react'
import { Link } from 'react-router-dom'

interface Product {
    id: string;
    url: string;
    productName: string;
    category: string;
    price: number;
}

interface ProductProps {
    product: Product;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
    return (
        <Link
            to={`/product/${product.id}`}
            state={{
                url: product.url,
                productName: product.productName,
                category: product.category,
                price: product.price
            }}
        >
            <div className="border border-spacing-1 p-2 ml-3 mt-3">
                <img src={product.url} alt={product.productName} className="w-48 h-48" />
                <h1 className='text-xl font-bold'>$ {product.price}</h1>
                <h1>{product.productName}</h1>
                <h1 className='text-gray-500'>{product.category}</h1>
            </div>
        </Link>
    )
}

export default ProductCard
