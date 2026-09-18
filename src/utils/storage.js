export function getProducts() {
    const data = localStorage.getItem('produtos');
    return data ? JSON.parse(data) : [];
}

export function saveProducts(products) {
    localStorage.setItem('produtos', JSON.stringify(products));
}




