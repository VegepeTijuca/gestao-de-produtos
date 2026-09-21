<<<<<<< HEAD
export default function ProductTable() {
    
    
    
    return {

    }
}
=======
import './productTable.css'
import { CATEGORIES } from '../../utils/constants'

const categoryLabels = Object.fromEntries(CATEGORIES.map((c) => [c.value, c.label]))

const columns = [
  { field: 'name', label: 'Nome', type: 'string', width: '24%' },
  { field: 'category', label: 'Categoria', type: 'string', width: '16%' },
  { field: 'price', label: 'Preço', type: 'number', width: '13%' },
  { field: 'storage', label: 'Estoque', type: 'number', width: '11%' },
  { field: 'status', label: 'Status', type: 'string', width: '13%' },
]

export default function ProductTable({ products, sortField, sortDirection, onSort, onRowClick, onEdit, onDelete, emptyMessage }) {
  return (
    <div className='tableWrapper'>
      <table className='productTable'>
        <colgroup>
          <col style={{ width: '64px' }} />
          {columns.map((column) => (
            <col key={column.field} style={{ width: column.width }} />
          ))}
          <col style={{ width: '150px' }} />
        </colgroup>

        <thead>
          <tr>
            <th className='imageHeader'>Imagem</th>
            {columns.map((column) => (
              <th key={column.field} onClick={() => onSort(column.field)}>
                <span className='thContent'>
                  {column.label}
                  <SortIcon active={sortField === column.field} direction={sortDirection} />
                </span>
              </th>
            ))}
            <th className='actionsHeader'>Ações</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={columns.length + 2} className='emptyRow'>
                {emptyMessage ?? 'Nenhum produto encontrado.'}
              </td>
            </tr>
          )}

          {products.map((product) => (
            <tr key={product.id} onClick={() => onRowClick?.(product)}>
              <td className='imageCell'>
                {product.image ? (
                  <img src={product.image} alt={product.name} className='productThumb' />
                ) : (
                  <div className='productThumbPlaceholder' title='Sem imagem'>
                    <ImagePlaceholderIcon />
                  </div>
                )}
              </td>
              <td>{product.name}</td>
              <td>{categoryLabels[product.category] ?? product.category}</td>
              <td>
                {Number(product.price || 0).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td>{product.storage ?? 0}</td>
              <td>
                <span className={`statusBadge statusBadge--${product.status}`}>{product.status}</span>
              </td>
              <td className='actionsCell'>
                <button
                  type='button'
                  className='editButton'
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit?.(product)
                  }}
                >
                  <PencilIcon />
                  Editar
                </button>
                <button
                  type='button'
                  className='deleteButton'
                  title='Excluir produto'
                  aria-label='Excluir produto'
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete?.(product)
                  }}
                >
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SortIcon({ active, direction }) {
  if (!active) {
    return (
      <svg className='sortIcon sortIcon--idle' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
        <polyline points='7 10 12 5 17 10' />
        <polyline points='7 14 12 19 17 14' />
      </svg>
    )
  }

  return (
    <svg className='sortIcon sortIcon--active' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
      {direction === 'asc' ? <polyline points='6 15 12 9 18 15' /> : <polyline points='6 9 12 15 18 9' />}
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <path d='M12 20h9' />
      <path d='M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <polyline points='3 6 5 6 21 6' />
      <path d='M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6' />
      <path d='M10 11v6' />
      <path d='M14 11v6' />
      <path d='M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2' />
    </svg>
  )
}

function ImagePlaceholderIcon() {
  return (
    <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <rect x='3' y='3' width='18' height='18' rx='2' />
      <circle cx='8.5' cy='8.5' r='1.5' />
      <path d='M21 15l-5-5L5 21' />
    </svg>
  )
}
>>>>>>> bfa3250 (Ta quebrado mas tá aí)
