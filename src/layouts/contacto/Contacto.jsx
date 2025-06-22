'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Center,
  Input,
  Textarea,
  VStack,
  FormControl,
  FormLabel,
  useColorModeValue,
} from '@chakra-ui/react';

import { useLanguage } from '@/context/LanguajeContext';

export function Contacto() {
  const { language } = useLanguage();

  // ✅ Usa colores del tema extendido (brand.*)
  const bg = useColorModeValue('brand.lightBg', 'brand.darkBg');
  const inputBg = useColorModeValue('brand.cardLight', 'brand.cardDark');
  const textColor = useColorModeValue('brand.textLightPrimary', 'brand.textDarkPrimary');

  // Textos traducidos
  const texts = {
    es: {
      heading: '¿Tienes preguntas o quieres colaborar?',
      description:
        'Contáctanos para colaboraciones, sugerencias o propuestas de herramientas.',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'tu@email.com',
      messageLabel: 'Detalles / Mensaje',
      messagePlaceholder: 'Escribe aquí los detalles o tu mensaje',
      sendButton: 'Enviar Email',
    },
    en: {
      heading: 'Have questions or want to collaborate?',
      description: 'Contact us for collaborations, suggestions, or tool proposals.',
      emailLabel: 'Email address',
      emailPlaceholder: 'your@email.com',
      messageLabel: 'Details / Message',
      messagePlaceholder: 'Write your details or message here',
      sendButton: 'Send Email',
    },
  };

  const t = language === 'es' ? texts.es : texts.en;

  return (
    <Box
      id="contactoContain"
      as="section"
      py={{ base: 16, md: 20 }}
      px={{ base: 6, md: 12 }}
      bg={bg}
      color={textColor}
    >
      <Container maxW="3xl" textAlign="center">
        <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" mb={4}>
          {t.heading}
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} mb={10}>
          {t.description}
        </Text>

        <Box as="form" maxW="md" mx="auto">
          <VStack spacing={6} align="stretch">
            <FormControl id="email" isRequired>
              <FormLabel>{t.emailLabel}</FormLabel>
              <Input
                type="email"
                placeholder={t.emailPlaceholder}
                bg={inputBg}
                borderRadius="md"
                color={textColor}
                _focus={{
                  borderColor: 'brand.accent',
                  boxShadow: '0 0 0 1px #0A84FF',
                }}
              />
            </FormControl>

            <FormControl id="mensaje" isRequired>
              <FormLabel>{t.messageLabel}</FormLabel>
              <Textarea
                placeholder={t.messagePlaceholder}
                bg={inputBg}
                borderRadius="md"
                rows={5}
                color={textColor}
                _focus={{
                  borderColor: 'brand.accent',
                  boxShadow: '0 0 0 1px #0A84FF',
                }}
              />
            </FormControl>

            <Center>
              <Button
                type="submit"
                bgGradient="linear(to-b, brand.accent, brand.accent)"
                color="black"
                px={8}
                py={3}
                borderRadius="2xl"
                boxShadow="md"
                _hover={{
                  bgGradient: 'linear(to-b, #0A84FF, #0A84FF)',
                  transform: 'scale(1.03)',
                }}
                transition="all 0.3s"
                fontSize={{ base: 'md', md: 'lg' }}
              >
                {t.sendButton}
              </Button>
            </Center>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
