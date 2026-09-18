import { useState } from "react";
import { getProducts, saveProducts } from "../../utils/storage"
import './newProductModal.css'

export default function NewProductModal({ onClose }) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);

    // impede o submit se algum campo estiver inválido
    const [validFields, setValidFields] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = name.trim() !== "" && category !== "" && price !== "" && Number(price) > 0;
        setValidFields(isValid);

        if (isValid) {
            const products = getProducts();

            // cria id de acordo com a quantidade de produtos
            const newId = products.length ? products[products.length - 1].id + 1 : 1;

            const newProduct = {
                id: newId,
                name,
                category,
                price: Number(price),
                image: image ? image.name : null,
                status: "active"
            }

            const updatedProducts = [...products, newProduct]
            saveProducts(updatedProducts)

            if (onClose) onClose();
        }
    };

    return(
        <form className='newProductModal' onSubmit={handleSubmit}>
            <div className='title'>
                <h2>Adição de produto</h2>
                <h3>Insira os dados do novo produto</h3>
            </div>

            <div className="imageInput">
                <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}/>
            </div>


            <label>Nome <span>*</span></label>
            <input 
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}/>

            <label>Categoria <span>*</span></label>
            <select
                name="categories" 
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="" disabled>Selecione uma categoria</option>
                <option value="eletrodomestico">Eletrodoméstico</option>
                <option value="cosmetico">Cosmético</option>
                <option value="moveis">Móveis</option>
                <option value="acessorio">Acessório</option>
            </select>

            <label>Preço <span>*</span></label>
            <input
                type="number"
                value={price}
                min="0.01"
                step="0.01"
                required
                onChange={(e) => setPrice(e.target.value)}
            />

            {!validFields && <p>Preencha todos os campos corretamente.</p>}

            <button type="submit">Criar novo produto</button>

        
        </form>
    )
}