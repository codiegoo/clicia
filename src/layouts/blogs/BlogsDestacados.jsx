'use client';

import {
  Box,
  Heading,
  Text,
  Link,
  Image,
  useColorModeValue,
  Container,
  SimpleGrid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguajeContext';

const MotionBox = motion(Box);

const posts = [
  {
    title: {
      es: '¿Qué negocio deberías empezar según la IA? | Ideas de negocio personalizadas',
      en: 'What Business Should You Start According to AI? | Personalized Business Ideas',
    },
    summary: {
      es: 'Descubre con la ayuda de la inteligencia artificial qué tipo de negocio encaja con tu estilo de vida, talentos y sueños.',
      en: 'Discover what kind of business suits your lifestyle, talents, and dreams using AI.',
    },
    slug: 'negocio-ideal-ia',
    image: 'https://source.unsplash.com/400x300/?business,startup,entrepreneur',
  },
  {
    title: {
      es: '¿Qué dice la IA sobre tu personalidad oculta?',
      en: 'What Does AI Say About Your Hidden Personality?',
    },
    summary: {
      es: 'Usa inteligencia artificial para revelar rasgos ocultos de tu personalidad y potenciar tus fortalezas.',
      en: 'Use AI to uncover hidden traits in your personality and enhance your strengths.',
    },
    slug: 'descubre-personalidad-ia',
    image: 'https://source.unsplash.com/400x300/?mystery,personality,ai',
  },
  {
    title: {
      es: 'Cómo usar la IA para encontrar ideas de negocio rentables',
      en: 'How to Use AI to Find Profitable Business Ideas',
    },
    summary: {
      es: 'Deja que la IA analice tendencias y descubra oportunidades de negocio escalables.',
      en: 'Let AI analyze trends and discover scalable business opportunities.',
    },
    slug: 'ideas-negocio-ia',
    image: 'https://source.unsplash.com/400x300/?entrepreneur,business,ideas,ai',
  },
  {
    title: {
      es: '¿Sabías que la IA puede ayudarte a aprender un nuevo idioma?',
      en: 'Did You Know AI Can Help You Learn a New Language?',
    },
    summary: {
      es: 'Acelera tu aprendizaje de idiomas con inteligencia artificial, sin clases aburridas.',
      en: 'Accelerate your language learning with AI, no boring classes required.',
    },
    slug: 'aprende-idiomas-rapido-ia',
    image: '/images/aprenderIdioma.webp',
  },
];

export function BlogDestacados() {
  const { language } = useLanguage();
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardShadow = useColorModeValue('md', 'dark-lg');

  return (
    <Box
      bg={useColorModeValue('brand.lightBg', 'brand.darkBg')}
      py={{ base: 12, md: 16 }}
      px={{ base: 4, md: 8 }}
    >
      <Container maxW="4xl" px="8">
        <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} textAlign="center" mb={10}>
          {language === 'es' ? 'Últimos Artículos' : 'Latest Articles'}
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {posts.map((post, idx) => (
            <MotionBox
              key={post.slug}
              bg={cardBg}
              boxShadow={cardShadow}
              borderRadius="2xl"
              overflow="hidden"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <Image
                src={post.image}
                alt={post.title[language]}
                objectFit="cover"
                w="100%"
                h="200px"
              />
              <Box p={5}>
                <Heading as="h3" size="md" mb={2}>
                  {post.title[language]}
                </Heading>
                <Text color={useColorModeValue('gray.600', 'gray.300')} mb={4}>
                  {post.summary[language]}
                </Text>
                <Link href={`/blog/${post.slug}`} color="teal.500" fontWeight="medium">
                  {language === 'es' ? 'Leer más →' : 'Read more →'}
                </Link>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
