import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './ProductManagement.css'
import { useProducts } from '../hooks/hooks'
import { ProductTable, ProductSearch, Pagination, CreateProductModal, EditProductModal, DeleteConfirmModal } from '../components'
import { ALL_VALUE, CATEGORIES, STATUS_OPTIONS } from '../utils/constants'

const itemsPerPage = 5
const numericSortFields = ['price', 'storage']

export default function ProductManagement() {
  const { products, add, edit, remove, filter, refresh, error } = useProducts()

  // Filtros e ordenação aplicados à lista de produtos.
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState(ALL_VALUE)
  const [statusFilter, setStatusFilter] = useState(ALL_VALUE)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')

  const [page, setPage] = useState(1)
  const [pageInput, setPageInput] = useState('1')
  const [ultimaPaginaSincronizada, setUltimaPaginaSincronizada] = useState(1)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProduct, setDeletingProduct] = useState(null)

  // Atualiza a lista quando outra aba altera os produtos.
  useEffect(() => {
    window.addEventListener('storage', refresh)
    return () => window.removeEventListener('storage', refresh)
  }, [refresh])

  // Aplica busca, filtros selecionados e ordenação antes da paginação.
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

  // Calcula quantas páginas são necessárias para exibir todos os produtos.
  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / itemsPerPage))

  // Garante que a página atual nunca ultrapasse a última página disponível
  const currentPage = Math.min(page, totalPages)

  // Seleciona apenas os produtos correspondentes à página atual.
  const paginatedProducts = visibleProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  // Mantém o campo de página sincronizado quando a página atual é ajustada
  // automaticamente, evitando que ele exiba um número inválido.
  if (currentPage !== ultimaPaginaSincronizada) {
    setUltimaPaginaSincronizada(currentPage)
    setPageInput(String(currentPage))
  }

  const goToPage = (targetPage) => {
    // Limita o destino ao intervalo válido entre a primeira e a última página.
    const clamped = Math.min(Math.max(targetPage, 1), totalPages)
    setPage(clamped)
  }

  const commitPageInput = () => {
    const parsed = Number(pageInput)
    if (Number.isInteger(parsed)) {
      // Ao confirmar o campo, aplica a página informada e corrige valores
      // menores que 1 ou maiores que o total de páginas.
      goToPage(parsed)
    } else {
      // Se o valor não for um número inteiro, restaura a página atual.
      setPageInput(String(currentPage))
    }
  }

  const emptyMessage =
    // Define a mensagem exibida quando a lista não possui produtos visíveis.
    // A mensagem varia para diferenciar uma lista realmente vazia de uma busca sem resultados.
    products.length === 0
      ? 'Nenhum produto cadastrado ainda. Clique em "Novo Produto" para começar.'
      : 'Nenhum produto encontrado com os filtros aplicados.'

  // Alterna a ordenação da tabela entre crescente, decrescente e desativada.
  const handleSort = (field) => {
    // Quando a coluna já está selecionada, o próximo clique muda sua direção.
    if (sortField === field) {
      if (sortDirection === 'desc') {
        // Depois da ordenação decrescente, remove a ordenação da coluna.
        setSortField(null)
        setSortDirection('asc')
      } else {
        // A primeira repetição da coluna inverte a ordenação para decrescente.
        setSortDirection('desc')
      }
    } else {
      // Ao selecionar outra coluna, inicia a ordenação em sentido crescente.
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleCreate = (productData) => {
    // Salva o novo produto e fecha o modal após a confirmação.
    add(productData)
    setIsCreateModalOpen(false)
  }

  const handleEditSave = (id, changes) => {
    // Aplica somente as alterações informadas pelo modal de edição.
    edit(id, changes)
    setEditingProduct(null)
  }

  const handleConfirmDelete = () => {
    // Remove o produto confirmado e fecha o modal de exclusão.
    remove(deletingProduct.id)
    setDeletingProduct(null)
  }

  return (
    <main>

      <div className="panel">

        <div className="productToolbar">

          <div className="brandSection">
            <span className="brandTitle">Gestão de Produtos</span>
          </div>

          <div className="toolbarActions">

            <ProductSearch
              value={searchTerm}
              onChange={(term) => {
                setSearchTerm(term)
                setPage(1)
              }}
            />

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

            <button
              type="button"
              className='newProductButton'
              onClick={() => setIsCreateModalOpen(true)}
            >
              <PlusIcon />
              Novo Produto
            </button>

          </div>

        </div>
        {error && <p className="errorBanner">{error}</p>}

        {/* Exibe os produtos da página atual e permite ordená-los. */}
        <ProductTable
          products={paginatedProducts}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onEdit={(product) => setEditingProduct(product)}
          onDelete={(product) => setDeletingProduct(product)}
          emptyMessage={emptyMessage}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageInput={pageInput}
          itemsShown={paginatedProducts.length}
          totalItems={visibleProducts.length}
          onPageInputChange={setPageInput}
          onPageInputCommit={commitPageInput}
          onGoToPage={goToPage}
        />

      </div>

      {/* Modais são renderizados no body para evitar conflitos de layout. */}
      {isCreateModalOpen && (
        createPortal(
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
            <CreateProductModal
              onCreate={handleCreate}
              onClose={() => setIsCreateModalOpen(false)}
            />
          </div>,
          document.body,
        )
      )}

      {editingProduct && (
        createPortal(
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
            <EditProductModal
              product={editingProduct}
              onSave={handleEditSave}
              onClose={() => setEditingProduct(null)}
            />
          </div>,
          document.body,
        )
      )}

      {deletingProduct && (
        createPortal(
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
            <DeleteConfirmModal
              product={deletingProduct}
              onConfirm={handleConfirmDelete}
              onCancel={() => setDeletingProduct(null)}
            />
          </div>,
          document.body,
        )
      )}

    </main>
  )
}

// ícones

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

