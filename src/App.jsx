import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Owner from "./components/sections/Owner";
import BookingForm from "./components/forms/BookingForm";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Owner />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
