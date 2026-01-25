import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SheetsProvider } from "./context/SheetsContext";

import "./styles/variables.css";

// 2. Estilos globales y reset
import "./styles/globals.css";

// 3. Animaciones
import "./styles/animations.css";
import "flatpickr/dist/flatpickr.min.css";

// 4. Componentes individuales
import "./styles/Navbar.css";
import "./styles/Hero.css";
import "./styles/Services.css";
import "./styles/Owner.css";
import "./styles/Booking.css";
import "./styles/Footer.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SheetsProvider>
      <App />
    </SheetsProvider>
  </StrictMode>,
);
