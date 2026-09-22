import { useState } from 'react'
import './productFormModal.css'
import { CATEGORIES, STATUS_OPTIONS } from '../../../utils/constants'

export default function ProductFormModal({ product, onSave, onClose }) {
  // Controla se o modal é de edição ou criação
  const isEdit = Boolean(product)

  const [name, setName] = useState(product?.name ?? '')
  const [category, setCategory] = useState(product?.category ?? '')
  const [price, setPrice] = useState(product?.price ?? '')
  const [storage, setStorage] = useState(product?.storage ?? '')
  const [status, setStatus] = useState(product?.status ?? 'ativo')
  const [image, setImage] = useState(product?.image ?? null)

  // impede o submit se algum campo estiver inválido
  const [validFields, setValidFields] = useState(true)

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setImage(reader.result)
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const numericPrice = Number(String(price).replace(',', '.'))
    const numericStorage = Number(storage)
    const isValid =
      name.trim() !== '' &&
      category !== '' &&
      Number.isFinite(numericPrice) &&
      numericPrice > 0 &&
      storage !== '' &&
      Number.isFinite(numericStorage) &&
      numericStorage >= 0 &&
      Number.isInteger(numericStorage)

    setValidFields(isValid)

    if (isValid) {
      const productData = {
        name: name.trim(),
        category,
        price: numericPrice,
        storage: numericStorage,
        status,
        image,
      }

      // O useProducts gera o ID para novos produtos e preserva o ID na edição.
      if (isEdit) productData.id = product.id

      // A persistência é feita pelo useProducts/storage. Evita gravar usando
      // uma chave/formato diferente do utilizado pelo restante da aplicação.
      onSave?.(productData)
    }
  }

  return (
    <div className='modalOverlay' onClick={onClose}>
      <form className='productFormModal' onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className='title'>
          <h2>{isEdit ? 'Edição de produto' : 'Adição de produto'}</h2>
          <h3>{isEdit ? 'Altere os dados do produto' : 'Insira os dados do novo produto'}</h3>
        </div>

        <div className='imageInput'>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
          />
        </div>

        <label>Nome <span>*</span></label>
        <input
          type='text'
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label>Categoria <span>*</span></label>
        <select
          name='categories'
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value='' disabled>Selecione uma categoria</option>
          {CATEGORIES.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>

        <label>Preço <span>*</span></label>
        <input
          type='number'
          value={price}
          min='0.01'
          step='0.01'
          required
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Estoque <span>*</span></label>
        <input
          type='number'
          value={storage}
          min='0'
          step='1'
          required
          onChange={(e) => setStorage(e.target.value)}
        />

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUS_OPTIONS.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>

        {!validFields && <p>Preencha todos os campos corretamente.</p>}

        <div className='formActions'>
          <button type='button' className='cancelButton' onClick={onClose}>Cancelar</button>
          <button type='submit' className='submitButton'>{isEdit ? 'Salvar alterações' : 'Criar novo produto'}</button>
        </div>

      </form>
    </div>
  )
}
