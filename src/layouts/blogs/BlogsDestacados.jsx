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
import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguajeContext';

const MotionBox = motion(Box);

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

  const scrollRef = useRef(null);

  const gap = useBreakpointValue({ base: 10, md: 16 });
  const cardWidth = useBreakpointValue({
    base: '80%',
    sm: '80%',
    md: '70%',
    lg: '60%',
  });

  const alertShownRef = useRef(false);

  const scrollBy = (dir) => {
    if (!scrollRef.current) return;

    const containerWidth = scrollRef.current.clientWidth;
    const scrollAmount = containerWidth * 0.8;

    scrollRef.current.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollEl = scrollRef.current;

    const handleScroll = () => {
      if (!alertShownRef.current) {
        setShowScrollAlert(true);
        alertShownRef.current = true;
        setTimeout(() => setShowScrollAlert(false), 3000);
      }
    };

    scrollEl.addEventListener('scroll', handleScroll);
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      bg={useColorModeValue('brand.lightBg', 'brand.darkBg')}
      py={{ base: 12, md: 10 }}
      px={{ base: 4, md: 6 }}
      position="relative"
      overflow="visible"
      mx="auto"
    >
      <Container
        maxW="61%"
        position="relative"
        overflow="visible"
        p={{ base: 4, md: 6 }}
      >
        <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} textAlign="center" mb={10}>
          {language === 'es' ? 'Últimos Artículos' : 'Latest Articles'}
        </Heading>

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
          bg={cardBg}
          borderRadius="full"
          boxShadow={cardShadow}
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
          bg={cardBg}
          borderRadius="full"
          boxShadow={cardShadow}
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
          gap={gap + 'px'}
          position="relative"
          px={{ base: 2, md: 4 }}
        >
          {posts.map((post, idx) => (
            <MotionBox
              key={idx}
              flex="0 0 auto"
              w={cardWidth}
              minW={cardWidth}
              bg={cardBg}
              p={3}
              rounded="2xl"
              cursor="pointer"
              overflow="visible"
              mx={{ base: '20px', md: 0 }}
              margin="10% 10%"
              initial={{ opacity: 0, y: 20, boxShadow: '0px 4px 8px rgba(0,0,0,0.06)' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.15 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0px 5px 10px rgba(0,0,0,0.12)',
                transition: {
                  duration: 0.3,
                  ease: 'easeInOut',
                  type: 'tween',
                },
              }}
            >
              <Heading as="h3" size="md" mb={1}>
                {post.title[language]}
              </Heading>
              <Text color={useColorModeValue('gray.600', 'gray.300')} mb={4}>
                {post.description[language]}
              </Text>
              <Link href={post.href} color="teal.500" fontWeight="medium">
                {language === 'es' ? 'Leer más →' : 'Read more →'}
              </Link>
            </MotionBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
