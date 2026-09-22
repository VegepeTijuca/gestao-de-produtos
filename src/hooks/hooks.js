import { getProducts, saveProducts } from '../utils/storage'
import { useState } from 'react'

export function useProducts() {
  const [products, setProducts] = useState(() => {
    const storedProducts = getProducts()
    return Array.isArray(storedProducts) ? storedProducts : []
  })
  const [error, setError] = useState(null)

  const persistProducts = (nextProducts, message) => {
    try {
      const success = saveProducts(nextProducts)
      setError(success === false ? message : null)
      return success !== false
    } catch {
      setError(message)
      return false
    }
  }

  const listProducts = () => products

  const addProduct = (product) => {
    const newProduct = { ...product, id: product.id ?? crypto.randomUUID() }
    const updatedProducts = [...products, newProduct]
    persistProducts(updatedProducts, 'Não foi possível salvar o produto.')
    setProducts(updatedProducts)
    return newProduct
  }

  const editProduct = (id, changes) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, ...changes, id } : product,
    )
    persistProducts(updatedProducts, 'Não foi possível salvar as alterações.')
    setProducts(updatedProducts)
  }

  const removeProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id)
    persistProducts(updatedProducts, 'Não foi possível excluir o produto.')
    setProducts(updatedProducts)
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

  const refresh = () => {
    const storedProducts = getProducts()
    setProducts(Array.isArray(storedProducts) ? storedProducts : [])
  }

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
