import { useProductForm } from '../../../hooks/hooks'
import ProductFormFields from '../productForm/productFormFields'
import './createProductModal.css'

export default function CreateProductModal({ onCreate, onClose }) {
  const form = useProductForm(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const isValid = form.validate()
    form.setValidFields(isValid)

    if (isValid) {
      onCreate?.({ ...form.buildProductData(), id: crypto.randomUUID() })
    }
  }

  return (
    <div className='modalOverlay' onClick={onClose}>
      <form className='productFormModal' onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className='title'>
          <h2>Adição de produto</h2>
          <h3>Insira os dados do novo produto</h3>
        </div>

        <ProductFormFields form={form} />

        {!form.validFields && <p className='formError'>Preencha todos os campos corretamente.</p>}

        <div className='formActions'>
          <button type='button' className='cancelButton' onClick={onClose}>Cancelar</button>
          <button type='submit' className='submitButton'>Criar novo produto</button>
        </div>

      </form>
    </div>
  )
}
