// src/components/sections/Owner.jsx
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import ownerData from "../../data/owner.json";
import mariaImage from "../../assets/images/maria.jpg";

export default function Owner() {
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    // Cargar datos del JSON
    setOwner(ownerData);
  }, []);

  useEffect(() => {
    if (!owner) return;

    const counters = document.querySelectorAll("[data-count]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute("data-count"));
            const suffix = counter.getAttribute("data-suffix") || "";
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current) + suffix;
              }
            }, 16);

            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((counter) => observer.observe(counter));

    return () => observer.disconnect();
  }, [owner]);

  if (!owner) {
    return (
      <section className="section owner-section" id="maria">
        <div className="container">
          <div className="owner-content">
            <p>Cargando información de María...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section owner-section" id="maria">
      <div className="container">
        <div className="owner-content">
          {/* Imagen con datos del JSON */}
          <div className="owner-image-container" data-aos="fade-right">
            <div className="owner-badge">
              <FontAwesomeIcon icon={faAward} /> Especialista Certificada
            </div>
            <div className="owner-image-wrapper">
              {/* Imagen local con respaldo */}
              <img
                src={mariaImage}
                alt={owner?.name || "María Fonseca"}
                className="owner-image"
                onError={(e) => {
                  console.error("Error cargando imagen:", e);
                  e.target.style.display = "none";
                  const placeholder =
                    e.target.parentElement.querySelector(".image-fallback");
                  if (placeholder) placeholder.style.display = "flex";
                }}
              />
            </div>
          </div>

          {/* Información con datos del JSON */}
          <div className="owner-info" data-aos="fade-left">
            <h2 className="font-script section-tagline">{owner.tagline}</h2>
            <h1 className="font-heading section-title">{owner.name}</h1>
            <h3 className="owner-title">{owner.title}</h3>

            <blockquote className="owner-quote">{owner.quote}</blockquote>

            <p className="owner-description">{owner.description}</p>

            {/* Estadísticas dinámicas */}
            <div className="owner-stats">
              {owner.stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span
                    className="stat-number"
                    data-count={stat.number}
                    data-suffix={stat.suffix || ""}
                  >
                    0{stat.suffix || ""}
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Certificaciones (nueva sección) */}
            <div className="owner-certifications">
              <div className="certifications-grid">
                <div className="certifications-column">
                  <h5>Certificaciones</h5>
                  <ul>
                    {owner.certifications
                      ?.slice(0, Math.ceil(owner.certifications.length / 2))
                      .map((cert, index) => (
                        <li key={index}>{cert}</li>
                      ))}
                  </ul>
                </div>
                <div className="certifications-column">
                  <ul>
                    {owner.education?.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
