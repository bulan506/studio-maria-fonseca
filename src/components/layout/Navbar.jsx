// src/components/layout/Navbar.jsx
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpa, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        setIsHidden(false);
        setIsScrolled(false);
        return;
      }

      if (currentScroll > lastScroll && !isHidden) {
        setIsHidden(true);
      } else if (currentScroll < lastScroll && isHidden) {
        setIsHidden(false);
      }

      if (currentScroll > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHidden]);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#maria", label: "María Fonseca" },
    { href: "#reservar", label: "Reservar" },
    { href: "#contacto", label: "Contacto" },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`navbar ${isHidden ? "hidden" : ""} ${isScrolled ? "scrolled" : ""}`}
    >
      <div className="container nav-container">
        {/* Logo */}
        <a href="#inicio" className="logo">
          <div className="logo-icon">
            <FontAwesomeIcon icon={faSpa} />
          </div>
          Studio María Fonseca
        </a>

        {/* Desktop Menu */}
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`} id="navLinks">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link"
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          id="mobileMenuBtn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>
    </nav>
  );
}
