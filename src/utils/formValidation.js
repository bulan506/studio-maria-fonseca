export const validatePhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 8;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateRequired = (value) => {
  return value.trim().length > 0;
};

export const validateForm = (formData) => {
  const errors = {};

  if (!validateRequired(formData.nombre)) {
    errors.nombre = 'El nombre es requerido';
  }

  if (!validateRequired(formData.telefono)) {
    errors.telefono = 'El teléfono es requerido';
  } else if (!validatePhone(formData.telefono)) {
    errors.telefono = 'Teléfono inválido (mínimo 8 dígitos)';
  }

  if (!validateRequired(formData.servicio)) {
    errors.servicio = 'Debe seleccionar un servicio';
  }

  if (!validateRequired(formData.fecha)) {
    errors.fecha = 'Debe seleccionar una fecha';
  }

  if (!validateRequired(formData.franja)) {
    errors.franja = 'Debe seleccionar una franja horaria';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};