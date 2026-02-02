import React from 'react'
import ProductForm from '../../productForm';

export default async function EditProductPage({ params }) {
  const { id } = await params;
  
  return (
    <ProductForm productId={id} />
  )
}