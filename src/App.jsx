import { useState } from 'react'
import './App.css'
import { ProductCard, ProductInfoModal, newProductModal } from './components';

function App() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  

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
          
          {/* Novo produto */}
          <button className='newProductButton' onClick={() => setIsCreationModalOpen(true)}><img src='#' alt='Sinal de soma'></img>Novo Produto</button>

        </div>


        {/* container dos produtos */}
        <section className="productContainer">
          {/* Chama o modal ao clicar em um card */}
          {isInfoModalOpen && (
          <ProductInfoModal
            id={3}
            name="Frangos"
            category="Eletrônicos"
            price={3}
            storage={42}
            status="tem"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS19at2DQrZUnR54Q5RXS1fwbdTpEkcIpIxsN2dfYilMzVVaWkPRirLxy4&s=10"
            onClose={() => setIsInfoModalOpen(false)}
          />
          )}

          <ProductCard name="Frangos" category="Eletrônicos" price={3} storage={42} status="tem" id={3} setIsInfoModalOpen={setIsInfoModalOpen} />

          
        </section>

        

      </main>

    </>
  )
}

export default App
