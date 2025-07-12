'use client';

import { useLanguage } from '@/context/LanguajeContext';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Button,
  Link,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';

const herramientas = [
  {
    nombre: { es: 'Notion AI', en: 'Notion AI' },
    descripcion: {
      es: 'Organiza tu trabajo y mejora la productividad con IA integrada.',
      en: 'Organize your work and boost productivity with integrated AI.',
    },
    url: 'https://www.notion.so/product/ai',
  },
  {
    nombre: { es: 'ChatGPT', en: 'ChatGPT' },
    descripcion: {
      es: 'Genera texto, responde preguntas y automatiza tareas fácilmente.',
      en: 'Generate text, answer questions, and automate tasks easily.',
    },
    url: 'https://chat.openai.com/',
  },
  {
    nombre: { es: 'Midjourney', en: 'Midjourney' },
    descripcion: {
      es: 'Crea imágenes sorprendentes a partir de texto con IA generativa.',
      en: 'Create stunning images from text with generative AI.',
    },
    url: 'https://www.midjourney.com/',
  },
  {
    nombre: { es: 'Claude', en: 'Claude' },
    descripcion: {
      es: 'Un asistente de IA amigable, eficiente y enfocado en el contexto.',
      en: 'A friendly, efficient AI assistant focused on context.',
    },
    url: 'https://claude.ai/',
  },
  {
    nombre: { es: 'Perplexity', en: 'Perplexity' },
    descripcion: {
      es: 'Buscador inteligente con IA que te da respuestas claras y fuentes.',
      en: 'AI-powered smart search providing clear answers and sources.',
    },
    url: 'https://www.perplexity.ai/',
  },
  {
    nombre: { es: 'Zapier', en: 'Zapier' },
    descripcion: {
      es: 'Conecta apps y automatiza flujos de trabajo sin código.',
      en: 'Connect apps and automate workflows without code.',
    },
    url: 'https://zapier.com/',
  },
  {
    nombre: { es: 'Runway ML', en: 'Runway ML' },
    descripcion: {
      es: 'Edita y genera videos con IA como si fuera magia.',
      en: 'Edit and generate videos with AI like magic.',
    },
    url: 'https://runwayml.com/',
  },
  {
    nombre: { es: 'Tome', en: 'Tome' },
    descripcion: {
      es: 'Crea presentaciones profesionales automáticamente con IA.',
      en: 'Automatically create professional presentations with AI.',
    },
    url: 'https://tome.app/',
  },
  {
    nombre: { es: 'Copy.ai', en: 'Copy.ai' },
    descripcion: {
      es: 'Genera textos de marketing y contenido en segundos.',
      en: 'Generate marketing texts and content in seconds.',
    },
    url: 'https://www.copy.ai/',
  },
];

export function HerramientasDestacadas() {
  const cardBg = useColorModeValue('brand.cardLight', 'brand.cardDark'); // Ej: '#F8FAFC' / '#1F2937'
  const textColor = useColorModeValue('brand.textLightPrimary', 'brand.textDarkPrimary'); // Ej: '#1F2937' / '#D1D5DB'
  const descColor = useColorModeValue('brand.textLightSecondary', 'brand.textDarkSecondary'); // Ej: '#4A5568' / '#A0AEC0'
  const buttonBg = useColorModeValue('brand.accent', 'brand.accent'); // Color azul que definiste
  const { language } = useLanguage();

  return (
    <Box id="herramientasContain" bg={useColorModeValue('brand.lightBg', 'brand.darkBg')} py={16}>
      <Container maxW="68%">
        <Heading textAlign="center" fontSize={{ base: '2xl', md: '3xl' }} mb={10} color={textColor}>
          {language === 'es' ? 'Herramientas Recomendadas' : 'Recommended Tools'}
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} justifyItems="center">
          {herramientas.map((tool, idx) => (
            <Flex
              key={idx}
              direction="column"
              bg={cardBg}
              color={textColor}
              borderRadius="2xl"
              p={3}
              shadow="md"
              maxW="sm"
              w="100%"
              transition="all 0.3s"
              _hover={{ shadow: 'lg', transform: 'translateY(-4px)' }}
            >
              <VStack spacing={1} align="start">
                <Heading fontSize="xl">{tool.nombre[language]}</Heading>
                <Text color={descColor}>{tool.descripcion[language]}</Text>
                <Button
                  as={Link}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  bg={buttonBg}
                  color="white"
                  _hover={{
                    bg: buttonBg,
                    transform: 'scale(1.03)',
                    textDecoration: 'none',
                  }}
                  transition="all 0.3s"
                  mt={2}
                >
                  {language === 'es' ? 'Ir a la herramienta' : 'Go to tool'}
                </Button>
              </VStack>
            </Flex>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
