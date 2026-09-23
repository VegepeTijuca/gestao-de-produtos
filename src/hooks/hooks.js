import { getProducts, saveProducts } from '../utils/storage'
import { useCallback, useState } from 'react'

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

  // busca só pelo nome do produto (é o que o campo de pesquisa promete:
  // "Insira o nome do produto"). Antes isso batia em Object.values(product)
  // inteiro, incluindo o id e a imagem em base64 — como essas strings são
  // enormes, qualquer termo curto (1-2 letras) tinha grande chance de "achar"
  // ruído dentro delas, e a busca só parecia funcionar de verdade a partir de
  // uns 3 caracteres.
  const filterProducts = (term) => {
    const normalizedTerm = String(term ?? '').trim().toLowerCase()
    if (!normalizedTerm) return products
    return products.filter((product) =>
      String(product.name ?? '').toLowerCase().includes(normalizedTerm),
    )
  }

  // useCallback: mantém a mesma referência de função entre renderizações,
  // para que efeitos que dependem dela (ex.: o listener de 'storage') não
  // precisem ser refeitos toda hora.
  const refresh = useCallback(() => setProducts(getProducts()), [])

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

// Estado e validação do formulário de produto, compartilhados entre o
// CreateProductModal e o EditProductModal (que cuidam, cada um, do próprio
// submit e de decidir se chama add ou edit).
export function useProductForm(initialProduct) {
  const [name, setName] = useState(initialProduct?.name ?? '')
  const [category, setCategory] = useState(initialProduct?.category ?? '')
  const [price, setPrice] = useState(initialProduct?.price ?? '')
  const [storage, setStorage] = useState(initialProduct?.storage ?? '')
  const [status, setStatus] = useState(initialProduct?.status ?? 'ativo')
  const [image, setImage] = useState(initialProduct?.image ?? null)

  // impede o submit se algum campo estiver inválido
  const [validFields, setValidFields] = useState(true)

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setImage(reader.result)
    reader.readAsDataURL(file)
  }

  const validate = () =>
    name.trim() !== '' &&
    category !== '' &&
    Number(price) > 0 &&
    storage !== '' &&
    Number(storage) >= 0 &&
    Number.isInteger(Number(storage))

  const buildProductData = () => ({
    name: name.trim(),
    category,
    price: Number(price),
    storage: Number(storage),
    status,
    image,
  })

  return {
    fields: { name, category, price, storage, status, image },
    setters: { setName, setCategory, setPrice, setStorage, setStatus, setImage },
    validFields,
    setValidFields,
    handleImageChange,
    validate,
    buildProductData,
  }
}
