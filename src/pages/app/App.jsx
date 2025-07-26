import "./App.css";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ScrollToTop from "../../components/ScrollToTop";
import fallbackImage from "/images/fallback-image.webp"

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // Handle broken images.
    const images = document.querySelectorAll("img");
    images.forEach((image) => {
      image.onerror = () => {
        image.src = fallbackImage;
      }
    })

    // Prevent google icons to brack if user translates the page.
    const icons = document.querySelectorAll(".material-symbols-rounded");
    icons.forEach((icon) => {
      icon.classList.add("notranslate");
    })
  }, [location]);


  return <ScrollToTop>
    <Navbar />
    <Outlet />
    <Footer />
  </ScrollToTop>
}
