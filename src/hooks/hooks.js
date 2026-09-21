

import { getProducts, saveProducts } from '../utils/storage'
import { useState } from 'react'

export function useProducts() {
  const [products, setProducts] = useState(() => getProducts())
  const [error, setError] = useState(null)

  const listProducts = () => products

  const addProduct = (product) => {
    const newId = products.length
      ? Math.max(...products.map(({ id }) => Number(id) || 0)) + 1
      : 1
    const newProduct = { ...product, id: product.id ?? newId }
    setProducts((currentProducts) => {
      const updatedProducts = [...currentProducts, newProduct]
      const success = saveProducts(updatedProducts)
      setError(success ? null : 'Não foi possível salvar o produto.')
      return updatedProducts
    })
    return newProduct
  }

  const editProduct = (id, changes) => {
    setProducts((currentProducts) => {
      const updatedProducts = currentProducts.map((product) =>
        product.id === id ? { ...product, ...changes, id } : product,
      )
      const success = saveProducts(updatedProducts)
      setError(success ? null : 'Não foi possível salvar as alterações.')
      return updatedProducts
    })
  }

  const removeProduct = (id) => {
    setProducts((currentProducts) => {
      const updatedProducts = currentProducts.filter((product) => product.id !== id)
      const success = saveProducts(updatedProducts)
      setError(success ? null : 'Não foi possível excluir o produto.')
      return updatedProducts
    })
  }

  const filterProducts = (term) => {
    const normalizedTerm = String(term ?? '').toLowerCase()
    if (!normalizedTerm) return products
    return products.filter((product) =>
      Object.values(product).some((value) =>
        String(value).toLowerCase().includes(normalizedTerm),
      ),
    )
  }

  const refresh = () => setProducts(getProducts())

  return {
    products,
    error,
    list: listProducts,
    add: addProduct,
    edit: editProduct,
    remove: removeProduct,
    filter: filterProducts,
    refresh,
  }
}
