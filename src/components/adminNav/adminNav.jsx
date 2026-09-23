import './adminNav.css'
import tijucaLogo from '../../assets/tijuca.png'

// Nav decorativa
const NAV_LINKS = [
  { label: 'Dashboard' },
  { label: 'Produtos', active: true },
  { label: 'Usuários' },
  { label: 'Relatórios' },
  { label: 'Configurações' },
]

export default function AdminNav() {
  return (
    <nav className='adminNav'>
      <div className='adminNavBrand'>
        <img src={tijucaLogo} alt='Logo' className='adminNavLogo' />
        <span className='adminNavBrandName'>Tijuca Admin</span>
      </div>

      <div className='adminNavLinks'>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href='#'
            className={`adminNavLink${link.active ? ' adminNavLink--active' : ''}`}
            onClick={(e) => e.preventDefault()}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className='adminNavUser'>
        <span className='adminNavAvatar'>VR</span>
        Vitor Regisson
      </div>
    </nav>
  )
}
