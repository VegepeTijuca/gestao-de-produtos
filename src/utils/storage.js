export function getProducts() {
  try {
    const data = localStorage.getItem('produtos')
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Erro ao ler produtos do localStorage', error)
    return []
  }
}

export function saveProducts(products) {
  try {
    localStorage.setItem('produtos', JSON.stringify(products))
    return true
  } catch (error) {
    console.error('Erro ao salvar produtos no localStorage', error)
    return false
  }
}
