// src/components/sections/BookingForm.jsx
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Flatpickr from "react-flatpickr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSpinner,
  faCalendarDay,
  faCheckCircle,
  faExclamationCircle,
  faTimes,
  faCalendarCheck,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

// Importar Flatpickr y sus estilos
import "flatpickr/dist/flatpickr.min.css";
import { Spanish } from "flatpickr/dist/l10n/es.js";

import { useSheets } from "../../context/SheetsContext";

// Datos locales de respaldo
import servicesBackup from "../../data/services.json";
import timeSlotsData from "../../data/timeSlots.json";

// Modal de éxito usando Portal
function SuccessModal({ isOpen, onClose, bookingData }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(8px)",
          animation: "modalFadeIn 0.3s ease-out",
        }}
      />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "linear-gradient(to bottom right, #2a231d, #1a1410)",
          borderRadius: "24px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          maxWidth: "448px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          border: "1px solid rgba(212, 165, 116, 0.2)",
          animation: "modalScaleIn 0.3s ease-out",
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "transparent",
            border: "none",
            color: "rgba(255, 255, 255, 0.6)",
            cursor: "pointer",
            fontSize: "20px",
            zIndex: 10,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.color = "rgba(255, 255, 255, 1)")
          }
          onMouseLeave={(e) =>
            (e.target.style.color = "rgba(255, 255, 255, 0.6)")
          }
          aria-label="Cerrar"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Contenido */}
        <div style={{ padding: "32px", textAlign: "center" }}>
          {/* Icono de éxito con animación */}
          <div style={{ marginBottom: "24px", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(212, 165, 116, 0.2)",
                borderRadius: "50%",
                filter: "blur(32px)",
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
            <div
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80px",
                height: "80px",
                background:
                  "linear-gradient(to bottom right, #22c55e, #16a34a)",
                borderRadius: "50%",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                animation:
                  "modalBounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
              }}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ fontSize: "36px", color: "white" }}
              />
            </div>
          </div>

          {/* Título */}
          <h3
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "12px",
              lineHeight: 1.2,
            }}
          >
            ¡Reserva Confirmada!
          </h3>

          {/* Descripción */}
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "24px",
              fontSize: "18px",
              lineHeight: 1.5,
            }}
          >
            Tu solicitud ha sido enviada con éxito. Te contactaremos pronto para
            confirmar.
          </p>

          {/* Detalles de la reserva */}
          {bookingData && (
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(16px)",
                borderRadius: "16px",
                padding: "24px",
                marginBottom: "24px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {/* Nombre */}
                {bookingData.nombre && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>👤</span>
                    <div>
                      <p
                        style={{
                          color: "rgba(255, 255, 255, 0.6)",
                          fontSize: "14px",
                          margin: 0,
                        }}
                      >
                        Nombre
                      </p>
                      <p
                        style={{
                          color: "white",
                          fontWeight: "500",
                          margin: "4px 0 0 0",
                        }}
                      >
                        {bookingData.nombre}
                      </p>
                    </div>
                  </div>
                )}

                {/* Teléfono */}
                {bookingData.telefono && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      textAlign: "left",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPhone}
                      style={{ color: "#d4a574", fontSize: "16px" }}
                    />
                    <div>
                      <p
                        style={{
                          color: "rgba(255, 255, 255, 0.6)",
                          fontSize: "14px",
                          margin: 0,
                        }}
                      >
                        Teléfono
                      </p>
                      <p
                        style={{
                          color: "white",
                          fontWeight: "500",
                          margin: "4px 0 0 0",
                        }}
                      >
                        {bookingData.telefono}
                      </p>
                    </div>
                  </div>
                )}

                {/* Servicio */}
                {bookingData.servicio && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>✨</span>
                    <div>
                      <p
                        style={{
                          color: "rgba(255, 255, 255, 0.6)",
                          fontSize: "14px",
                          margin: 0,
                        }}
                      >
                        Servicio
                      </p>
                      <p
                        style={{
                          color: "white",
                          fontWeight: "500",
                          margin: "4px 0 0 0",
                        }}
                      >
                        {bookingData.servicio}
                      </p>
                    </div>
                  </div>
                )}

                {/* Fecha */}
                {bookingData.fecha && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      textAlign: "left",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCalendarCheck}
                      style={{ color: "#d4a574", fontSize: "16px" }}
                    />
                    <div>
                      <p
                        style={{
                          color: "rgba(255, 255, 255, 0.6)",
                          fontSize: "14px",
                          margin: 0,
                        }}
                      >
                        Fecha
                      </p>
                      <p
                        style={{
                          color: "white",
                          fontWeight: "500",
                          margin: "4px 0 0 0",
                        }}
                      >
                        {bookingData.fecha}
                      </p>
                    </div>
                  </div>
                )}

                {/* Horario */}
                {bookingData.franja && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>🕐</span>
                    <div>
                      <p
                        style={{
                          color: "rgba(255, 255, 255, 0.6)",
                          fontSize: "14px",
                          margin: 0,
                        }}
                      >
                        Horario
                      </p>
                      <p
                        style={{
                          color: "white",
                          fontWeight: "500",
                          margin: "4px 0 0 0",
                        }}
                      >
                        {bookingData.franja}
                      </p>
                    </div>
                  </div>
                )}

                {/* Notas */}
                {bookingData.notas && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>📝</span>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          color: "rgba(255, 255, 255, 0.6)",
                          fontSize: "14px",
                          margin: 0,
                        }}
                      >
                        Notas
                      </p>
                      <p
                        style={{
                          color: "white",
                          fontWeight: "500",
                          margin: "4px 0 0 0",
                          wordBreak: "break-word",
                        }}
                      >
                        {bookingData.notas}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Botón de acción */}
          <button
            onClick={onClose}
            style={{
              width: "100%",
              background: "linear-gradient(to right, #d4a574, #c4955f)",
              color: "white",
              fontWeight: "600",
              padding: "16px 24px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
          >
            Entendido
          </button>

          {/* Nota adicional */}
          <p
            style={{
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "14px",
              marginTop: "16px",
              marginBottom: 0,
            }}
          >
            Recibirás una confirmación por WhatsApp
          </p>
        </div>

        {/* Decoración */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "128px",
            height: "128px",
            background: "rgba(212, 165, 116, 0.1)",
            borderRadius: "50%",
            filter: "blur(48px)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "128px",
            height: "128px",
            background: "rgba(34, 197, 94, 0.1)",
            borderRadius: "50%",
            filter: "blur(48px)",
            transform: "translate(50%, 50%)",
          }}
        />
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalScaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes modalBounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );

  // Usar createPortal para renderizar en document.body
  return createPortal(modalContent, document.body);
}

export default function BookingForm() {
  // Obtener configuración del sitio desde Context
  const {
    config: siteConfig,
    services: servicesFromSheet,
    loading: sheetsLoading,
  } = useSheets();

  const configLoading = sheetsLoading.config;
  const servicesLoading = sheetsLoading.services;

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    servicio: "",
    fecha: "",
    franja: "",
    notas: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [selectedDate, setSelectedDate] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const services =
    servicesFromSheet && servicesFromSheet.length > 0
      ? servicesFromSheet
      : servicesBackup;

  // Función para validar y formatear teléfono en tiempo real
  const handlePhoneChange = (e) => {
    const input = e.target.value;

    // Solo permitir números y algunos caracteres especiales para formato
    const cleaned = input.replace(/[^\d\s\-\(\)\+]/g, "");

    // Limitar a 20 caracteres máximo (incluyendo espacios y guiones)
    if (cleaned.length > 20) return;

    // Formato automático: XXXX-XXXX
    let formatted = cleaned.replace(/\D/g, "");

    if (formatted.length > 4) {
      formatted = formatted.substring(0, 8);
      formatted = formatted.substring(0, 4) + "-" + formatted.substring(4);
    }

    setFormData((prev) => ({
      ...prev,
      telefono: formatted,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Si es el campo de teléfono, usar la función especial
    if (name === "telefono") {
      handlePhoneChange(e);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (dates) => {
    if (dates && dates[0]) {
      const date = dates[0];
      const formattedDate = date.toISOString().split("T")[0];
      setSelectedDate(date);
      setFormData((prev) => ({
        ...prev,
        fecha: formattedDate,
      }));
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "nombre",
      "telefono",
      "servicio",
      "fecha",
      "franja",
    ];

    for (const field of requiredFields) {
      if (!formData[field]?.trim()) {
        setMessage({
          type: "error",
          text: "Por favor completa todos los campos requeridos",
        });
        return false;
      }
    }

    const phoneDigits = formData.telefono.replace(/\D/g, "");
    if (phoneDigits.length < 8) {
      setMessage({
        type: "error",
        text: "Por favor ingresa un número de teléfono válido (mínimo 8 dígitos)",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      // Simular envío a API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const selectedService = services.find(
        (s) => s.id === parseInt(formData.servicio),
      );

      // Guardar TODOS los datos para el modal
      const serviceName =
        services.find((s) => s.id === parseInt(formData.servicio))?.name || "";
      setModalData({
        nombre: formData.nombre,
        telefono: formData.telefono,
        servicio: serviceName,
        fecha: formData.fecha,
        franja: formData.franja,
        notas: formData.notas,
      });

      // Mostrar modal de éxito
      setShowSuccessModal(true);

      // Reset form
      setFormData({
        nombre: "",
        telefono: "",
        servicio: "",
        fecha: "",
        franja: "",
        notas: "",
      });
      setSelectedDate("");
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        type: "error",
        text: "Error al enviar la reserva. Por favor, intenta de nuevo o contáctanos directamente.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getBlockedDates = () => {
    return siteConfig?.booking?.blockedDates || [];
  };

  // Configuración de Flatpickr
  const flatpickrOptions = {
    locale: "es",
    dateFormat: "Y-m-d",
    minDate: "today",
    maxDate: new Date().fp_incr(siteConfig?.booking?.maxDaysInFuture || 90),
    disable: [
      ...getBlockedDates(),
      function (date) {
        const blockedDays = siteConfig?.booking?.blockedDays || [];
        return blockedDays.includes(date.getDay());
      },
    ],
    disableMobile: false,
    static: false,
    monthSelectorType: "static",
    position: "auto",
    onReady: (selectedDates, dateStr, instance) => {
      instance._positionCalendar();
    },
  };

  // Si está cargando la configuración
  if (configLoading) {
    return (
      <section id="reservar" className="section">
        <div className="container text-center">
          <p className="text-light">Cargando formulario de reservas...</p>
        </div>
      </section>
    );
  }

  // Si no hay configuración
  if (!siteConfig) {
    return (
      <section id="reservar" className="section">
        <div className="container text-center">
          <p className="text-light">Error cargando formulario de reservas.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="reservar"
        className="section bg-gradient-to-br from-[#2a231d] to-primary relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-pattern opacity-5" />

        <div className="container relative z-10">
          <div
            className="section-header text-center mb-12 md:mb-20"
            data-aos="fade-up"
          >
            <h2 className="font-script text-3xl md:text-4xl text-secondary mb-4">
              {siteConfig.sections?.booking?.tagline || "Reserva tu"}
            </h2>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-light mb-6">
              {siteConfig.sections?.booking?.title || "CITA HOY"}
            </h1>
            <p className="text-lg md:text-xl text-light/80 max-w-3xl mx-auto px-4">
              {siteConfig.sections?.booking?.subtitle ||
                "Completa el formulario y te contactaremos para confirmar"}
            </p>
          </div>

          <div
            className="max-w-4xl mx-auto px-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 lg:p-12 border border-light/10 shadow-elevated">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Nombre */}
                  <div className="form-group">
                    <label className="form-label block text-light font-medium text-sm uppercase tracking-wider mb-3">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="form-input w-full bg-white/10 border-white/20 text-light placeholder:text-light/50 focus:border-secondary focus:ring-secondary/30"
                      placeholder="Ej: Ana Pérez"
                      required
                      autoComplete="name"
                    />
                  </div>

                  {/* Teléfono */}
                  <div className="form-group">
                    <label className="form-label block text-light font-medium text-sm uppercase tracking-wider mb-3">
                      Teléfono *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="form-input w-full bg-white/10 border-white/20 text-light placeholder:text-light/50 focus:border-secondary focus:ring-secondary/30 pl-12"
                        placeholder="Ej: 8888-8888"
                        required
                        autoComplete="tel"
                        maxLength="9"
                        inputMode="numeric"
                        pattern="[0-9]{4}-[0-9]{4}"
                        title="Formato: 8888-8888 (8 dígitos)"
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <span className="text-secondary text-lg">📱</span>
                      </div>
                    </div>
                    <p className="text-xs text-light/50 mt-2">
                      Formato: 8888-8888 (solo números)
                    </p>
                  </div>

                  {/* Servicio */}
                  <div className="form-group">
                    <label className="form-label block text-light font-medium text-sm uppercase tracking-wider mb-3">
                      Servicio *
                    </label>
                    <select
                      name="servicio"
                      value={formData.servicio}
                      onChange={handleInputChange}
                      className="select-input w-full bg-white/10 border-white/20 text-light focus:border-secondary focus:ring-secondary/30 hover:bg-white/20 transition-colors"
                      required
                      disabled={servicesLoading}
                      style={{
                        color: "#ffffff",
                      }}
                    >
                      <option value="" style={{ color: "#a0aec0" }}>
                        {servicesLoading
                          ? "Cargando servicios..."
                          : "Selecciona un servicio"}
                      </option>
                      {services.map((service) => (
                        <option
                          key={service.id}
                          value={service.id}
                          style={{
                            color: "#1a202c",
                            backgroundColor: "#ffffff",
                            padding: "12px",
                          }}
                        >
                          {service.name} - {service.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Franja horaria */}
                  <div className="form-group">
                    <label className="form-label block text-light font-medium text-sm uppercase tracking-wider mb-3">
                      Franja horaria *
                    </label>
                    <select
                      name="franja"
                      value={formData.franja}
                      onChange={handleInputChange}
                      className="select-input w-full bg-white/10 border-white/20 text-light focus:border-secondary focus:ring-secondary/30 hover:bg-white/20 transition-colors"
                      required
                    >
                      <option value="" style={{ color: "#a0aec0" }}>
                        Selecciona horario
                      </option>
                      {timeSlotsData.map((slot, index) => (
                        <option
                          key={index}
                          value={slot}
                          style={{
                            color: "#1a202c",
                            backgroundColor: "#ffffff",
                            padding: "12px",
                          }}
                        >
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Fecha */}
                  <div className="form-group md:col-span-2">
                    <label className="form-label block text-light font-medium text-sm uppercase tracking-wider mb-3">
                      Fecha preferida *
                    </label>
                    <div className="relative">
                      <Flatpickr
                        value={selectedDate}
                        onChange={handleDateChange}
                        options={flatpickrOptions}
                        className="form-input w-full bg-white/10 border-white/20 text-light placeholder:text-light/50 focus:border-secondary focus:ring-secondary/30 pl-12"
                        placeholder="Selecciona una fecha"
                        required
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <FontAwesomeIcon
                          icon={faCalendarDay}
                          className="text-secondary text-lg"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-light/50 mt-2">
                      Selecciona una fecha disponible
                    </p>
                  </div>

                  {/* Notas */}
                  <div className="form-group md:col-span-2">
                    <label className="form-label block text-light font-medium text-sm uppercase tracking-wider mb-3">
                      Notas adicionales (opcional)
                    </label>
                    <textarea
                      name="notas"
                      value={formData.notas}
                      onChange={handleInputChange}
                      className="form-input w-full bg-white/10 border-white/20 text-light placeholder:text-light/50 focus:border-secondary focus:ring-secondary/30 min-h-[120px] resize-none"
                      placeholder="Comentarios o preferencias especiales..."
                      rows="4"
                    />
                  </div>
                </div>

                {/* Botón de envío */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="booking-submit-btn"
                  >
                    {submitting ? (
                      <>
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="animate-spin"
                        />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPaperPlane} />
                        <span>Enviar reserva</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Mensaje de error (solo para errores) */}
                {message.text && message.type === "error" && (
                  <div className="mt-6 p-4 rounded-xl transition-all duration-300 bg-red-900/30 text-red-300 border border-red-700/30">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        className="text-red-400"
                      />
                      <span>{message.text}</span>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Información de contacto */}
            <div className="mt-8 text-center text-light/70 text-sm">
              <p>
                ¿Necesitas ayuda? Llámanos al{" "}
                <a
                  href={`tel:${siteConfig.contact?.phone || "+506 6480 9635"}`}
                  className="text-secondary hover:text-light transition-colors"
                >
                  {siteConfig.contact?.phone || "+506 6480 9635"}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de éxito usando Portal - Se renderiza en document.body */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        bookingData={modalData}
      />
    </>
  );
}
