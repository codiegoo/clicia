"use client";

import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useColorMode,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  SearchIcon,
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguajeContext";

export default function BlogNavbar({ onFilterChange, tags = [] }) {
  const [search, setSearch] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const { language, setLanguage } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue("#F8FAFC", "#111820");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const accentColor = "#0A84FF";

  const buttonBg = useColorModeValue("brand.cardLight", "brand.cardDark");
  const buttonColor = useColorModeValue(
    "brand.textLightPrimary",
    "brand.textDarkPrimary"
  );
  const buttonHover = useColorModeValue("gray.100", "gray.700");

  return (
    <>
      <Box
        as="nav"
        w="100%"
        px={{ base: 4, md: 6 }}
        py={4}
        mb={8}
        borderBottomWidth="1px"
        borderColor={borderColor}
        bg={bgColor}
        position="sticky"
        top={0}
        zIndex={50}
      >
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
          {/* Flecha volver */}
          <Link href="/">
            <IconButton
              icon={<ArrowBackIcon />}
              aria-label="Volver a inicio"
              variant="ghost"
              size="md"
              color={accentColor}
              _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
            />
          </Link>

          {/* Desktop: filtros + buscador */}
          <Flex
            align="center"
            gap={2}
            flexWrap="wrap"
            justify="flex-end"
            display={{ base: "none", md: "flex" }}
          >
            <Button
              size="sm"
              variant="outline"
              borderColor={accentColor}
              color={accentColor}
              _hover={{ bg: useColorModeValue("blue.50", "gray.700") }}
              onClick={() => onFilterChange("recientes")}
            >
              Más recientes
            </Button>

            <Button
              size="sm"
              variant="outline"
              borderColor={accentColor}
              color={accentColor}
              _hover={{ bg: useColorModeValue("blue.50", "gray.700") }}
              onClick={() => onFilterChange("populares")}
            >
              Más populares
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                size="sm"
                variant="outline"
                borderColor={accentColor}
                color={accentColor}
                rightIcon={<ChevronDownIcon />}
                _hover={{ bg: useColorModeValue("blue.50", "gray.700") }}
              >
                Filtrar por tag
              </MenuButton>
              <MenuList>
                {tags.length === 0 ? (
                  <MenuItem isDisabled>No hay tags</MenuItem>
                ) : (
                  tags.map((tag) => (
                    <MenuItem
                      key={tag}
                      onClick={() => onFilterChange(`tag:${tag}`)}
                    >
                      {tag}
                    </MenuItem>
                  ))
                )}
              </MenuList>
            </Menu>

            <InputGroup maxW="200px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                size="sm"
                placeholder="Buscar..."
                value={search}
                bg={useColorModeValue("white", "gray.800")}
                borderColor={borderColor}
                _focus={{
                  borderColor: accentColor,
                  boxShadow: `0 0 0 1px ${accentColor}`,
                }}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onFilterChange(`search:${search}`);
                  }
                }}
              />
            </InputGroup>

            <IconButton
              aria-label="Toggle dark mode"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              bg={buttonBg}
              color={buttonColor}
              _hover={{ bg: buttonHover }}
              borderWidth="1px"
              borderColor={borderColor}
              size="sm"
              rounded="md"
              ml={2}
            />

            <Menu>
              <MenuButton
                ml={2}
                px={3}
                py={1.5}
                fontSize="sm"
                bg={buttonBg}
                color={buttonColor}
                borderWidth="1px"
                borderColor={borderColor}
                _hover={{ bg: buttonHover }}
                rounded="md"
              >
                {language.toUpperCase()}
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.800")}
                color={buttonColor}
                borderColor={borderColor}
              >
                <MenuItem onClick={() => setLanguage("es")}>Español</MenuItem>
                <MenuItem onClick={() => setLanguage("en")}>English</MenuItem>
              </MenuList>
            </Menu>
          </Flex>

          {/* Mobile: botón hamburguesa */}
          <IconButton
            display={{ base: "flex", md: "none" }}
            icon={<HamburgerIcon />}
            aria-label="Abrir menú"
            variant="outline"
            size="md"
            onClick={onOpen}
          />
        </Flex>
      </Box>

      {/* Drawer para mobile */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <HStack justify="space-between">
              <Text>Menú</Text>
              <IconButton
                icon={<ArrowBackIcon />}
                aria-label="Cerrar menú"
                variant="ghost"
                onClick={onClose}
              />
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              <Button onClick={() => { onFilterChange("recientes"); onClose(); }}>
                Más recientes
              </Button>
              <Button onClick={() => { onFilterChange("populares"); onClose(); }}>
                Más populares
              </Button>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Filtrar por tag
                </MenuButton>
                <MenuList>
                  {tags.length === 0 ? (
                    <MenuItem isDisabled>No hay tags</MenuItem>
                  ) : (
                    tags.map((tag) => (
                      <MenuItem
                        key={tag}
                        onClick={() => {
                          onFilterChange(`tag:${tag}`);
                          onClose();
                        }}
                      >
                        {tag}
                      </MenuItem>
                    ))
                  )}
                </MenuList>
              </Menu>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Buscar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onFilterChange(`search:${search}`);
                      onClose();
                    }
                  }}
                />
              </InputGroup>

              <IconButton
                aria-label="Toggle dark mode"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
              />

              <Menu>
                <MenuButton as={Button}>
                  {language.toUpperCase()}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setLanguage("es")}>Español</MenuItem>
                  <MenuItem onClick={() => setLanguage("en")}>English</MenuItem>
                </MenuList>
              </Menu>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
