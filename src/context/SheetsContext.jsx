// src/context/SheetsContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const SHEET_ID = "18j82Z5tyn5ZikvmFAPIvEfVdZFR6OdGrRPfw_jrGZkU";

const SheetsContext = createContext();

export function SheetsProvider({ children }) {
  const [services, setServices] = useState([]);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState({ services: true, config: true });
  const [error, setError] = useState({ services: null, config: null });

  // Cargar servicios UNA sola vez
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const url = `https://opensheet.elk.sh/${SHEET_ID}/Servicios`;
        const response = await fetch(url);

        if (!response.ok) throw new Error(`Error ${response.status}`);

        const rawData = await response.json();

        const processedServices = rawData.map((service) => ({
          id: parseInt(service.id) || 0,
          name: service.name || "",
          description: service.description || "",
          price: (service.price || "").replace(/\$/g, "₡"),
          icon: service.icon || "spa",
          duration: service.duration || "",
          category: service.category || "",
          popular: service.popular === "TRUE",
          priceRange: {
            min: service.priceRange
              ? parseInt(service.priceRange.split("-")[0]) || 0
              : 0,
            max: service.priceRange
              ? parseInt(service.priceRange.split("-")[1]) || 0
              : 0,
          },
          features: service.features
            ? service.features.split(";").map((f) => f.trim())
            : [],
        }));

        setServices(processedServices);
        setError((prev) => ({ ...prev, services: null }));
      } catch (err) {
        console.error("Error fetching services:", err);
        setError((prev) => ({ ...prev, services: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, services: false }));
      }
    };

    fetchServices();
  }, []);

  // Cargar config UNA sola vez
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const url = `https://opensheet.elk.sh/${SHEET_ID}/Config`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("Error cargando configuración");

        const rawData = await response.json();

        // Verificar que hay datos
        if (!rawData || rawData.length === 0) {
          throw new Error("No hay datos en la hoja Config");
        }

        const configObj = {};
        rawData.forEach((row) => {
          if (row.clave && row.valor !== undefined) {
            configObj[row.clave] = row.valor;
          }
        });

        const formatPhone = (phone) => {
          if (!phone) return "+506 6480 9635";
          if (phone.includes("+")) return phone;

          const digits = phone.replace(/\D/g, "");
          if (digits.length === 11 && digits.startsWith("506")) {
            return `+${digits.substring(0, 3)} ${digits.substring(3, 7)} ${digits.substring(7)}`;
          }
          return `+${digits}`;
        };

        const structuredConfig = {
          studioName: configObj.studioName || "Studio María Fonseca",
          slogan: configObj.slogan || "",

          contact: {
            phone: formatPhone(configObj.phone),
            whatsapp: formatPhone(configObj.whatsapp),
            email: configObj.email || "info@studiomariafonseca.com",
            address: configObj.address || "Cartago, Costa Rica",
            location:
              configObj.location || "Cachi, Urbanizacion Vista al lago.",
            hours: configObj.hours || "Lunes a Sábado: 9AM - 7PM",
          },

          socialMedia: {
            instagram: configObj.instagram || "#",
            facebook: configObj.facebook || "#",
            whatsapp: configObj.whatsappUrl || "https://wa.me/50664809635",
          },

          sections: {
            services: {
              tagline: configObj.servicesTagline || "Nuestros",
              title: configObj.servicesTitle || "SERVICIOS",
              subtitle:
                configObj.servicesSubtitle ||
                "Descubre nuestra gama exclusiva de tratamientos capilares",
            },
            owner: {
              tagline: configObj.ownerTagline || "Conoce a",
              title: configObj.ownerTitle || "MARÍA FONSECA",
            },
            booking: {
              tagline: configObj.bookingTagline || "Reserva tu",
              title: configObj.bookingTitle || "CITA HOY",
              subtitle:
                configObj.bookingSubtitle ||
                "Completa el formulario y te contactaremos para confirmar",
            },
          },

          booking: {
            blockedDates: configObj.blockedDates
              ? configObj.blockedDates.split(",").map((date) => date.trim())
              : ["2024-12-25", "2025-01-01"],

            blockedDays: configObj.blockedDays
              ? configObj.blockedDays
                  .split(",")
                  .map((day) => parseInt(day.trim()))
              : [0],

            minDaysNotice: parseInt(configObj.minDaysNotice) || 1,
            maxDaysInFuture: parseInt(configObj.maxDaysInFuture) || 90,
          },
        };

        console.log("Config cargada:", structuredConfig); // Para debug
        setConfig(structuredConfig);
        setError((prev) => ({ ...prev, config: null }));
      } catch (err) {
        console.error("Error cargando config:", err);
        setError((prev) => ({ ...prev, config: err.message }));

        // Configuración por defecto
        setConfig({
          studioName: "Studio María Fonseca",
          contact: {
            phone: "+506 6480 9635",
            email: "info@studiomariafonseca.com",
            hours: "Lunes a Sábado: 9AM - 7PM",
          },
          socialMedia: { whatsapp: "https://wa.me/50664809635" },
          booking: {
            blockedDates: ["2024-12-25", "2025-01-01"],
            blockedDays: [0],
            minDaysNotice: 1,
            maxDaysInFuture: 90,
          },
        });
      } finally {
        setLoading((prev) => ({ ...prev, config: false }));
      }
    };

    fetchConfig();
  }, []);

  return (
    <SheetsContext.Provider value={{ services, config, loading, error }}>
      {children}
    </SheetsContext.Provider>
  );
}

export function useSheets() {
  const context = useContext(SheetsContext);
  if (!context) {
    throw new Error("useSheets debe usarse dentro de SheetsProvider");
  }
  return context;
}
