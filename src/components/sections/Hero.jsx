// src/components/sections/Hero.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useSheets } from "../../context/SheetsContext";

export default function Hero() {
  const { config, loading, error } = useSheets();

  // Mientras carga
  if (loading.config) {
    return (
      <section className="hero" id="inicio">
        <div className="hero-background"></div>
        <div className="container hero-content">
          <h1 className="font-script hero-title">Cargando...</h1>
          <p className="hero-subtitle">Por favor espera</p>
        </div>
      </section>
    );
  }

  // Si hay error
  if (error?.config) {
    return (
      <section className="hero" id="inicio">
        <div className="hero-background"></div>
        <div className="container hero-content">
          <h1 className="font-script hero-title">Studio María Fonseca</h1>
          <p className="hero-subtitle">Error cargando información</p>
        </div>
      </section>
    );
  }

  // Si no hay config
  if (!config) {
    return (
      <section className="hero" id="inicio">
        <div className="hero-background"></div>
        <div className="container hero-content">
          <h1 className="font-script hero-title">Studio María Fonseca</h1>
          <p className="hero-subtitle">
            Tratamientos y productos premium en un ambiente diseñado para
            realzar tu belleza natural
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="hero" id="inicio">
      <div className="hero-background"></div>

      <div className="container hero-content">
        <h1 className="font-script hero-title">{config.studioName}</h1>

        <p className="hero-subtitle">
          {config.slogan ||
            "Tratamientos y productos premium en un ambiente diseñado para realzar tu belleza natural"}
        </p>

        <a href="#reservar" className="hero-cta">
          <FontAwesomeIcon icon={faCalendarPlus} />
          Reservar cita ahora
        </a>
      </div>

      <div className="scroll-indicator">
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
    </section>
  );
}
