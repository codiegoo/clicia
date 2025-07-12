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
import { useColorModeValue } from '@chakra-ui/react';

import './nav.sass'

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { colorMode, toggleColorMode } = useColorMode()
  const { language, setLanguage } = useLanguage()



   // 🎨 Colores adaptados del theme
  const buttonBg = useColorModeValue('brand.cardLight', 'brand.cardDark');
  const buttonColor = useColorModeValue('brand.textLightPrimary', 'brand.textDarkPrimary');
  const buttonHover = useColorModeValue('gray.100', 'gray.700');
  const borderColor = useColorModeValue('gray.300', 'whiteAlpha.300');


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
    { label: language === 'es' ? 'Blog' : 'Blog', path: '/blog' },
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
          style={{color: "white", fontWeight: "bold", fontSize: "1.5rem"}}
        >
          ClicIA
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
              {navLinks.map(({ label, id, path }) => (
                <li key={id || path} className="nav-item">
                  {path ? (
                    // 👉 Es un enlace de página
                    <a href={path} className="nav-link">
                      {label}
                    </a>
                  ) : (
                    // 👉 Es un enlace de scroll interno
                    <a
                      href={`#${id}`}
                      className="nav-link"
                      onClick={handleClick(id)}
                    >
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Menú normal visible SOLO en pantallas grandes */}
        <div className="d-none d-lg-flex align-items-center" id="navbarLinks">
          <ul className="navbar-nav flex-row gap-3 me-3">
            {navLinks.map(({ label, id, path }) => (
              <li key={id || path} className="nav-item">
                {path ? (
                  // 👉 Es un enlace de página
                  <a href={path} className="nav-link">
                    {label}
                  </a>
                ) : (
                  // 👉 Es un enlace de scroll interno
                  <a
                    href={`#${id}`}
                    className="nav-link"
                    onClick={handleClick(id)}
                  >
                    {label}
                  </a>
                )}
              </li>
            ))}
          </ul>


          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            bg={buttonBg}
            color={buttonColor}
            _hover={{ bg: buttonHover }}
            borderWidth="1px"
            borderColor={borderColor}
            size="sm"
            rounded="md"
            ml={2}
          />

          {/* Selector de idioma */}
          <Menu>
            <MenuButton
              ml={2}
              px={3}
              py={1.5}
              fontSize="sm"
              bg={buttonBg}
              color={buttonColor}
              borderWidth="1px"
              borderColor={borderColor}
              _hover={{ bg: buttonHover }}
              rounded="md"
            >
              {language.toUpperCase()}
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.800')}
              color={buttonColor}
              borderColor={borderColor}
            >
              <MenuItem onClick={() => setLanguage('es')}>Español</MenuItem>
              <MenuItem onClick={() => setLanguage('en')}>English</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>
  )
}
