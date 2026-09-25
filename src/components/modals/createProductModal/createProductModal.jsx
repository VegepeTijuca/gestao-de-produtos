import { useProductForm } from '../../../hooks/hooks'
import ProductFormFields from '../productForm/productFormFields'
import './createProductModal.css'

export default function CreateProductModal({ onCreate, onClose }) {
  // Inicializa o formulário vazio para cadastrar um novo produto.
  const form = useProductForm(null)

  // Valida os campos e cria um identificador único para o produto.
  const handleSubmit = (e) => {
    e.preventDefault()

    const isValid = form.validate()
    form.setValidFields(isValid)

    if (isValid) {
      onCreate?.({ ...form.buildProductData(), id: crypto.randomUUID() })
    }
  }

  return (
    // Fecha o modal ao clicar fora do formulário.
    <div className='modalOverlay' onClick={onClose}>
      {/* Impede que cliques dentro do formulário fechem o modal. */}
      <form className='productFormModal' onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className='title'>
          <h2>Adição de produto</h2>
          <h3>Insira os dados do novo produto</h3>
        </div>

        <ProductFormFields form={form} />

        {/* Exibe a mensagem quando a validação falha. */}
        {!form.validFields && <p className='formError'>Preencha todos os campos corretamente.</p>}

        <div className='formActions'>
          <button type='button' className='cancelButton' onClick={onClose}>Cancelar</button>
          <button type='submit' className='submitButton'>Criar novo produto</button>
        </div>

      </form>
    </div>
  )
}
