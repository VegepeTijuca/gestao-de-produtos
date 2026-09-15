// Produtos padrão caso não haja produtos salvos no localStorage
const cartelaDeOvos = 
    {id: 1,
    nome: 'Cartela de ovos',
    preco: 10.99}

const frango = 
    {id: 2,
    nome: 'Frango',
    preco: 15.50}


function getProducts() {
    const data = localStorage.getItem('produtos'); return data ? JSON.parse(data) : [cartelaDeOvos, frango];
}

function saveProducts(products) {
    localStorage.setItem('produtos', JSON.stringify(products));
}

