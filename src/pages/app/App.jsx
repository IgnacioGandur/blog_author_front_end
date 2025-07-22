import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ScrollToTop from "../../components/ScrollToTop";

export default function App() {
  return <ScrollToTop>
    <Navbar />
    <Outlet />
    <Footer />
  </ScrollToTop>
}
