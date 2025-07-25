"use client";

import NextLink from "next/link";
import {
  Box,
  Heading,
  Text,
  Image,
  SimpleGrid,
  useColorModeValue,
  AspectRatio,
  chakra,
} from "@chakra-ui/react";
import BlogNavbar from "@/components/BlogNavbar/BlogNavbar";

const ChakraLink = chakra(NextLink);

export default function BlogList({ posts }) {
  const handleFilterChange = (filter) => {
    console.log("Filtro aplicado:", filter);
  };

  const bgColor = useColorModeValue("#F8FAFC", "#111820");
  const cardBg = useColorModeValue("white", "gray.800");
  const accentColor = "#0A84FF";
  const shadow = useColorModeValue("lg", "dark-lg");

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

        <Box maxW="60%" mx="auto">
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8}>
            {posts.map((post) => (
              <ChakraLink
                key={post.slug}
                href={`/blog/${post.slug}`}
                _hover={{ textDecoration: "none" }}
              >
                <Box
                  bg={cardBg}
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow={shadow}
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "xl",
                  }}
                >
                  <AspectRatio ratio={1} w="100%">
                    <Image
                      src={post.image}
                      alt={post.title}
                      objectFit="cover"
                    />
                  </AspectRatio>

                  <Box p={5}>
                    <Heading
                      as="h2"
                      fontSize="lg"
                      mb={2}
                      color={accentColor}
                      noOfLines={2}
                    >
                      {post.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.500" mb={1}>
                      {post.date}
                    </Text>
                    <Text
                      fontSize="sm"
                      color={useColorModeValue("gray.700", "gray.300")}
                      noOfLines={3}
                    >
                      {post.summary}
                    </Text>
                  </Box>
                </Box>
              </ChakraLink>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
