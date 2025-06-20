'use client';
import {
  Box,
  Heading,
  Text,
  Link,
  IconButton,
  useColorModeValue,
  Container,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
const MotionBox = motion(Box);
import { useLanguage } from '@/context/LanguajeContext'; 
import { useRef, useState, useEffect } from 'react';


const posts = [
  {
    title: {
      es: 'Cómo usar ChatGPT para organizar tu día',
      en: 'How to Use ChatGPT to Organize Your Day',
    },
    description: {
      es: 'Guía rápida para sacarle el máximo provecho a ChatGPT como asistente personal diario.',
      en: 'Quick guide to get the most out of ChatGPT as a daily personal assistant.',
    },
    href: '/blog/chatgpt-organizar-dia',
  },
  {
    title: {
      es: '10 prompts para productividad extrema',
      en: '10 Prompts for Extreme Productivity',
    },
    description: {
      es: 'Descubre cómo mejorar tu foco usando prompts bien pensados.',
      en: 'Discover how to improve your focus using well-thought prompts.',
    },
    href: '/blog/prompts-productividad',
  },
  {
    title: {
      es: 'ChatGPT vs Google: ¿Cuál es mejor?',
      en: 'ChatGPT vs Google: Which is Better?',
    },
    description: {
      es: 'Una comparativa práctica entre dos gigantes de la información.',
      en: 'A practical comparison between two information giants.',
    },
    href: '/blog/chatgpt-vs-google',
  },
  {
    title: {
      es: 'Automatiza tu trabajo con IA',
      en: 'Automate Your Work with AI',
    },
    description: {
      es: 'Aprende cómo usar IA para tareas repetitivas y ahorrar tiempo.',
      en: 'Learn how to use AI for repetitive tasks and save time.',
    },
    href: '/blog/automatiza-con-ia',
  },
];

export function BlogDestacados() {
  const { language } = useLanguage();

  const cardBg = useColorModeValue('white', 'gray.700');
  const cardShadow = useColorModeValue('md', 'dark-lg');
  const containerBg = useColorModeValue('gray.50', 'gray.900');

  const scrollRef = useRef(null);
  const gap = 24;
  const visibleCards = useBreakpointValue({ base: 1, md: 3 }) || 3;
  const cardWidth = useBreakpointValue({ base: '90vw', md: '320px' });

  const [showScrollAlert, setShowScrollAlert] = useState(false);
  const alertShownRef = useRef(false);

  const scrollBy = (dir) => {
    if (!scrollRef.current) return;

    const cardWidthNum =
      typeof cardWidth === 'string' && cardWidth.endsWith('px')
        ? parseInt(cardWidth)
        : 300;

    const scrollAmount = (cardWidthNum + gap) * visibleCards;

    scrollRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollEl = scrollRef.current;

    const handleScroll = () => {
      console.log('scroll detected');
      if (!alertShownRef.current) {
        setShowScrollAlert(true);
        alertShownRef.current = true;

        setTimeout(() => setShowScrollAlert(false), 3000);
      }
    };

    scrollEl.addEventListener('scroll', handleScroll);

    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showScrollAlert) {
      const timer = setTimeout(() => setShowScrollAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showScrollAlert]);


  return (
    <Box
      bg={containerBg}
      py={{ base: 12, md: 16 }}
      px={{ base: 4, md: 8 }}
      position="relative"
      overflow="visible"
      mx={{ base: '-20px', md: 'auto' }}
    >
      <Container
        maxW="6xl"
        position="relative"
        overflow="visible"
        p="4"
      >
        <Heading as="h2" size="xl" textAlign="center" mb={10}>
          {language === 'es' ? 'Últimos Artículos' : 'Latest Articles'}
        </Heading>

        {/* Aquí mostramos la notificación */}
        {showScrollAlert && (
          <Box
            position="fixed"
            bottom="30px"
            left="50%"
            transform="translateX(-50%)"
            bg="blue.500"
            color="white"
            px={4}
            py={2}
            borderRadius="md"
            boxShadow="md"
            zIndex={1000}
            fontWeight="semibold"
            userSelect="none"
          >
            {language === 'es' ? 'Desliza para ver más' : 'Swipe to see more'}
          </Box>
        )}

        <IconButton
          aria-label={language === 'es' ? 'Desplazar a la izquierda' : 'Scroll left'}
          icon={<ChevronLeftIcon />}
          position="absolute"
          top="50%"
          left={{ base: '10px', md: '-40px' }}
          transform="translateY(-50%)"
          zIndex={20}
          onClick={() => scrollBy('left')}
          display={{ base: 'none', md: 'block' }}
          bg="whiteAlpha.800"
          _hover={{ bg: 'whiteAlpha.900' }}
          borderRadius="full"
          boxShadow="md"
          size="lg"
        />

        <IconButton
          aria-label={language === 'es' ? 'Desplazar a la derecha' : 'Scroll right'}
          icon={<ChevronRightIcon />}
          position="absolute"
          top="50%"
          right={{ base: '10px', md: '-40px' }}
          transform="translateY(-50%)"
          zIndex={20}
          onClick={() => scrollBy('right')}
          display={{ base: 'none', md: 'block' }}
          bg="whiteAlpha.800"
          _hover={{ bg: 'whiteAlpha.900' }}
          borderRadius="full"
          boxShadow="md"
          size="lg"
        />

        <Box
          ref={scrollRef}
          overflowX="auto"
          scrollBehavior="smooth"
          sx={{
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
          display="flex"
          gap={`${gap}px`}
          position="relative"
          p="8"
        >
          {posts.map((post, idx) => (
            <MotionBox
              key={idx}
              flex="0 0 auto"
              w={cardWidth}
              bg={cardBg}
              boxShadow={cardShadow}
              p={6}
              rounded="2xl"
              cursor="pointer"
              overflow="visible"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.12)' }}
              mx={{ base: '10px', md: 0 }}
            >
              <Heading as="h3" size="md" mb={2}>
                {post.title[language]}
              </Heading>
              <Text color="gray.600" mb={4}>
                {post.description[language]}
              </Text>
              <Link href={post.href} color="blue.500" fontWeight="medium">
                {language === 'es' ? 'Leer más →' : 'Read more →'}
              </Link>
            </MotionBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
