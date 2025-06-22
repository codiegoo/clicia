'use client';

import { useTilt } from '@/hooks/useTilt.hooks';
import { useEffect } from 'react';
import './inicio.sass'
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useLanguage } from '@/context/LanguajeContext';

export default function Inicio() {
  const { language } = useLanguage();

  // Theme-aware colors
  const textColor = useColorModeValue('brand.textLightPrimary', 'brand.textDarkPrimary');
  const subTextColor = useColorModeValue('brand.textLightSecondary', 'brand.textDarkSecondary');
  const bgColor = useColorModeValue('brand.lightBg', 'brand.darkBg');
  const cardBg = useColorModeValue('brand.cardLight', 'brand.cardDark');

  // Tilt config
  const tiltOptions = {
    reverse: false,
    max: 25,
    perspective: 1500,
    speed: 500,
    gyroscope: true
  };

  const containerRef = useTilt(tiltOptions);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = '/particles/particles.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.particleground) {
          window.particleground(document.getElementById('particles'), {
            dotColor: '#0A84FF',
            lineColor: '#0A84FF',
          });
        }
      };
    }
  }, []);

  const cards = [
    {
      title: {
        es: 'Tutoriales Prácticos',
        en: 'Practical Tutorials',
      },
      description: {
        es: 'Aprende a usar herramientas de IA paso a paso, desde lo más básico hasta usos avanzados.',
        en: 'Learn to use AI tools step by step, from basics to advanced uses.',
      },
    },
    {
      title: {
        es: 'Comparativas de Apps',
        en: 'App Comparisons',
      },
      description: {
        es: 'Compara las mejores herramientas de IA en función de tus necesidades reales.',
        en: 'Compare the best AI tools based on your real needs.',
      },
    },
    {
      title: {
        es: 'Guías de Productividad',
        en: 'Productivity Guides',
      },
      description: {
        es: 'Descubre cómo aplicar la IA para trabajar menos y lograr más.',
        en: 'Discover how to use AI to work less and achieve more.',
      },
    },
  ];

  return (
    <Box
      id="particles"
      minHeight="100vh"
      bg={useColorModeValue('brand.lightBg', 'brand.darkBg')}
      color={textColor}
      as="main"
    >
      <Container
        id="webcoderskull"
        maxW="100%"
        style={{ height: '35rem' }}
        py={{ base: 16, md: 24 }}
        px={{ base: 6, md: 12 }}
        textAlign="center"
        ref={containerRef}
      >
        <VStack spacing={4}>
          <Heading
            as="h1"
            fontSize={{ base: '2.5xl', md: '4.5xl' }}
            fontWeight="bold"
          >
            {language === 'es'
              ? 'Explora las Mejores Herramientas de IA en 2025'
              : 'Explore the Best AI Tools in 2025'}
          </Heading>
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            color={useColorModeValue('brand.textLightSecondary', 'brand.textDarkSecondary')}
            maxW="600px"
            mx="auto"
          >
            {language === 'es'
              ? 'Descubre cómo la inteligencia artificial puede transformar tu productividad, negocio y vida diaria.'
              : 'Discover how artificial intelligence can transform your productivity, business, and daily life.'}
          </Text>
          <Button
            className="btnInicio"
            bg={useColorModeValue('brand.accent', 'brand.accent')}
            color="white"
            _hover={{
              bg: 'brand.accent',
              transform: 'scale(1.05)',
            }}
            transition="all 0.3s"
          >
            {language === 'es' ? 'Ver artículos' : 'View Articles'}
          </Button>
        </VStack>
      </Container>

      <Box
        id="homeCardContain"
        borderTop="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        py={{ base: 12, md: 16 }}
        px={{ base: 6, md: 12 }}
      >
        <Container maxW="6xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {cards.map(({ title, description }) => (
              <Box
                key={title[language]}
                p={6}
                bg={useColorModeValue('brand.cardLight', 'brand.cardDark')}
                borderRadius="2xl"
                boxShadow="sm"
              >
                <Heading as="h2" size="lg" mb={2} color={textColor}>
                  {title[language]}
                </Heading>
                <Text color={useColorModeValue('brand.textLightSecondary', 'brand.textDarkSecondary')}q>
                  {description[language]}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}
