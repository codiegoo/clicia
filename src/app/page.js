import { Footer } from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { LanguageProvider } from "@/context/LanguajeContext";
import { BlogDestacados } from "@/layouts/blogs/BlogsDestacados";
import { Comparaciones } from "@/layouts/comparaciones/Comparaciones";
import { Contacto } from "@/layouts/contacto/Contacto";
import { HerramientasDestacadas } from "@/layouts/herramientas/HerramientasDestacadas";
import Inicio from "@/layouts/inicio/Inicio";
import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  return (
    <ChakraProvider>
      <LanguageProvider>
        <Navbar />
        <Inicio />
        <BlogDestacados />
        <HerramientasDestacadas />
        <Comparaciones />
        <Contacto />
        <Footer />
      </LanguageProvider>
    </ChakraProvider>
  );
}
