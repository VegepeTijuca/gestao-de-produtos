<<<<<<< HEAD
import { useEffect, useState } from 'react'
import './App.css'
import { getProducts } from './utils/storage';
import { ProductCard, ProductInfoModal, NewProductModal } from './components';

function App() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false)
  const [products, setProducts] = useState(() => getProducts() || [])

  const refreshProducts = () => setProducts(getProducts() || [])

  useEffect(() => {
    window.addEventListener('storage', refreshProducts)
    return () => window.removeEventListener('storage', refreshProducts)
  }, [])

  return (
    <>
      <header>
        Gestão de produtos
      </header>

      <main>

        {/* pesquisa, filtros e botão para adicionar novo produto */}
        <div className="productToolbar">

          <button className='openFilters'><img src='#' alt='Símbolo de filtro'></img>Filtros</button>
          {/* colocar o dropdown dos filtros dps */}

          <input type='text' placeholder='Insira o nome do produto' className='searchBox' />
          
          {/* Novo produto */}
          <button type="button" className='newProductButton' onClick={() => setIsCreationModalOpen(true)}><img src='#' alt='Sinal de soma'></img>Novo Produto</button>

        </div>


        {/* container dos produtos */}
        <section className="productContainer">
          {/* Chama o modal ao clicar em um card ou no botão de novo produto */}
          {isInfoModalOpen && (
            <ProductInfoModal onClose={() => setIsInfoModalOpen(false)}
          />
          )}

          {isCreationModalOpen && (
            <NewProductModal
            onClose={() => {
              setIsCreationModalOpen(false)
              refreshProducts()
            }}
            />
          )}

          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              setIsInfoModalOpen={setIsInfoModalOpen}
            />
          ))}
          
        </section>

        

      </main>

    </>
  )
=======
import ProductManagement from './pages/ProductManagement'

function App() {
  return <ProductManagement />
>>>>>>> bfa3250 (Ta quebrado mas tá aí)
}

export default App
