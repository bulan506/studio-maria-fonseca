// src/components/sections/Services.jsx
import ServiceCard from "./ServiceCard";
import { useSheets } from "../../context/SheetsContext";

export default function Services() {
  // Obtener servicios y configuración desde el Context
  const { services, config, loading } = useSheets();

  const servicesLoading = loading.services;
  const configLoading = loading.config;

  // Mostrar loading si está cargando
  if (servicesLoading || configLoading) {
    return (
      <section className="section services-section" id="servicios">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="font-script section-tagline">
              {config?.sections?.services?.tagline || "Nuestros"}
            </h2>
            <h1 className="font-heading section-title">
              {config?.sections?.services?.title || "SERVICIOS"}
            </h1>
            <p className="hero-subtitle">
              {config?.sections?.services?.subtitle ||
                "Descubre nuestra gama exclusiva de tratamientos capilares"}
            </p>
          </div>
          <div className="loading-container">
            <p>Cargando servicios...</p>
          </div>
        </div>
      </section>
    );
  }

  // Mostrar error si no hay servicios
  if (!services || services.length === 0) {
    return (
      <section className="section services-section" id="servicios">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="font-script section-tagline">Nuestros</h2>
            <h1 className="font-heading section-title">SERVICIOS</h1>
            <p className="hero-subtitle">
              Descubre nuestra gama exclusiva de tratamientos capilares
            </p>
          </div>
          <div className="error-container">
            <p className="error-message">
              ⚠️ No se pudieron cargar los servicios
            </p>
            <p className="error-note">Por favor intenta recargar la página</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section services-section" id="servicios">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <h2 className="font-script section-tagline">
            {config?.sections?.services?.tagline || "Nuestros"}
          </h2>
          <h1 className="font-heading section-title">
            {config?.sections?.services?.title || "SERVICIOS"}
          </h1>
          <p className="hero-subtitle">
            {config?.sections?.services?.subtitle ||
              "Descubre nuestra gama exclusiva de tratamientos capilares"}
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
