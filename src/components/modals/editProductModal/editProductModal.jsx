import { useProductForm } from '../../../hooks/hooks'
import ProductFormFields from '../productForm/productFormFields'
import './editProductModal.css'

export default function EditProductModal({ product, onSave, onClose }) {
  // Inicializa o formulário com os dados atuais do produto.
  const form = useProductForm(product)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Valida os campos antes de enviar as alterações.
    const isValid = form.validate()
    form.setValidFields(isValid)

    if (isValid) {
      // Envia o ID e os novos dados somente quando o formulário é válido.
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

        {/* Exibe um aviso quando os dados preenchidos são inválidos. */}
        {!form.validFields && <p className='formError'>Preencha todos os campos corretamente.</p>}

        <div className='formActions'>
          <button type='button' className='cancelButton' onClick={onClose}>Cancelar</button>
          <button type='submit' className='submitButton'>Salvar alterações</button>
        </div>

      </form>
    </div>
  )
}
