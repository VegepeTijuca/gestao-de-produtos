export default function newProductModal() {

    // gerar o id automaticamente de acordo com o ultimo id atual na lsita

    return(
        <form className='newProductModal'>
            {/* fazer o setstate disso tbm */}
            <div className='title'>
                <h2>Adição de produto</h2>
                <h3>Insira os dados do novo produto</h3>
            </div>

            <div className="imageInput">
                Oi
            </div>

            <div className="dataInput">
                <label></label>
                <input type="text" />

                <input type="number" />
                <input type="number" />
                
                <p>ID: {id}</p>
            </div>

            <div className="category">
                {/* preencher dpeois */}
            </div>

            {onClose && (
                <button type="button" onClick={onClose} className="closeButton">
                Fechar
                </button>
            )}
        </form>
    )
}