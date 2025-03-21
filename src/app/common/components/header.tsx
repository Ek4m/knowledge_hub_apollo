"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Link as ChakraLink,
  Box,
  Flex,
  IconButton,
  useDisclosure,
  HStack,
  MenuButton,
  Menu,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { HamburgerIcon, CloseIcon, SmallAddIcon } from "@chakra-ui/icons";
import { COLORS, STYLES } from "../constants";
import MainLogo from "./logo";
import { linkHoverStyle } from "./styling";
import { useSession } from "next-auth/react";

export const MainHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrollActive, setScrollActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { data: userData } = useSession();

  const onScrollHandler = useCallback(() => {
    setScrollActive(window.scrollY > 50);
  }, []);
  console.log(userData?.user);

  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);
    setIsMounted(true);
    return () => {
      window.removeEventListener("scroll", onScrollHandler);
    };
  }, [onScrollHandler]);

  if (!isMounted) return null;
  return (
    <Box
      ref={headerRef}
      top="0"
      transition="0.4s ease 0s"
      boxShadow={scrollActive ? " 0px 5px 10px 2px #d1ccc0" : "none"}
      bg="#ffff"
      zIndex={5}
      px={STYLES.commonXPadding}
      py={2}
      width="100%"
      position={scrollActive ? "fixed" : "static"}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <MainLogo />
        <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
          <ChakraLink ml={5} _hover={linkHoverStyle} as={Link} href="/">
            Home
          </ChakraLink>
          <ChakraLink
            ml={5}
            _hover={linkHoverStyle}
            as={Link}
            href="/documents"
          >
            Documents
          </ChakraLink>
          <ChakraLink
            ml={5}
            _hover={linkHoverStyle}
            href="https://github.com/Ek4m/"
          >
            Github
          </ChakraLink>
        </HStack>
        <Flex alignItems={"center"}>
          <Menu>
            <Link href="/documents/new">
              <Button mx={5} bg={COLORS.red} color={"#ffff"}>
                New document
              </Button>
            </Link>
            <Button
              mr={5}
              bg={"#ffff"}
              color={COLORS.red}
              border={`1px solid ${COLORS.red}`}
            >
              Contact us
            </Button>
            {userData && userData.user ? (
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"md"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
            ) : (
              <Link href="/login">
                <Button mx={5} bg={COLORS.red} color={"#ffff"}>
                  <SmallAddIcon fontSize={30} />
                </Button>
              </Link>
            )}
            <MenuList>
              <MenuItem>
                <ChakraLink as={Link} href="/profile">
                  Profile
                </ChakraLink>
              </MenuItem>
              <MenuItem>
                <ChakraLink as={Link} href="/profile/documents">
                  My documents
                </ChakraLink>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <ChakraLink as={Link} color="red" href="/logout">
                  Log out
                </ChakraLink>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <ChakraLink as={Link} href="/">
              Link 1
            </ChakraLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
