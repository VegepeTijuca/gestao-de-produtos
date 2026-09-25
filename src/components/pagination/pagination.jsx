import "./pagination.css"

export default function Pagination({
	currentPage,
	totalPages,
	pageInput,
	itemsShown,
	totalItems,
	onPageInputChange,
	onPageInputCommit,
	onGoToPage,
}) {
	return (
		// Exibe o resumo dos itens e os controles de navegação entre páginas
		<div className="pagination">
			<span className="itemsShown">
				Exibindo {itemsShown} de {totalItems} itens
			</span>

			<button
				type="button"
				className="pageEdgeButton"
				disabled={currentPage === 1}
				onClick={() => onGoToPage(1)}
				title="Primeira página"
				aria-label="Primeira página"
			>
				<ChevronsLeftIcon />
			</button>

			<button type="button" disabled={currentPage === 1} onClick={() => onGoToPage(currentPage - 1)}>
				Anterior
			</button>

			<span className="pageInfo">
				Página
				<input
					// Permite informar diretamente o número da página desejada.
					type="number"
					className="pageInput"
					min={1}
					max={totalPages}
					value={pageInput}
					onChange={(event) => onPageInputChange(event.target.value)}
					onBlur={onPageInputCommit}
					onKeyDown={(event) => {
						// Confirma a página ao pressionar Enter sem recarregar a página.
						if (event.key === 'Enter') {
							event.preventDefault()
							onPageInputCommit()
						}
					}}
					aria-label="Ir para a página"
				/>
				de {totalPages}
			</span>

			<button type="button" disabled={currentPage === totalPages} onClick={() => onGoToPage(currentPage + 1)}>
				Próximo
			</button>

			<button
				type="button"
				className="pageEdgeButton"
				disabled={currentPage === totalPages}
				onClick={() => onGoToPage(totalPages)}
				title="Última página"
				aria-label="Última página"
			>
				<ChevronsRightIcon />
			</button>
		</div>
	)
}

function ChevronsLeftIcon() {
	// Ícone usado para voltar diretamente à primeira página.
	return (
		<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
			<polyline points="11 17 6 12 11 7" />
			<polyline points="18 17 13 12 18 7" />
		</svg>
	)
}

function ChevronsRightIcon() {
	// Ícone usado para avançar diretamente à última página.
	return (
		<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
			<polyline points="13 17 18 12 13 7" />
			<polyline points="6 17 11 12 6 7" />
		</svg>
	)
}
