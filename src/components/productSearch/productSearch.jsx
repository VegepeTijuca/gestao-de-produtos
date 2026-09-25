import './productSearch.css'

export default function ProductSearch({ value, onChange, placeholder = 'Insira o nome do produto' }) {
  return (
    <input
      type='text'
      placeholder={placeholder}
      className='searchBox'
      value={value}
      // Envia o texto digitado para atualizar o valor da busca.
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
