import { useEffect, useState } from 'react'
import './ProductManagement.css'
import { useProducts } from '../hooks/hooks'
import { ProductTable, ProductFormModal, DeleteConfirmModal } from '../components'
import { ALL_VALUE, CATEGORIES, STATUS_OPTIONS } from '../utils/constants'

const itemsPerPage = 5
const numericSortFields = ['price', 'storage']

export default function ProductManagement() {
  const { products, add, edit, remove, filter, refresh, error } = useProducts()

  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState(ALL_VALUE)
  const [statusFilter, setStatusFilter] = useState(ALL_VALUE)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')

  const [page, setPage] = useState(1)
  const [pageInput, setPageInput] = useState('1')

  const [modalMode, setModalMode] = useState(null) // 'create' | 'edit' | null
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProduct, setDeletingProduct] = useState(null)

  useEffect(() => {
    window.addEventListener('storage', refresh)
    return () => window.removeEventListener('storage', refresh)
  }, [])

  // busca por nome + filtros de categoria e status, todos em conjunto
  let visibleProducts = filter(searchTerm)
  if (categoryFilter !== ALL_VALUE) visibleProducts = visibleProducts.filter((p) => p.category === categoryFilter)
  if (statusFilter !== ALL_VALUE) visibleProducts = visibleProducts.filter((p) => p.status === statusFilter)

  // ordenação por coluna (números comparados como número, texto sem diferenciar maiúscula/minúscula)
  if (sortField) {
    const isNumeric = numericSortFields.includes(sortField)
    visibleProducts = [...visibleProducts].sort((a, b) => {
      const valueA = isNumeric ? Number(a[sortField]) : String(a[sortField] ?? '').toLowerCase()
      const valueB = isNumeric ? Number(b[sortField]) : String(b[sortField] ?? '').toLowerCase()
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }

  // paginação
  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / itemsPerPage))
  const currentPage = Math.min(page, totalPages)
  const paginatedProducts = visibleProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  // mantém o campo de "ir para página" sincronizado quando a página muda por outro meio
  // (botões, filtros que reduzem o total de páginas, etc.)
  useEffect(() => {
    setPageInput(String(currentPage))
  }, [currentPage])

  const goToPage = (targetPage) => {
    const clamped = Math.min(Math.max(targetPage, 1), totalPages)
    setPage(clamped)
  }

  const commitPageInput = () => {
    const parsed = Number(pageInput)
    if (Number.isInteger(parsed)) {
      goToPage(parsed)
    } else {
      setPageInput(String(currentPage))
    }
  }

  // mensagem de "não encontrado": diferente se o catálogo tá vazio ou se é só o filtro que não achou nada
  const emptyMessage =
    products.length === 0
      ? 'Nenhum produto cadastrado ainda. Clique em "Novo Produto" para começar.'
      : 'Nenhum produto encontrado com os filtros aplicados.'

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((dir) => (dir === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSave = (productData) => {
    if (productData.id !== undefined) {
      edit(productData.id, productData)
    } else {
      add(productData)
    }
    setModalMode(null)
    setEditingProduct(null)
  }

  const handleConfirmDelete = () => {
    remove(deletingProduct.id)
    setDeletingProduct(null)
  }

  return (
    <main>

      {/* div que engloba o painel inteiro (cabeçalho + toolbar + tabela + paginação) */}
      <div className="panel">

        <div className="productToolbar">

          {/* logo + título, dentro do toolbar */}
          <div className="brandSection">
            <img src="/favicon.svg" alt="Logo" className="brandLogo" />
            <span className="brandTitle">Gestão de Produtos</span>
          </div>

          <div className="toolbarActions">

            <input
              type='text'
              placeholder='Insira o nome do produto'
              className='searchBox'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
            />

            {/* botão de filtros com dropdown */}
            <div className="filtersWrapper">
              <button
                type="button"
                className='openFilters'
                onClick={() => setIsFiltersOpen((open) => !open)}
              >
                <FilterIcon />
                Filtros
              </button>

              {isFiltersOpen && (
                <div className="filtersDropdown">
                  <label>Categoria</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => {
                      setCategoryFilter(e.target.value)
                      setPage(1)
                    }}
                  >
                    <option value={ALL_VALUE}>Todas as categorias</option>
                    {CATEGORIES.map((category) => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>

                  <label>Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value)
                      setPage(1)
                    }}
                  >
                    <option value={ALL_VALUE}>Todos os status</option>
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Novo produto */}
            <button
              type="button"
              className='newProductButton'
              onClick={() => {
                setEditingProduct(null)
                setModalMode('create')
              }}
            >
              <PlusIcon />
              Novo Produto
            </button>

          </div>

        </div>

        {/* estado de erro (ex.: falha ao salvar no localStorage) */}
        {error && <p className="errorBanner">{error}</p>}

        {/* tabela de produtos */}
        <ProductTable
          products={paginatedProducts}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onEdit={(product) => {
            setEditingProduct(product)
            setModalMode('edit')
          }}
          onDelete={(product) => setDeletingProduct(product)}
          emptyMessage={emptyMessage}
        />

        {/* paginação */}
        <div className='pagination'>
          <button
            type='button'
            className='pageEdgeButton'
            disabled={currentPage === 1}
            onClick={() => goToPage(1)}
            title='Primeira página'
            aria-label='Primeira página'
          >
            <ChevronsLeftIcon />
          </button>
          <button type='button' disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>
            Anterior
          </button>

          <span className='pageInfo'>
            Página
            <input
              type='number'
              className='pageInput'
              min={1}
              max={totalPages}
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onBlur={commitPageInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  commitPageInput()
                }
              }}
              aria-label='Ir para a página'
            />
            de {totalPages}
          </span>

          <button type='button' disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>
            Próximo
          </button>
          <button
            type='button'
            className='pageEdgeButton'
            disabled={currentPage === totalPages}
            onClick={() => goToPage(totalPages)}
            title='Última página'
            aria-label='Última página'
          >
            <ChevronsRightIcon />
          </button>
        </div>

      </div>

      {modalMode && (
        <ProductFormModal
          product={modalMode === 'edit' ? editingProduct : null}
          onSave={handleSave}
          onClose={() => {
            setModalMode(null)
            setEditingProduct(null)
          }}
        />
      )}

      {deletingProduct && (
        <DeleteConfirmModal
          product={deletingProduct}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingProduct(null)}
        />
      )}

    </main>
  )
}

function FilterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function ChevronsLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="11 17 6 12 11 7" />
      <polyline points="18 17 13 12 18 7" />
    </svg>
  )
}

function ChevronsRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 17 18 12 13 7" />
      <polyline points="6 17 11 12 6 7" />
    </svg>
  )
}