import React from 'react'
import { Product } from '../Product'

import '../../styles/Products.css'

export const Products = ({ products, handleAddToCart }) => {
  return (
    <div className='Products'>
      <div className='Products-items'>
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  )
}
