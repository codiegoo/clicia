"use client";

import Link from "next/link";
import {
  Box,
  Heading,
  Text,
  Image,
  Grid,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import BlogNavbar from "@/components/BlogNavbar/BlogNavbar";

export default function BlogList({ posts }) {
  const handleFilterChange = (filter) => {
    console.log("Filtro aplicado:", filter);
  };

  const bgColor = useColorModeValue("#F8FAFC", "#111820");
  const cardBg = useColorModeValue("white", "#1A202C");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const accentColor = "#0A84FF";

  return (
    <>
      <BlogNavbar
        onFilterChange={handleFilterChange}
        tags={["IA", "Productividad", "Diseño"]}
      />

      <Box as="main" bg={bgColor} py={{ base: 10, md: 16 }} px={4}>
        <Heading
          textAlign="center"
          fontSize={{ base: "2xl", md: "4xl" }}
          mb={10}
          color={accentColor}
        >
          Blog
        </Heading>

        <Grid
          maxW="5xl"
          mx="auto"
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={8}
        >
          {posts.map((post) => (
            <Flex
              key={post.slug}
              as={Link}
              href={`/blog/${post.slug}`}
              direction={{ base: "column", md: "row" }}
              bg={cardBg}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="lg"
              overflow="hidden"
              shadow="sm"
              _hover={{ shadow: "md" }}
              transition="all 0.2s"
            >
              <Image
                src={post.image}
                alt={post.title}
                objectFit="cover"
                w={{ base: "100%", md: "40%" }}
                h="200px"
              />
              <Box p={4} flex="1">
                <Heading as="h2" fontSize="xl" mb={2} color={accentColor}>
                  {post.title}
                </Heading>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  {post.date}
                </Text>
                <Text>{post.summary}</Text>
              </Box>
            </Flex>
          ))}
        </Grid>
      </Box>
    </>
  );
}
