export function getProducts() {
<<<<<<< HEAD
    const data = localStorage.getItem('produtos');
    return data ? JSON.parse(data) : [];
}

export function saveProducts(products) {
    localStorage.setItem('produtos', JSON.stringify(products));
}




=======
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
>>>>>>> bfa3250 (Ta quebrado mas tá aí)
