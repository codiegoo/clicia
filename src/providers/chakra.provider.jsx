"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import customTheme from "@/extensions/theme.ext";
import { LanguageProvider } from "@/context/LanguajeContext";

export function Providers({ children }) {
  return (
    <>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      <ChakraProvider theme={customTheme}>
        <LanguageProvider>{children}</LanguageProvider>
      </ChakraProvider>
    </>
  );
}
