import './productSearch.css'

export default function ProductSearch({ value, onChange, placeholder = 'Insira o nome do produto' }) {
  return (
    <input
      type='text'
      placeholder={placeholder}
      className='searchBox'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
