import './deleteConfirmModal.css'

export default function DeleteConfirmModal({ product, onConfirm, onCancel }) {
  // Exibe a confirmação usando o produto selecionado e callbacks do componente pai.
  return (
    // Clicar fora do conteúdo fecha o modal.
    <div className='modalOverlay' onClick={onCancel}>
      {/* Impede que cliques dentro do modal acionem o fechamento externo. */}
      <div className='deleteConfirmModal' onClick={(e) => e.stopPropagation() /* stopPropagation impede que o clique se propague pra outros elementos pais */}>
        <h2>Excluir produto</h2>
        <p>Deseja realmente excluir "{product?.name}"?</p>

        <div className='formActions'>
          {/* Cancela a operação sem excluir o produto. */}
          <button type='button' className='cancelButton' onClick={onCancel}>Cancelar</button>
          {/* Confirma a exclusão do produto. */}
          <button type='button' className='confirmDeleteButton' onClick={onConfirm}>Excluir</button>
        </div>
      </div>
    </div>
  )
}
