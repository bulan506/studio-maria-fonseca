// src/hooks/useStudioConfig.js
import { useState, useEffect } from 'react';

const SHEET_ID = "18j82Z5tyn5ZikvmFAPIvEfVdZFR6OdGrRPfw_jrGZkU";

export function useStudioConfig() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        // 1. Obtener datos de la hoja "Config"
        const url = `https://opensheet.elk.sh/${SHEET_ID}/Config`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Error cargando configuración');
        
        const rawData = await response.json();
        
        // 2. Convertir array de objetos [{clave: x, valor: y}] a objeto simple
        const configObj = {};
        rawData.forEach(row => {
          configObj[row.clave] = row.valor;
        });

        // 3. Formatear número de teléfono si es necesario
        const formatPhone = (phone) => {
          if (!phone) return "+506 6480 9635";
          if (phone.includes("+")) return phone;
          
          const digits = phone.replace(/\D/g, '');
          if (digits.length === 11 && digits.startsWith('506')) {
            return `+${digits.substring(0,3)} ${digits.substring(3,7)} ${digits.substring(7)}`;
          }
          return `+${digits}`;
        };
        
        // 4. Estructurar los datos
        const structuredConfig = {
          studioName: configObj.studioName || "Studio María Fonseca",
          slogan: configObj.slogan || "",
          
          contact: {
            phone: formatPhone(configObj.phone),
            whatsapp: formatPhone(configObj.whatsapp),
            email: configObj.email || "info@studiomariafonseca.com",
            address: configObj.address || "Cartago, Costa Rica",
            location: configObj.location || "Cachi, Urbanizacion Vista al lago.",
            hours: configObj.hours || "Lunes a Sábado: 9AM - 7PM"
          },
          
          socialMedia: {
            instagram: configObj.instagram || "#",
            facebook: configObj.facebook || "#",
            whatsapp: configObj.whatsappUrl || "https://wa.me/50664809635"
          },
          
          sections: {
            services: {
              tagline: configObj.servicesTagline || "Nuestros",
              title: configObj.servicesTitle || "SERVICIOS",
              subtitle: configObj.servicesSubtitle || "Descubre nuestra gama exclusiva de tratamientos capilares"
            },
            owner: {
              tagline: configObj.ownerTagline || "Conoce a",
              title: configObj.ownerTitle || "MARÍA FONSECA"
            },
            booking: {
              tagline: configObj.bookingTagline || "Reserva tu",
              title: configObj.bookingTitle || "CITA HOY",
              subtitle: configObj.bookingSubtitle || "Completa el formulario y te contactaremos para confirmar"
            }
          },
          
          booking: {
            blockedDates: configObj.blockedDates 
              ? configObj.blockedDates.split(',').map(date => date.trim())
              : ["2024-12-25", "2025-01-01"],
            
            blockedDays: configObj.blockedDays 
              ? configObj.blockedDays.split(',').map(day => parseInt(day.trim()))
              : [0],
            
            minDaysNotice: parseInt(configObj.minDaysNotice) || 1,
            maxDaysInFuture: parseInt(configObj.maxDaysInFuture) || 90
          }
        };
        
        setConfig(structuredConfig);
        setError(null);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        
        // Configuración por defecto
        setConfig({
          studioName: "Studio María Fonseca",
          contact: { 
            phone: "+506 6480 9635", 
            email: "info@studiomariafonseca.com",
            hours: "Lunes a Sábado: 9AM - 7PM"
          },
          socialMedia: { whatsapp: "https://wa.me/50664809635" },
          booking: {
            blockedDates: ["2024-12-25", "2025-01-01"],
            blockedDays: [0],
            minDaysNotice: 1,
            maxDaysInFuture: 90
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading, error };
}