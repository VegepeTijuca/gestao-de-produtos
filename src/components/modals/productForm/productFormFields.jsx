import { CATEGORIES, STATUS_OPTIONS } from '../../../utils/constants'
import './productForm.css'

export default function ProductFormFields({ form }) {
  // Obtém os valores atuais, os atualizadores e o tratamento da imagem.
  const { fields, setters, handleImageChange } = form
  const { name, category, price, storage, status } = fields
  const { setName, setCategory, setPrice, setStorage, setStatus } = setters

  return (
    <>
      {/* Campo opcional para selecionar a imagem do produto. */}
      <div className='imageInput'>

        <label htmlFor='product-image'>Imagem</label>
        <input
          id='product-image'
          type='file'
          accept='image/*'
          onChange={handleImageChange}
        />
      </div>

      {/* Campos obrigatórios do produto. */}
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

      {/* O status é preenchido a partir das opções disponíveis. */}
      <label>Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        {STATUS_OPTIONS.map((item) => (
          <option key={item.value} value={item.value}>{item.label}</option>
        ))}
      </select>
    </>
  )
}
