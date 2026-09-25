import './adminNav.css'
import tijucaLogo from '../../assets/tijuca.png'

// Define os links exibidos na navegação e qual deles está ativo.
const NAV_LINKS = [
  { label: 'Dashboard' },
  { label: 'Produtos', active: true },
  { label: 'Usuários' },
  { label: 'Relatórios' },
  { label: 'Configurações' },
]

export default function AdminNav() {
  return (
    // Barra com a identidade visual, os links e os dados do usuário.
    <nav className='adminNav'>
      {/* Marca e nome do painel administrativo. */}
      <div className='adminNavBrand'>
        <img src={tijucaLogo} alt='Logo' className='adminNavLogo' />
        <span className='adminNavBrandName'>Tijuca Admin</span>
      </div>

      {/* Links informativos*/}
      <div className='adminNavLinks'>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href='#'
            className={`adminNavLink${link.active ? ' adminNavLink--active' : ''}`}
            // Impede que o link altere a página enquanto não há rotas configuradas.
            onClick={(e) => e.preventDefault()}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Identificação do usuário atualmente exibido no painel. */}
      <div className='adminNavUser'>
        <span className='adminNavAvatar'>VR</span>
        Vitor Regison
      </div>
    </nav>
  )
}
