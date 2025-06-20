'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Heading,
  Select,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

import { useLanguage } from '@/context/LanguajeContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IA_OPTIONS = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    url: 'https://chat.openai.com/',
    metrics: {
      precision: 90,
      speed: 85,
      usability: 88,
      price: 70,
    },
  },
  {
    id: 'gemini',
    name: 'Gemini',
    url: 'https://gemini.example.com/',
    metrics: {
      precision: 85,
      speed: 90,
      usability: 80,
      price: 60,
    },
  },
  {
    id: 'claude',
    name: 'Claude',
    url: 'https://claude.ai/',
    metrics: {
      precision: 88,
      speed: 82,
      usability: 85,
      price: 75,
    },
  },
  {
    id: 'bard',
    name: 'Bard',
    url: 'https://bard.google.com/',
    metrics: {
      precision: 83,
      speed: 80,
      usability: 82,
      price: 65,
    },
  },
];

// Métricas que vamos a mostrar y graficar
const METRICS = ['precision', 'speed', 'usability', 'price'];

export function Comparaciones() {
  const { language } = useLanguage();

  const [ia1, setIa1] = useState(IA_OPTIONS[0].id);
  const [ia2, setIa2] = useState(IA_OPTIONS[1].id);

  const cardBg = useColorModeValue('white', 'gray.700');

  const selectedIA1 = IA_OPTIONS.find((ia) => ia.id === ia1);
  const selectedIA2 = IA_OPTIONS.find((ia) => ia.id === ia2);

  if (!selectedIA1 || !selectedIA2) return null;

  // Función para capitalizar la primera letra
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const chartData = useMemo(() => {
    return {
      labels: METRICS.map((m) =>
        language === 'es'
          ? {
              precision: 'Precisión',
              speed: 'Velocidad',
              usability: 'Usabilidad',
              price: 'Precio',
            }[m]
          : capitalize(m)
      ),
      datasets: [
        {
          label: selectedIA1.name,
          data: METRICS.map((m) => selectedIA1.metrics[m]),
          backgroundColor: 'rgba(84, 185, 176, 0.7)',
        },
        {
          label: selectedIA2.name,
          data: METRICS.map((m) => selectedIA2.metrics[m]),
          backgroundColor: 'rgba(84, 185, 176, 0.3)',
        },
      ],
    };
  }, [selectedIA1, selectedIA2, language]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: language === 'es' ? 'Comparativa de métricas' : 'Metrics Comparison',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <Box id="comparativaContain" bg={useColorModeValue('gray.50', 'gray.900')} py={16}>
      <Container maxW="6xl">
        <Heading mb={8} textAlign="center" fontSize={{ base: '2xl', md: '4xl' }}>
          {language === 'es' ? 'Comparativas Populares' : 'Popular Comparisons'}
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={12} alignItems="center">
          <Box>
            <Text fontWeight="bold" mb={2}>
              {language === 'es' ? 'Elige IA 1:' : 'Choose AI 1:'}
            </Text>
            <Select
              value={ia1}
              onChange={(e) => setIa1(e.target.value)}
              aria-label={language === 'es' ? 'Seleccionar IA 1' : 'Select AI 1'}
            >
              {IA_OPTIONS.map((ia) => (
                <option key={ia.id} value={ia.id} disabled={ia.id === ia2}>
                  {ia.name}
                </option>
              ))}
            </Select>
          </Box>

          <Box>
            <Text fontWeight="bold" mb={2}>
              {language === 'es' ? 'Elige IA 2:' : 'Choose AI 2:'}
            </Text>
            <Select
              value={ia2}
              onChange={(e) => setIa2(e.target.value)}
              aria-label={language === 'es' ? 'Seleccionar IA 2' : 'Select AI 2'}
            >
              {IA_OPTIONS.map((ia) => (
                <option key={ia.id} value={ia.id} disabled={ia.id === ia1}>
                  {ia.name}
                </option>
              ))}
            </Select>
          </Box>
        </SimpleGrid>

        <Box bg={cardBg} rounded="xl" p={6} shadow="md" mb={10} overflowX="auto" maxW="full">
          <Table variant="simple" size="md" whiteSpace="nowrap">
            <Thead>
              <Tr>
                <Th>{language === 'es' ? 'Métrica' : 'Metric'}</Th>
                <Th textAlign="center">{selectedIA1.name}</Th>
                <Th textAlign="center">{selectedIA2.name}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {METRICS.map((metric) => (
                <Tr key={metric}>
                  <Td>
                    {language === 'es'
                      ? {
                          precision: 'Precisión',
                          speed: 'Velocidad',
                          usability: 'Usabilidad',
                          price: 'Precio',
                        }[metric]
                      : capitalize(metric)}
                  </Td>
                  <Td textAlign="center">{selectedIA1.metrics[metric]}</Td>
                  <Td textAlign="center">{selectedIA2.metrics[metric]}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Box bg={cardBg} rounded="xl" p={6} shadow="md">
          <Bar data={chartData} options={chartOptions} />
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={8}>
          <Box textAlign="center">
            <Link
              href={selectedIA1.url}
              target="_blank"
              rel="noopener noreferrer"
              color="blue.500"
              fontWeight="bold"
              fontSize="lg"
            >
              {language === 'es' ? `Ir a ${selectedIA1.name}` : `Go to ${selectedIA1.name}`}
            </Link>
          </Box>
          <Box textAlign="center">
            <Link
              href={selectedIA2.url}
              target="_blank"
              rel="noopener noreferrer"
              color="blue.500"
              fontWeight="bold"
              fontSize="lg"
            >
              {language === 'es' ? `Ir a ${selectedIA2.name}` : `Go to ${selectedIA2.name}`}
            </Link>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
