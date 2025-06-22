'use client'
import { Footer } from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { LanguageProvider } from "@/context/LanguajeContext";
import { BlogDestacados } from "@/layouts/blogs/BlogsDestacados";
import { Comparaciones } from "@/layouts/comparaciones/Comparaciones";
import { Contacto } from "@/layouts/contacto/Contacto";
import { HerramientasDestacadas } from "@/layouts/herramientas/HerramientasDestacadas";
import Inicio from "@/layouts/inicio/Inicio";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import customTheme from "@/extensions/theme.ext";


export default function Home() {
  return (
    <>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      <ChakraProvider theme={customTheme}>
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
    </>
  );
}
