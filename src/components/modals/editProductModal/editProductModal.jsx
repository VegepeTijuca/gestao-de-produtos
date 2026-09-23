import { useProductForm } from '../../../hooks/hooks'
import ProductFormFields from '../productForm/productFormFields'
import './editProductModal.css'

export default function EditProductModal({ product, onSave, onClose }) {
  const form = useProductForm(product)

  const handleSubmit = (e) => {
    e.preventDefault()

    const isValid = form.validate()
    form.setValidFields(isValid)

    if (isValid) {
      onSave?.(product.id, form.buildProductData())
    }
  }

  return (
    <div className='modalOverlay' onClick={onClose}>
      <form className='productFormModal' onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className='title'>
          <h2>Edição de produto</h2>
          <h3>Altere os dados do produto</h3>
        </div>

        <ProductFormFields form={form} />

        {!form.validFields && <p className='formError'>Preencha todos os campos corretamente.</p>}

        <div className='formActions'>
          <button type='button' className='cancelButton' onClick={onClose}>Cancelar</button>
          <button type='submit' className='submitButton'>Salvar alterações</button>
        </div>

      </form>
    </div>
  )
}
