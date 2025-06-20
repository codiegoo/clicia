'use client'

import { useLanguage } from '@/context/LanguajeContext'
import { useEffect, useState } from 'react'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

import './nav.sass'

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { colorMode, toggleColorMode } = useColorMode()
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false)
      } else {
        setShowNavbar(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navLinks = [
    { label: language === 'es' ? 'Inicio' : 'Home', id: 'particles' },
    { label: language === 'es' ? 'Herramientas' : 'Tools', id: 'herramientasContain' },
    { label: language === 'es' ? 'Comparativas' : 'Comparisons', id: 'comparativaContain' },
    { label: language === 'es' ? 'Contacto' : 'Contact', id: 'contactoContain' },
  ]

  const handleClick = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`navbar fixed-top transition-navbar ${
        showNavbar ? 'navbar-visible' : 'navbar-hidden'
      }`}
      style={{ backgroundColor: 'inherit' }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#particles"
          onClick={handleClick('particles')}
        >
          TuSitio IA
        </a>

        {/* Botón hamburguesa SOLO visible en pantallas pequeñas */}
        <button
          className="navbar-toggler d-block d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú hamburguesa SOLO en móviles */}
        <div
          className="offcanvas offcanvas-end d-lg-none"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {navLinks.map(({ label, id }) => (
                <li key={id} className="nav-item">
                  <a
                    href={`#${id}`}
                    className="nav-link"
                    onClick={handleClick(id)}
                    data-bs-dismiss="offcanvas"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Menú normal visible SOLO en pantallas grandes */}
        <div className="d-none d-lg-flex align-items-center" id="navbarLinks">
          <ul className="navbar-nav flex-row gap-3 me-3">
            {navLinks.map(({ label, id }) => (
              <li key={id} className="nav-item">
                <a
                  href={`#${id}`}
                  className="nav-link"
                  onClick={handleClick(id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Botón para cambiar modo oscuro/claro */}
          <IconButton
            ml={2}
            aria-label="Toggle dark mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="unstyled"
            size="sm"
            color="black"
            _hover={{ bg: 'transparent' }}
          />

          {/* Selector de idioma */}
          <Menu>
            <MenuButton
              ml={2}
              className="btn btn-light btn-sm"
              aria-label="Toggle language"
            >
              {language.toUpperCase()}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setLanguage('es')}>Español</MenuItem>
              <MenuItem onClick={() => setLanguage('en')}>English</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>
  )
}
