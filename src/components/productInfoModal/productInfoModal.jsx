import './productInfoModal.css'
import { getProducts } from '../../utils/storage'

export default function ProductInfoModal({ id, name, category, price, storage, status, image, onClose }) {

  return (
    
    <div className='productInfoModal'>
      <div className='productStatusContainer'>
        <p>Status: {status}</p>
      </div>

      <div className="productImageContainer">
        <img src={image} />
      </div>

      <div className="productTitlesContainer">
        <h2>{name || 'Novo produto'}</h2>
        <p>{category}</p>
      </div>

      <div className="productInfoContainer">
        <p>R${price}</p>
        <p>Estoque: {storage}</p>
        
        <p>ID: {id}</p>
      </div>

      {onClose && (
        <button type="button" onClick={onClose} className="closeButton">
          Fechar
        </button>
      )}
    </div>
  )
}
