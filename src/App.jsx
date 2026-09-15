import { useState, useEffect } from 'react'
import { createRoot } from "react-dom/client"
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  function ProductInfoModal({ id, name, category, price, storage, status }) {
    return (
      <div className='modal productInfoModal'>
        <h2>{name || 'Novo produto'}</h2>
        <p>ID: {id}</p>
        <p>Categoria: {category}</p>
        <p>Preço: {price}</p>
        <p>Estoque: {storage}</p>
        <p>Status: {status}</p>
        <button onClick={() => setIsModalOpen(false)}>Fechar</button>
      </div>
    )
  }

  function ProductCard({ id, name, category, price, storage, status }) {

    return (
      <div className='productCard' onClick={() => setIsModalOpen(true)}>
        <h2>{name}</h2>
        <p>{price}</p>
        <p>{storage}</p>
        <p>{status}</p>
        <p>{id}</p>
        <p>{category}</p>
      </div>
    )
  }
  
  return (
    <>
      <header>
        Gestão de produtos
      </header>

      <main>

        {/* pesquisa, filtros e botão para adicionar novo produto */}
        <div className="productToolbar">

          <button className='openFilters'><img src='#' alt='Símbolo de filtro'></img>Filtros</button>

          <input type='text' placeholder='Insira o nome do produto' className='searchBox' />
          
          <button className='newProductButton'><img src='#' alt='Sinal de soma'></img>Novo Produto</button>

        </div>


        {/* container dos produtos */}
        <section className="productContainer">
          <ProductCard name="Frangos" category="Eletrônicos" price={3} storage={42} status="tem" id={3} />
        </section>

        {isModalOpen && (
          <ProductInfoModal
            id={3}
            name="Frangos"
            category="Eletrônicos"
            price={3}
            storage={42}
            status="tem"
          />
        )}

      </main>

    </>
  )
}

export default App
