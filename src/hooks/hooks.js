import { getProducts, saveProducts } from '../utils/storage'
import { useCallback, useState } from 'react'

export function useProducts() {
  // Mantém os produtos em memória e sincroniza as alterações com o storage.
  const [products, setProducts] = useState(() => getProducts())
  const [error, setError] = useState(null)

  const listProducts = () => products

  const addProduct = (product) => {
    // Gera o próximo ID com base no maior ID existente.
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
    // Atualiza somente o produto que corresponde ao ID informado.
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
    // Remove o produto selecionado e salva a nova lista.
    setProducts((currentProducts) => {
      const updatedProducts = currentProducts.filter((product) => product.id !== id)
      const success = saveProducts(updatedProducts)
      setError(success ? null : 'Não foi possível excluir o produto.')
      return updatedProducts
    })
  }

  const filterProducts = (term) => {
    // Busca por nome sem diferenciar maiúsculas e minúsculas.
    const normalizedTerm = String(term ?? '').trim().toLowerCase()
    if (!normalizedTerm) return products
    return products.filter((product) =>
      String(product.name ?? '').toLowerCase().includes(normalizedTerm),
    )
  }

  // Recarrega os produtos diretamente do armazenamento.
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

export function useProductForm(initialProduct) {
  // Inicializa o formulário com os dados do produto ou valores padrão.
  const [name, setName] = useState(initialProduct?.name ?? '')
  const [category, setCategory] = useState(initialProduct?.category ?? '')
  const [price, setPrice] = useState(initialProduct?.price ?? '')
  const [storage, setStorage] = useState(initialProduct?.storage ?? '')
  const [status, setStatus] = useState(initialProduct?.status ?? 'ativo')
  const [image, setImage] = useState(initialProduct?.image ?? null)

  // Permite sinalizar para a interface que o formulário está inválido.
  const [validFields, setValidFields] = useState(true)

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Converte a imagem selecionada para uma URL que pode ser armazenada.
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result)
    reader.readAsDataURL(file)
  }

  // Verifica os campos obrigatórios e os valores numéricos.
  const validate = () =>
    name.trim() !== '' &&
    category !== '' &&
    Number(price) > 0 &&
    storage !== '' &&
    Number(storage) >= 0 &&
    Number.isInteger(Number(storage))

  // Converte os valores do formulário para o formato do produto.
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
