import { useState, useEffect } from 'react'
import { createRoot } from "react-dom/client"
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {

  function ProductCard({ id, name, category, price, storage, status }) {

    return (
      <div className='productCard'>
        <h2>{name}</h2>
        <p>{price}</p>
        <p>{storage}</p>
        <p>{status}</p>
        <p>{id}</p>
        <p>{category}</p>
      </div>
    )
  }

  function ProductInfoModal({ id, name, category, price, storage, status }) {
    
    return(
      <div className='modal productInfoModal'>
        {/* teste */}
      </div>
    )
  }
  
  return (
    <>
      <header>
        Gestão de produtos
      </header>

      <main>
        <input type='text' placeholder='Insira o produto aqui' className='inputProduto'></input>

        <section className="productContainer">
          <ProductCard name="Frangos" category="Eletrônicos" price={3} storage={42} status="tem" id={3} />
        </section>

        
      </main>

    </>
  )
}

export default App
