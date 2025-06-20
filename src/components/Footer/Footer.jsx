'use client';

import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { useLanguage } from '@/context/LanguajeContext';

export function Footer() {
  const { language } = useLanguage();

  const texts = {
    es: {
      heading: 'Explora las Mejores Herramientas de IA en 2025',
      description:
        'Descubre cómo la inteligencia artificial puede transformar tu productividad, negocio y vida diaria.',
      privacyTitle: 'Políticas de Privacidad',
      privacyText:
        'En TuSitio respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Usamos cookies y tecnologías similares para mejorar tu experiencia y personalizar contenido. No compartimos tu información con terceros sin tu consentimiento, salvo por obligaciones legales.',
      copyright: 'Todos los derechos reservados.',
    },
    en: {
      heading: 'Explore the Best AI Tools in 2025',
      description:
        'Discover how artificial intelligence can transform your productivity, business, and daily life.',
      privacyTitle: 'Privacy Policy',
      privacyText:
        'At YourSite, we respect your privacy and are committed to protecting your personal data. We use cookies and similar technologies to improve your experience and personalize content. We do not share your information with third parties without your consent, except as required by law.',
      copyright: 'All rights reserved.',
    },
  };

  const t = language === 'es' ? texts.es : texts.en;

  return (
    <Box
      as="footer"
      bgGradient="linear(to-b, rgb(84, 212, 186), #54b9d0)"
      color="black"
      py={{ base: 2, md: 4 }}
    >
      <Container maxW="6xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="flex-start"
          textAlign={{ base: 'center', md: 'left' }}
          gap={2}
        >
          <Box maxW={{ base: '100%', md: '50%' }}>
            <Text fontSize="lg" fontWeight="bold" mb={0}>
              {t.heading}
            </Text>
            <Text fontSize="sm" opacity={0.9}>
              {t.description}
            </Text>
            <Text mt={4} fontSize="sm" opacity={0.8} textAlign="left">
              &copy; {new Date().getFullYear()} www.clicia.online {t.copyright}
            </Text>
          </Box>

          <Box maxW={{ base: '100%', md: '45%' }}>
            <Text fontSize="md" fontWeight="bold" mb={1}>
              {t.privacyTitle}
            </Text>
            <Text fontSize="sm" opacity={0.9}>
              {t.privacyText}
            </Text>
          </Box>
        </Flex>

        
      </Container>
    </Box>
  );
}
