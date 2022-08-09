import React, { useState } from 'react'
import { FavButton } from '../FavButton'
import { useLocalStorage } from '../../hooks/useLocalStorage'
export const Product = ({ product, handleAddToCart }) => {
  const key = `like-${product.id}`
  const [liked, setLiked] = useLocalStorage(key, false)

  const handleFavClick = () => {
    console.log('favClick')
    console.log(liked)
    console.log(key)
    setLiked(!liked)
  }

  return (
    <div className='Products-item'>
      <img src={product.image} alt={product.title} />
      <FavButton liked={liked} likes={0} onClick={() => { setLiked(!liked) }} />
      <div className='Product-item-info'>
        <h2>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
      <button type='button' onClick={handleAddToCart}>
        {' '}
        Comprar{' '}
      </button>
    </div>
  )
}
