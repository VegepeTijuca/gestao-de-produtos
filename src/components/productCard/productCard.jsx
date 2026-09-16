import './productCard.css'

export default function ProductCard({ id, name, category, price, storage, status, image, setIsInfoModalOpen }) {



    return (
      <div className='productCard' onClick={() => setIsInfoModalOpen(true)}>
        <img src={image} />
        <h2>{name}</h2>
        <p>{price}</p>
        <p>{storage}</p>
        <p>{status}</p>
        <p>{id}</p>
        <p>{category}</p>
      </div>
    )
  }