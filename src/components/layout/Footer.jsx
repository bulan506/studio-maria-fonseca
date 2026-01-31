// src/components/layout/Footer.jsx -
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faClock,
  faMapMarkerAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useSheets } from "../../context/SheetsContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { config, loading, error } = useSheets();

  if (loading.config === true || loading.services === true) {
    return (
      <footer className="footer" id="contacto">
        <div className="container">
          <p>Cargando información de contacto...</p>
        </div>
      </footer>
    );
  }

  if (error?.config || error?.services) {
    return (
      <footer className="footer" id="contacto">
        <div className="container">
          <p>Error cargando contacto. Por favor recarga la página.</p>
          <small>Error: {error?.config || error?.services}</small>
        </div>
      </footer>
    );
  }

  if (!config) {
    return (
      <footer className="footer" id="contacto">
        <div className="container">
          <p>Cargando información de contacto (configuración pendiente)...</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer" id="contacto">
      <div className="container">
        <div className="footer-content">
          {/* Logo y descripción */}
          <div className="footer-col">
            <div className="footer-logo">{config.studioName}</div>
            <p className="footer-description">{config.slogan}</p>
            <div className="social-links">
              <a
                href={config.socialMedia.instagram}
                className="social-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>

              <a
                href={config.socialMedia.whatsapp}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a
                href={`tel:${config.contact.phone}`}
                className="social-link"
                aria-label="Teléfono"
              >
                <FontAwesomeIcon icon={faPhone} />
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div className="footer-col">
            <h3 className="footer-heading">Contacto</h3>
            <ul className="footer-links">
              <li>
                <a href={`tel:${config.contact.phone}`} className="footer-link">
                  <FontAwesomeIcon icon={faPhone} /> {config.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.contact.email}`}
                  className="footer-link"
                >
                  <FontAwesomeIcon icon={faEnvelope} /> {config.contact.email}
                </a>
              </li>
              <li className="footer-link">
                <FontAwesomeIcon icon={faClock} /> {config.contact.hours}
              </li>
            </ul>
          </div>

          {/* Enlaces rápidos */}
          <div className="footer-col">
            <h3 className="footer-heading">Enlaces rápidos</h3>
            <ul className="footer-links">
              <li>
                <a href="#servicios" className="footer-link">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#maria" className="footer-link">
                  María Fonseca
                </a>
              </li>
              <li>
                <a href="#reservar" className="footer-link">
                  Reservar cita
                </a>
              </li>
            </ul>
          </div>

          {/* Ubicación */}
          <div className="footer-col">
            <h3 className="footer-heading">Ubicación</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                {config.contact.address}
              </li>
              <li className="footer-link">{config.contact.location}</li>
            </ul>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            &copy; {currentYear} {config.studioName}. Todos los derechos
            reservados.
          </div>
          <div className="footer-bottom-right">
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <span>Diseñado por</span>
              <a
                href="https://github.com/bulan506"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--color-secondary)",
                  textDecoration: "none",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.opacity = "0.8";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.opacity = "1";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <FontAwesomeIcon icon={faGithub} size="sm" />
                Brandon Vargas
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
