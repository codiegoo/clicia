
import { Footer } from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { BlogDestacados } from "@/layouts/blogs/BlogsDestacados";
import { Comparaciones } from "@/layouts/comparaciones/Comparaciones";
import { Contacto } from "@/layouts/contacto/Contacto";
import { HerramientasDestacadas } from "@/layouts/herramientas/HerramientasDestacadas";
import Inicio from "@/layouts/inicio/Inicio";


export default function Home() {
  return (
    <>
          <Navbar />
          <Inicio />
          <BlogDestacados />
          <HerramientasDestacadas />
          <Comparaciones />
          <Contacto />
          <Footer />
    </>
  );
}
