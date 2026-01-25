// src/components/sections/ServiceCard.jsx
import { useState, useEffect } from "react";
import { useSheets } from "../../context/SheetsContext"; // <-- Importar el contexto
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faDna,
  faHeart,
  faSpa,
  faCut,
  faWater,
  faWind,
  faClock,
  faTag,
  faStar,
  faCheck,
  faChevronDown,
  faChevronUp,
  faTimes,
  faCalendarAlt,
  faPhone, // <-- Añadir icono de teléfono
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  leaf: faLeaf,
  dna: faDna,
  heart: faHeart,
  spa: faSpa,
  cut: faCut,
  water: faWater,
  wind: faWind,
};

export default function ServiceCard({ service, delay = 0 }) {
  const { config } = useSheets(); // <-- Obtener la configuración
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    if (!showDetails && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleCloseModal = () => {
    setShowDetails(false);
    document.body.style.overflow = "auto";
  };

  // Datos del servicio que YA vienen procesados del contexto
  const priceRange = service.priceRange || { min: 0, max: 0 };
  const features = Array.isArray(service.features)
    ? service.features
    : service.features && typeof service.features === "string"
      ? service.features
          .split(";")
          .map((f) => f.trim())
          .filter((f) => f)
      : [
          "Servicio profesional",
          "Atención personalizada",
          "Resultados garantizados",
        ];

  return (
    <>
      <div
        className={`service-card ${service.popular ? "popular" : ""}`}
        data-aos="fade-up"
        data-aos-delay={delay}
      >
        {service.popular && (
          <div className="popular-badge">
            <FontAwesomeIcon icon={faStar} className="star-icon" />
            <span>POPULAR</span>
          </div>
        )}

        <div className="service-icon">
          <FontAwesomeIcon icon={iconMap[service.icon] || faSpa} />
        </div>

        <h3 className="font-subheading service-name">{service.name}</h3>

        <div className="service-category">
          <FontAwesomeIcon icon={faTag} className="category-icon" />
          <span className="category-text">
            {(service.category || "General").toUpperCase()}
          </span>
        </div>

        <p className="service-description">{service.description}</p>

        <div className="service-meta-mobile">
          <div className="meta-item">
            <FontAwesomeIcon icon={faClock} />
            <span>{service.duration || "1 hora"}</span>
          </div>
          <div className="meta-item price-mobile">
            <span className="service-price">
              {service.price || "Consultar precio"}
            </span>
          </div>
        </div>

        <div className="service-meta-desktop">
          <div className="service-duration">
            <FontAwesomeIcon icon={faClock} className="duration-icon" />
            <span>{service.duration || "1 hora"}</span>
          </div>

          <div className="service-price-container">
            <div className="service-price">{service.price || "Consultar"}</div>
            <div className="price-note">Varía según longitud</div>
          </div>
        </div>

        <button className="details-toggle-btn" onClick={toggleDetails}>
          <span>{showDetails ? "Ver menos" : "Ver detalles"}</span>
          <FontAwesomeIcon icon={showDetails ? faChevronUp : faChevronDown} />
        </button>
      </div>

      {/* Modal/Overlay para detalles */}
      {showDetails && (
        <div className="service-modal-overlay" onClick={handleCloseModal}>
          <div className="service-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button
                className="modal-close-btn"
                onClick={handleCloseModal}
                aria-label="Cerrar"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <div className="modal-title-section">
                <div className="modal-icon">
                  <FontAwesomeIcon icon={iconMap[service.icon] || faSpa} />
                </div>
                <h3 className="modal-title">{service.name}</h3>
                {service.popular && (
                  <span className="modal-popular-badge">
                    <FontAwesomeIcon icon={faStar} />
                    <span>POPULAR</span>
                  </span>
                )}
              </div>
            </div>

            <div className="modal-content">
              <div className="modal-description">
                <p>{service.description}</p>
              </div>

              <div className="modal-quick-info">
                <div className="quick-info-card">
                  <FontAwesomeIcon icon={faClock} />
                  <div>
                    <div className="quick-info-label">Duración</div>
                    <div className="quick-info-value">
                      {service.duration || "1 hora"}
                    </div>
                  </div>
                </div>

                <div className="quick-info-card">
                  <FontAwesomeIcon icon={faTag} />
                  <div>
                    <div className="quick-info-label">Categoría</div>
                    <div className="quick-info-value">
                      {service.category || "General"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-price-range">
                <h4>Información de precios</h4>
                <div className="price-range-display">
                  <div className="price-range-item">
                    <div className="price-label">Desde</div>
                    <div className="price-amount">
                      {priceRange.min > 0
                        ? `₡${priceRange.min.toLocaleString()}`
                        : "Consultar"}
                    </div>
                  </div>
                  <div className="price-range-divider">
                    {priceRange.min > 0 && priceRange.max > priceRange.min
                      ? "-"
                      : ""}
                  </div>
                  <div className="price-range-item">
                    <div className="price-label">Hasta</div>
                    <div className="price-amount">
                      {priceRange.max > priceRange.min
                        ? `₡${priceRange.max.toLocaleString()}`
                        : ""}
                    </div>
                  </div>
                </div>
                <p className="price-note-modal">
                  {service.price ||
                    "* El precio varía según el largo y grosor del cabello"}
                </p>
              </div>

              <div className="modal-features">
                <h4>Beneficios incluidos</h4>
                <ul className="modal-features-list">
                  {features.map((feature, index) => (
                    <li key={index} className="modal-feature-item">
                      <FontAwesomeIcon icon={faCheck} className="check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-actions">
                <button
                  className="modal-action-btn primary"
                  onClick={() => {
                    handleCloseModal();
                    setTimeout(() => {
                      document.getElementById("reservar")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 200);
                  }}
                >
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>Reservar cita</span>
                </button>
                <button
                  className="modal-action-btn secondary"
                  onClick={handleCloseModal}
                >
                  <span>Volver a servicios</span>
                </button>
              </div>

              {isMobile && config?.contact?.phone && (
                <div className="mobile-contact-cta">
                  <p>¿Tienes preguntas sobre este servicio?</p>
                  <a
                    href={`tel:${config.contact.phone.replace(/\s/g, "")}`}
                    className="contact-phone"
                  >
                    <FontAwesomeIcon icon={faPhone} />
                    <span>Llamar ahora: {config.contact.phone}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
