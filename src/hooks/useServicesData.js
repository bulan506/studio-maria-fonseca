// src/hooks/useServicesData.js
import { useState, useEffect } from 'react';

const SHEET_ID = "18j82Z5tyn5ZikvmFAPIvEfVdZFR6OdGrRPfw_jrGZkU";

export function useServicesData() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const url = `https://opensheet.elk.sh/${SHEET_ID}/Servicios`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`Error ${response.status}`);
        
        const rawData = await response.json();
        
        // Procesar los servicios
        const processedServices = rawData.map(service => ({
          id: parseInt(service.id) || 0,
          name: service.name || "",
          description: service.description || "",
          price: (service.price || "").replace(/\$/g, "₡"),
          icon: service.icon || "spa",
          duration: service.duration || "",
          category: service.category || "",
          popular: service.popular === "TRUE",
          priceRange: {
            min: service.priceRange ? parseInt(service.priceRange.split("-")[0]) || 0 : 0,
            max: service.priceRange ? parseInt(service.priceRange.split("-")[1]) || 0 : 0,
          },
          features: service.features ? service.features.split(";").map(f => f.trim()) : [],
        }));
        
        setServices(processedServices);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
}