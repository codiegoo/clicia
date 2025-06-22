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

// Traducciones para métricas
const translations = {
  es: {
    precision: 'Precisión',
    speed: 'Velocidad',
    usability: 'Usabilidad',
    price: 'Precio',
  },
  en: {
    precision: 'Precision',
    speed: 'Speed',
    usability: 'Usability',
    price: 'Price',
  },
};

export function Comparaciones() {
  const { language } = useLanguage();

  const [ia1, setIa1] = useState(IA_OPTIONS[0].id);
  const [ia2, setIa2] = useState(IA_OPTIONS[1].id);

  const cardBg = useColorModeValue('brand.cardLight', 'brand.cardDark');
  const gridColor = useColorModeValue('#e2e8f0', '#ffffff99');

  const selectedIA1 = IA_OPTIONS.find((ia) => ia.id === ia1);
  const selectedIA2 = IA_OPTIONS.find((ia) => ia.id === ia2);

  if (!selectedIA1 || !selectedIA2) return null;


  // Capitaliza la primera letra (para inglés)
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const chartData = useMemo(() => {
    return {
      labels: METRICS.map((m) =>
        language === 'es' ? translations.es[m] : capitalize(m)
      ),
      datasets: [
        {
          label: selectedIA1.name,
          data: METRICS.map((m) => selectedIA1.metrics[m]),
          backgroundColor: '#0A84FF',
        },
        {
          label: selectedIA2.name,
          data: METRICS.map((m) => selectedIA2.metrics[m]),
          backgroundColor: '#205182',
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
        color: useColorModeValue('gray.800', 'white'),
      },
    },
    scales: {
      x: {
        grid: {
          color: gridColor,
        },
        ticks: {
          color: useColorModeValue('gray.800', 'white'),
        },
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          color: gridColor,
        },
        ticks: {
          color: useColorModeValue('gray.800', 'white'),
        },
      },
    },
  };

  return (
    <Box id="comparativaContain" bg={useColorModeValue('brand.lightBg', 'brand.darkBg')} py={16}>
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
        <Box
          bg={cardBg}
          rounded="xl"
          p={6}
          shadow="md"
          mb={10}
          overflowX="auto"
          maxW="full"
        >
          <Table
            variant="simple"
            size="md"
            whiteSpace="nowrap"
            border="1px"
            borderColor={gridColor}
          >
            <Thead>
              <Tr>
                <Th color={gridColor} borderColor={gridColor} borderRight="1px solid">
                  {language === 'es' ? 'Métrica' : 'Metric'}
                </Th>
                <Th color={gridColor} textAlign="center" borderColor={gridColor} borderRight="1px solid">
                  {selectedIA1.name}
                </Th>
                <Th color={gridColor} textAlign="center" borderColor={gridColor}>
                  {selectedIA2.name}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {METRICS.map((metric) => (
                <Tr key={metric}>
                  <Td
                    color={gridColor}
                    borderColor={gridColor}
                    borderTop="1px solid"
                    borderRight="1px solid"
                  >
                    {language === 'es' ? translations.es[metric] : capitalize(metric)}
                  </Td>
                  <Td
                    color={gridColor}
                    textAlign="center"
                    borderColor={gridColor}
                    borderTop="1px solid"
                    borderRight="1px solid"
                  >
                    {selectedIA1.metrics[metric]}
                  </Td>
                  <Td
                    color={gridColor}
                    textAlign="center"
                    borderColor={gridColor}
                    borderTop="1px solid"
                  >
                    {selectedIA2.metrics[metric]}
                  </Td>
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
