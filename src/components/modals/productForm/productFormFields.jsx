import { CATEGORIES, STATUS_OPTIONS } from '../../../utils/constants'

// Só os campos do formulário (sem <form>, sem overlay, sem botões de ação).
// Usado dentro do CreateProductModal e do EditProductModal, que cuidam cada
// um do próprio título, submit e onSave/onCreate.
export default function ProductFormFields({ form }) {
  const { fields, setters, handleImageChange } = form
  const { name, category, price, storage, status } = fields
  const { setName, setCategory, setPrice, setStorage, setStatus } = setters

  return (
    <>
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
    </>
  )
}
