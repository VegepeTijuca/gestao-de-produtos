import './productCard.css'

export default function ProductCard({ id, name, category, price, storage, status, image, setIsInfoModalOpen }) {
  return (
    <div className='productLine' onClick={() => setIsInfoModalOpen?.(true)}>
      <img src={image} alt={name} />

      <div className='productLine__info'>
        <span>{name}</span>
        <span>{category}</span>
        <span>{price}</span>
        <span>{storage}</span>
        <span>{status}</span>
        <span>{id}</span>
      </div>
    </div>
  )
}