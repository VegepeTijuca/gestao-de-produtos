import './deleteConfirmModal.css'

export default function DeleteConfirmModal({ product, onConfirm, onCancel }) {
  return (
    <div className='modalOverlay' onClick={onCancel}>
      <div className='deleteConfirmModal' onClick={(e) => e.stopPropagation() /* stopPropagation impede que o clique se propague pra outros elementos pais */}>
        <h2>Excluir produto</h2>
        <p>Deseja realmente excluir "{product?.name}"?</p>

        <div className='formActions'>
          <button type='button' className='cancelButton' onClick={onCancel}>Cancelar</button>
          <button type='button' className='confirmDeleteButton' onClick={onConfirm}>Excluir</button>
        </div>
      </div>
    </div>
  )
}
